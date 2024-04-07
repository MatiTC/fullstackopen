import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdotesForm';

const App = () => {
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
