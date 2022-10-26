import { Link } from 'react-router-dom';

import {
  DownArrow,
  HeroContainer,
  HeroText,
  Wave,
  HeroImg,
} from './styles/Hero.styled';
import { HomeMain } from './components/HomeMain';
import { STRING, theme } from '../../utils/vars';
import { Footer } from '../../components/Footer';
import { scrollToById } from '../../utils/scroll';

const Home = () => {
  return (
    <>
      <div style={{ position: 'relative', backgroundColor: theme.darkBG }}>
        <HeroContainer className="container">
          <HeroText>
            <h2>{STRING.HERO.HEADER}</h2>
            <p>{STRING.HERO.SUB}</p>
            <Link to="/join">{STRING.GET_STARTED}</Link>
          </HeroText>
        </HeroContainer>
        <div style={{ position: 'relative' }}>
          <HeroImg />
          <Wave />
          <DownArrow onClick={() => scrollToById('homeMain')}>^</DownArrow>
        </div>
      </div>
      <HomeMain />
      <Footer />
    </>
  );
};

export default Home;
