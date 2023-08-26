export type CardData = {
  id: string;
  title: string;
  description: string;
  list_id: string;
};

export type ListData = {
  id: string;
  name: string;
  cards: CardData[];
};

export type CreateCardInput = Omit<CardData, "id">;

export type CreateCardOutput = Pick<CardData, "id">;

export type UpdateCardInput = Partial<Omit<CardData, "id">>;

export type UpdateCardOutput = "OK";

export type DeleteCardOutput = "OK";

export type CreateListInput = Omit<ListData, "id" | "cards">;

export type CreateListOutput = Pick<ListData, "id">;

export type UpdateListInput = Partial<Omit<ListData, "id" | "cards">>;

export type UpdateListOutput = "OK";

export type DeleteListOutput = "OK";
