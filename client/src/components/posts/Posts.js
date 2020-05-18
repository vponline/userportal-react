import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import Post from './Post';
import Pagination from './Pagination';

const Posts = ({ getPosts, getProfiles, post: {posts, loading}}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    useEffect(() => {
        getPosts();
        getProfiles();
    }, [getPosts, getProfiles]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        loading ? <Spinner /> : (<Fragment>
        <div className="padding"></div>
            <h1 className="large text-primary posts-title">Posts</h1>
            <PostForm />
            <Post posts={currentPosts} />
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            />
            <div className="padding"></div>
        </Fragment>)
    );
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile,
});

export default connect(mapStateToProps, { getPosts, getProfiles })(Posts);
