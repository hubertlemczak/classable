import styled from 'styled-components';

export const Main = styled.main`
  margin-top: 300px;
  padding-top: 50px;

  .flex {
    display: flex;
    margin: 0 auto;
    gap: 100px;
    max-width: 55rem;
    margin-bottom: 50px;

    @media (max-width: 750px) {
      display: block;
      padding-inline: 50px;
      text-align: center;
    }

    @media (max-width: 500px) {
      padding-inline: 0px;
    }

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }

    div {
      flex: 1;
      max-width: 500px;
      margin: 0 auto;
      z-index: 2;

      p {
        padding-block: 20px;
        margin: 0 auto;
        line-height: 1.4;
        max-width: 400px;
      }
    }
  }
`;

export const StyledButtonContainer = styled.div`
  display: grid;
  place-items: center;
  margin: 80px 0;

  p {
    font-size: 1.2rem;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 20px;
    text-align: center;
  }

  a {
    font-weight: bold;
    color: white;
    cursor: pointer;
    padding: 20px 30px;
    border-radius: 100px;
    border: none;
    background-color: #2bc48a;

    &:hover {
      background-color: #12db8e;
    }
  }
`;
