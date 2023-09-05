import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { CardData, ListData } from "@lib/shared_types";

import type { CardListProps } from "@/components/List";
import { getCards, getLists } from "@/utils/client";

type CardContextType = {
  lists: CardListProps[];
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
  const [rawLists, setRawLists] = useState<ListData[]>([]);
  const [rawCards, setRawCards] = useState<CardData[]>([]);

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
      {} as Record<string, CardListProps>,
    );
    for (const card of rawCards) {
      listMap[card.list_id].cards.push(card);
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
