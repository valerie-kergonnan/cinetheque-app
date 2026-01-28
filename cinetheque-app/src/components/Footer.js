import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mini-footer">
            <div className="footer-container">
                <div className="footer-info">
                    <span>&copy; {new Date().getFullYear()} CinéThèque — Fait avec <span style={{ color: '#ff4d4d' }}>❤️</span> par Valérie</span>
                </div>
                
                <div className="footer-icons">
                    <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={18} /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                    <a href="mailto:ton@email.com"><Mail size={18} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;