import { useMemo, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import HeaderBar from "./components/HeaderBar";
import CardList, { CardListProps } from "./components/List";

const mockLists = [
  {
    id: "list-1",
    name: "List 1",
  },
  {
    id: "list-2",
    name: "List 2",
  },
];

const mockCards = [
  {
    id: "card-1",
    title: "Card 1",
    description: "This is card 1",
    list_id: "list-1",
  },
  {
    id: "card-2",
    title: "Card 2",
    description: "This is card 2",
    list_id: "list-1",
  },
  {
    id: "card-3",
    title: "Card 3",
    description: "This is card 3",
    list_id: "list-2",
  },
];

function App() {
  const lists = useMemo(() => {
    const listMap = mockLists.reduce(
      (acc, list) => {
        acc[list.id] = { ...list, cards: [] };
        return acc;
      },
      {} as Record<string, CardListProps>,
    );
    for (const card of mockCards) {
      listMap[card.list_id].cards.push(card);
    }
    return Object.values(listMap);
  }, []);

  const [newListDialogOpen, setNewListDialogOpen] = useState(false);

  return (
    <>
      <HeaderBar />
      <main className="mx-auto px-24 max-h-full py-12 flex flex-row gap-6">
        {lists.map((list) => (
          <CardList key={list.id} {...list} />
        ))}
        <div>
          <Button
            variant="contained"
            className="w-80"
            onClick={() => setNewListDialogOpen(true)}
          >
            <AddIcon className="mr-2" />
            Add a list
          </Button>
        </div>
        <Dialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        >
          <DialogTitle>Add a list</DialogTitle>
          <DialogContent>
            <TextField label="List Name" variant="outlined" sx={{ mt: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button>add</Button>
            <Button onClick={() => setNewListDialogOpen(false)}>cancel</Button>
          </DialogActions>
        </Dialog>
      </main>
    </>
  );
}

export default App;
