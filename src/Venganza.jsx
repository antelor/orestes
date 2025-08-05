// src/Venganza.js
import React from 'react';
import { useState } from 'react';
import  { useEffect } from "react";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";


function Venganza() {
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
            <h1>¡Ganó Venganza por mano propia!</h1>
            <h3>El ciclo de derramado de sangre continua.</h3>
            <p>
                Venganza racional: {votes.optionA} votos ({percent(votes.optionA)}%)
            </p>
            <p>
                Venganza a mano propia: {votes.optionB} votos ({percent(votes.optionB)}%)
            </p>
        </div>
    );
}

export default Venganza;
