import React, { useState, useEffect } from 'react';

/**
 * SIETLoader Component
 * Bulletin-style loading - all letters visible, one lights up at a time in sequence
 */
const SIETLoader = () => {
    const letters = ['S', 'I', 'E', 'T'];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % letters.length);
        }, 350); // Switch highlight every 350ms

        return () => clearInterval(interval);
    }, [letters.length]);

    return (
        <div style={styles.container}>
            <div style={styles.loaderWrapper}>
                {letters.map((letter, index) => (
                    <span
                        key={letter}
                        style={{
                            ...styles.letter,
                            color: index === activeIndex ? '#0A8F47' : '#c8e6c9',
                            transform: index === activeIndex ? 'scale(1.1)' : 'scale(1)',
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f8f0',
    },
    loaderWrapper: {
        display: 'flex',
        gap: '12px',
    },
    letter: {
        fontSize: '1.5rem',
        fontWeight: '700',
        fontFamily: "'Roboto', sans-serif",
        transition: 'all 0.2s ease',
    }
};

export default SIETLoader;

