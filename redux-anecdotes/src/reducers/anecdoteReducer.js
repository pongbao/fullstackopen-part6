import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      anecdoteToChange.votes += 1;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { increaseVote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
