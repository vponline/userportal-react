import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';

//To use axios from within the component enable below
//import axios from 'axios';

// function inputs are destructured from props
const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if(password !== password2) {
            // setAlert is destructured from props.setAlert in the Register function above. We could also bring in props and use props.setAlert below
            setAlert('Passwords do not match', 'danger');
        } else {

            register({ name, email, password });
            
            // Use axios within a component, check actions/auth.js for redux version
            // const newUser = {
            //     name,
            //     email,
            //     password,
            // };

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     };
            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
                
            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    }

    //Redirect if registered
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="register">
            <div className="padding"></div>
            <h1 className="large text-primary">Register</h1>
            <p className="lead"><PersonAddIcon /> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <TextField
                autoFocus
                variant="outlined" 
                type="text" 
                label="Name"
                name="name" 
                value={name} 
                onChange={e => onChange(e)} 
                // required 
                />
            </div>
            <div className="form-group">
            <TextField
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
            <div className="form-group">
            <TextField
                variant="outlined"
                type="password"
                label="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
                onChange={e => onChange(e)}
                // required
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">Already have an account? <Link to="/login">Login</Link>
            </p>
            <div className="padding"></div>
        </div>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

//connect setAlert with props
export default connect(mapStateToProps, { setAlert, register })(Register);