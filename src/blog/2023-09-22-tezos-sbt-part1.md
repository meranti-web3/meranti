---
title: Soulbound Tokens on Tezos with FA2, part 1.
author: Olivier Scherrer
email: olivier.scherrer@meranti.fr
linkedIn: https://www.linkedin.com/in/olivier-scherrer-039b8441/
date: 2023-09-22
---

We've previously seen how to build [Soulbound Tokens (SBTs) on Ethereum compatible blockchains using ERC721](https://www.meranti.fr/blog/2023-07-25-ethereum-sbt/). In this tutorial, we'll cover how to implement SBTs on Tezos using the [FA2](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) standard, bringing the token's features on par with its [ERC721](https://www.meranti.fr/blog/2023-07-25-ethereum-sbt/) equivalent.

## Soulbound Tokens on Tezos

We decided to use the [FA2](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) standard as a Soulbound Token is very similar to an NFT except for its non transferability. It still needs to assign tokens to owners, store metadata, be recognized in wallets etc. [FA2](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) is the de facto standard and we want our SBTs to exhibit the same behaviors.

This contract will be implemented using the [JsLIGO](https://ligolang.org/?lang=jsligo) syntax and we'll be following the [FA2](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) standard.

Unlike with Ethereum where we were able to inherit from a standard implementation from OpenZeppelin, this time we'll build it from scratch as I wasn't able to find an implementation easy enough to just reuse. This is fine as it will give us an opportunity to conduct an in-depth study on how to write an FA2 smart contract.

## About FA2

FA2's intent is to be flexible enough to allow for various usages such as fungible tokens, non-fungible tokens and all sorts of mixed uses, while offering a standard API for interoperability. This makes it for a powerful standard, but also a much more difficult one to use and implement. As we'll later see, it was also built with technical constraints that are now alleviated, such as the absence of view methods. Anyway, let's dig in.

### Standard entrypoints

To ensure interoperability, with other contracts or tooling from the ecosystem, we have to be 100% FA2 compliant. What this means is that the ecosystem tools must be able to inspect our contract and detect a standard FA2 interface in order to consider it FA2, which will unlock some powerful features such as off-chain metadata. Let's start by identifying those requirements:

### 1. `transfer` entrypoint.

Tokens of all sorts were designed to be transferable. Given that we follow the FA2 standard, we also need to implement this method. It will just have the simplest implementation possible by throwing an error when called, since Soulbound Tokens aren't transferable!

```js
const transfer = (_transfer_params: list<transfer_params>, _store: storage)
  : return_ => { return failwith("FA2_TX_DENIED") };
```

This function's name and signature follow the [specs](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/implementing-fa2.md#transfer). Remember that tools in the ecosystem will use [reflection](https://en.wikipedia.org/wiki/Reflective_programming) to inspect a contract's interface. Even though the parameters won't be used within the method, their types still need to follow the specs so the contract is compatible. We'll also use the suggested `FA2_TX_DENIED` error to signify that a token isn't transferable.

Because we're not using the `_transfer_params` or `_store` params, we're prefixing them with a `_` so the compiler doesn't complain about the fact that they're unused. This is a nice addition to Ligo.

We'll also introduce the types for each parameter:

`transfer_params`:

```js
type transfer_params =
// @layout:comb
{
  from_: address,
  txs: list<
  // @layout:comb
  { 
    to_: address, 
    token_id: nat, 
    amount: nat
  }>
};
```

**Important**: although this type isn't used, its shape MUST adhere to the specs. While this syntax makes it look like the order in which the `to_` and `token_id` fields in the list of `txs` isn't important, remember that the reflection logic used by some tools (thinking of how [TzKT](https://tzkt.io/) detects an FA2 contract) may still rely on a specific order. It turns out that the ligo compiler will output those 2 fields out of order and prevent proper FA2 detection. We need to tell LIGO to respect the order in which those fields are specified when generating the resulting michelson. For that, we use the `// @layout:comb` pragma. Please use this pragma extensively to avoid annoying detection issues.

We also need to introduce the `storage` type, we'll keep it empty for now since we don't yet know what to put in.

```js
type storage = {
  // we'll keep this empty for now and will keep on populating it as we go.
}
```

### 2. `balance_of` entrypoint.

`balance_of`'s purpose is to check a given owner's token count. This method was designed at a time when `view` methods didn't exist and when the balance couldn't just be returned from the function call, unlike with Ethereum smart contracts for example. Remember that the return type of a Tezos entrypoint is a list of operations to perform next, plus the new storage state.

This is why it has a convoluted logic that requires a "callback" function to be passed to the entrypoint as a parameter. Those callback functions will be scheduled to be executed after the `balance_of` entrypoint returns, by listing them in the `operation` slot in the returned tuple.

This pattern is now increasingly being deprecated in favor of `view` methods, as we'll see later on. However, for our contract to be compliant, we still need to implement it, and make it work!

```js
const balance_of = (balance_of: balance_of, store: storage): return_ => {
  const { requests, callback } = balance_of;
  const get_balance_info = (request: request): callback => {
    let balance_ = 0 as nat;
    if (Big_map.mem(request.owner, store.tokens_by_owner)) {
      balance_ = 1 as nat
    };
    return ({ request: request, balance: balance_ })
  };
  const callback_param = List.map(get_balance_info, requests);
  const operation = Tezos.transaction(callback_param, (0 as tez), callback);
  return [list([operation]), store]
};
```

This entrypoint expects a list of "requests" and "callbacks". Each request will specify the owner for which to retrieve the balance, and will pass the result to the callback.

FA2 doesn't specify how a contract mints, burns and tracks tokens, this is left to the implentor's decision. In our case, one owner can have 0 or 1 tokens. So to make the contract more efficient, each owner of a token will simply be recorded in a `tokens_by_owner` `big_map`, with its public address being the key, and the `token_id` they own being the value. If `tokens_by_owner` doesn't have an entry for the public address, that means that it doesn't own a token.

The inner `get_balance_info` function actually retrieves the balance from the contract's storage for a given request, so we map a list of requests (each callback call is executed as a follow up `operation`) to a new list of operations.

The `balance_of` type looks like this. There should be an equal number of requests and callbacks.

```js
// here, token_id is actually not used, but it's part of the standard interface so we must add it.
type request = { owner: address, token_id: nat };

type balance_of =
// @layout:comb
{ requests: list<request>, callback: contract<list<callback>> };
```

And we need to add our first field to the store since we need to track the token owners:

```js
type owner = address;

type storage = {
  tokens_by_owner: big_map<owner, nat>,
};
```

### 3. `update_operators` entrypoint.

The last entrypoint that needs to exist in FA2 is meant to help with adding and removing token operators.
Operators are public addresses that are allowed to execute things like transferring tokens.

In our Soulbound Token contract, we want to give exclusivity to the contract's administrator to mint and burn tokens, and since they're not transferable we're actually not going to introduce the operators logic. We'll add the entrypoint to be compliant with FA2 but not make it operational at all.

```js
const update_operators = (_unit_updates: list<unit_update>, _store: storage)
  : return_ => { return failwith("METHOD_NOT_IMPLEMENTED") };
```

```js
type operator =
// @layout:comb
{ owner: address, operator: address, token_id: nat };

type unit_update = ["Add_operator", operator] | ["Remove_operator", operator];
```

### Token metadata

We've covered the 3 standard entrypoints. As mentioned before, minting and burning tokens is specific to each FA2 implementation; those entrypoints are not standardized in FA2.

The last topic we haven't covered yet that still needs to be standardized is token metadata. Each token can store a unique set of properties and FA2 requires a standard implementation for the ecosystem and other smart contracts to be able to consume them.

This is a pretty big topic on its own and is worth a separate tutorial, so we'll cover it in part 2.

## Summary

In this 1st part, we've seen how one might implement a Soulbound Token on top of the FA2 standard:
1. There are 3 important entrypoints to implement, `transfer`, `balance_of`, `update_operators`.
1. Many tools in the ecosystem use reflection to determine if a token is FA2. We need to implement the interface carefully and sometimes rely on the `layout:comb` pragma to ensure that types are generated in a specific order.
1. Minting and burning tokens isn't specified in FA2, and we might use our preferred internal data structure to track and design tokens. We'll cover this next.
1. Token Metadata is standardized, we'll cover this later.

Thanks for reading this, hope it was helpful to you and stay tuned for part 2!