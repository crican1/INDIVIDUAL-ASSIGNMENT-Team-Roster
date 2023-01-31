import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';
import { getSingleTeam } from '../api/teamData';

function MemberCard({ memberObj, onUpdate }) {
  const [memberDetails, setMemberDetails] = useState([]);

  useEffect(() => {
    getSingleTeam(memberObj.team_id).then(setMemberDetails);
  }, [memberObj.team_id]);

  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.first_name}${memberObj.last_name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.first_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{memberDetails.team_name}</Card.Title>
        <Card.Text>{memberObj.first_name} {memberObj.last_name}</Card.Text>
        <Card.Text>{memberObj.role}</Card.Text>
        <Link href={`/member/${memberObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    team_name: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
