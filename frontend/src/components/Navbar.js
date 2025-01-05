import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
const { logout } = useLogout()
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
                        <ul>
                            <li>
                                  <li>
                                <Link to="/login">Login</Link>
                            </li>
                            </li>
                        </ul>

                    </nav>
                     <nav> 
                        <ul>
                            <li>
                                  <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                            </li>
                        </ul>

                    </nav>
                    <nav>
                        <div>
                            <ul>
                              <li>
                                <button onClick={handleClick}>Logout</button>
                               </li>
                          </ul>
                        </div>
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
