import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const ProfileItem = ({ profile: {
    user: {_id, name, avatar},
    status,
    company,
    interests,
    picture,
    location,
    skills
    }
}) => {
    return (
        <div className="main-profile">
        <img src={picture} className="round-img" alt="profile" />
        <h2>{name}</h2>
        <hr className="profile-hr" />
        <div className="profile profile-container">
            <div>
                <p><span className="profile-at">status</span><br/> {status} {company && <span><br/> <span className="profile-at">at</span> {company}</span>}
                <br />
                {location && <p className="profile-location"><LocationOnIcon className="location-icon" />{location}</p>}</p>
            </div>
            <ul>
            {/* Display a maximum of 4 skills from the array */}
            <span className="profile-at">skills</span><br/> 
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index}>
                        <i className="fas fa-check mx"></i>{skill}
                    </li>
                ))}
            </ul>
            <div class="interests">
                {(() => {
                switch (interests) {
                case 1: return "News";
                case 2: return "Sports";
                case 3: return "Games";
                case 4: return "Movies";
                case 5: return "Music";
                default: return "";
                }})()}
            </div>
            <div className="view-profile">
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
        </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
