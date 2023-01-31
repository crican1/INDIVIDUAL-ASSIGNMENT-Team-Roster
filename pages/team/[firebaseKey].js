import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewAuthor() {
  const [teamDetails, setTeamDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const OnUpdateTeams = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };
  useEffect(() => {
    OnUpdateTeams();
  }, []);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        {// eslint-disable-next-line @next/next/no-img-element
          <img src={teamDetails.image} alt={teamDetails.team_name} style={{ width: '300px' }} />
        }
      </div>
      <div>
        <h5>
          {teamDetails.team_name}
        </h5>
        <div className="d-flex flex-wrap">
          {teamDetails.members?.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={OnUpdateTeams} />
          ))}
        </div>
      </div>
    </div>
  );
}
