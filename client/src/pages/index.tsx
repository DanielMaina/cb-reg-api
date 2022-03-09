import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/Typescript'

import Landing from './home/Landing'
import Account from './home/Account'


const Home = () => {
  const { auth } = useSelector((state: RootStore) => state)

  return (
    <>
      {auth.access_token ? <Account /> : <Landing />}
    </>
  )
}

export default Home