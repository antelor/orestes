// src/Venganza.js
import React from 'react';
import { useState } from 'react';
import  { useEffect } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import './Venganza.css';
import corcho from './assets/corcho.png';

const elements = [
    "Justicia por Mano Propia",
    "La sed de sangre ha sido saciada",
    "Pero la deuda permanece",
    "El ciclo se repite. En el hormigon,",
    "el eco de la tragedia resuena sin fin.",
];

function Venganza() {
    const [visibleCount, setVisibleCount] = useState(1);
    const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });
    
    const pollRef = doc(db, "polls", "mainPoll");

    useEffect(() => {
        const interval = setInterval(() => {
        setVisibleCount((prev) => {
            if (prev >= elements.length) {
                clearInterval(interval);
            return prev;
            }
            return prev + 1;
        });
        }, 2000); // time between fades
    
        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        const unsubscribe = onSnapshot(pollRef, (docSnap) => {
        if (docSnap.exists()) {
            setVotes(docSnap.data());
        }
        });

        return () => unsubscribe();
    }, []);

    const totalVotes = votes.optionA + votes.optionB;
    const percent = (value) =>
        totalVotes ? ((value / totalVotes) * 100).toFixed(1) : 0;

    return (
        <div className='container2'>
            <div className="stacked-page2" style={{
                backgroundImage: `url(${corcho})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                }}>
                <div className='text2'>
                    {elements.map((text, index) => (
                        <div
                        key={index}
                        className={`fade-section2 ${index < visibleCount ? "visible" : ""}`}
                        >
                        {text}
                        </div>
                    ))}

                    <div  className='options'>
                        <p>
                            Justicia racional: {votes.optionA} votos ({percent(votes.optionA)}%)
                        </p>
                        <p>
                            Justicia a mano propia: {votes.optionB} votos ({percent(votes.optionB)}%)
                        </p>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default Venganza;
