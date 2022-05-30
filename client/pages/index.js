import React from 'react'
import { Footer, Navbar, Services, Transactions, Welcome } from '../components'
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Web3 App</title>
      </Head>
      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
      </div>
    </>
  )
}

export default Home
