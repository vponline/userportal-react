import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Fragment>
            <div className ="padding"></div>
            <div className="dash-right">
            <h1 className="x-large text-primary">Page Not Found</h1>
            <p className="lead not-found">Try a different page.</p>
            <Link className="btn btn-primary my-1" to="/">Go Back</Link>
            </div>
            <div className ="padding"></div>
        </Fragment>
    )
}

export default NotFound;
