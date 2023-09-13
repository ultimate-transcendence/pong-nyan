import styles from '@/profile/styles/Profile.module.css';
import Image from 'next/image';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ProfileProps, ProfileData } from '@/type/profileType';
import RecentGame from './RecentGame';

const Profile = ({ nickname }: ProfileProps) => {
  const [user, setUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${nickname}`).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className={styles.profile}>
      <Image src={user?.avatar ?? '/pongNyan.png'} alt={user?.nickname ?? 'Pong nyan'} width={100} height={100} />
      <h2>{user?.nickname ?? 'no data'}</h2>
      <h3>래더 스코어</h3>
      <p>{user?.rankScore ?? 'no data'}</p>
      <RecentGame game={user?.winnerGames ?? []} />
      <br />
      <RecentGame game={user?.loserGames ?? []} />
    </div>
  );
};

export default Profile;