import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Education = ({ education, deleteEducation }) => {
    
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
            </td>
            <td>
                <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger"><RemoveCircleIcon /><span className="hide-sm hide-md">Delete</span></button>
            </td>
        </tr>
    ));
    
    return (
        <Fragment>
        <h2 className="my-2">Education Details</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th>Years</th>
                    <th className="empty-th" />
                </tr>
            </thead>
            <tbody>{educations}</tbody>
        </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
