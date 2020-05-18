import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import SchoolIcon from '@material-ui/icons/School';
import TextField from '@material-ui/core/TextField';
import DashboardActions from '../dashboard/DashboardActions';
import ToolTip from '../dashboard/ToolTip';

const AddEducation = ({ addEducation, getCurrentProfile, history, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from , to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        loading && profile === null ? <Spinner /> :

        <Fragment>
            <ToolTip />
            <div className="padding"></div>
            <h1 className="large text-primary">Add An Education</h1>
            <div className="dashboard">
                <div className="dash-left">
                <p className="lead">
                <img src={profile.picture} 
                className="dash-picture"
                alt="profile" /> { user && user.name}
                </p>
                <DashboardActions />
                </div>
                <div className="dash-right">
            <p className="lead">
                <SchoolIcon /> Add a school and degree
            </p>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addEducation(formData, history);
            }}>
                <div className="form-group">
                <TextField type="text" label="School" name="school" value={school} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <TextField type="text" label="Degree or Certificate" name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <TextField type="text" label="Area of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <TextField type="date" name="from" value={from} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                <p><input type="checkbox" 
                name="current"
                checked={current} 
                value={current} 
                onChange={e => {setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
                }} /> {' '}Current School</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <TextField type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} required/>
                </div>
                <div className="form-group">
                <TextField
                    name="description"
                    multiline
                    label="Program Description" value={description} onChange={e => onChange(e)}></TextField>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
            <div className="padding"></div>
            </div>
            </div>
        </Fragment>
    );
}

AddEducation.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { addEducation, getCurrentProfile })(withRouter(AddEducation));
