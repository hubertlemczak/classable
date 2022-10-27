import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { ReactComponent as EDITSVG } from '../../../../assets/icons/bxs-edit.svg';

import client from '../../../../client';
import { StyledMdContainer } from '../index.styled';

const Note = () => {
  const [note, setNote] = useState({});
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

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

  async function handleEditTitle(e) {
    e.preventDefault();

    const newTitle = e.target.value;

    if (newTitle === note.title) return setIsEditingTitle(false);
    if (!newTitle) return setIsEditingTitle(false);

    try {
      await client.patch(`/notes/${note.id}`, {
        title: newTitle,
      });

      setNote(prev => ({ ...prev, title: newTitle }));
      setIsEditingTitle(false);
    } catch (err) {
      console.error(err);
      setIsEditingTitle(false);
    }
  }

  async function handeEditContent(e) {
    e.preventDefault();

    const newContent = e.target?.content?.value || e.target.value;

    if (newContent === note.content) return setIsEditingContent(false);
    if (!newContent) return setIsEditingContent(false);

    try {
      await client.patch(`/notes/${note.id}`, {
        content: newContent,
      });

      setNote(prev => ({ ...prev, content: newContent }));
      setIsEditingContent(false);
    } catch (err) {
      console.error(err);
      setIsEditingContent(false);
    }
  }

  const rowLength = () => {
    const newLines = note.content?.split('\n')?.length || 5;
    return Math.ceil(newLines + newLines / 5);
  };

  return (
    <div>
      {isEditingTitle ? (
        <input
          className="-ml-2 p-2 rounded-md text-4xl font-bold "
          type="text"
          name="title"
          onBlur={handleEditTitle}
          defaultValue={note.title}
          autoFocus
        />
      ) : (
        <h1
          className="inline-block -ml-2 p-2 rounded-md text-4xl font-bold hover:bg-gray-200"
          onClick={() => setIsEditingTitle(true)}
        >
          {note.title}
        </h1>
      )}
      <div>
        <div className="flex justify-end">
          <EDITSVG onClick={() => setIsEditingContent(true)} />
        </div>

        {isEditingContent ? (
          <form onBlur={handeEditContent} onSubmit={handeEditContent}>
            <textarea
              className="w-full h-max p-2"
              name="content"
              rows={rowLength()}
              defaultValue={note.content}
              autoFocus
            ></textarea>
            <button
              className="rounded-md border bg-primary hover:bg-primaryHover px-3 py-1 mr-1"
              type="submit"
            >
              Save
            </button>
            <button
              className="rounded-md px-3 py-1 hover:bg-gray-300"
              type="button"
              onClick={() => setIsEditingContent(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <StyledMdContainer>
            <ReactMarkdown key={note.id}>{note.content}</ReactMarkdown>
          </StyledMdContainer>
        )}
      </div>
    </div>
  );
};

export default Note;
