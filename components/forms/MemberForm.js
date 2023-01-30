import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';
// import { getTeams } from '../../api/teamData';

const initialState = {
  image: '',
  first_name: '',
  last_name: '',
  role: '',
  team_id: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth;

  useEffect(() => {
    // getTeams(user).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push('/members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Member</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} A Member</h2>
        <FloatingLabel controlId="floatinginput1" label="Member Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatinginput1" label="Member First Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="first_name"
            value={formInput.first_name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatinginput1" label="Member Last Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="last_name"
            value={formInput.last_name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatinginput1" label="Member Role" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        {/* <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="team_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.team_id}
            required
          >
            <option value="">Select a Team</option>
            {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel> */}
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} A Member</Button>
      </Form>
    </>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
export default MemberForm;
