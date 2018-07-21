pragma solidity ^0.4.23;

contract AbsDpki {
	function getKey(address _ownerAddress) public view returns (string);
}
contract StoragePk {
	mapping(address => mapping(string => string)) private addressToNamesToKey;
	mapping(address => uint256) private addressToRecordCount;
	address private dpkiContractAddress;

	function queryAndAddRecord(string _name, address _userAddress) public view {
		AbsDpki dpkiContract = AbsDpki(dpkiContractAddress);
		string memory key = dpkiContract.getKey(_userAddress);
		addressToNamesToKey[msg.sender][_name] = key; 
	}

	function StoragePk(address _dpkiContractAddress) public {
		dpkiContractAddress = _dpkiContractAddress;
	}

	function addRecord(string _name, string _key) public /*returns (bool)*/ {
		addressToNamesToKey[msg.sender][_name] = _key;
	}

	function getRecordKey(string _name) public view returns (string) {
		return addressToNamesToKey[msg.sender][_name];
	}
}

