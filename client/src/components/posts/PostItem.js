import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import ClearIcon from '@material-ui/icons/Clear';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AddCommentIcon from '@material-ui/icons/AddComment';

const PostItem = ({ deletePost, addLike, removeLike, auth, post: {_id, text, name, avatar, user, likes, comments, date}, showActions, profile: {profiles}}) => {
    return (
        <div className="post p-1 my-1">
          <div className="post-profile">
            <Link to={`/profile/${user}`}>
            {profiles.map(profile => (name === profile.user.name && <img key={profile._id} src={profile.picture} className="round-img" alt="features-icon" />))}
              <h4>{name}</h4>
            </Link>
          </div>
          <div className="posts-content">
          <div className="posts-inner">
          <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <div className="post-text">
            <p className="my-1">
              {text}
            </p>
            </div>
            </div>
            <div className="post-buttons">
            {showActions && <Fragment>
              {!auth.loading && user === auth.user._id && (
                <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">
                <ClearIcon />
                </button>
              )}
              <button onClick={e => addLike(_id)} type="button" className="btn btn-light like">
              <ThumbUpIcon />{likes.length > 0 && (<span >{likes.length}</span>)}
            </button>
            <button onClick={e => removeLike(_id)} type="button" className="btn btn-light unlike">
              <ThumbDownIcon />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              <AddCommentIcon />{comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
            </Link>
            </Fragment>}
            </div>
          </div>
        </div>
    );
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
