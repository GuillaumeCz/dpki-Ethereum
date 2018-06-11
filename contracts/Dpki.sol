pragma solidity ^0.4.23;

contract Dpki {
	uint256 recordCount = 0;

	mapping(address => string) private addressToKey;
	mapping(string => address) private keyToAddress;

	mapping(uint256 => KeyAddressRecord) private indexKeyAddressRecord;

	struct KeyAddressRecord {
		address ownerAddress;
		string key;
	}

	function registerKey(string _key) public {
		require(bytes(_key).length != 0);
		addressToKey[msg.sender] = _key;
		keyToAddress[_key] = msg.sender;
		indexKeyAddressRecord[recordCount] = KeyAddressRecord(msg.sender, _key);
		recordCount++;
	}

	function getKey(address _ownerAddress) public view returns (string) {
		return addressToKey[_ownerAddress];
	}

	function getMyKey() public view returns (string) {
		return addressToKey[msg.sender];
	}

	function getAddress(string _key) public view returns (address) {
		return keyToAddress[_key];	
	}
}
