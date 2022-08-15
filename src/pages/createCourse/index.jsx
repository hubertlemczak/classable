import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { STRING } from '../../utils/vars';
import { Create } from './components/Create';
import { Invite } from './components/Invite';
import { CreateCourseContainer, CreateCourseForm } from './styles/index.styled';

const defaultCreateCourseFields = {
  courseName: '',
  category: '',
  description: '',
  userId: '',
  users: [],
};

const CreateCourse = () => {
  const [formFields, setFormFields] = useState(defaultCreateCourseFields);
  const { courseName, category, description, userId } = formFields;

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormFields(defaultCreateCourseFields);
    navigate('/courses');
    console.log(e);
  };

  return (
    <>
      <NavBar />
      <CreateCourseForm onSubmit={handleSubmit}>
        <CreateCourseContainer>
          <Create props={{ courseName, category, description, handleChange }} />
          <Invite props={{ userId, handleChange }} />
        </CreateCourseContainer>

        <button type="submit">{STRING.CREATE_COURSE}</button>
      </CreateCourseForm>
    </>
  );
};

export default CreateCourse;
