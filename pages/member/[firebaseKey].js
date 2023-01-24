// import React, { useEffect, useState } from 'react';
// import { useRouter } from "next/router";
// import { viewTeamDetails } from '../../api/mergedData';

// export default function ViewMember() {
//   const [memberDetails, setMemberDetails] = useState({});
//   const router = useRouter();
//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     viewMemberDetails(firebaseKey).then(setMemberDetails);
//   }, [firebaseKey]);

//   return (
//     <div className="mt-5 d-flex flex-wrap">
//       <div className="d-flex flex-column">
//         <img src={memberDetails.image} alt={memberDetails.title} style={{ width: '300px' }} />
//       </div>
//       <div className="text-white ms-5 details">
//         <h5>
//           {memberDetails.memberObject?.first_name} {memberDetails.memberObject?.last_name}
//         </h5>
//         Member Role: {memberDetails.memberObject?.role}
//         <hr />
//       </div>
//     </div>
//   );
// }
