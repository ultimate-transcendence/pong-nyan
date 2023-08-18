import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUp = () => {
  // create a form with nickname, image, email
  // with react, and use onChange to set the state
  // and onSubmit to send the data to the backend
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      nickname,
      avatar,
      email,
    }).then((res) => {
      if (res.data === 'signup success') {
        router.push('/auth/signin');
      } else if (res.data === 'signup failed') {
        alert('Sign Up failed. Please try again.');
      }
    }).catch((error) => {
      console.error('Sign Up error:', error);
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
  