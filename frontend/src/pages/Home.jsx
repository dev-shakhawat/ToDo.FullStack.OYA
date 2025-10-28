import React from 'react'
import { useSelector } from 'react-redux';
import Auth from '../components/auth/Auth';

export default function Home() {

    const { user } = useSelector((state) => state.auth);

  return (
    user ? 
    <div>Home</div>
    :
    <Auth/>
  )
}
