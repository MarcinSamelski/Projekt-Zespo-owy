import React, { useState } from 'react';
import AccountBalance from './comps/AccountBalance';
import TransactionHistory from './comps/TransactionHistory';
import TransferFunds from './comps/TransferFunds';
import Login from './comps/Login';
import AccountNumber from './comps/AccountNumber';
import Logo from './comps/Logo';
import Payment from './comps/Payment';
import Paycheck from './comps/Paycheck';



const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setBalance(data.balance);
                setAccountNumber(data.accountNumber);
            } else {
                console.error('Failed to fetch account info');
            }
        } catch (error) {
            console.error('Error fetching account info:', error);
        }
    };

    if (isLoggedIn) {
        fetchAccountInfo();
    }
}, [isLoggedIn]);


   const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username,
              password,
          })
      });

      if (response.ok) {
          setIsLoggedIn(true);
          setUser(username);
      } else {
          alert('Invalid username or password. Try again!');
      }
  } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again later.');
  }
};

 const handleRegister = async (username: string, password: string, firstName: string, lastName: string, pesel: string ) => {
    try {
      const response = await fetch('http://localhost:3000', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            pesel,
            username,
            password,
          }),
      });

      if (response.ok) {
          setIsLoggedIn(true);
          setUser(username);
      } else {
          alert('Registration failed. Please try again!');
      }
  } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred while registering. Please try again later.');
  }
};

  const handleLogout = () => {
      setIsLoggedIn(false);
      setUser(null);
  };
  const handlePayment = () => {
    alert("Payment successful!");
};

const handlePaycheck = () => {
   alert("Paycheck successful!");
};
  return (
    <div className="container-2">
      <div className="container">
            <Logo />
            <h1>Your Banking App!</h1>
            </div>
            {isLoggedIn ? (
                <div className="account-content">
                  <div className="column">
                    <h2>Welcome, {user}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <div className="account-balance">
                      <AccountNumber account={BigInt(accountNumber || '0')} />
                      <AccountBalance balance={balance ?? 0} />
                      <Payment onPayment={handlePayment} /> 
                      <Paycheck onPaycheck={handlePaycheck} /> 
                      </div>
                  </div>

                  <div className="column">
                    <div className="account-balance">
                      <TransactionHistory transactions={[]} />
                      <TransferFunds onSubmit={() => {}} />
                    </div>
                    </div>
                </div>
            ) : (
                <Login onLogin={handleLogin} onRegister={handleRegister}/>
            )}
            
          <div className="container-3"></div>
      </div>

  );
}
    
export default App;
