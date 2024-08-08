import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
  const { width, height } = useWindowSize();
  return <OrbStyled width={width} height={height}></OrbStyled>;
}

const moveOrb = (width, height) => keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(${width / 1.2}px, ${height / 2}px);
  }
  100% {
    transform: translate(0, 0);
  }
`;
// background: linear-gradient(180deg, #F56692 0%, #F2994a 100%);

const OrbStyled = styled.div`
  width: 70vh;
  height: 70vh;
  position: absolute;
  margin-left: -37vh;
  background: rgb(42,254,223);
  background: linear-gradient(90deg, rgba(42,254,223,1) 0%, rgba(25,12,167,1) 100%);
  margin-top: -37vh;
  filter: blur(400px);
  animation: ${({ width, height }) => moveOrb(width, height)} 15s alternate linear infinite;
`;

export default Orb;
