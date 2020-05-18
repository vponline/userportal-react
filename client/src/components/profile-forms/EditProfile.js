import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import ToolTip from '../dashboard/ToolTip';

const EditProfile = ({ profile: { profile, profiles, loading }, createProfile, getCurrentProfile, history, auth: { user } }) => {

    const Interests = [
      {key:1, value:"News"},
      {key:2, value:"Sports"},
      {key:3, value:"Games"},
      {key:4, value:"Movies"},
      {key:5, value:"Music"}
    ]

    const [ formData, setFormData] = useState({
      company: '',
      interests: 1,
      picture: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
  });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
      if (!profile) getCurrentProfile();
      if (!loading && profile) {
        setFormData({
          company: loading || !profile.company ? '' : profile.company,
          interests: loading || !profile.interests ? '' : profile.interests,
          picture: loading || !profile.picture ? '' : profile.picture,
          website: loading || !profile.website ? '' : profile.website,
          location: loading || !profile.location ? '' : profile.location,
          status: loading || !profile.status ? '' : profile.status,
          skills: loading || !profile.skills ? '' : profile.skills.join(','),
          bio: loading || !profile.bio ? '' : profile.bio,
          twitter: loading || !profile.social ? '' : profile.social.twitter,
          facebook: loading || !profile.social ? '' : profile.social.facebook,
          linkedin: loading || !profile.social ? '' : profile.social.linkedin,
          youtube: loading || !profile.social ? '' : profile.social.youtube,
          instagram: loading || !profile.social ? '' : profile.social.instagram,
        });
      }
    }, [loading, getCurrentProfile, profile]);

    const {
        company,
        interests,
        picture,
        website,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
      } = formData;

      const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

      const onSubmit = e => {
          e.preventDefault();
          createProfile(formData, history, true);
      }

    return (
        loading && profile === null ? <Spinner /> :
        <Fragment>
        <ToolTip />
          <div className="padding"></div>
            <h1 className="large text-primary">
          Profile
          </h1>
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
                <EditIcon /> Edit your profile
            </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <TextField type="text" label="Status" name="status" value={status} onChange={e => onChange(e)} />
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <TextField select name="interests" value={interests} onChange={e => onChange(e)}>
            {Interests.map(item => (
              <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
            ))}
          </TextField>
          <small className="form-text"
            >What are you interested in...</small>
        </div>
        <div className="form-group">
          <TextField type="text" label="Avatar URL" name="picture" value={picture} onChange={e => onChange(e)} />
          <small className="form-text">Enter a URL for a profile picture</small>
        </div>
        <div className="form-group">
          <TextField type="text" label="Company" name="company" value={company} onChange={e => onChange(e)} />
          <small className="form-text" >Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <TextField type="text" label="Website" name="website" value={website} onChange={e => onChange(e)} />
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <TextField type="text" label="Location" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <TextField type="text" label="Skills" name="skills" value={skills} onChange={e => onChange(e)} />
          <small className="form-text"
            >Please use comma separated values (eg.
            Science, Cooking, JavaScript, Photography)</small>
        </div>
        <div className="form-group">
          <TextField multiline
            fullWidth={true} 
            label="A short bio of yourself" 
            name="bio" value={bio} 
            onChange={e => onChange(e)}>
            </TextField>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2">
          <span>Optional</span>
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
        </div>
        {displaySocialInputs && <Fragment>
            <div className="form-group social-input twitter">
            <TwitterIcon />
            <TextField type="text" label="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
            </div>
            <div className="form-group social-input facebook">
            <FacebookIcon />
            <TextField type="text" label="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
            </div>
            <div className="form-group social-input youtube">
            <YouTubeIcon />
            <TextField type="text" label="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
            </div>
            <div className="form-group social-input linkedin">
            <LinkedInIcon />
            <TextField type="text" label="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
            </div>
            <div className="form-group social-input instagram">
            <InstagramIcon />
            <TextField type="text" label="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
            </div>
        </Fragment>}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
      <div className="padding"></div>
      </div>
      </div>
        </Fragment>
    );
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
