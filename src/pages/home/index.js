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
  const [percentageText, setPercentageText] = useState()
  const [percentageApi, setPercentageApi] = useState(100)

  const [listAlert, setListAlert] = useState("firstAlert");
  const [pushMensage, setPushMensage] = useState(false);

  const [animateWave, setAnimateWave] = useState(100);
  const [lastDetection, setLastDetection] = useState();

  const dispatch = useDispatch()

  async function getApi() {
    const sensorvalue = ref(database, 'sensorValue/');
    const animateWaveData = ref(database, 'animateWave/')
    const lastDetection = ref(database, 'lastDetection/')

    onValue(sensorvalue, (snapshot) => {
      const data = snapshot.val();
      setNewGetApi(true)
      setPercentageApi(data)
      setPercentageText(data)
      dispatch(changeValueState(data))
    });

    onValue(animateWaveData, (snapshot) => {
      const data = snapshot.val();
      setAnimateWave(data)
      animateWaveStyle = data;
      console.log(animateWave)
    })

    onValue(lastDetection, (snapshot) => {
      const data = snapshot.val();
      setLastDetection(data);
    })
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

  return (
    <>
      <Header>
        <Percentage>{percentageText}%</Percentage>

        <LastDetecton>
          <LastDetectionText>{lastDetection}</LastDetectionText>
          <LastDetectionTitle>{'Última Detectção'}</LastDetectionTitle>
        </LastDetecton>

      </Header>
      <Wave />
    </>
  )
};