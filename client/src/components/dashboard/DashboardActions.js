import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';

const DashboardActions = ({location}) => {
    return (
        <div className="dash-buttons">
        <Link to="/dashboard" className="btn btn-light dash-btn" style={{background: location.pathname.toString() === "/dashboard" && "#51538c"}} ><AccountCircleIcon className="text-white" /> Dashboard</Link>
        <Link to="/edit-profile" className="btn btn-light dash-btn" style={{background: location.pathname.toString() === "/edit-profile" && "#51538c"}}><EditIcon className="text-white" /> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light dash-btn" style={{background: location.pathname.toString() === "/add-experience" && "#51538c"}}><WorkIcon className="text-white" /> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light dash-btn" style={{background: location.pathname.toString() === "/add-education" && "#51538c"}}><SchoolIcon className="text-white" /> Add Education</Link>
      </div>
    )
}

DashboardActions.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(DashboardActions)
