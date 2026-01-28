import React, { useState, useEffect } from 'react';

const Comments = ({ movieId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [author, setAuthor] = useState("");
    const [replyTo, setReplyTo] = useState(null);

    // Charger les commentaires au montage du composant
    useEffect(() => {
        const saved = localStorage.getItem(`comments-${movieId}`);
        if (saved) setComments(JSON.parse(saved));
    }, [movieId]);

    // Sauvegarde centralisée
    const saveAndRefresh = (updated) => {
        setComments(updated);
        localStorage.setItem(`comments-${movieId}`, JSON.stringify(updated));
    };

    // --- AJOUTER UN COMMENTAIRE OU UNE RÉPONSE ---
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !author.trim()) return;

        if (replyTo) {
            const updated = comments.map(c => {
                if (c.id === replyTo) {
                    return {
                        ...c,
                        replies: [...c.replies, { 
                            id: Date.now(), 
                            author, 
                            text: newComment, 
                            date: new Date().toLocaleDateString() 
                        }]
                    };
                }
                return c;
            });
            saveAndRefresh(updated);
            setReplyTo(null);
        } else {
            const newObj = {
                id: Date.now(),
                author,
                text: newComment,
                date: new Date().toLocaleDateString(),
                replies: []
            };
            saveAndRefresh([newObj, ...comments]);
        }
        setNewComment("");
        setAuthor("");
    };

    // --- SUPPRIMER UN COMMENTAIRE PARENT ---
    const deleteComment = (commentId) => {
        if (window.confirm("Supprimer ce commentaire et toutes ses réponses ?")) {
            const updated = comments.filter(c => c.id !== commentId);
            saveAndRefresh(updated);
        }
    };

    // --- SUPPRIMER UNE RÉPONSE SPÉCIFIQUE ---
    const deleteReply = (commentId, replyId) => {
        if (window.confirm("Supprimer cette réponse ?")) {
            const updated = comments.map(c => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        replies: c.replies.filter(r => r.id !== replyId)
                    };
                }
                return c;
            });
            saveAndRefresh(updated);
        }
    };

    return (
        <div style={{ marginTop: '40px', color: 'white', borderTop: '1px solid #333', paddingTop: '20px' }}>
            <h3>{replyTo ? `Répondre à ${comments.find(c => c.id === replyTo)?.author}` : "Avis et Commentaires"}</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                <input 
                    type="text" placeholder="Votre pseudo" value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ padding: '10px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px' }}
                />
                <textarea 
                    placeholder={replyTo ? "Votre réponse..." : "Votre avis..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ padding: '10px', background: '#222', color: 'white', border: '1px solid #444', borderRadius: '5px', minHeight: '80px' }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#e50914', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {replyTo ? "Répondre" : "Publier"}
                    </button>
                    {replyTo && <button onClick={() => setReplyTo(null)} style={{ background: 'none', color: 'white', border: '1px solid white', borderRadius: '5px', cursor: 'pointer' }}>Annuler</button>}
                </div>
            </form>

            <div className="comments-list">
                {comments.map(c => (
                    <div key={c.id} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', marginBottom: '15px', borderLeft: '4px solid #e50914' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{c.author}</strong>
                            <div>
                                <small style={{ color: '#888', marginRight: '10px' }}>{c.date}</small>
                                <button onClick={() => deleteComment(c.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>🗑️</button>
                            </div>
                        </div>
                        <p style={{ margin: '10px 0' }}>{c.text}</p>
                        <button onClick={() => setReplyTo(c.id)} style={{ background: 'none', color: '#e50914', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>↩ Répondre</button>

                        {/* Rendu des réponses */}
                        {c.replies && c.replies.map(r => (
                            <div key={r.id} style={{ marginLeft: '30px', marginTop: '15px', padding: '10px', background: '#252525', borderRadius: '5px', borderLeft: '2px solid #555' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>{r.author}</strong>
                                    <button onClick={() => deleteReply(c.id, r.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️</button>
                                </div>
                                <p style={{ marginTop: '5px' }}>{r.text}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;