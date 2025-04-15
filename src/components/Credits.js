/*==================================================
src/components/Credits.js
==================================================*/
import React, { useState } from 'react';
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
    <div style={{ padding: '20px' }}>
    <h1>Credits</h1>
    <br /><br />
    <AccountBalance accountBalance={props.accountBalance} />
    <br />

    {/* Flex container to center form and list */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '60px',
        marginTop: '20px'
      }}
    >
      {/* Left: Credit Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>Add Credit</button>
      </form>

      {/* Right: Credit List */}
      <div>
        <h3>All Credits:</h3>
        <ul>
          {props.credits.map((credit, index) => (
            <li key={index}>
              <strong>{credit.description}</strong> - ${credit.amount.toFixed(2)} on {credit.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Credits;