import React, { useState } from 'react';
import './Transaction.css'; 

function Transaction() {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Authentication token not found');
            return;
          }
           fetch('http://127.0.0.1:3000/transactions', {
            method: 'POST',
            headers: {
                "content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({amount, transactionType}),
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    alert(`${data}: Transaction Success`)
                });
            } else{
                alert('Error:', res.status)
            }
        }).catch((error) => {
            console.log({amount, transactionType});
            alert("Error:", error);
           
          });
    } catch (error) {
        console.error('Error during transaction:', error);
    }
   
    console.log('Transaction submitted:', { amount, transactionType });
    // Reset form fields after submission
    setAmount('');
    setTransactionType('');
  };

  return (
    <div className="transaction-container">
      <h2>Make a Transaction</h2>
      <form onSubmit={handleTransactionSubmit}>
        <label htmlFor="amountInput">Amount</label>
        <input
          type="number"
          id="amountInput"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
        <label htmlFor="transactionTypeInput">Transaction Type</label>
        <select
          id="transactionTypeInput"
          value={transactionType}
          onChange={handleTransactionTypeChange}
        >
          <option value="">Select transaction type</option>
          <option value="credit">credit</option>
          <option value="debit">debit</option>
        </select>
        <button type="submit" className="submit-button">
          Submit Transaction
        </button>
      </form>
    </div>
  );
}

export default Transaction;
