import React from 'react';
import './Footer.css';
import logo from '../../public/logo.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="footer-logo"/>
                <p>Popcorn Pal</p>
            </div>
            <ul className="footer-links ">
                <li>Product</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-copyRight">
                <hr />
                <p>Copyright @Aria - All Right Reserved</p>
            </div>
        </div>
        
    )
}

export default Footer;