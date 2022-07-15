import { useEffect, useState } from "react";

import { ref, onValue } from "firebase/database";

import { database } from "../../data";

import { useDispatch } from 'react-redux'

import { changeValueState } from '../../Redux/valueSensorSlice'

import {
  Header,
  LastDetectionText,
  LastDetectionTitle,
  LastDetecton,
  Percentage,
  Wave
} from "./style";

import axios from 'axios';





export var animateWaveStyle = 0

export default function Home() {

  const [newGetApi, setNewGetApi] = useState(true);
  const [percentageValue, setPercentageValue] = useState(100);
  const [percentageText, setPercentageText] = useState()
  const [percentageApi, setPercentageApi] = useState(100)

  const [animateWave, setAnimateWave] = useState(100);

  const [lastDetection, setLastDetection] = useState();



  const dispatch = useDispatch()

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

  function getApi() {
    const options = {
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic OWI3MTU4ZjEtOGY4OS00MDczLWExMzUtYWVjNDMzMTkxMTE1',
        'Content-Type': 'application/json'
      },
      data: {
        included_segments: ['Subscribed Users'],
        contents: {en: 'English or Any Language Message', es: 'Spanish Message'},
        name: 'INTERNAL_CAMPAIGN_NAME'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });











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
    })

    onValue(lastDetection, (snapshot) => {
      const data = snapshot.val();
      setLastDetection(data);
    })

  }

  useEffect(() => {
    getApi()

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