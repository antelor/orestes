// src/Justicia.js
import React from 'react';
import { useState } from 'react';
import  { useEffect } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import './Justicia.css';

const elements = [
    "Justicia Racional",
    "La razon ha prevalecido sobre el impulso.",
    "Pero la cicatriz persiste",
    "En el hormigon, un nuevo capitulo intenta comenzar",
    "La verdadera justicia es una construccion constante.",
];

function Justicia() {
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
        <div className="stacked-page">
            {elements.map((text, index) => (
                <div
                key={index}
                className={`fade-section ${index < visibleCount ? "visible" : ""}`}
                >
                {text}
                </div>
            ))}
            <p>
                Justicia racional: {votes.optionA} votos ({percent(votes.optionA)}%)
            </p>
            <p>
                Justicia a mano propia: {votes.optionB} votos ({percent(votes.optionB)}%)
            </p>
        </div>
    );
}

export default Justicia;
