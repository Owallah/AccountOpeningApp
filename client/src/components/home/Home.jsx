import React from 'react'
import './Home.css'
import Transaction from './transaction/Transaction'
import ViewTransactions from './accountdets/ViewTransactions'

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to Your Application</h2>
      <p>This is the homepage of your application.</p>
      <Transaction />
      <ViewTransactions />
    </div>
  )
}

export default Home
