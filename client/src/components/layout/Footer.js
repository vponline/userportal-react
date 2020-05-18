import React from 'react';

const Footer = props => {

    //Dynamic year for footer
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="footer-links">
                <a href="https://github.com/vponline" rel="noopener noreferrer" target="_blank">Github</a>
                <a href="https://fierce-bastion-28431.herokuapp.com/" rel="noopener noreferrer" target="_blank">SpaceChat</a>
                <a href="https://blooming-taiga-64838.herokuapp.com/" rel="noopener noreferrer" target="_blank">Blog</a>
                <a href="https://quiet-chamber-12937.herokuapp.com/" rel="noopener noreferrer" target="_blank">Newsletter</a>
            </div>
            <p className="copyright-text">{year} by <a className="vp" href="https://github.com/vponline" rel="noopener noreferrer" target="_blank">vp</a>
            <br />
            Background image <a href="http://www.freepik.com">designed by ikatod / Freepik</a>. Profile photos from <a href="https://unsplash.com/">Unsplash</a>.</p>
        </div>
    );
}

export default Footer;
