import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ToolTip from './ToolTip';
import createprofile from './createprofile.png';

const Dashboard = ({ 
    getCurrentProfile,
    deleteAccount,
    auth: { user }, 
    profile: { profile, loading } 
}) => {
    
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    // if profile is null and still loading return spinner
    return loading && profile === null ? <Spinner /> : <Fragment>
        <div className="padding"></div>
        <h1 className="large text-primary">Dashboard</h1>
        
        {profile !== null ? 
            <Fragment>
                <ToolTip/>
                <div className="dashboard">
                <div className="dash-left">
                <p className="lead dash-profile">
                    <img src={profile.picture} className="dash-picture" alt="profile" /> Welcome
                    <br />
                    { user && user.name}
                </p>
                <DashboardActions />
                </div>

                <div className="dash-right-main">
                <div>
                <Experience experience={profile.experience} />
                <Education education={profile.education} />

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <DeleteForeverIcon /> Delete My Account
                    </button>
                </div>
                </div>
                </div>
                </div>
            </Fragment> : <Fragment>
            <div className="dash-right">You don't have a profile yet. You can create one now!
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
            <img className="create-img" src={createprofile} alt="profile-not-created" />
            </div>
        </Fragment>}
        <div className="padding"></div>
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(Dashboard);
