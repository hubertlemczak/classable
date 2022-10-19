import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { StyledMdContainer } from './index.styled';

const Notes = () => {
  const [md, setMd] = useState('');
  console.log('[md]', md);

  const handeSubmit = e => {
    e.preventDefault();
    setMd(e.target.asd.value);
  };

  return (
    <div className="relative">
      <form onSubmit={handeSubmit}>
        <textarea name="asd" cols="30" rows="10"></textarea>
        <button>Submit</button>
      </form>
      <StyledMdContainer>
        <ReactMarkdown re>{md}</ReactMarkdown>
      </StyledMdContainer>
    </div>
  );
};

export default Notes;

// starred boards.length > 0 show

// create boards
// name, private/public
// create notes
// name, private/public

// # Frontend Mentor - Manage landing page solution

// This is a solution to the [Manage landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

// ## Overview

// ### The challenge

// Users should be able to:

// - View the optimal layout for the site depending on their device's screen size
// - See hover states for all interactive elements on the page
// - See all testimonials in a horizontal slider
// - Receive an error message when the newsletter sign up `form` is submitted if:
//   - The `input` field is empty
//   - The email address is not formatted correctly

// ### Links

// - [Solution](https://www.frontendmentor.io/solutions/responsive-landing-page-using-react-and-tailwindcss-CtWWit8fuW)
// - [Live Site](https://fem-manage-hubertlemczak.netlify.app/)

// ## My Process

// ### Built with

// - Mobile-first workflow thanks to [TailwindCSS](https://tailwindcss.com/) for styles
// - [React](https://reactjs.org/)

// ### Useful resources

// - [TailwindCSS](https://tailwindcss.com/) - I wish I found this framework earlier, it makes writing styles a much better experience. Tailwind lets you focus on important features and accelerates styling. Will definitely be using it going forward.

// ## Author

// - [Website](https://hubertlemczak.netlify.app)
// - Frontend Mentor [@hubertlemczak](https://www.frontendmentor.io/profile/hubertlemczak)
