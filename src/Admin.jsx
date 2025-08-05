// src/Poll.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Poll.css';

function Poll() {
  const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });
  const [voted, setVoted] = useState(false);
  const navigate = useNavigate();

  const pollRef = doc(db, "polls", "mainPoll");

  useEffect(() => {
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

  const handleSeeResults = () => {
    if (votes.optionA >= votes.optionB) {
      navigate("/justicia");
    } else {
      navigate("/venganza");
    }
  };

  return (
    <div className="mainDiv">
      <h2>AREOPAGO ONLINE</h2>

      <div className="buttonDiv">
        <button onClick={() => vote("optionA")} disabled={voted}>
          <span className="button_top">
            Justicia Racional
          </span>
        </button>
        <button onClick={() => vote("optionB")} disabled={voted}>
          <span className="button_top">
            Justicia a mano propia
          </span>
        </button>
      </div>


      <button onClick={handleSeeResults} style={{ marginTop: "20px" }}>
        <span className="button_top">
          Ver resultados
        </span>
      </button>
    </div>
  );
}

export default Poll;
