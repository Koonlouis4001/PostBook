import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiConnection from "../ApiConnection";

function Navbar() {

    const apiConnection = new ApiConnection();
    const navigate = new useNavigate();
    const location = new useLocation();

    const logout = async () => {
        await apiConnection.logout(`http://localhost:3000/authen/logout`);
        navigate('/login');
    }
    return (location.pathname !== '/login' &&
        <div className="navbar-container">
            <div className="navbar">
                <div>Facebook</div>
                <div className="page-link">
                    <Link to={'/'}>Post</Link>
                    <Link to={'/profile/'}>Profile</Link>
                    <a onClick={() => (logout())}>Logout</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;