import { useState } from 'react';
import Button from './component/Button';

const Statistics = ({
  text,
  good,
  neutral,
  bad,
  all,
  funcionAverage,
  funcionPositive,
}) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <h1>{text}</h1>
        <StatisticsLine text={'good:'} value={good} />
        <StatisticsLine text={'neutral:'} value={neutral} />
        <StatisticsLine text={'bad: '} value={bad} />
        <StatisticsLine text={'all: '} value={all} />
        <StatisticsLine text={'average'} value={funcionAverage} />
        <StatisticsLine text={'positive: '} value={funcionPositive} />
      </>
    );
  }
};

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>{text}</th>
            <th>{value}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};
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

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(anecdotes.map(() => 0));

  const handleClickGood = () => {
    // console.log('Prueba de click GOOD');
    const updateClickedGood = good + 1;
    setGood(updateClickedGood);
    console.log(updateClickedGood);
  };
  const handleClickNeutral = () => {
    // console.log('Prueba de click Neutral');
    const updateClickedNeutral = neutral + 1;
    setNeutral(updateClickedNeutral);
    console.log(updateClickedNeutral);
  };
  const handleClickBad = () => {
    // console.log('Prueba de click BAD');
    const updateClickedBad = bad + 1;
    setBad(updateClickedBad);
    console.log(updateClickedBad);
  };

  const all = good + neutral + bad;

  function average(good, bad, total) {
    let promedio;
    if (total === 0) {
      promedio = '';
    } else {
      promedio = (good - bad) / total;
    }
    return promedio;
  }
  // console.log('La puntuación promedio es de: ', average(good, bad, all));
  function positive(good, all) {
    let promedioP;
    if (good === 0 && all === 0) {
      promedioP = '';
    } else {
      promedioP = good / all;
    }
    return promedioP * 100;
  }
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
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleClickGood} texto={'Bueno'} />
        <Button handleClick={handleClickNeutral} texto={'Neutral'} />
        <Button handleClick={handleClickBad} texto={'Malo'} />
      </div>
      <Statistics
        text={'statistics'}
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        funcionAverage={average(good, bad, all)}
        funcionPositive={positive(good, all)}
      />
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
