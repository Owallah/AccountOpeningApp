import React, { useState, useEffect } from 'react';
import './ViewTransactions.css'; // Import your CSS file for styling

function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Function to fetch transaction data from the backend
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
          // Handle case where token is not available (user not authenticated)
          console.error('Authentication token not found');
          return;
        }

        const response = await fetch('http://127.0.0.1:3000/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data); // Update state with fetched transactions
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error while fetching transactions:', error);
      }
    };

    fetchTransactions(); // Call the function to fetch transactions
  }, []); // Empty dependency array to execute the effect only once on component mount

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTransactions;
