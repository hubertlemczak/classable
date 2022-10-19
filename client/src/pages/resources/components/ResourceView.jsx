import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import client from '../../../client';
import { StyledMdContainer } from '../index.styled';

const ResourceView = () => {
  const [note, setNote] = useState({});

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

  return (
    <div>
      <h1 className="text-4xl font-bold">{note.title}</h1>
      <StyledMdContainer>
        <ReactMarkdown key={note.id}>{note.content}</ReactMarkdown>
      </StyledMdContainer>
    </div>
  );
};

export default ResourceView;
