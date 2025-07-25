import React from 'react';

const MoneyDisplay = ({ money }) => {
  return (
    <div className="money-display">
      <span className="money-icon">💰</span>
      <span className="money-amount">${money.toLocaleString()}</span>
    </div>
  );
};

export default MoneyDisplay; 