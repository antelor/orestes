// src/Justicia.js
import React from 'react';
import { useState } from 'react';
import  { useEffect } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";


function Justicia() {
    const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });

    const pollRef = doc(db, "polls", "mainPoll");

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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>¡Ganó Justicia Racional!</h1>
        <h3>Se ha roto el ciclo de derramado de sangre.</h3>
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
