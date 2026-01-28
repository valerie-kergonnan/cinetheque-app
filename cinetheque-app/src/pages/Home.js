import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrendingMovies, getMovies, getSeries } from '../services/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [heroMovie, setHeroMovie] = useState(null);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const trending = await getTrendingMovies();
                // On prend un film au hasard parmi les 5 premiers pour varier un peu l'accueil
                const randomIndex = Math.floor(Math.random() * 5);
                setHeroMovie(trending[randomIndex]);

                const movies = await getMovies();
                setPopularMovies(movies.results);

                const series = await getSeries();
                setPopularSeries(series.results);
            } catch (error) {
                console.error("Erreur chargement Home:", error);
            }
        };
        loadData();
    }, []);

    return (
        <div className="home-container">
            {/* --- LE FILM DU MOMENT (HERO BANNER) --- */}
            {heroMovie && (
                <div className="hero-banner" style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, #141414 100%), url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 5vw', // Utilisation de vw pour le responsive
                    marginBottom: '30px',
                    color: 'white'
                }}>
                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)', // S'adapte à la taille de l'écran
                        margin: '0',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)' 
                    }}>
                        {heroMovie.title || heroMovie.name}
                    </h1>
                    
                    <p style={{ 
                        maxWidth: '600px', 
                        fontSize: '1.1rem',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                        display: '-webkit-box', // Limite le texte à 3 lignes
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {heroMovie.overview}
                    </p>

                    <button 
                        onClick={() => navigate(`/recipe/${heroMovie.id}`)} // <-- CORRECTION ICI
                        style={{
                            padding: '12px 25px',
                            width: 'fit-content',
                            backgroundColor: '#e50914', // Rouge Netflix
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginTop: '20px',
                            transition: '0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#b20710'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#e50914'}
                    >
                        En savoir plus
                    </button>
                </div>
            )}

            {/* --- LES GRILLES --- */}
            <div style={{ padding: '0 5vw' }}>
                <h2 className="section-title">Films populaires</h2>
                <div className="movie-grid">
                    {popularMovies.slice(0, 5).map(m => <MovieCard key={m.id} item={m} />)}
                </div>

                <h2 className="section-title">Séries populaires</h2>
                <div className="movie-grid">
                    {popularSeries.slice(0, 5).map(s => <MovieCard key={s.id} item={s} />)}
                </div>
            </div>
        </div>
    );
};

export default Home;