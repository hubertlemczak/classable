import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import client from '../../../client';
import { StyledMdContainer } from '../index.styled';

const NoteView = () => {
  const [note, setNote] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { noteId } = useParams();

  useEffect(() => {
    async function getNote() {
      try {
        const res = await client.get(`/notes/${noteId}`);
        setNote(res.data.note);
      } catch (err) {
        console.error(err);
      }
    }

    getNote();
  }, [noteId]);

  async function handleEdit(e) {
    const { name, value } = e.target;
    console.log(name, value);

    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <input
          className="-ml-2 p-2 rounded-md text-4xl font-bold "
          type="text"
          name="title"
          onBlur={handleEdit}
          defaultValue={note.title}
          autoFocus
        />
      ) : (
        <h1
          className="inline-block -ml-2 p-2 rounded-md text-4xl font-bold hover:bg-gray-200"
          onClick={() => setIsEditing(true)}
        >
          {note.title}
        </h1>
      )}
      <StyledMdContainer>
        <ReactMarkdown key={note.id}>{note.content}</ReactMarkdown>
      </StyledMdContainer>
    </div>
  );
};

export default NoteView;
