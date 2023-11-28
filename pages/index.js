/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
      <div className="my-dashboard-container">
        <div className="page-container">
          <h1>My Dashboard</h1>
        </div>
        <div className="page-container">
          <Link passHref href="/music/new">
            <Button className="btn-orange" variant="dark">Add Something New</Button>
          </Link>
        </div>
        <div className="cards-container">
          {music.map((filteredMusic) => (
            <MusicCard className="dash-cards" key={filteredMusic.firebaseKey} musicObj={filteredMusic} onUpdate={getFilterdMusic} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
