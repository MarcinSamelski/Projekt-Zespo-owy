import React from 'react';

interface AccountNumberProps {
    account: bigint;
}

const AccountNumber: React.FC<AccountNumberProps> = ({ account }) => {
    return (
        <div>
            <h2></h2>
            <p>Account Number: {account.toString()}</p>
        </div>
    );
}

export default AccountNumber;