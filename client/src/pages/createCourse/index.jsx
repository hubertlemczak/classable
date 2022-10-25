import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import client from '../../client';
import supabase, { supabaseUrl } from '../../client/supabase';
import NavBar from '../../components/NavBar';
import { STRING } from '../../utils/vars';
import { Create } from './components/Create';
import { Invite } from './components/Invite';
import { CreateCourseContainer, CreateCourseForm } from './styles/index.styled';

const defaultCreateCourseFields = {
  name: '',
  category: '',
  description: '',
  users: [],
};

const CreateCourse = () => {
  const [formFields, setFormFields] = useState(defaultCreateCourseFields);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = e => {
    if (error) setError('');
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const file = e.target.courseAvatar.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uniqid()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      const createCourseData = {
        ...formFields,
        image: supabaseUrl + '/storage/v1/object/public/images/' + filePath,
      };

      console.log(data, error);
      await client.post('/courses', createCourseData);

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
          <Create {...{ ...formFields, handleChange }} />
          <Invite {...{ formFields, setFormFields }} />
        </CreateCourseContainer>

        <button type="submit">{STRING.CREATE_COURSE}</button>
      </CreateCourseForm>
    </>
  );
};

export default CreateCourse;
