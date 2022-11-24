import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import Main from '../components/Main'
import styles from '../styles/Home.module.css'

import { useSelector } from 'react-redux'

export default function Home() {

  const user = useSelector(state => state.user.value)


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { user.token ? <Main /> : <Login /> }
      
    </div>
  )
}
