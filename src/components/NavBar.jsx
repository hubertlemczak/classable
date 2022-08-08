import { Link } from 'react-router-dom';
import { Logo } from './styles/NavBar.styled';

export const NavBar = () => {
  return (
    <header>
      <nav>
        <Logo>Classable</Logo>
        <ul>
          <li>
            <Link to="/join">Sign Up</Link>
          </li>
          <li>
            <Link to="/join">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
