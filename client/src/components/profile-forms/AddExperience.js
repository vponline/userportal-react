import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import WorkIcon from '@material-ui/icons/Work';
import TextField from '@material-ui/core/TextField';
import DashboardActions from '../dashboard/DashboardActions';
import ToolTip from '../dashboard/ToolTip';

const AddExperience = ({ addExperience, getCurrentProfile, history, auth: { user }, profile: { profile, loading } }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);


    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from , to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        loading && profile === null ? <Spinner /> : 
        <Fragment>
        <ToolTip />
        <div className="padding"></div>
            <h1 className="large text-primary">Add An Experience</h1>
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
                <WorkIcon /> Add past work experience
            </p>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addExperience(formData, history);
            }}>
                <div className="form-group">
                <TextField type="text" label="Job Title" name="title" value={title} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <TextField type="text" label="Company" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <TextField type="text" label="Location" name="location" value={location} onChange={e => onChange(e)} required/>
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
                }} /> {' '}Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <TextField type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} required/>
                </div>
                <div className="form-group">
                <TextField
                    multiline
                    name="description"
                    label="Job Description" value={description} onChange={e => onChange(e)}></TextField>
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

AddExperience.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { addExperience, getCurrentProfile })(withRouter(AddExperience));
