import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMemberDetails } from '../../api/mergedData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" style={{ width: '30rem' }}>
        <img src={memberDetails.image} alt={memberDetails.first_name} />
        <hr />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          First Name: {memberDetails.first_name}
          <hr />
          Last Name: {memberDetails.last_name}
          <hr />
          Role: {memberDetails.role}
          <hr />
          Team: {memberDetails.team}
        </h5>
      </div>
    </div>
  );
}
