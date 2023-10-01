---
title: Soulbound Tokens on Tezos with FA2, part 2.
author: Olivier Scherrer
email: olivier.scherrer@meranti.fr
linkedIn: https://www.linkedin.com/in/olivier-scherrer-039b8441/
date: 2023-09-23
published: true
---

In this 2nd part on how to create an FA2 compatible SBT on Tezos, we're going to bring our custom implementation 100% on par with the ERC721 one.
To accomplish this, we'll add token and contract metadata, as well as the minting and burning behaviors.

If you haven't already, please make sure to read the [1st part](/blog/2023-09-22-tezos-sbt-part1/) of this series on how to create a Soulbound Token on the Tezos blockchain using FA2.

## Metadata

Metadata in the FA2 world exist at 2 levels:

1. The token level, where each token may hold its own metadata with [TZIP-12](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#token-metadata).
1. At the smart contract level with [TZIP-16](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#contract-metadata-tzip-016).

For each level, data may be stored in various places:

1. On-chain, in the smart contract directly
1. On-chain, in another smart contract
1. Off-chain, in a centralized storage, accessible via a URL (https)
1. Off-chain, in a decentralized storage, such as IPFS.

While having metadata at the token level is a must, metadata at the smart contract level is optional.
Depending on your needs, you may want to store data on or off chain, there are pros and cons to each solution and they depend on your own requirements.

In our case, since we're designing an FA2 smart contract for Soulbound Tokens, we have the following requirements:

1. All Tokens are the same. If our smart contract holds proofs of humanity, all tokens must be proofs of humanity.
1. Tokens are immutable, a proof of humanity may not become a proof of DeFi compliance.
1. A token may be assigned a nice illustration in the form of a picture. Pictures are too big to be stored on-chain, we'll store them in ipfs.

As a result, we'll go with the following implementation:

1. On-chain token metadata, configured once at deploy time and not configurable during minting.
1. On-chain smart contract metadata, configured once at deploy time and immutable.
1. Off-chain illustration, so the token can be visualized in an appealing fashion in a compatible wallet.

Now that we have our requirements, let's build it.

## Minting

We want to mint a new token, all tokens are identical and should share the same basic set of metadata. We'll see how to mint a new one and store its metadata on-chain while keeping it immutable. As usual, we also want to stay compatible with FA2.

Minting itself isn't standardized and depends on our needs. We'll want to have 0 or 1 token for each public address (token owner). A token is represented by a basic set of metadata shared by all tokens, as well as an additional ipfs url storing data such as an image.

An example `ipfs` file is located [here](https://ipfs.io/ipfs/QmNtYrQYsTF5x9nQ3R34A7ES9kfbjtPVt3qcZ1E2425MxD). It has the following content:

```json
{
  "name": "DeFi compliance proof",
  "symbol": "DEFI",
  "description": "This NFT is a proof of your KYC-AML compliance. It is not transferable. You can use it when you need to prove your comliance with DeFi services that have adopted decentralized identity to protect user data.",
  "image": "ipfs://QmUDYRnEsCv4vRmSY57PC6wZyc6xqGfZecdSaZmo2wnzDF",
  "identifier": ""
}
```

We can see that it holds an image url. This image that will be displayed when viewing the token in compatible wallets and applications.

### On-chain metadata structure

Back to minting, FA2 specifies that we need to store on-chain metadata in a `(map string bytes)`, basically a map of strings (the keys) to bytes (the values). The metadata needs to have a `decimals` key, recommends having a `name` and `symbol` ones, as well as an empty key `""` storing a URI to off-chain metadata.

Since we want to set those values at deploy time (except for the ipfs url), we'll actually store this basic set of metadata in a the smart contract's storage, which will now look like this:

```js
type ipfs_url = bytes;

type storage = {
  // this one was added in part 1.
  tokens_by_owner: big_map<owner, nat>,
  name: bytes,
  symbol: bytes
};
```

During minting, we'll simply hardcode `decimals` to `0` since Soulbound tokens can't be fractionalized.
Creating the token metadata during minting should now look like this:

```js
let token_metadata = Map.literal(
  list([
    ["name", store.name],
    ["decimals", bytes`0`],
    ["symbol", store.symbol],
    ["", ipfs_url]
  ])
);
```

### Token metadata access

We have our metadata structure for our token, but we need to store it in a well known place for future access by ecosystem tools (wallets, explorers etc.). We'll use the recommended basic approach and store those tokens in a `token_metadata` `big_map`:

```js
// the specs want us to keep a map of token_id and token_info (our token metadata!) together...
type token_metadata_values = { token_id: nat, token_info: map<string, bytes> };

type storage = {
  // and store the previous in a big map indexed by the token id.
  // add this to the other types
  token_metadata: big_map<nat, token_metadata_values>
};
```

We're now able to store a token's metadata in a well known structure, we just need to manage `token_id` ourselves as we mint and burn tokens.

### Assigning a token id

Token ids are a requirement in an FA2 compliant contract, but they won't bring much value to our own implementation. To keep them simple, we'll simply assign them a monotonically increasing identifier, which last value would be tracked in a counter stored in the smart contract's storage. Its first value will be `0`.

```js
type storage = {
  // add this to the other types
  token_counter: nat
};
```

And when minting a token, we'll use the counter's last value to assign a `token_id`.

### Putting it all together

Putting our minting logic together, it will look like this, minus a few tweaks that we'll add later:

```js
const mint = (owner: owner, ipfs_url: ipfs_url, store: storage): return_ => {
  // Careful with this implementation, we left out the permissioning system for simplicity sake
  // which means that anybody can call mint and assign themselves a token. We'll cover permissioning later
  let new_tokens_by_owner =
    Big_map.add(owner, store.token_counter, store.tokens_by_owner);
  let new_token_counter = store.token_counter + (1 as nat);

  let token_metadata = Map.literal(list([
    ["name", store.name],
    // hard coding decimals to
    ["decimals", bytes `0`],
    ["symbol", store.symbol],
    ["", ipfs_url]
  ]));

  let new_token_metadata = Big_map.add(store.token_counter, {
    token_id: store.token_counter,
    token_info: token_metadata
  }, store.token_metadata);

  return [
    list([]),
    {
      ...store,
      token_metadata: new_token_metadata,
      token_counter: new_token_counter,
      tokens_by_owner: new_tokens_by_owner
    }
  ]
};
```

In this simple minting method, we're simply assigning a new token to our storage:

1. its token id is the counter's current value, we're increasing it after each mint
1. its token metadata is stored in `token_metadata` as per the FA2 specs.
1. we're also tracking token ownership in `tokens_by_owner` which is our own bookkeeping logic.

Also, remember that there are some important values to set at deploy time. Using [Taquito](https://github.com/ecadlabs/taquito), upon `originating` the smart contract, we would set its internal data as follows:

```js
 await tezos.contract.originate({
  code, // this is the michelson json contract
  {
    token_counter: 0,
    tokens_by_owner: MichelsonMap.fromLiteral({}), // will be populated during minting
    token_metadata: MichelsonMap.fromLiteral({}), // will be populated during minting
    name: char2Bytes("Proof of DeFi Compliance"), // will be read and reused for each token's metadata
    symbol: char2Bytes("DEFI") // will be read and reused for each token's metadata
  }
});
```

Finally, if you're using Taquito to read a token's metadata off-chain, you can verify that our token metadata has the expected shape and content using the `tzip12` plugin:

```js
const { TezosToolkit, MichelsonMap } = require("@taquito/taquito");
const { Tzip12Module } = require("@taquito/tzip12");

// Assuming we're minting the first token, its id will be 0
const mintOp = await soulboundTokenInstance.methods
  .mint(
    "tz1iGCuoqC9LRTXJq5Gjni5KhY77bPG8M5XH",
    char2Bytes("ipfs://QmNtYrQYsTF5x9nQ3R34A7ES9kfbjtPVt3qcZ1E2425MxD")
  )
  .send();

await mintOp.confirmation();

// to make sure the `.tzip12()` method is available, remember to install the Tzip12Module to your tezos client:
tezos.addExtension(new Tzip12Module());

// Here we retrieve the token metadata for token_id 0
expect(await soulboundTokenInstance.tzip12().getTokenMetadata(0)).toEqual({
  token_id: 0,
  decimals: 0,
  name: "DeFi compliance proof",
  symbol: "DEFI",
  description:
    "This NFT is a proof of your KYC-AML compliance. It is not transferable. You can use it when you need to prove your comliance with DeFi services that have adopted decentralized identity to protect user data.",
  image: "ipfs://QmUDYRnEsCv4vRmSY57PC6wZyc6xqGfZecdSaZmo2wnzDF",
  identifier: ""
});
```

As we can see, using the `tzip12` plugin, retrieving the token metadata will compose an object containing information coming from various sources:

1. `token_id` comes from the field in `token_metadata[0]`
1. `decimals` is hard coded when minting
1. `name` and `symbol` are read from the storage, and the values are set at deploy time
1. `description`, `image` and `identifier` are retrieved from the documents stored at `ipfs_url` passed during minting. The `Tzip12` module actually detects an ipfs url in the `""` empty field of the token_metadata, fetches the document stored there and merges it with the on-chain data. Pretty neat!

In this chapter, we've covered quite a lot, we've seen how to compose token metadata from on-chain and off-chain data following the FA2 standard.
We still need to cover smart contract level metadata and add some very important final touches.

## Smart contract level metadata

While this is optional, it's a nice addition to have smart contract level metadata.
Since this data is immutable and lightweight, we can keep it on-chain.

The FA2 standard requires a [TZIP-016](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#contract-metadata-tzip-016) compliant metadata at the contract level.

This is the metadata we'd like to keep. It adds some valuable info such as where the source code lives, the code's version, the author etc.
We can also store some additional info such as pointers to view methods!

```js
{
  name: "DEFI",
  description:
    "This NFT is a proof of your KYC-AML compliance. It is not transferable. You can use it when you need to prove your comliance with DeFi services that have adopted decentralized identity to protect user data.",
  version: "1.0",
  license: "MIT",
  authors: ["Olivier Scherrer", "Meranti", "contact@meranti.fr"],
  homepage: "https://meranti.fr",
  source:
    "https://github.com/meranti-web3/ssi-sbt/blob/main/sbt-contract-tz/contracts/SoulboundToken.jsligo",
  interfaces: ["TZIP-012"],
  views: []
}
```

This data should simply be stored in a `metadata` field in our contract's storage. It's also a `map` of `string` and `bytes`.
The JSON specified above is still arbitrary and its shape isn't specified by a type. We'll actually store this as a "text blob" in our `metadata` storage.

```js
type storage = {
  // add this to our storage
  metadata: map<string, bytes>,
};
```

Remember, as per the specs, we want to tell consumers of our smart contract metadata where it actually lives. Given that we're storing it on-chain, our empty `""` field pointing to the actual metadata should indicate the name of the key in the data structure where the "text blob" is stored.
We do this by setting the `""` empty field to `"tezos-storage:data"` where `data` is the name of the field.

The smart contract metadata is set at deploy time, so we'll add this field to the origination data that we already specified above:

```js
 await tezos.contract.originate({
  code, // this is the michelson json contract
  {
    token_counter: 0,
    tokens_by_owner: MichelsonMap.fromLiteral({}), // will be populated during minting
    token_metadata: MichelsonMap.fromLiteral({}), // will be populated during minting
    name: char2Bytes("Proof of DeFi Compliance"), // will be read and reused for each token's metadata
    symbol: char2Bytes("DEFI") // will be read and reused for each token's metadata,

    // this is new
    metadata: MichelsonMap.fromLiteral({
      // empty field points to the "data" property
      "": char2Bytes("tezos-storage:data"),
      // the "data" property store a text blob a bytes
      data: char2Bytes(
        // the text blog is the json stringified metadata
        JSON.stringify({
          name: "DEFI",
          description:
            "This NFT is a proof of your KYC-AML compliance. It is not transferable. You can use it when you need to prove your comliance with DeFi services that have adopted decentralized identity to protect user data.",
          version: "1.0",
          license: "MIT",
          authors: ["Olivier Scherrer", "Meranti", "contact@meranti.fr"],
          homepage: "https://meranti.fr",
          source:
            "https://github.com/meranti-web3/ssi-sbt/blob/main/sbt-contract-tz/contracts/SoulboundToken.jsligo",
          interfaces: ["TZIP-012"],
          views: []
        })
      )
    }),
  }
});
```

To read a smart contract's metadata using Taquito we need to add the `Tzip16Module` to our client:

```js
tezos.addExtension(new Tzip16Module());
```

Which gives us access to a neat `tzip16()` method:

```js
const { metadata } = await soulboundTokenInstance.tzip16().getMetadata();

expect(metadata).toEqual({
  name: "DEFI",
  description:
    "This NFT is a proof of your KYC-AML compliance. It is not transferable. You can use it when you need to prove your comliance with DeFi services that have adopted decentralized identity to protect user data.",
  version: "1.0",
  license: "MIT",
  authors: ["Olivier Scherrer", "Meranti", "contact@meranti.fr"],
  homepage: "https://meranti.fr",
  source:
    "https://github.com/meranti-web3/ssi-sbt/blob/main/sbt-contract-tz/contracts/SoulboundToken.jsligo",
  interfaces: ["TZIP-012"],
  views: []
});
```

## Burning

Burning is actually symmetrical to minting, we just need to clean up after ourselves.
Burning is an operation conducted by the owner of the smart contract, and our implementation should also allow the owner of the contract to burn the token. This is a security mechanism preventing unwanted tokens from being assigned to our wallet. Remember that with decentralized identities, we want to give control to the end users!

One note on `token_id`, burning a token doesn't mean that its `id` becomes available again or frees up a slot. We'll keep increasing the `token_id` for the next token. This makes it for a simple logic and prevents a token from being "replaced".

If you've followed so far, the logic is pretty self explanatory:

```js
const burn = (owner: owner, store: storage): return_ => {
  if (Tezos.get_sender() != owner) {
    return failwith("FA2_NOT_OPERATOR")
  };
  let token_id: nat =
    Option.unopt_with_error(
      Big_map.find_opt(owner, store.tokens_by_owner),
      "Owner doesn't have this token"
    );
  let new_tokens_by_owner = Big_map.remove(owner, store.tokens_by_owner);
  let new_token_metadata = Big_map.remove(token_id, store.token_metadata);

  return [
    list([]),
    { ...store,
      tokens_by_owner: new_tokens_by_owner,
      token_metadata: new_token_metadata
    }
  ]
};
```

## Summary

We now know how to add token level metadata, contract level metadata and how to retrieve them using Taquito.
Our smart contract mints and burns soulbound tokens and stores them in a way which is 100% compliant with FA2.
This makes this contract interoperable and allows the ecosystem tools such as wallets, explorers and other contracts to be able to consume our tokens in a standard way.

In our 3rd and last part, we'll see how to add `view` methods to consume this contract, how to allow explorers such as [TzKT](https://tzkt.io/) to index each owner's token balance, and we'll add some missing features such as permissioning and tracking of a token's creation date.

If you'd like to see our full implementation of our smart contract, [head over this way](https://github.com/meranti-web3/ssi-sbt/blob/main/sbt-contract-tz/contracts/SoulboundToken.jsligo). You may also take a look at our [tests](https://github.com/meranti-web3/ssi-sbt/tree/main/sbt-contract-tz/tests) to see examples of how to consume this smart contract from your Web3 application.

Hope you enjoyed it, and see you soon for the 3rd part!
