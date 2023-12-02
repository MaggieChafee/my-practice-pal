/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMusicByUid } from '../api/musicData';
import MusicCard from '../components/cards/musicCard';

export default function ViewMyAchievements() {
  const { user } = useAuth();
  const [compMusic, setCompMusic] = useState([]);
  const getClosedFilterdMusic = () => {
    getMusicByUid(user.uid).then((allMusic) => {
      const closedFilteredMusic = allMusic.filter((allmusic) => allmusic.musicCompleted === true);
      setCompMusic(closedFilteredMusic);
    });
  };

  useEffect(() => {
    getClosedFilterdMusic();
  }, []);

  return (
    <>
      <div className="page-container">
        <div>
          <h1>My Achievements</h1>
        </div>
        <div className="cards-container">
          {compMusic.map((filteredCompMusic) => (
            <MusicCard className="achieve-cards" key={filteredCompMusic.firebasKey} musicObj={filteredCompMusic} onUpdate={getClosedFilterdMusic} />
          ))}
        </div>
      </div>
    </>
  );
}
