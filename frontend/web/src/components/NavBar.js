import React, { useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

    useEffect(() => {
        !isAuthenticated && !loading && loginWithRedirect({});
    }, [isAuthenticated, loading, loginWithRedirect]);

    return (
        <div>
            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <span>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/tickets">Tickets</Link>
                </span>
            )}
        </div>
    );
};

export default NavBar;