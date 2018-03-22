pragma solidity ^0.4.18;

contract RootstockWall {

    string public message;

    /** constructor with initial Message */
    function RootstockWall(string initialMessage) public {
        message = initialMessage;
    }

    /** Event fired when new message is deployed */
    event NewBud(string newMessage);
    
    /** sets a new message */
    function setMessage(string _newMessage) public {
        message = _newMessage;
        emit NewBud(_newMessage);
    }
}
