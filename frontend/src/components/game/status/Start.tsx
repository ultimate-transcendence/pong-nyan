/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SocketContext } from '../../../context/socket';
import styles from '../../../styles/Start.module.css';
import { PlayerNumber } from '../../../type';

export default function Start({ setGameStatus, setPlayerNumber, setOpponentId }
  : { setGameStatus: Dispatch<SetStateAction<number>>, setPlayerNumber: Dispatch<SetStateAction<PlayerNumber>>, setOpponentId: Dispatch<SetStateAction<string>>}) {
  const socket = useContext(SocketContext);
  const [ loading, setLoading ] = useState(false);

  socket.on('game-randomStart', ({player1Id, player2Id}: {player1Id: string, player2Id: string}) => {
    if (socket.id === player1Id) { 
      setPlayerNumber('player1');
      setOpponentId(player2Id);
    }
    else if (socket.id == player2Id){
      setPlayerNumber('player2');
      setOpponentId(player1Id);
    }
    setGameStatus(1);
  });
  socket.on('game-loading', () => {
    setLoading(true);
  });

  return (
    loading ?
      'Loading' :
      <div className={styles.buttonWrapper} onClick={() => {
        socket.emit('game-randomStart', { message: 'start' });
      }} tabIndex={0}>
        <button className={styles.startButton}>Start</button>
      </div> 
  );
}
