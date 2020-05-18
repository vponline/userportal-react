import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_PROFILE_TO_EDIT, RESET_PROFILE_LOADING, PROFILES_LOAD, FILTER_PROFILES } from "../actions/types";

const initialState = {
    // profile includes the currently logged in user's profile and any viewed profile data
    profile: null,
    // profiles will include all profiles for the listing page
    profiles: [],
    //postSize is used for limiting the number of profiles fetched from the database
    postSize: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILE_TO_EDIT:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        case RESET_PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case PROFILES_LOAD:
            return {
                ...state,
                profiles: [...state.profiles, ...payload.profiles],
                postSize: payload.postSize,
                loading: false
            }
        case FILTER_PROFILES:
            return {
                ...state,
                profiles: [...payload.profiles],
                postSize: payload.postSize,
                loading: false
            }
        default:
            return state;
    }
}