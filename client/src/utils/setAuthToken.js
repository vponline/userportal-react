import axios from 'axios';

const setAuthToken = token => {
    // check to see if a token exists
    if(token) {
        // if there is a token set it to the global headers
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // if no token delete from global headers
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;