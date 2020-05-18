import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import ClearIcon from '@material-ui/icons/Clear';

const CommentItem = ({postId, comment: { _id, text, name, avatar, user, date}, auth, deleteComment, profile: {profiles}}) => {
    return (
        <div class="post p-1 my-1">
          <div className="post-profile">
            <Link to={`/profile/${user}`}>
              {profiles.map(profile => (name === profile.user.name && <img key={profile._id} src={profile.picture} className="round-img" alt="profile"/>))}
              <h4>{name}</h4>
            </Link>
          </div>
          <div className="posts-content">
          <div className="posts-inner">
          <p class="post-date comment-date">
                <span>Posted on <Moment format="YYYY/MM/DD">{date}</Moment></span>
                {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteComment(postId, _id)} type="button" className="btn btn-danger comment-delete">
                <ClearIcon />
                </button>
            )}
            </p>
            <p class="my-1 post-text comment">
              {text}
            </p>
          </div>
          </div>
        </div>
    );
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
