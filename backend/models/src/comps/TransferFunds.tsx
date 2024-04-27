import React, { useState } from 'react';

interface TransferFundsProps {
    onSubmit: (data: { amount: string; recipient: string }) => void;
}

const TransferFunds: React.FC<TransferFundsProps> = ({ onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ amount, recipient });
        setAmount('');
        setRecipient('');
    }

    return (
        <div>
            <h2>Transfer Funds</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label>
                    Recipient:
                    <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                </label>
                <button type="submit">Transfer</button>
            </form>
        </div>
    );
}

export default TransferFunds;