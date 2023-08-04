/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SocketContext } from '../../../context/socket';

export default function Start({ setGameStatus }: { setGameStatus: Dispatch<SetStateAction<number>> }) {
  const socket = useContext(SocketContext);
  const [ loading, setLoading ] = useState(false);

  socket.on('start', () => {
    setGameStatus(1);
  })
  socket.on('loading', () => {
    setLoading(true);
  });
  return (
    loading ?
    'Loading' :
    <div className="button-wrapper" onClick={() => {
      socket.emit('startGame', { message: 'start' });
      // room 잡혀야만 게임시작
      console.log(socket);
      // if (socket.rooms) {
      //   setGameStatus(1);
      // }
      }} tabIndex={0}>
      <button className="start">Start</button>
    </div> 
  );
}