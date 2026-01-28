import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';
import './App.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import MovieDetail from './pages/MovieDetail'; 
import SearchBar from './components/SearchBar';
import Favorites from './pages/Favorites'; // On garde l'import, c'est lui le vrai !

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/movies">Films</Link>
        <Link to="/series">Series</Link>
        <Link to="/favorites">Favoris</Link> {/* On utilise /favorites ici */}
        <SearchBar />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/favorites" element={<Favorites />} /> {/* Et /favorites ici aussi */}
        <Route path="/movie/:id" element={<MovieDetail />} /> 
      </Routes>

      <Footer /> 
    </Router>
  );
}

export default App;