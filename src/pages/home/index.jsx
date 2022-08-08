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

const Home = () => {
  const main = createRef();
  return (
    <>
      <div style={{ position: 'relative', backgroundColor: 'black' }}>
        <HeroContainer className="container">
          <HeroText>
            <h2>Everything you need in one course managment app</h2>
            <p>Manage your course community with Classable</p>
            <Link to="/join">Get Started</Link>
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
