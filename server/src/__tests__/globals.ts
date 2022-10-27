import dbClient from '../utils/dbClient';

function deleteTables() {
  const deleteTables = [
    dbClient.user.deleteMany(),
    dbClient.course.deleteMany(),
    dbClient.chat.deleteMany(),
    dbClient.participant.deleteMany(),
  ];
  return dbClient.$transaction(deleteTables);
}

global.beforeEach(() => {
  return deleteTables();
});

global.afterAll(() => {
  return dbClient.$disconnect;
});
