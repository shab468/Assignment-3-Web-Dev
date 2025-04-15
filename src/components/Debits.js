/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

import { useState } from 'react';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Render the list of Debit items
  const debitsView = () => {
    const { debits } = props;
    return debits.map((debit, index) => {
      const date = debit.date.slice(0, 10);
      return (
        <li key={debit.date + debit.description + debit.amount}>
          <strong>{debit.description}</strong> - ${debit.amount.toFixed(2)} on {date}
        </li>
      );
    });
  };

  // Handle form submission to add a new debit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDebit = {
      description: description,
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      date: new Date().toISOString()
    };

    props.addDebit(newDebit); // call parent's method
    setDescription('');
    setAmount('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Debits</h1>
  
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
        {/* Left: Debit Form */}
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
          <div>
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Amount: </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%' }}>Add Debit</button>
        </form>
  
        {/* Right: Debit List */}
        <div>
          <h3>All Debits:</h3>
          <ul>{debitsView()}</ul>
        </div>
      </div>
  
      <br />
      <AccountBalance accountBalance={props.accountBalance} />
    </div>
  );
};

export default Debits;