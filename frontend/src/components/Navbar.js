import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
    logout()
}





    return (
        <>
            {/* Top Navbar */}
            <header className="top-navbar">
                <div className="container">
                    <Link to="/">
                        <h1>Workout Planner</h1>
                    </Link>
                    
                     <nav> 
                        {!user && (
                            <ul>
                                <li>
                                    <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                </li>
                            </ul>
                        )}
                    </nav>
                     <nav> 
                        {!user && (
                            <ul>
                                <li>
                                    <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <nav>
                    {user && (
                        <div>
                            <ul>
                              <li>
                                <span>{user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                               </li>
                          </ul>
                        </div>
                    )}
                    </nav>
                </div>
            </header>

            {/* Bottom Navbar */}
            <footer className="bottom-navbar">
                <div className="container">
                   
                </div>
            </footer>
        </>
    );
}

export default Navbar;
