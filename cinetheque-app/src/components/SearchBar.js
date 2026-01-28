import React, { useState, useEffect } from "react";
import { searchMovies } from '../services/api';
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length > 2) {
                try {
                    const data = await searchMovies(query);
                    // On s'assure que data existe avant de faire le slice
                    setResults(data ? data.slice(0, 5) : []);
                } catch (error) {
                    console.error("Erreur recherche:", error);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Rechercher ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            
            {results.length > 0 && (
                <ul className="search-results">
                    {results.map((movie) => (
                        <li key={movie.id} onClick={() => {
                            setQuery('');
                            setResults([]);
                            // Cette route doit être créée dans App.js plus tard
                            navigate(`/movie/${movie.id}`);
                        }}>
                            {movie.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}; // Correction ici : On ferme proprement la fonction

export default SearchBar;