import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teamData';

export default function EditTeam() {
  const [editTeam, setEditTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  return (<TeamForm obj={editTeam} />);
}
