import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { GetCardsResponse, GetListsResponse } from "@lib/shared_types";

import type * as List from "@/components/CardList";
import { getCards, getLists } from "@/utils/client";

type CardContextType = {
  lists: List.CardListProps[];
  fetchLists: () => Promise<void>;
  fetchCards: () => Promise<void>;
};

const CardContext = createContext<CardContextType>({
  lists: [],
  fetchLists: async () => {},
  fetchCards: async () => {},
});

type CardProviderProps = {
  children: React.ReactNode;
};

export function CardProvider({ children }: CardProviderProps) {
  const [rawLists, setRawLists] = useState<GetListsResponse>([]);
  const [rawCards, setRawCards] = useState<GetCardsResponse>([]);

  const fetchLists = useCallback(async () => {
    try {
      const { data } = await getLists();
      setRawLists(data);
    } catch (error) {
      alert("Error: failed to fetch lists");
    }
  }, []);

  const fetchCards = useCallback(async () => {
    try {
      const { data } = await getCards();
      setRawCards(data);
    } catch (error) {
      alert("Error: failed to fetch cards");
    }
  }, []);

  const lists = useMemo(() => {
    const listMap = rawLists.reduce(
      (acc, list) => {
        acc[list.id] = { ...list, cards: [] };
        return acc;
      },
      {} as Record<string, List.CardListProps>,
    );
    for (const card of rawCards) {
      listMap[card.list_id].cards.push({
        ...card,
        listId: card.list_id,
      });
    }
    return Object.values(listMap);
  }, [rawCards, rawLists]);

  return (
    <CardContext.Provider
      value={{
        lists,
        fetchLists,
        fetchCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default function useCards() {
  return useContext(CardContext);
}
