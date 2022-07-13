import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'sensorValue',
  initialState: {
    sensorValue: '100',
  },
  reducers: {
    changeValueState(state, { payload }) {
      return { ...state, sensorValue: payload }
    }
  }
})

export const { changeValueState } = slice.actions

export const selectSensorValue = state => state.sensorValue

export default slice.reducer