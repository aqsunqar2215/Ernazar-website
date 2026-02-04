import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Menu, X } from 'lucide-react';

const videos = [
    { src: '/wyb2fpef4naq4qk69aar.mp4', title: 'VISIONARY', desc: 'Defining new standards' },
    { src: '/ufpnwuf8n17melbtk7x2.mp4', title: 'ATMOSPHERIC', desc: 'Immersive worlds' },
    { src: '/nf4wzah87pg35h05h2sh.mp4', title: 'DYNAMIC', desc: 'Fluidity in motion' },
    { src: '/IMG_6332.MP4', title: 'STRENGTH', desc: 'Unwavering precision' },
    { src: '/IMG_6341.MP4', title: 'ELEGANCE', desc: 'Refined aesthetics' },
];

const App = () => {
    const [started, setStarted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const audioRef = useRef(null);
    const heroRef = useRef(null);
    const galleryRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Detect mobile for performance optimizations
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
        }
    }, []);

    const handleStart = () => {
        setStarted(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Playback failed:", e));
        }
    };

    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    // Reduce particles on mobile for better performance
    const particleCount = isMobile ? 20 : 50;

    return (
        <>
            {/* Particle Background */}
            <div className="particle-bg">
                {[...Array(particleCount)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                    }} />
                ))}
            </div>

            <audio ref={audioRef} src="/audio_2026-01-31_23-03-32.ogg" />

            <AnimatePresence mode="wait">
                {!started ? (
                    <motion.div
                        key="intro"
                        className="intro-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                    >
                        <div className="intro-content">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <Sparkles className="sparkle-icon" size={64} style={{ marginBottom: '40px' }} />
                                <h1 className="intro-logo">
                                    ERNA<span>ZAR</span>
                                </h1>
                                <p className="intro-status">SYSTEMS ONLINE // READY TO INITIALIZE</p>
                                <motion.button
                                    className="btn-primary large"
                                    onClick={handleStart}
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(212, 175, 55, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    ENTER EXPERIENCE
                                </motion.button>
                            </motion.div>
                        </div>
                        <div className="scanline" />
                    </motion.div>
                ) : (
                    <motion.main
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        {/* Top Gallery Section */}
                        <section className="top-gallery">
                            <div className="top-images-grid">
                                <motion.div
                                    className="top-img-card"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <img src="/top_image_1.jpg" alt="Featured 1" />
                                </motion.div>
                                <motion.div
                                    className="top-img-card"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <img src="/top_image_2.png" alt="Featured 2" />
                                </motion.div>
                            </div>
                        </section>

                        <nav className="glass nav-bar">
                            <div className="logo" onClick={() => scrollTo(heroRef)} style={{ cursor: 'pointer' }}>ERNAZAR</div>

                            <div className="nav-links">
                                <button onClick={() => scrollTo(heroRef)}>HOME</button>
                                <button onClick={() => scrollTo(galleryRef)}>GALLERY</button>
                                <button onClick={() => scrollTo(ctaRef)}>JOIN</button>
                            </div>

                            <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                            </button>
                        </nav>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    className="mobile-menu-overlay glass"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <button onClick={() => scrollTo(heroRef)}>HOME</button>
                                    <button onClick={() => scrollTo(galleryRef)}>GALLERY</button>
                                    <button onClick={() => scrollTo(ctaRef)}>JOIN</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Hero Section */}
                        <section ref={heroRef} className="section hero">
                            <video autoPlay loop muted playsInline className="hero-video" key={videos[0].src}>
                                <source src={videos[0].src} type="video/mp4" />
                            </video>

                            <motion.div
                                className="hero-content"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Sparkles className="sparkle-icon" size={48} />
                                <h1 className="cinematic-text">
                                    ERNA<span>ZAR</span>
                                </h1>
                                <p className="subtitle">Experience the future of digital mastery. A world built on vision, precision, and raw power.</p>
                                <div className="btn-group">
                                    <motion.button
                                        className="btn-primary"
                                        onClick={() => scrollTo(galleryRef)}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        EXPLORE GALLERY
                                    </motion.button>
                                </div>
                            </motion.div>

                            <motion.div
                                className="scroll-indicator"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                onClick={() => scrollTo(galleryRef)}
                            >
                                <ChevronDown size={32} />
                            </motion.div>
                        </section>

                        {/* Gallery Section */}
                        <section ref={galleryRef} className="section gallery">
                            <div className="section-header">
                                <h2>THE COLLECTION</h2>
                                <div className="gold-line"></div>
                            </div>

                            <div className="cards-container">
                                {videos.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        className="video-card"
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="video-wrapper">
                                            <video autoPlay loop muted playsInline className="card-video">
                                                <source src={video.src} type="video/mp4" />
                                            </video>
                                            <div className="card-content">
                                                <div className="card-info">
                                                    <h3>{video.title}</h3>
                                                    <p>{video.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section ref={ctaRef} className="section cta">
                            <Sparkles className="sparkle-icon" size={64} />
                            <h2>JOIN THE EVOLUTION</h2>
                            <p>Be part of the Ernazar ecosystem. Push the boundaries of what's possible.</p>
                            <motion.button
                                className="btn-primary large"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => alert('Welcome to Ernazar!')}
                            >
                                BECOME A MASTER
                            </motion.button>
                        </section>

                        <footer>
                            <p>© 2026 ERNAZAR. ALL RIGHTS RESERVED.</p>
                        </footer>
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
};

export default App;
