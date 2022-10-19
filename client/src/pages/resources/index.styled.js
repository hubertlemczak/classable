import styled from 'styled-components';

export const StyledMdContainer = styled.div`
  h1 {
    font-size: 2.2rem;
    font-weight: bold;
    border-bottom: 1px solid lightgray;
    margin-block: 20px;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    border-bottom: 1px solid lightgray;
    margin-block: 20px;
  }

  h3 {
    margin-block: 10px;
    font-weight: bold;
    font-size: 1.5rem;
  }

  a {
    color: #0000ff;
  }

  li {
    list-style-type: disc;
    margin-left: 30px;
    padding-left: 10px;
  }

  li > ul > li {
    list-style-type: circle;
  }

  code {
    background-color: lightgray;
    border-radius: 4px;
    padding: 2px 4px;
  }
`;
