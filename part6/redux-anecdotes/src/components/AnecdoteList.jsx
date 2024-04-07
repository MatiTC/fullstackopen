import { useSelector } from 'react-redux';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
