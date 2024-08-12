import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.png';
import fav from "../../public/fav.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../src/Redux/action';

export const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user_name, isLoggedIn, likeTotal } = useSelector(state => state.auth);

    const handleLogOut = () => {
        dispatch(clearUser());
        navigate('/login');
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }

    return (
        <div className="navbar">
            <Link to="/">
            <div className="nav-logo">
                <img src={logo} alt="Popcorn Pal Logo" />
                <p>Popcorn Pal</p>
            </div>
            </Link>  
            <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                    <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="nav-login">
                <Link to="/fav">
                    <img src={fav} alt="Favorites"/>
                </Link>
                <div className="nav-card-count">{likeTotal}</div>

                {isLoggedIn? (
                    <>
                        <div className="logout">
                        <span>Hello, {user_name}!</span>
                        <button onClick={handleLogOut}>LOGOUT</button>
                        </div>
                    </>
                ):(
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};
