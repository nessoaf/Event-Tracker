import React from 'react';
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer id="footer" className="navbar-dark bg-dark" style={{ color: "grey" }}>
            <div style={{ color: "white" }}>
                Site designed by: Thomas, Louis, Jimmy, Nesso ©2020 GA SEIR526
            </div>
        </footer>
    );
};

export default Footer;