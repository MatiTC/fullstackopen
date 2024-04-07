/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteStart: (state, action) => {
      const { id } = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes++;
        state.sort((a, b) => b.votes - a.votes);
      }
    },
    addAnecdote: (state, action) => {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteStart, addAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdote));
  };
};
export const createNote = (content, votes) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content, votes);
    dispatch(addAnecdote(newAnecdote));
  };
};
export const vote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(id);
    dispatch(voteStart(updatedAnecdote));
  };
};
export default anecdotesSlice.reducer;
