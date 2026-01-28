import React, { useEffect, useState } from "react";
import { getFilteredSeries } from "../services/api"; 
import MovieCard from "../components/MovieCard";

const Series = () => {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // --- États pour les filtres ---
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    // Liste des IDs de genres spécifiques aux SÉRIES
    const genresList = [
        { id: 10759, name: "Action & Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comédie" },
        { id: 80, name: "Crime" },
        { id: 18, name: "Drame" },
        { id: 10765, name: "Sci-Fi & Fantasy" }
    ];

    useEffect(() => {
        const loadSeries = async () => {
            setLoading(true);
            try {
                const data = await getFilteredSeries({ 
                    genre: genre, 
                    year: year, 
                    page: page 
                });
                setSeries(data.results);
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            } catch (error) {
                console.error("Erreur lors du chargement des séries :", error);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
        loadSeries();
    }, [page, genre, year]);

    return (
        <div className="home-container">
            <h2 className="section-title">Catalogue complet des séries</h2>

            {/* --- BARRE DE FILTRES --- */}
            <div className="filter-bar" style={{ marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                
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

                <input 
                    type="number" 
                    placeholder="Année de début" 
                    value={year}
                    onChange={(e) => { setYear(e.target.value); setPage(1); }}
                    style={{ padding: '10px', borderRadius: '5px', background: '#333', color: 'white', border: 'none', width: '150px' }}
                />
            </div>

            {loading ? (
                <p style={{ color: 'white', textAlign: 'center' }}>Chargement des séries...</p>
            ) : (
                <>
                    <div className="movie-grid">
                        {series.length > 0 ? (
                            series.map((item) => (
                                <MovieCard key={item.id} item={item} />
                            ))
                        ) : (
                            <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>
                                Aucune série trouvée.
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

export default Series;