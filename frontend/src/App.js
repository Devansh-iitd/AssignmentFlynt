import logo from './logo.svg';
import './App.css';
import Book from './components/book';
import AllBooks from './pages/allBooks';
import Details from './pages/details';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllBooks />} />
        <Route path="/books/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
