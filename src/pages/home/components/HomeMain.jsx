import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import src from '../../../assets/test.png';
import { Main, StyledButtonContainer } from '../styles/HomeMain.styles';

export const HomeMain = forwardRef((props, ref) => {
  return (
    <Main className="container" ref={ref}>
      <div className="flex">
        <div>
          <h3>Chat with course students</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            fugit quod sequi dolorem hic aperiam eveniet eaque accusamus,
            voluptates quidem sunt totam itaque aut dolore qui aliquam placeat
            saepe est.
          </p>
        </div>
        <div>
          <img src={src} alt="asd" />
        </div>
      </div>
      <div className="flex">
        <div>
          <h3>Easily provide support</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            fugit quod sequi dolorem hic aperiam eveniet eaque accusamus,
            voluptates quidem sunt totam itaque aut dolore qui aliquam placeat
            saepe est.
          </p>
        </div>
        <div>
          <img src={src} alt="asd" />
        </div>
      </div>
      <div className="flex">
        <div>
          <h3>All your resources in one space</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            fugit quod sequi dolorem hic aperiam eveniet eaque accusamus,
            voluptates quidem sunt totam itaque aut dolore qui aliquam placeat
            saepe est.
          </p>
        </div>
        <div>
          <img src={src} alt="asd" />
        </div>
      </div>

      <StyledButtonContainer className="container">
        <p>Manage your course community with Classable</p>
        <Link to="/join">Get Started</Link>
      </StyledButtonContainer>
    </Main>
  );
});
