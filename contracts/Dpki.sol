pragma solidity ^0.4.23;

contract Dpki {
	uint256 recordCount = 0;

	mapping(string => string) private nameToKeyAddress;
	mapping(string => string) private keyAddressToName;

	mapping(uint256 => KeyAddressNameRecord) private indexKeyAddressNameRecord;

	struct KeyAddressNameRecord {
		string keyAddress;
		string name;
	}

	function registerKeyAddress(string _name, string _keyAddress) public {
		require(bytes(_keyAddress).length != 0);
		nameToKeyAddress[_name] = _keyAddress;
		keyAddressToName[_keyAddress] = _name;
		indexKeyAddressNameRecord[recordCount] = KeyAddressNameRecord(_keyAddress, _name);
		recordCount++;
	}

  function getKeyAddressFromName(string _name) public view returns (string) {
    return nameToKeyAddress[_name];
  }
}
