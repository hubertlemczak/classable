import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import client from '../../../client';
import { useLoggedInUser } from '../../../context/LoggedInUser';
import ResourceSection from './ResourceSection';

const Resources = () => {
  const [boards, setBoards] = useState([]);
  const [notes, setNotes] = useState([]);

  const { user } = useLoggedInUser();

  let sortedBoards = [...boards];
  let sortedNotes = [...notes];

  let yourBoards = sortedBoards.filter(board => board.userId === user.id);
  let yourNotes = sortedNotes.filter(note => note.userId === user.id);
  let communityBoards = sortedBoards.filter(board => board.userId !== user.id);
  let communityNotes = sortedNotes.filter(note => note.userId !== user.id);

  const { courseName } = useParams();
  const formattedCourseName = courseName.replace('-', ' ');

  useEffect(() => {
    async function getNotes() {
      try {
        const res = await client.get(
          `/notes?courseName=${formattedCourseName}`
        );
        setNotes(res.data.notes);
      } catch (err) {
        console.error(err);
      }
    }

    async function getBoards() {
      try {
        const res = await client.get(
          `/boards?courseName=${formattedCourseName}`
        );
        setBoards(res.data.boards);
      } catch (err) {
        console.error(err);
      }
    }

    getNotes();
    getBoards();
  }, []);

  const handeSubmit = async e => {
    e.preventDefault();

    const createNoteData = {
      name: formattedCourseName,
      content: e.target.content.value,
    };

    try {
      const res = await client.post('/notes', createNoteData);

      setNotes(prev => [res.data.note, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handeSubmit}>
        <textarea name="content" cols="30" rows="10"></textarea>
        <button>Submit</button>
      </form>
      <ResourceSection
        create="Board"
        path="boards"
        title="Your Boards"
        resource={yourBoards}
      />
      <ResourceSection
        create="Note"
        path="notes"
        title="Your Notes"
        resource={yourNotes}
      />
      <ResourceSection
        path="boards"
        title="Community Boards"
        resource={communityBoards}
      />
      <ResourceSection
        path="notes"
        title="Community Notes"
        resource={communityNotes}
      />
    </div>
  );
};

export default Resources;

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
