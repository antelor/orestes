// src/Poll.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

function Poll() {
  const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });
  const [voted, setVoted] = useState(false);

  const pollRef = doc(db, "polls", "mainPoll");

  useEffect(() => {
    // Listen for real-time updates
    const unsubscribe = onSnapshot(pollRef, (docSnap) => {
      if (docSnap.exists()) {
        setVotes(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  const vote = async (option) => {
    if (voted) return;

    const docSnap = await getDoc(pollRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      data[option] += 1;
      await updateDoc(pollRef, data);
      setVoted(true);
    }
  };

  const totalVotes = votes.optionA + votes.optionB;
  const percent = (value) =>
    totalVotes ? ((value / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>AREOPAGO ONLINE</h2>
      <button onClick={() => vote("optionA")} disabled={voted}>Justicia racional</button>
      <button onClick={() => vote("optionB")} disabled={voted}>Justicia a mano propia</button>

      <h3>Resultados</h3>
      <p>Justicia racional: {votes.optionA} votos ({percent(votes.optionA)}%)</p>
      <p>Justicia a mano propia: {votes.optionB} votos ({percent(votes.optionB)}%)</p>
    </div>
  );
}

export default Poll;
