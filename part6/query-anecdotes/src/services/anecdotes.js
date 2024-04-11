import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdotes = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
};

export const updateAnecdote = async (upAnecdote) => {
  const res = await axios.put(
    `${baseUrl}/${upAnecdote.id}`,
    upAnecdote
  );
  return res.data;
};
