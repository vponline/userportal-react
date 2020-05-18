import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import CheckBox from './CheckBox';
import { getProfiles } from '../../actions/profile';
import { getProfilesLoad } from '../../actions/profile';
import GroupIcon from '@material-ui/icons/Group';

const Profiles = ({ getProfiles, getProfilesLoad, profile: { profiles, loading }, postSize}) => {

    // Use below to display all profiles instead of on load-more click and/or filtering
    // useEffect(() => { getProfiles(); }, [getProfiles]);

    // ProfilesLoad can be used to adjust the number of displayed profiles on each page
    // const [Profilesload, setProfilesload] = useState([]);
    const [Skip, setSkip] = useState(0);
    // SetLimit can be used to adjust limits inside filtering
    //eslint-disable-next-line
    const [Limit, setLimit] = useState(6);
    // PostSize can be used to adjust the number of profiles fetched from the database
    //eslint-disable-next-line
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        interest: []
    });

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        };
        getProfilesLoad(variables)
        setPostSize(postSize);
        //eslint-disable-next-line
    }, [getProfilesLoad]);

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
                            //Use below to increase the limit of displayed profiles once a filter is clicked
            limit: Limit ,//+ profiles.length,
            filters: filters
            }
        //Enable below to increase the limit in the state if using dynamic limits for filtering
        // setLimit(variables.limit);
        setFilters(filters)
        getProfilesLoad(variables);
        setSkip(0);
    }
    
    const handleFilters = (filters, category) => {
        const newFilters = {...Filters};
        newFilters[category] = filters;
        showFilteredResults(newFilters);
    }

    const onLoadProfiles = ()  => {
        let skip = Skip + Limit;
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }
        getProfilesLoad(variables);
        setSkip(skip);
    }

    return (
        <Fragment>
            <div className="padding"></div>
                <h1 className="large text-primary">Users</h1>
                <p className="lead">
                    <GroupIcon /> Browse and find users
                </p>
                <div>Filter users interested in:</div>
            <div className="filter-icon">
            <CheckBox 
                handleFilters={filters => handleFilters(filters,"interests")}
            />
            </div>
            <div className="profiles">
            {profiles.length > 0 ? (profiles.map(profile => ( <ProfileItem key={profile._id} profile={profile} />))) : <Spinner />}
            </div>
            {postSize >= Limit && <div className="load-more">
            <button onClick={onLoadProfiles} class="btn btn-primary" href="">Load More Profiles</button>
            </div>}
            <div className="padding"></div>
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    getProfilesLoad: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    postSize: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    postSize: state.profile.postSize
});

export default connect(mapStateToProps, { getProfiles, getProfilesLoad })(Profiles);
