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

  const handleLogin = (username: string, password: string) => {
      //autoryzacja --> database --> do zrobienia
      //dla testowania --> username "admin" password "password"
      if (username === "admin" && password === "password") {
          setIsLoggedIn(true);
          setUser(username);
      } else {
          alert("Invalid username or password. Try again!");
      }
  };

  const handleRegister = (username: string, password: string) => {
    // do testowania, dodanie logiki--> przesłanie do database --> do zrobienia
    setIsLoggedIn(true); // automatyczne logowanie po rejestracji
    setUser(username);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setUser(null);
  };
  const handlePayment = () => {
   // ewentualne wykrycie błedów --> payment unsuccesful
    alert("Payment successful!");
};

const handlePaycheck = () => {
  // ewentualne wykrycie błedów --> payment unsuccesful
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
                      <AccountBalance balance={1000} />
                      <AccountNumber account={85824334110366607710535723n} />
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