import React, { useState } from 'react';
import GameplayPopUp from '../GameplayPopUp/GameplayPopUp';
import defaultChessImage from '../../assets/chess-with-frienemies-1.svg';
import './MyGameCard.css';

function MyGameCard({ gameId, gameImage, attributes, onImageClick, userData }) {
  const [selectedGame, setSelectedGame] = useState(null)

  const gameSlected = (gameId) => {
    setSelectedGame(gameId)
  }

  const closePopUp = () => {
    setSelectedGame(null)
  }
  const {
    black_player_id,
    white_player_id,
    black_player_user_name,
    white_player_user_name,
    turn_color
  } = attributes;
  const id = userData?.id;
  console.log('user id', id);
  console.log('white player id', white_player_id);
  attributes.playerColor = Number(id) == Number(white_player_id) ? 'white' : 'black';
  attributes.playerName = userData.username
  attributes.opponentColor = Number(id) === Number(white_player_id) ? 'black' : 'white';
  attributes.opponentName = attributes[`${attributes.opponentColor}_player_user_name`];
  attributes.nextToMove = attributes.playerColor === turn_color ? attributes.playerName : attributes.opponentName;
  // console.log('userdata', attributes);
  

  return (
    <div id={gameId} className='my-games-card-wrapper'>
      <img src={gameImage || defaultChessImage} 
        onClick={gameSlected}
        alt={gameId}
        onError={event => {
          event.target.src = avatarPlaceholder
          event.onerror = null
        }}
      />{selectedGame && (
          <GameplayPopUp
          attributes={attributes}
          gameId={selectedGame}
          onClose={closePopUp}
        />
      )}
      <h3>{gameId}: Game with {attributes.opponentName}</h3> 
    </div>
  )
}

export default MyGameCard;