import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';

const initialState = {
  image: '',
  first_name: '',
  last_name: '',
  role: '',
  firebaseKey: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth;

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
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
        .then(() => router.push(`/members/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload.firebaseKey).then(() => router.push(`/members/${obj.firebaseKey}`));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>
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
          name="image"
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: propTypes.string,
    first_name: propTypes.string,
    last_name: propTypes.string,
    role: propTypes.string,
    firebaseKey: propTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
export default MemberForm;
