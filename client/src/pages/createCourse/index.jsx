import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../client';
import NavBar from '../../components/NavBar';
import { STRING } from '../../utils/vars';
import { Create } from './components/Create';
import { Invite } from './components/Invite';
import { CreateCourseContainer, CreateCourseForm } from './styles/index.styled';

const defaultCreateCourseFields = {
  name: '',
  category: '',
  description: '',
  userId: '',
  users: [],
};

const CreateCourse = () => {
  const [formFields, setFormFields] = useState(defaultCreateCourseFields);
  const [error, setError] = useState('');
  const { name, category, description, userId } = formFields;

  const navigate = useNavigate();

  const handleChange = e => {
    if (error) setError('');
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      await client.post('/courses', {
        name,
        category,
        description,
      });

      setFormFields(defaultCreateCourseFields);
      navigate('/courses');
    } catch (err) {
      setError('error');
      console.error(err);
    }
  }

  return (
    <>
      <NavBar />
      <CreateCourseForm onSubmit={handleSubmit}>
        <CreateCourseContainer>
          <Create {...{ name, category, description, handleChange }} />
          <Invite {...{ userId, handleChange }} />
        </CreateCourseContainer>

        <button type="submit">{STRING.CREATE_COURSE}</button>
      </CreateCourseForm>
    </>
  );
};

export default CreateCourse;
