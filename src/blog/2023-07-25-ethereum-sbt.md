---
title: Soulbound Tokens on Ethereum with ERC721
author: Olivier Scherrer
email: olivier.scherrer@meranti.fr
linkedIn: https://www.linkedin.com/in/olivier-scherrer-039b8441/
date: 2023-07-25
published: true
---

Soulbound Tokens (SBTs) are a special type of NFTs that can't be transferred or traded. Their main purpose is to prevent the token from being acquired by other means than the one initially intended by the issuer.

## Soulbound Tokens

The idea of a soulbound token stems from a [post by Vitalik Buterin in early 2022](https://vitalik.ca/general/2022/01/26/soulbound.html) which compares them to a video game item that was acquired by accomplishing a difficult challenge instead of being bought from a marketplace.

At Meranti, we regularly use Soulbound Tokens in the context of digital identities for individuals, when we want to bind a user's wallet with a proof, or claim:

- Proof of Age
- Proof of Email
- Proof of DeFi compliance
- Proof of Humanity

Once such SBT has been assigned to a blockchain account, that account may be allowed to access centralized and decentralized applications simply by signing in with their authorized wallet.

## Soulbound Tokens On Ethereum

For this implementation, we'll assume that the goal of this token is to provide a Proof of Humanity. To design our SBT's features, we'll use those requirements:

1. One contract will store one type of proof
1. Each token will store a URI to an off-chain storage to store additional information such as [Verifiable Credentials](https://www.w3.org/TR/vc-data-model/).
1. A user may burn their own token to prevent against tokens being irregularly assigned
1. The contract owner may mint or burn a token on behalf of a user
1. Token transfers are disabled
1. An on-chain verifier can access the contract and verify if a user does own a token of that type
1. We'll also capture the token's creation date so a verifier can decide if a token has expired
1. Tokens can't be updated, they need to be burned and minted again.

We created our first SBT on Ethereum compatible blockchains (EVM) by starting from a standard ERC721 implementation from [OpenZeppelin](https://www.openzeppelin.com/contracts).

We started with the simplest ERC721 possible and gave it an evocative name.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProofOfHumanity is ERC721 {
    constructor() ERC721("Proof Of Humanity", "POH") {}
}
```

This is the beginning of our Smart Contract, but we need to implement the remaining features.

### Storing the token's URI

Each token should store a URI to a Verifiable Credential stored on a decentralized storage.
For this purpose, we'll use the `ERC721URIStorage` add-on from OpenZeppelin by ticking the "URI Storage" box in our contract generator.

```solidity
// ... adds ERC721URIStorage import
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ... will add ERC721URIStorage
contract ProofOfHumanity is ERC721, ERC721URIStorage {
    constructor() ERC721("Proof Of Humanity", "POH") {}

    // will also add _burn, tokenURI and supportsInterface methods for us, which I've removed from this snippet
}
```

We have now introduced the URI storage, but we need to make sure that we associate the URI to the token when minting it.
We'll add the "Mintable" option to make SBTs mintable after the contract has been deployed, and we'll also choose the "Auto Increment Ids" option which allows us to uniquely identify tokens.

```solidity
contract ProofOfHumanity is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Proof Of Humanity", "POH") {}

    // minting a token will associate an address (user wallet) with a uri (link to off-chain VC)
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
```

Note that the contract also restricts who can mint a token by limiting it to the contract owner. The `Ownable` add-on allows a contract to be transferred to a new owner (or contract admin), which is the only one allowed to mint or burn tokens on behalf of their users.

### Allowing users to burn their own tokens

A user is allowed to burn their own tokens. This ensures users maintain full control over proofs that they have and don't have. This prevents users from being "tagged" with tokens that aren't relevant to them for instance.

We'll introduce a new `burn` method:

```solidity
    function burn(uint256 tokenId) public virtual {
        require(
            // burn only allowed by contract owner or token owner
            _msgSender() == ownerOf(tokenId) || _msgSender() == owner(),
            "SoulboundToken: Only contract or token owner can burn."
        );
        _burn(tokenId);
    }
```

Note that the `burn` method calls the internal `_burn` method which implements the actual burn logic.

### Disabling token transfers between owners

The key feature of an SBT is its non-transferability. Fortunately, `ERC721` provides us with a hook method that is invoked before `mint`, `burn` and `transfer` operations.
Pretty much any operation that affects ownership. This method is called `_beforeTokenTransfer` and is where we should put our control logic to prevent transfers.

A transfer can be described as assigning a token to a new owner, different from the current owner. This is different from a `mint` operation where there is no previous owner, and from a `burn` operation where there is no owner anymore. In other terms, all operations where either `from` or `to` are not the zero address (`0`) should be rejected.

```solidity
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        // We allow mints from contract owner (from == 0x0)
        // and we allow burns from contract owner (to == 0x0)
        require(from == address(0) || to == address(0), "SoulboundToken: Cannot transfer SoulboundToken.");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
```

### On-chain verification of Humanity Proof

The contract admin is now able to burn and mint tokens on behalf of their users. The admin is usually called an Issuer as they are responsible for issuing proofs. Those proofs are owned by the token owner, also called the Holder, who will provide their proof to a Verifier to obtain access to permissioned applications.

The on-chain verification is as simple as calling the `balanceOf` method of the contract, passing the owner's wallet address to be verified:

```solidity
require(soulboundToken.balanceOf(address) > 0, "This user hasn't proved its humanity yet.");
```

This logic assumes that the verifier knows this SBT contract's address and that this address won't change.

### Verifying the expiration date

One last feature we wanted to add was to record the token creation date. This allows a verifier to determine if a token is still valid or has expired.
For instance, your passport may have expired and won't allow you to board a plane to an international destination, but it could be good enough to board a domestic one.
The expiry is then a concern for the Verifier, and not the Issuer.

We first need to store the token creation date during the `mint` operation:

```solidity
    mapping(uint256 => uint256) private _creationTimestamps;

    // we're also storing the creation date in the updated mint method
    function mint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        // storing the block's timestamp
        _setTokenTimestamp(tokenId, block.timestamp);
    }

    function _setTokenTimestamp(uint256 tokenId, uint256 timestamp) private {
        _creationTimestamps[tokenId] = timestamp;
    }
```

We're also adding a method to get a token's expiration date on-chain:

```solidity
    function tokenTimestamp(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "ERC721: invalid token ID");
        return _creationTimestamps[tokenId];
    }
```

So that the verifier may call it:

```solidity
uint256 creation_date = soulboundToken.tokenTimestamp(token_id);

require(block.timestamp < (creation_date + 3600 * 24 * 60), "Proof Of Humanity has expired");
```

## To go further

We've seen an implementation for Soulbound Tokens on an EVM compatible blockchain using Solidity that covers most use cases we've seen so far.
The ERC721 standard is great in that it allows for a simple implementation of a new SBT and offers plenty of room for extension, such as adding an expiration date feature.

At Meranti, we're offering the creation of SBTs for digital identities via our Open Source [SSI SBT](https://github.com/meranti-web3/ssi-sbt) project.

We also offer a managed version of this service for Issuers whishing to quickly use this service and issue SBTs on the EVM blockchain of their choice, without worrying about running it themselves.

Hope you've enjoyed this!

## Links

* [Meranti's SBT solution for Self Sovereign Identities](https://github.com/meranti-web3/ssi-sbt)
* [OpenZeppelin Base Smart Contracts](https://www.openzeppelin.com/contracts)
* [Soulbound Tokens by Vitalik Buterin](https://vitalik.ca/general/2022/01/26/soulbound.html)