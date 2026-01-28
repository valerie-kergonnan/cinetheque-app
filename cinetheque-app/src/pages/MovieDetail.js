import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du film:", error);
            }
        };
        fetchDetails();
    }, [id]);

    if (!movie) {
        return <div className="home-container"><p style={{color: 'white'}}>Chargement...</p></div>;
    }

    return (
        <div className="movie-detail-container">
            {/* Image de fond (Backdrop) */}
            <div 
                className="detail-backdrop" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
                <div className="detail-overlay">
                    <div className="detail-content">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="detail-poster"
                        />
                        <div className="detail-info">
                            <h1>{movie.title}</h1>
                            <p className="tagline">{movie.tagline}</p>
                            <div className="stats">
                                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                                <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                                <span>⏱️ {movie.runtime} min</span>
                            </div>
                            <h3>Synopsis</h3>
                            <p className="overview">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;