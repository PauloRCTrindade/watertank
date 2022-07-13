import {configureStore} from '@reduxjs/toolkit'

import valueStateReducer from './valueSensorSlice'

export default configureStore({
  reducer:{
    sensorValue: valueStateReducer
  }
})