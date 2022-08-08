import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import src from '../../../assets/test.png';
import { STRING } from '../../../utils/vars';
import { Main, StyledButtonContainer } from '../styles/HomeMain.styles';

export const HomeMain = forwardRef((props, ref) => {
  return (
    <Main className="container" ref={ref}>
      <div className="flex">
        <div>
          <h3>{STRING.MAIN.H1}</h3>
          <p>{STRING.MAIN.P1}</p>
        </div>
        <div>
          <img src={src} alt="asd" />
        </div>
      </div>
      <div className="flex">
        <div>
          <h3>{STRING.MAIN.H2}</h3>
          <p>{STRING.MAIN.P2}</p>
        </div>
        <div>
          <img src={src} alt="asd" />
        </div>
      </div>
      <div className="flex">
        <div>
          <h3>{STRING.MAIN.H3}</h3>
          <p>{STRING.MAIN.P3}</p>
        </div>
        <div>
          <img src={src} alt="asd" />
        </div>
      </div>

      <StyledButtonContainer className="container">
        <p>{STRING.HERO.SUB}</p>
        <Link to="/join">{STRING.GET_STARTED}</Link>
      </StyledButtonContainer>
    </Main>
  );
});
