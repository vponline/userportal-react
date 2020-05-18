import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Logo from '../../img/logo.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ForumIcon from '@material-ui/icons/Forum';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

// isAuthenticated and loading are destructured from the auth state since we bring in the whole object in mapStateToProps
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul>
    <li><Link to="/profiles"><GroupIcon /><span className="hide-sm">Users</span></Link></li>
    <li><Link to="/posts"><ForumIcon /><span className="hide-sm">Discussions</span></Link></li>
    <li><a href="https://fierce-bastion-28431.herokuapp.com/" rel="noopener noreferrer" target="_blank"><ChatBubbleIcon /><span className="hide-sm">SpaceChat</span></a></li>
    <li><Link to="/dashboard">
      <AccountCircleIcon/>{' '}
      <span className="hide-sm">Dashboard</span>
      </Link></li>
        <li>
          <a onClick={logout} href="#!">
            <ExitToAppIcon />{' '}
            <span className="hide-sm">Logout</span>
          </a></li>
      </ul>
  );

  const guestLinks = (
    <ul>
        <li><Link to="/profiles">Users</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );

    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
        <img className="logo" src={Logo} alt="logo"/>
        <span className="hide-sm">User Portal</span>
        </Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
