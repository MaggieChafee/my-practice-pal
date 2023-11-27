import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleMusic } from '../../../api/musicData';
import MusicForm from '../../../components/forms/musicForm';

function EditMusicDetails() {
  const [editMusic, setEditMusic] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMusic(firebaseKey).then(setEditMusic);
  }, [firebaseKey]);
  return (
    <MusicForm musicObj={editMusic} />
  );
}

export default EditMusicDetails;
