import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import { getFriendsIndex, deleteFriend, postStartGame } from "../../../apiCalls";
import UserCard from "../UserCard/UserCard";
// import RemoveFriendPopUp from "../RemoveFriendPopUp/RemoveFriendPopUp";
// import StartGamePopUp from "../StartGamePopUp/StartGamePopUp";
import "./Friends.css";

function Friends({ isFriends, userData }) {
  const [searchFriend, setSearchFriend] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [startNewGame, setStartNewGame] = useState([]);
  const { logedInUsername } = useParams();
  // const { userId } = useParams();
  const navigate = useNavigate();
  // const [alert, setAlert] = useState([])

  const userId = userData.id;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriendsIndex(userId);
        setFriendsList(friendsData.data);
      } catch (err) {
      }
    };
    fetchFriends();
  }, [userId, setFriendsList]);

  const handleRemoveFriend = async (friendId) => {
    // const friendId = friend;
    try {
      const resData = await deleteFriend(userId, friendId);

      setFriendsList(friendsList.filter((aFriend) => aFriend.user_id !== friendId));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

function findFriend(id){
  const friendsCopy = [...friendsList]
  return friendsCopy.find((friend) => id === friend.id)
}

  const handleStartNewGame = async (friendId) => {
    try {
      const resData = await postStartGame(userId, friendId)
      console.log('resData response',resData)
      setStartNewGame(resData.data)
      navigate(`../../${resData.data.game_id}`)
    } catch (err) {
      console.error("Error starting a game", err)
    }
  }
  

  const filterFriend = friendsList.filter((friend) =>
    friend.attributes.username
      .toLowerCase()
      .includes(searchFriend.toLowerCase())
  );

 

  const friendList = filterFriend.map((friend) => (
    <UserCard
      key={friend.id}
      id={friend.id}
      user={friend}
    //   removeFriend={handleRemoveFriend}
      isFriend={true}
      username={friend.attributes.username}
      avatar={friend.attributes.avatar}
      handleStartNewGame={handleStartNewGame}
      handleRemoveFriend={handleRemoveFriend}
    />
  ));

  /*

  {
    "data": {
        "type": "game_creation",
        "game_id": 17,
        "attributes": {
            "game": {
                "game": "Chess",
                "avatar": "https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/images/chess_dab.jpg",
                "status": "active"
            },
            "user": {
                "id": 1,
                "username": "bob",
                "avatar": "https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/images/baby.jpg"
            },
            "friend": {
                "friend_id": 2,
                "username": "rob",
                "avatar": "https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/images/queen.jpg"
            }
        }
    }
}



  */

  return (
    <section className="friends-section">
      <h2 className="friends-h2">{logedInUsername} Frien-EMIES</h2>
      <p className="friends-instructions">Click the - to remove a friend</p>
      <p className='challege-to-game-instructions'>Select a frien-emie to challenge them to a game.</p>
      <div className="search-friends-wrapper">
        <FontAwesomeIcon icon={faSearch} className="friends-search-icon" />
        <input
          className="search-friends-input"
          type="search"
          placeholder="search frien-EMIES"
          name="search-frien-emies"
          spellCheck="true"
          autoCorrect="on"
          value={searchFriend}
          onChange={(e) => setSearchFriend(e.target.value)}
        />
      </div>
      <div>
        {filterFriend.length === 0 ? (
          <p>You need more frien-emimes</p>
        ) : (
          <div className="friends-list-container">{friendList}</div>
        )}
      </div>
    </section>
  );
}

export default Friends;
