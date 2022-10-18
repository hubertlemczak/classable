import { Link } from 'react-router-dom';

import { STRING } from '../../../utils/vars';

import src from '../../../assets/test.png';

import { Main, StyledButtonContainer } from '../styles/HomeMain.styles';

export const HomeMain = () => {
  return (
    <Main className="container" id="homeMain">
      <div className="flex-main">
        <div>
          <h3>{STRING.MAIN.H1}</h3>
          <p>{STRING.MAIN.P1}</p>
        </div>
        <div>
          <img src={src} alt="" />
        </div>
      </div>
      <div className="flex-main">
        <div>
          <h3>{STRING.MAIN.H2}</h3>
          <p>{STRING.MAIN.P2}</p>
        </div>
        <div>
          <img src={src} alt="" />
        </div>
      </div>
      <div className="flex-main">
        <div>
          <h3>{STRING.MAIN.H3}</h3>
          <p>{STRING.MAIN.P3}</p>
        </div>
        <div>
          <img src={src} alt="" />
        </div>
      </div>

      <StyledButtonContainer className="container">
        <p>{STRING.HERO.SUB}</p>
        <Link to="/join">{STRING.GET_STARTED}</Link>
      </StyledButtonContainer>
    </Main>
  );
};
