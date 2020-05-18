import React from 'react';
import { useSpring, animated } from 'react-spring';
import Fade from 'react-reveal/Fade';
import './styles.css';
import chat from './chat.png'
import world from './world.png'
import idea from './idea.png'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 8 - 300}px,${y / 8 - 100}px,0)`
const trans2 = (x, y) => `translate3d(${x / 7 - 80}px,${y / 6 - 35}px,0)`
const trans3 = (x, y) => `translate3d(${x / 8 - 70}px,${y / 6 - 90}px,0)`
const trans4 = (x, y) => `translate3d(${x / 6 + 100}px,${y / 4 + 100}px,0)`

function LandingParallax() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 8, tension: 250, friction: 100 } }))
  return (
    <div className="parallax-container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>

      <div className="features-container">
        <Fade bottom><h1 className="x-large">Features</h1></Fade>
        <Fade bottom delay={600}>
          <hr />
        </Fade>
        <ul>
        <Fade bottom delay={600}>
        <li className="features-list lead">
          <div className="features-list-inner">
          <img className="features-img" src={world} alt="features-icon" />
          <div>
          Connect with Users<span class="dot">.</span>
            <p>Access a community of active users.</p>
          </div>
          </div>
        </li>
          </Fade>
          <Fade bottom delay={900}>
          <li className="features-list lead">
          <div className="features-list-inner">
            <img className="features-img" src={chat} alt="features-icon" />
            <div>
            Join Discussions<span class="dot">.</span>
            <p>Ask questions and help others.</p>
            </div>
            </div>
          </li>
          </Fade>
          <Fade bottom delay={1200}>
          <li className="features-list lead">
          <div className="features-list-inner">
          <img className="features-img" src={idea} alt="features-icon" />
          <div>
          Share Solutions<span class="dot">.</span>
            <p>Participate and collaborate.</p>
            </div>
            </div>
          </li>
          </Fade>
        </ul>
      </div>
      <Fade bottom delay={1500}>
      <div className="parallax-objects">
      <animated.div class="card1" style={{ transform: props.xy.interpolate(trans1) }} />
      <animated.div class="card2" style={{ transform: props.xy.interpolate(trans2) }} />
      <animated.div class="card3" style={{ transform: props.xy.interpolate(trans3) }} />
      <animated.div class="card4" style={{ transform: props.xy.interpolate(trans4) }} />
      </div>
      </Fade>
    </div>
  )
}

export default LandingParallax;
