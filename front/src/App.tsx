import React, { useState } from 'react';
import AccountBalance from './comps/AccountBalance';
import TransactionHistory from './comps/TransactionHistory';
import TransferFunds from './comps/TransferFunds';
import Login from './comps/Login';
import AccountNumber from './comps/AccountNumber';

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

  return (
    <div className="container"> 
          <h1>Your Banking App!</h1>
          {isLoggedIn ? (
              <div className="content">
                  <h2>Welcome, {user}!</h2>
                  <button onClick={handleLogout}>Logout</button>
                  <AccountBalance balance={1000} />
                  <AccountNumber account={85824334110366607710535723n} />
                  <TransactionHistory transactions={[]} />
                  <TransferFunds onSubmit={() => {}} />
              </div>
          ) : (
              <Login onLogin={handleLogin} onRegister={handleRegister}/>
          )}
      </div>
  );
}
    
export default App;