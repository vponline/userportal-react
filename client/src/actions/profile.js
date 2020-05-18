import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    RESET_PROFILE_LOADING,
    GET_PROFILE_TO_EDIT,
    PROFILES_LOAD,
    FILTER_PROFILES
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    
    dispatch({
        type: RESET_PROFILE_LOADING
    });
    
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all profiles
export const getProfiles = () => async dispatch => {

    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: RESET_PROFILE_LOADING
    });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Filter profiles based on interests sent in the 'variables' object from the profiles and checkbox components 
export const getProfilesLoad = (variables) => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: RESET_PROFILE_LOADING
    });
    try {
        const res = await axios.post('/api/profile/postload', variables);

        if(variables.loadMore) {
            dispatch({
                type: PROFILES_LOAD,
                payload: res.data, 
            });
        } else {
            dispatch({
                type: FILTER_PROFILES,
                payload: res.data,   
            });
        }
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        // Error alerts will be shown for incorrect profile inputs
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Get current users profile to edit

export const getCurrentProfileToEdit = () => async dispatch => {
    
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE_TO_EDIT,
            payload: res.data
        });
    } catch (err) {
        //dispatch({ type: CLEAR_PROFILE });
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added', 'success'));

        history.push('/dashboard');
        
    } catch (err) {
        // Error alerts will be shown for incorrect profile inputs
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education added', 'success'));

        history.push('/dashboard');
        
    } catch (err) {
        // Error alerts will be shown for incorrect profile inputs
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete account and profile
export const deleteAccount = () => async dispatch => {

    if(window.confirm('Are you sure? Your account will be permantently deleted.')) {
        try {
            await axios.delete(`/api/profile`);
    
            dispatch({ type: CLEAR_PROFILE });

            dispatch({ type: ACCOUNT_DELETED });
    
            dispatch(setAlert('👋 Your account has been deleted', 'danger'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }

    
}
