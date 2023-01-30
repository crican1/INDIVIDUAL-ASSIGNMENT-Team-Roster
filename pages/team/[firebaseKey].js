import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
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
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.team_name}
        </h5>
        <div className="d-flex flex-wrap">
          {teamDetails.members?.map((member) => (
            <><MemberCard key={member.firebaseKey} memberObj={member} onUpdate={OnUpdateTeams} />
              <Card.Body>
                <Card.Text>{member.first_name} {member.last_name} </Card.Text>
                <Card.Text>{member.role}</Card.Text>
              </Card.Body>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
