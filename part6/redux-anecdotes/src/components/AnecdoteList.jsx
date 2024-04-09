import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import Notification from './Notification';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote(id));
  };
  return (
    <>
      <Notification message={`you voted `} />

      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
          <button onClick={() => handleVote(anecdote.id)}>vote</button>{' '}
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
