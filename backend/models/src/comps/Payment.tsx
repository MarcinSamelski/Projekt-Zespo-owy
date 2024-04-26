import React, { useState } from 'react';

interface PaymentProp {
    onPayment: (data: { amount: string}) => void;
}


const Payment: React.FC<PaymentProp> = ({ onPayment }) => {
    const [amount, setAmount] = useState('');

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        // ewentualne dodanie limtów 
        // zabezpieczenia --> jeśli nie kwota
        e.preventDefault();
        onPayment({ amount });
    };

    return (
        <div>
            <h3>Payment:</h3>
            <form onSubmit={handlePayment}>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <button type="submit">Make payment?</button>
            </form>
        </div>
    );
}

export default Payment;
