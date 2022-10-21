export type TRow = {
  boardColumnId: string;
  createdAt: string;
  id: string;
  position: number;
  title: string;
  udpatedAt: string;
  content: string;
};

export type TColumn = {
  boardId: string;
  createdAt: string;
  id: string;
  position: number;
  title: string;
  udpatedAt: string;
  rows: TRow[];
};
