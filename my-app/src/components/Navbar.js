import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="Navbar">
            <div>Facebook</div>
            <div>
                <Link to={'/'} className="Page__Link">Post</Link>
                <Link to={'/profile/'} className="Page__Link">Profile</Link>
            </div>
        </div>
    );
}

export default Navbar;