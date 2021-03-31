import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 256px auto;
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100vh;
  grid-column-start: 2;
  @media only screen and (max-width: 900px) {
    overflow-y: scroll;
  }
`;

export const NavButton = styled.div`
  font-size: 24px;
  color: #5f6368;
`;
