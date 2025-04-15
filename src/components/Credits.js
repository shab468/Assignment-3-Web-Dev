/*==================================================
src/components/Credits.js
==================================================*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || isNaN(amount)) return;

    const newCredit = {
      description: description,
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      date: new Date().toISOString().split('T')[0] // yyyy-mm-dd
    };

    props.addCredit(newCredit); // call the function passed from App.js
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h1>Credits</h1>
      <Link to="/">Return to Home</Link>
      <br /><br />
      <AccountBalance accountBalance={props.accountBalance} />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Add Credit</button>
      </form>

      <br />
      <h3>All Credits:</h3>
      <ul>
        {props.credits.map((credit, index) => (
          <li key={index}>
            <strong>{credit.description}</strong> - ${credit.amount.toFixed(2)} on {credit.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Credits;