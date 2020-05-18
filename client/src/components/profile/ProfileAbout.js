import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {bio, skills, user: {name}}}) => {
    return (
        <div class="profile-about bg-light p-2">
        {bio && (
            <Fragment><h2 class="text-primary">About {name.trim().split(' ')[0]}</h2>
            <p>{bio}</p>
            <div class="line"></div>
            </Fragment>)}
          <h2 class="text-primary">Skills</h2>
          <div class="skills">
            {skills.map((skill, index) => (
                <div key={index} className="p-1">
                {skill}
                </div>
            ))}
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
