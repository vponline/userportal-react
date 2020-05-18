import React from 'react';
import PropTypes from 'prop-types';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const ProfileTop = ({profile: {status, company, location, website, social, picture, user: {name, avatar}}}) => {
    return (
        <div className="profile-top bg-dark p-2">
          <img
            className="round-img"
            src={picture}
            alt="profile"
          />
          <h1 className="large">{name}</h1>
          <hr className="profile-hr"/>
          <p className="lead">{status} {company && <span> <span className="profile-at">at</span> {company}</span>}</p>
          <p>{location && <span><LocationOnIcon className="location-icon" />{location}</span>}</p>
          <div className="icons my-1">
            {website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                <LanguageIcon />
            </a>
            )}
            {social && social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
            </a>
            )}
            {social && social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
            </a>
            )}
            {social && social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
            </a>
            )}
            {social && social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
            </a>
            )}
            {social && social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
            </a>
            )}
          </div>
        </div>
    );
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
