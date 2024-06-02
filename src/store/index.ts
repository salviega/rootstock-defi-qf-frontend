import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { erc20DetailsSlice } from './slides/erc20Details.slice'
import { roundSlice } from './slides/roundslice'
import { uiSlice } from './slides/uiSlice'

const rootReducer = combineReducers({
	erc20Details: erc20DetailsSlice.reducer,
	round: roundSlice.reducer,
	ui: uiSlice.reducer
})

export const store = configureStore({
	reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
