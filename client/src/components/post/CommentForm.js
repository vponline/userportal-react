import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import TextField from '@material-ui/core/TextField';

const CommentForm = ({ postId, addComment }) => {

    const [text, setText] = useState('');

    return (
        <div className="post-form">
        <div className="p">
          <h3>Comments</h3>
        </div>
        <form onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
            }}
            className="form my-1">
          <TextField
            className="text-field"
            name="text"
            multiline
            fullWidth={true}
            placeholder="Leave a comment"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></TextField>
          <input type="submit" className="btn btn-primary my-1" value="Submit" />
        </form>
      </div>
    );
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm);
