import { useEffect } from 'react';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdotesForm';
import { setAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import anecdoteService from './services/anecdotes';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </>
  );
};

export default App;
