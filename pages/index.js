/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import MusicCard from '../components/cards/musicCard';
import { useAuth } from '../utils/context/authContext';
import { getMusicByUid } from '../api/musicData';

function Home() {
  const { user } = useAuth();
  const [music, setMusic] = useState([]);
  const getFilterdMusic = () => {
    getMusicByUid(user.uid).then((allMusic) => {
      const openFilteredMusic = allMusic.filter((allmusic) => allmusic.musicCompleted === false);
      setMusic(openFilteredMusic);
    });
  };

  useEffect(() => {
    getFilterdMusic();
  }, []);

  return (
    <>
      <div>
        <h1>My Dashboard</h1>
      </div>
      <div>
        {music.map((filteredMusic) => (
          <MusicCard key={filteredMusic.firebasKey} musicObj={filteredMusic} onUpdate={getFilterdMusic} />
        ))}
      </div>
    </>
  );
}

export default Home;
