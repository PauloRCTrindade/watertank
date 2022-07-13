import styled, { keyframes } from 'styled-components'
import waveImg from '../assets/wave.svg'


import { animateWaveStyle } from '.'

export const Header = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height:20rem;`



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
color: rgb(162, 234, 242);
font-family: 'Roboto';
`

export const LastDetecton = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

background-color: rgb(162, 234, 242);

width: 12rem;
height: 4rem;
border-radius: 12px;
`

export const LastDetectionText = styled.div`
font-size: 2rem;
font-family: 'Roboto';
color: rgb(19, 25, 37) ;
`

export const LastDetectionTitle = styled.div`
font-size: 1rem;
font-family: 'Roboto';
color: rgb(19, 25, 37) ;

`



