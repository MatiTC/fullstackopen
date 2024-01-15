import { useState } from 'react';

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(anecdotes.map(() => 0));

  // console.log('El promedio es:', positive(good, all));
  const handleClickAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };
  const handleClickVote = () => {
    const copyVote = [...vote];
    copyVote[selected] += 1;
    setVote(copyVote);
  };

  const mostVote = vote.reduce((maxIndex, currentVotes, currentIndex) => {
    return currentVotes > vote[maxIndex] ? currentIndex : maxIndex;
  }, 0);

  const anecdotaConMasVotos = anecdotes[mostVote];

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>has {vote[selected]}</p>
      <button onClick={handleClickVote}> vote</button>
      <button onClick={handleClickAnecdote}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotaConMasVotos}</p>
      <p>has {vote[mostVote]}</p>
    </>
  );
};

export default App;
