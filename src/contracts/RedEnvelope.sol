// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RedEnvelope {
  struct Envelopes{
    uint tokenAmount;
    uint participantsLimit;
    uint participantsCounter;
    string message;
    uint creationTime;
  }
  mapping(bytes => Envelopes) envelope;
  mapping(address => bytes []) receiverToEnvelope;
  mapping(address => bytes []) creatorToEnvelope;
	constructor () 
	{
	}

	/********************************************************
	*                                                       *
	*                     MAIN FUNCTIONS                    *
	*                                                       *
	********************************************************/

	function createEnvelope(uint _tokenAmount, uint _participantsLimit, string memory _message) external payable{
    require(msg.value == _tokenAmount, "Insufficient funds");
    bytes memory _envelopeId =  abi.encode(msg.sender, block.timestamp);
    envelope[_envelopeId].tokenAmount = _tokenAmount;
    envelope[_envelopeId].participantsLimit = _participantsLimit;
    envelope[_envelopeId].message = _message;
    creatorToEnvelope[msg.sender].push(_envelopeId);
	}

  function claim(bytes memory _envelopeId) external {
    Envelopes storage _envelope = envelope[_envelopeId];
    require(_envelope.participantsLimit >  _envelope.participantsCounter, "max participants exceeded");
    require(_envelope.tokenAmount > 0, "tokens already distributed");
    _envelope.participantsCounter++;
    uint _amountToDeliver;
    if(_envelope.participantsLimit != _envelope.participantsCounter) {
      _amountToDeliver = _getAmountToDeliver(_envelope.participantsCounter, _envelope.tokenAmount);
    } else {
      _amountToDeliver = _envelope.tokenAmount;
    }
    _envelope.tokenAmount -= _amountToDeliver;
    (bool sent, ) = payable(msg.sender).call{value: _amountToDeliver}("");
    require(sent, "Failed to send Ether");
  }

	/********************************************************
  *                                                       *
  *                INTERNAL FUNCTIONS                     *
  *                                                       *
  ********************************************************/

  function _getAmountToDeliver(uint _participantsCounter, uint _tokenAmount) internal view returns (uint _amountToDeliver) {
    _amountToDeliver = (uint(keccak256(abi.encodePacked(_participantsCounter,block.timestamp))) % _tokenAmount) + 1;
  }

	/********************************************************
  *                                                       *
  *                     GET FUNCTIONS                     *
  *                                                       *
  ********************************************************/

  function getCreatorEnvelopes(address _creatorAddress) external view returns (Envelopes[] memory) {
    bytes[] memory _creatorToEnvelope = creatorToEnvelope[_creatorAddress];
    Envelopes[] memory _envelopes = new Envelopes[](_creatorToEnvelope.length);
    for(uint i = 0; i < _creatorToEnvelope.length; i++) {
      _envelopes[i] = Envelopes(
        _envelopes[i].tokenAmount,
        _envelopes[i].participantsLimit,
        _envelopes[i].participantsCounter,
        _envelopes[i].message,
        _envelopes[i].creationTime
      );
    }
    return _envelopes;
  }

  function getReceiverEnvelopes(address _ReceiverAddress) external view returns (Envelopes[] memory) {
    bytes[] memory _receiverToEnvelope = receiverToEnvelope[_ReceiverAddress];
    Envelopes[] memory _envelopes = new Envelopes[](_receiverToEnvelope.length);
    for(uint i = 0; i < _receiverToEnvelope.length; i++) {
      _envelopes[i] = Envelopes(
        _envelopes[i].tokenAmount,
        _envelopes[i].participantsLimit,
        _envelopes[i].participantsCounter,
        _envelopes[i].message,
        _envelopes[i].creationTime
      );
    }
    return _envelopes;
  }
}