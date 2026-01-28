import React, { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react'; // On ajoute Heart
import { Link } from 'react-router-dom';

const MovieCard = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Vérifie si le film est déjà en favoris au chargement
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === item.id));
    }, [item.id]);

    const toggleFavorite = (e) => {
        e.preventDefault(); 
        e.stopPropagation();

        let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

        const isExist = favorites.find(fav =>  String(fav.id) === String(item.id));

        
        if (isExist) {
            favorites = favorites.filter(fav => fav.id !== item.id);
        } else {
            favorites.push(item);
        }
        
        localStorage.setItem('myFavorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
        window.dispatchEvent(new Event("storage")); 
    };

    const posterUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <div className="movie-card">
            {/* Lien qui entoure la carte pour aller aux détails */}
            <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                
                {/* Bouton Favoris */}
                <button className="fav-btn" onClick={toggleFavorite}>
                    <Heart 
                        size={20} 
                        fill={isFavorite ? "red" : "none"} 
                        color={isFavorite ? "red" : "white"} 
                    />
                </button>

                <img src={posterUrl} alt={item.title || item.name} />
                
                <div className="movie-info">
                    <h4>{item.title || item.name}</h4>
                    <div className="rating">
                        <Star size={16} fill="gold" color="gold" />
                        <span>{item.vote_average?.toFixed(1)}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;