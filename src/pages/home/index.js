/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { ref, onValue } from "firebase/database";

import { useDispatch } from 'react-redux';

import { database } from "../../data";

import { changeValueState } from '../../Redux/valueSensorSlice'

import waterImg from '../assets/waterIcon.png'

import {
  Header,
  LastDetectionText,
  LastDetectionTitle,
  LastDetecton,
  Percentage,
  Wave
} from "./style";

export var animateWaveStyle = 0

export default function Home() {

  const [newGetApi, setNewGetApi] = useState(true);
  const [percentageValue, setPercentageValue] = useState(100);
  const [distanceValue, setDistanceValue] = useState();
  const [percentageText, setPercentageText] = useState()
  const [percentageApi, setPercentageApi] = useState(100)

  const [listAlert, setListAlert] = useState("firstAlert");
  const [pushMensage, setPushMensage] = useState(false);

  const dispatch = useDispatch()

  async function getApi() {
    const sensorvalue = ref(database, 'sensor/distance');

    onValue(sensorvalue, (snapshot) => {
      const data = snapshot.val();
      setNewGetApi(true)
      const min = 30;
      const max = 90;
      const value = Math.round(data)
  
  
      const percentage = Math.round((1 - (value - min) / (max - min)) * 100);

      animateWaveStyle = percentage
      dispatch(changeValueState(percentage))
      if (percentage > 100) {
        setPercentageApi(100)
        setPercentageText(100)
        setDistanceValue(data)
      } else {
        setPercentageApi(percentage)
        setPercentageText(percentage)
        setDistanceValue(data)
      }  
      console.log(updateDateTime())    

    });
  }
  function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const time = now.toLocaleTimeString('pt-BR');
    return`${date} ${time}`;
  }

  function decrementPercentage() {
    setTimeout(
      async () => {
        if (percentageValue !== percentageApi && newGetApi) {
          setPercentageValue(() => percentageValue - 1)
          setPercentageText(percentageValue - 1)

        } else {
          setPercentageValue(100)
          setNewGetApi(false)
        }
      }, 18
    )
  }

  async function mensagePush() {
    const title = 'Algo de errado não está certo!'
    const options = {
      firstAlert: {
        body: "A caixa d'água está abaixo de 70%",
        icon: { waterImg }
      },
      secondAlert: {
        body: "A caixa d'água está abaixo de 50%",
        icon: { waterImg }
      },
      helpAlert: {
        body: "Fudeuuuu!!! a caixa d'água está abaixo de 30%",
        icon: { waterImg }
      }
    }

    const status = localStorage.getItem('status')

    if (status !== 'granted') {
      await Notification.requestPermission(status => {
        localStorage.setItem('status', status)
        console.log('Notification permission status: ', status)
      })
    }

    if (Notification.permission === 'granted') {
      if (percentageApi < 70 && percentageApi >= 50 && listAlert === 'firstAlert') {
        await navigator.serviceWorker.getRegistration().then(reg => {
          reg.showNotification(title, options.firstAlert)
        })
        setListAlert("secondAlert")

      } else if (percentageApi < 50 && percentageApi >= 30 && listAlert === 'secondAlert') {
        await navigator.serviceWorker.getRegistration().then(reg => {
          reg.showNotification(title, options.secondAlert)
        })
        setListAlert('helpAlert')

      } else if (percentageApi < 30 && pushMensage === false) {
        await navigator.serviceWorker.getRegistration().then(reg => {
          reg.showNotification(title, options.helpAlert)
        })
        setPushMensage(true)
      }
    }
  }

  useEffect(() => {
    getApi()
    mensagePush()
  }, [percentageApi])

  useEffect(() => {
    decrementPercentage()
  }, [percentageValue, percentageApi])

  console.log('distancia',distanceValue)

  return (
    <>
      <Header>
        <Percentage>{percentageText}%</Percentage>
         <LastDetecton>
          <LastDetectionText>{`${distanceValue} cm`}</LastDetectionText>
          <LastDetectionTitle>{'última Detecção'}</LastDetectionTitle>
          <LastDetectionTitle>{`${updateDateTime()}`}</LastDetectionTitle>
        </LastDetecton>
      </Header>
      <Wave />
    </>
  )
};