import React, { useState } from 'react';
import logo from '../comps/images/Your_Banking_App_Logo.png'; //dodanie logo --> do zrobienia

interface LoginProps {
    onLogin: (username: string, password: string) => void;
    onRegister: (firstName: string, lastName: string, pesel: string, username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pesel, setPesel] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // sprawdzenie poprawności typu danych--> do zrobienia
        if (isRegistering) {
                   if (!firstName || !lastName || !pesel || !username || !password) {
                    alert("Field empty! Please fill in all fields!");
                    return;
                }
                onRegister(firstName, lastName, pesel, username, password);
            } else {
                onLogin(username, password);
            }
        };


    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
            {isRegistering && (
                    <>
                        <label>
                            First Name:
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </label>
                        <label>
                            PESEL:
                            <input type="text" value={pesel} onChange={(e) => setPesel(e.target.value)} />
                        </label>
                    </>
                )}
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <p>
                {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Login' : 'Register'}
                </button>
            </p>
        </div>
    );
}
         

export default Login;