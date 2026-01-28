import React, { useEffect, useState } from "react";
import { getFilteredMovies } from "../services/api"; 
import MovieCard from "../components/MovieCard";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // --- États pour les filtres ---
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [certif, setCertif] = useState(""); 

    // Liste des IDs de genres TMDB
    const genresList = [
        { id: 28, name: "Action" },
        { id: 35, name: "Comédie" },
        { id: 18, name: "Drame" },
        { id: 27, name: "Horreur" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science-Fiction" }
    ];

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                // On envoie tous nos filtres à l'API
                const data = await getFilteredMovies({ 
                    genre: genre, 
                    year: year, 
                    certification: certif,
                    page: page 
                });
                setMovies(data.results);
                // TMDB limite à 500 pages max
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); 
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
        loadMovies();
    }, [page, genre, year, certif]); // Le useEffect surveille TOUT changement

    return (
        <div className="home-container">
            <h2 className="section-title">Catalogue complet des films</h2>

            {/* --- BARRE DE FILTRES --- */}
            <div className="filter-bar" style={{ marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                
                {/* SELECT GENRE */}
                <select 
                    className="filter-select"
                    value={genre} 
                    onChange={(e) => { setGenre(e.target.value); setPage(1); }}
                    style={{ padding: '10px', borderRadius: '5px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    <option value="">Tous les genres</option>
                    {genresList.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>

                {/* INPUT ANNÉE */}
                <input 
                    type="number" 
                    placeholder="Année (ex: 2024)" 
                    value={year}
                    onChange={(e) => { setYear(e.target.value); setPage(1); }}
                    style={{ padding: '10px', borderRadius: '5px', background: '#333', color: 'white', border: 'none', width: '150px' }}
                />

                {/* SELECT PUBLIC (ÂGE) */}
                <select 
                    className="filter-select"
                    value={certif} 
                    onChange={(e) => { setCertif(e.target.value); setPage(1); }}
                    style={{ padding: '10px', borderRadius: '5px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    <option value="">Public visé</option>
                    <option value="U">Tout public (U)</option>
                    <option value="12">12 ans et +</option>
                    <option value="16">16 ans et +</option>
                    <option value="18">18 ans et +</option>
                </select>
            </div>

            {loading ? (
                <p style={{ color: 'white', textAlign: 'center' }}>Chargement des films...</p>
            ) : (
                <>
                    <div className="movie-grid">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <MovieCard key={movie.id} item={movie} />
                            ))
                        ) : (
                            <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>
                                Aucun film ne correspond à vos critères.
                            </p>
                        )}
                    </div>

                    {/* PAGINATION */}
                    <div className="pagination">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="pagination-btn"
                        >
                            Précédent
                        </button>

                        <span className="page-info">Page {page} sur {totalPages}</span>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="pagination-btn"
                        >
                            Suivant
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Movies;