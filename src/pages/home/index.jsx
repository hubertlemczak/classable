import { createRef } from 'react';
import { Link } from 'react-router-dom';

import {
  DownArrow,
  HeroContainer,
  HeroText,
  Wave,
  HeroImg,
} from './styles/Hero.styled';
import { HomeMain } from './components/HomeMain';
import { HomeFooter } from './components/HomeFooter';
import { STRING } from '../../utils/vars';

const Home = () => {
  const main = createRef();
  return (
    <>
      <div style={{ position: 'relative', backgroundColor: 'black' }}>
        <HeroContainer className="container">
          <HeroText>
            <h2>{STRING.HERO.HEADER}</h2>
            <p>{STRING.HERO.SUB}</p>
            <Link to="/join">{STRING.GET_STARTED}</Link>
          </HeroText>
        </HeroContainer>
        <div
          style={{
            position: 'relative',
            backgroundColor: 'black',
          }}
        >
          <HeroImg />
          <Wave />
          <DownArrow
            onClick={() => main.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            ^
          </DownArrow>
        </div>
      </div>
      <HomeMain ref={main} />
      <HomeFooter />
    </>
  );
};

export default Home;
