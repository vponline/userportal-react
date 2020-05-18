import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Experience = ({ experience, deleteExperience }) => {
    
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger"><RemoveCircleIcon /><span className="hide-sm hide-md">Delete</span></button>
            </td>
        </tr>
    ));
    
    return (
        <Fragment>
        <h2 className="my-2">Experience Details</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th>Years</th>
                    <th className="empty-th" />
                </tr>
            </thead>
            <tbody>{experiences}</tbody>
        </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
