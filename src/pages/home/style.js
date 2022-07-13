import styled, { keyframes } from 'styled-components'
import waveImg from '../assets/wave.svg'


import { animateWaveStyle } from '.'

export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height:10rem;`



const animateWave = () => {

  console.log(animateWaveStyle)

  if (animateWaveStyle === 100) {
    return keyframes`
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(0%);
      }`

  } else if (animateWaveStyle === 75) {
    return keyframes`
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(15%);
      }`

  } else if (animateWaveStyle === 50) {
    return keyframes`
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(30%);
      }`

  } else if (animateWaveStyle === 25) {
    return keyframes`
      from {
      transform: translateY(0);
      }
      to {
      transform: translateY(45%);
      }`

  } else if (animateWaveStyle === 0) {
    return keyframes`
      from {
      transform: translateY(0);
      }
      to {
      transform: translateY(80%);
      }`
  }

}

export const Wave = styled.div`
border: none;
position: fixed;
bottom: 0;
width: 100%;
height: calc(100vh);
background: url(${waveImg});
background-size: cover;
animation: ${animateWave} 3s  forwards  ;

`

export const Percentage = styled.div`
font-size: 8rem;
color: white;
font-family: 'Roboto';
`



