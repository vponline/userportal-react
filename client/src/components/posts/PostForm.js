import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import TextField from '@material-ui/core/TextField';

const PostForm = ({ addPost }) => {

    const [text, setText] = useState('');

    return (
        <div className="post-form">
        <form onSubmit={e => {
            e.preventDefault();
            addPost({ text });
            setText('');
            }}
            className="form my-1">
          <TextField
            className="text-field"
            name="text"
            multiline
            fullWidth={true}
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></TextField>
          <input type="submit" className="btn btn-primary my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);
