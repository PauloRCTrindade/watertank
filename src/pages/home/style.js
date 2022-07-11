import styled, { keyframes } from 'styled-components'
import waveImg  from '../assets/wave.svg'


export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height:20rem;
`
const animate = keyframes`
from {
  transform: translateY(0);
}
to {
  transform: translateY(40%);
  height: calc(100vh - 50rem); 
}

`

export const Wave = styled.div`
border: none;
position: fixed;
bottom: 0;
width: 100%;
height: calc(100vh - 4rem);
background: url(${waveImg});
background-size: cover;
animation: ${animate} 3s  ;
`

export const Percentage = styled.div`
font-size: 8rem;
color: white;
font-family: 'Roboto';
`




