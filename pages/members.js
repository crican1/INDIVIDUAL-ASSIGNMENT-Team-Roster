import React, { useEffect, useState } from 'react';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMembers(user.uid).then(setMembers);
  }, []);

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  return (
    <div>
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
      ))}
    </div>
  );
}
