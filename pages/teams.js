import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap text-center my-4" style={{ marginTop: '100px' }}>
        <Head>
          <title>Teams</title>
        </Head>
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />
        ))}
      </div>
    </>
  );
}
