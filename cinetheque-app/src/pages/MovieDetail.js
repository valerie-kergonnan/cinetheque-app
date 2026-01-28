import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../services/api'; // On ajoute l'import
import MovieCard from '../components/MovieCard';
import Comments from '../components/Comments';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]); // Nouvel état pour les films similaires

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // On récupère les détails ET les films similaires
                const [detailsData, similarData] = await Promise.all([
                    getMovieDetails(id),
                    getSimilarMovies(id)
                ]);
                
                setMovie(detailsData);
                setSimilar(similarData.slice(0, 5)); // On en prend 5 pour la ligne
            } catch (error) {
                console.error("Erreur:", error);
            }
        };
        fetchAllData();
    }, [id]);

    if (!movie) return <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>Chargement...</div>;

    return (
        <div className="movie-detail-container">
            {/* ... Ton code existant pour le Backdrop et les Infos ... */}
            <div className="detail-backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="detail-overlay">
                    <div className="detail-content">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="detail-poster" />
                        <div className="detail-info">
                            <h1>{movie.title}</h1>
                            <p className="tagline">{movie.tagline}</p>
                            <div className="stats">
                                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                                <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                            </div>
                            <h3>Synopsis</h3>
                            <p className="overview">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SECTION "VOUS AIMEREZ AUSSI" --- */}
            <div style={{ padding: '40px 5vw 20px' }}>
                <h2 style={{ color: 'white', marginBottom: '20px' }}>Vous aimerez aussi</h2>
                <div className="movie-grid">
                    {similar.length > 0 ? (
                        similar.map(item => (
                            <MovieCard key={item.id} item={item} />
                        ))
                    ) : (
                        <p style={{ color: '#888' }}>Aucun film similaire trouvé.</p>
                    )}
                </div>
            </div>

            {/* --- SECTION COMMENTAIRES --- */}
            <div style={{ padding: '0 5vw 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <Comments movieId={id} />
            </div>
        </div>
    );
};

export default MovieDetail;