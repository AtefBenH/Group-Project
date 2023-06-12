import React, { useState } from 'react';
import axios from 'axios';


const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState('');

    const { first_name, last_name, email, password, confirm_password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:5000/api/users/register', {
                first_name,
                last_name,
                email,
                password,
                confirm_password
            })
            .then((response) => {
                console.log(response.data);
                
            })
            .catch((error) => {
                setError(error.response.data.message);
                console.error(error.response.data);
            });
    };

    return (
        <div>
            <h2>New here? Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirm_password"
                        value={confirm_password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;