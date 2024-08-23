import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    incByAmount(state, action: PayloadAction<number>) {
      state.counter += action.payload;
    },
  },
});

export const { incByAmount, increment } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
