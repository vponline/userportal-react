import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const CreateProfile = ({ createProfile, history }) => {

  const Interests = [
    {key:1, value:"News"},
    {key:2, value:"Sports"},
    {key:3, value:"Games"},
    {key:4, value:"Movies"},
    {key:5, value:"Music"}
  ]

    const [formData, setFormData] = useState({
        company: '',
        interests: 1,
        picture: "",
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
          createProfile(formData, history)
      }

    return (
        <Fragment>
        <div className="padding"></div>
        <div className="create-profile">
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        Let's get some information to make your
        profile stand out
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <TextField type="text" label="Status" name="status" value={status} onChange={e => onChange(e)} />
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <TextField defaultValue="News" select name="interests" value={interests} onChange={e => onChange(e)}>
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
            >Please use comma separated values
            <br/>
            (eg.
            Science, Cooking, JavaScript, Photography)</small>
        </div>
        <div className="form-group">
          <TextField 
            multiline
            fullWidth={true} 
            label="A short bio of yourself" 
            name="bio" 
            value={bio} 
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
      </div>
      <div className="padding"></div>
        </Fragment>
    );
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
