import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const clearAll = () => {
        if (window.confirm("Voulez-vous vraiment supprimer tous vos favoris ?")) {
            localStorage.removeItem('myFavorites');
            setFavorites([]);
            window.dispatchEvent(new Event("storage"));
        }
    };

    const loadFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
        setFavorites(savedFavorites);
    };

    useEffect(() => {
        loadFavorites(); 
        window.addEventListener('storage', loadFavorites);
        return () => {
            window.removeEventListener('storage', loadFavorites);
        };
    }, []);

    return (
        <div style={{ marginTop: '100px', padding: '20px', color: 'white', background: '#141414', minHeight: '100vh' }}>
            <h1 style={{ borderLeft: '4px solid red', paddingLeft: '10px' }}>Mes Favoris</h1>

            {/* LE BOUTON AJOUTÉ ICI */}
            {favorites.length > 0 && (
                <button 
                    onClick={clearAll} 
                    style={{
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    🗑️ Tout supprimer
                </button>
            )}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <div key={movie.id} style={{ width: '200px' }}>
                            <MovieCard item={movie} />
                        </div>
                    ))
                ) : (
                    <p>La liste est vide.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;