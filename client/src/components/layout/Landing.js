import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import LandingCard from './landingcard/LandingCard';
import LandingParallax from './landingparallax/LandingParallax';
import Counter from './counter/Counter';
import { useSpring, animated } from 'react-spring';

const Landing = ({ isAuthenticated }) => {

   /*Background Color Animation*/
   const props = useSpring({
    from: {left: '0%', width: '0%', height: '20%', top: '20%', background: '#51538c', opacity: '0.5' },
    to: async next => {
        await next({ right: '100%', top: '20%', width: '100%', height: '13.3%', background: '#8f2e9a', opacity: '0.5' })
        await next({ left: '0%', height: '33.3%', width: '100%', top: '0%', background: '#4a194f', opacity: '0.5' })
        await next({ left: '0%', height: '20%', width: '100%', top: '8%', background: 'black', opacity: '0.5' })
      },
    });

    if(isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
    <section>
      <div className="background">
      <animated.div className="color-box" style={props} />
      <Fade bottom>
        <div className="landing-inner">
          <h1 className="x-large">User Portal</h1>
          <p className="lead">
            Your portal to an active community.
            <br />
            Connect with other users around the world.
          </p>
          <div className="buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/register" className="btn btn-register">Register</Link>
          </div>
        </div>
        </Fade>
      </div>
      <div className="parallax">
        <LandingParallax />
      </div>
      <div className="features">
        <Fade bottom>
          <Counter />
        </Fade>
      <div className="cards">
      <Zoom bottom delay={500}>
        <Link to="/login"><LandingCard title={"Login"} /></Link>
        <Link to="/register"><LandingCard title={"Register"} /></Link>
        </Zoom>
      </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
