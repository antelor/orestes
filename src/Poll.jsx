// src/Poll.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Poll.css';
import Marquee from "react-fast-marquee";
import img1 from './assets/1.jpeg'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'
import img5 from './assets/familia.png'
import img6 from './assets/venganza.png'


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

  console.log(img1, img2, img3, img4, img5, img6);


  return (
    <div className="mainDiv">
      <div className="marqueeContainer">
        <Marquee className="marquee" speed={200} gradient={false} delay={0}>
          {[img1, img2, img3, img4, img5, img6, img1, img2, img3, img4, img5, img6, ].map((img, i) => (
            <div key={i} className="marquee-item">
              <img src={img} alt={`img-${i}`} className="marquee-img" />
            </div>
        ))}
        </Marquee>
      </div>

      <div className="marqueeContainer">
        <Marquee className="marquee" speed={40} gradient={false} delay={0}>
          {[1,2,3,4,5,6,7,8,9,10 ].map((i) => (
            <div key={i} className="marquee-item">
              <h1>AREOPAGO ONLINE</h1>
            </div>
        ))}
        </Marquee>
      </div>

      
      <div>
        <div className="buttonDiv">
          <button className='btn1' onClick={() => vote("optionA")} disabled={voted}>
            <span className="button_top">
              Justicia racional
            </span>
          </button>
          <button className='btn2' onClick={() => vote("optionB")} disabled={voted}>
            <span className="button_top">
              Justicia por mano propia
            </span>
          </button>
        </div>
      </div>
      
      <div className="marqueeContainer">
        <Marquee className="marquee" speed={100} gradient={false} delay={0}>
          {[img1, img2, img3, img4, img5, img6, img1, img2, img3, img4, img5, img6, ].map((img, i) => (
            <div key={i} className="marquee-item">
              <img src={img} alt={`img-${i}`} className="marquee-img" />
            </div>
        ))}
        </Marquee>
      </div>

    </div>
  );
}

export default Poll;
