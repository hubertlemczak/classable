import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import client from '../../../client';
import { useLoggedInUser } from '../../../context/LoggedInUser';
import ResourceSection from './ResourceSection';

function sortResource(resource, user) {
  let sortedResource = [...resource];

  let yourResource = sortedResource.filter(
    resource => resource.userId === user.id
  );

  let communityResource = sortedResource.filter(
    resource => resource.userId !== user.id
  );

  let starredResource = sortedResource.filter(resource =>
    resource.stars.find(star => star.userId === user.id)
  );

  return [yourResource, communityResource, starredResource];
}

const Resources = () => {
  const [boards, setBoards] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useLoggedInUser();

  const [yourBoards, communityBoards, starredBoards] = sortResource(
    boards,
    user
  );
  const [yourNotes, communityNotes, starredNotes] = sortResource(notes, user);

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

    setIsLoading(true);
    getNotes();
    getBoards();
    setIsLoading(false);
  }, []);

  if (isLoading) return;

  return (
    <div className="relative">
      {starredBoards.length > 0 && (
        <ResourceSection
          path="boards"
          title="Starred Boards"
          resource={starredBoards}
        />
      )}
      {starredNotes.length > 0 && (
        <ResourceSection
          path="notes"
          title="Starred Notes"
          resource={starredNotes}
        />
      )}
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
        name
      />
      <ResourceSection
        path="notes"
        title="Community Notes"
        resource={communityNotes}
        name
      />
    </div>
  );
};

export default Resources;
