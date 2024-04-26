import React from 'react';

interface AccountBalanceProps {
    balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
    return (
        <div>
            <h2>Account Balance</h2>
            <p>Balance: ${balance}</p>
        </div>
    );
}

export default AccountBalance;