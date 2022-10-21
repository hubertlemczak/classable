import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { ReactComponent as EDITSVG } from '../../../../../assets/bxs-edit.svg';

import { StyledMdContainer } from '../../index.styled';

import client from '../../../../../client';

import BoardRowMenu from './BoardRowMenu';

const RowView = ({ content, title, id, setIsRowOpen, board, setBoard }) => {
  const [rowContent, setRowContent] = useState(content);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  async function handleEdit(e) {
    const title = e.target.value;

    if (!title) return setIsEditingTitle(false);

    try {
      await client.patch(`/board-rows/${id}`, {
        title,
      });

      const newColumns = board.columns.map(column => {
        column.rows = column.rows.map(row => {
          if (row.id === id) {
            row.title = title;
            return row;
          }
          return row;
        });

        return column;
      });

      setBoard(prev => ({ ...prev, columns: newColumns }));
      setIsEditingTitle(false);
    } catch (err) {
      console.error(err);
      setIsEditingTitle(false);
    }
  }

  async function handeSubmit(e) {
    e.preventDefault();

    const newContent = e.target?.content?.value || e.target.value;

    if (newContent === rowContent) return setIsEditingContent(false);
    if (!newContent) return setIsEditingContent(false);

    try {
      await client.patch(`/board-rows/${id}`, {
        content: newContent,
      });

      setRowContent(newContent);
      setIsEditingContent(false);
    } catch (err) {
      console.error(err);
      setIsEditingContent(false);
    }
  }

  const rowLength = () => {
    const newLines = rowContent?.split('\n')?.length || 5;
    return Math.ceil(newLines + newLines / 5);
  };

  return (
    <div
      className="fixed w-full inset-0 bg-black bg-opacity-50 overflow-y-scroll z-50"
      id=""
      onClick={() => setIsRowOpen(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-sm max-w-3xl w-11/12 min-h-full p-4 md:p-8"
      >
        <div>
          {isEditingTitle ? (
            <input
              className="-ml-2 p-2 rounded-md text-4xl font-bold "
              type="text"
              name="title"
              onBlur={handleEdit}
              defaultValue={title}
              autoFocus
            />
          ) : (
            <div className="flex items-center justify-between mb-5">
              <h1
                className="inline-block -ml-2 p-2 rounded-md text-4xl font-bold hover:bg-gray-200"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h1>

              <BoardRowMenu {...{ id, board, setBoard, setIsRowOpen }} />
            </div>
          )}
          <div>
            <div className="flex justify-end">
              <EDITSVG onClick={() => setIsEditingContent(true)} />
            </div>
            {isEditingContent ? (
              <form onBlur={handeSubmit} onSubmit={handeSubmit}>
                <textarea
                  className="w-full h-max"
                  name="content"
                  rows={rowLength()}
                  defaultValue={rowContent}
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
                <ReactMarkdown key={id}>{rowContent}</ReactMarkdown>
              </StyledMdContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RowView;
