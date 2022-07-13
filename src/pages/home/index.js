import { useEffect, useState } from "react";
import { Header, Percentage, Wave } from "./style";

import { ref, onValue } from "firebase/database";

import { database } from "../../data";



export default function Home() {

  const [newGetApi, setNewGetApi] = useState(true);
  const [percentageValue, setPercentageValue] = useState(100);
  const [percentageText, setPercentageText] = useState()
  const [percentageApi, setPercentageApi] = useState(100)

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
    const sensorvalue = ref(database, 'teste/');
        onValue(sensorvalue, (snapshot) => {
          const data = snapshot.val();
          setNewGetApi(true)
         // setPercentageApi(data)
         setPercentageText(data)
        });   

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
      </Header>
      <Wave />
    </>
  )
};