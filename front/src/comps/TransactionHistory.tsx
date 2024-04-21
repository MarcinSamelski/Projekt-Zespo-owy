import React from 'react';

interface Transaction {
    description: string;
    amount: number;
}

interface TransactionHistoryProps {
    transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>{transaction.description} - ${transaction.amount}</li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionHistory;