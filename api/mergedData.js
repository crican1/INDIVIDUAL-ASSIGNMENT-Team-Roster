import { getSingleMember } from './memberData';
import { deleteSingleTeam, getSingleTeam, getTeamMembers } from './teamData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      getSingleTeam(memberObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...memberObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)])
    .then(([teamObject, membersArray]) => {
      resolve({ ...teamObject, members: membersArray });
    }).catch((error) => reject(error));
});

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((membersArray) => {
    const deleteMemberPromises = membersArray.map((member) => deleteSingleTeam(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewMemberDetails,
  viewTeamDetails,
  deleteTeamMembers,
};
