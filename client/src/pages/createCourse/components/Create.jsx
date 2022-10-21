import FormInput from '../../../components/form/FormInput';
import TextArea from '../../../components/form/TextArea';
import { STRING } from '../../../utils/vars';
import { CreateCourseFormContainer } from '../styles/index.styled';

export const Create = ({ name, category, description, handleChange }) => {
  return (
    <CreateCourseFormContainer>
      <h2>{STRING.CREATE_A_COURSE}</h2>

      <FormInput
        label="Course Name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Category"
        type="text"
        name="category"
        value={category}
        onChange={handleChange}
        required
      />
      <TextArea
        label="Description"
        name="description"
        value={description}
        onChange={handleChange}
        rows={10}
        required
      />
      <FormInput type="file" name="courseAvatar" accept="image/*" />
    </CreateCourseFormContainer>
  );
};
