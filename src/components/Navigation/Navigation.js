import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => (
  <nav>
    <NavLink to="/" className="navigationLink">
      Home
    </NavLink>
    <NavLink to="/movies" className="navigationLink">
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
