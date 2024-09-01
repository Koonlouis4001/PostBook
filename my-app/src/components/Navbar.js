import React from "react";
import { Link } from "react-router-dom";
import ApiConnection from "../ApiConnection";

function Navbar() {

    const apiConnection = new ApiConnection();

    const logout = async () => {
        await apiConnection.logout("http://localhost:3000/authen/logout/1");
        window.location.pathname = '/login';
    }
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div>Facebook</div>
                <div className="Page__Link">
                    <Link to={'/'}>Post</Link>
                    <Link to={'/profile/'}>Profile</Link>
                    <a onClick={() => (logout())}>Logout</a>
                </div>
            </div>
        </div>
        
    );
}

export default Navbar;