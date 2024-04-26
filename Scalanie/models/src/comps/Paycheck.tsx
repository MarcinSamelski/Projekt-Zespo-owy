import React, { useState } from 'react';

interface PaycheckProp {
    onPaycheck: (data: { amount: string}) => void;
}


const Paycheck: React.FC<PaycheckProp> = ({ onPaycheck }) => {
    const [amount, setAmount] = useState('');

    const handlePaycheck = (e: React.FormEvent<HTMLFormElement>) => {
        // ewentualne dodanie limtów 
        // zabezpieczenia --> jeśli nie kwota
        e.preventDefault();
        onPaycheck({ amount });
    };

    return (
        <div>
            <h3>Paycheck:</h3>
            <form onSubmit={handlePaycheck}>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <button type="submit">Make paycheck?</button>
            </form>
        </div>
    );
}

export default Paycheck;
