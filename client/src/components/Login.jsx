import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState([]);
    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/users/login", {
                email,
                password,
            })
            .then((response) => {
                console.log(response.data);
                // navigate('/Dashboard');
            })
            .catch((error) => {
                setError(error.response.data);
                console.error(error.response.data);
            });
    };

    return (
        <div>
            <h2>Been Here Before? Sign-In</h2>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
