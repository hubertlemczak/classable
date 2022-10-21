import { Route, Routes } from 'react-router-dom';

import Resources from './components';
import BoardView from './components/BoardView';
import NoteView from './components/NoteView';

const ResourcesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Resources />} />
      <Route path="notes/:noteId" element={<NoteView />} />
      <Route path="boards/:boardId" element={<BoardView />} />
    </Routes>
  );
};

export default ResourcesRoutes;

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
