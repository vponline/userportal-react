import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);      
        }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    
    return (
        <div className="login">
            <div className="padding"></div>
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><PersonIcon /> Login Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <TextField
                autoFocus
                variant="outlined" 
                type="email" 
                label="Email Address" 
                name="email"
                value={email}
                onChange={e => onChange(e)}
                // required 
                />
            </div>
            <div className="form-group">
            <TextField
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={e => onChange(e)}
                // required 
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">Don't have an account? <Link to="/register">Register</Link>
            </p>
            <div className="padding"></div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
