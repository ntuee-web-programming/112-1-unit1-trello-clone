import { useRef, useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Input,
  Paper,
  Typography,
} from "@mui/material";

import Card, { type CardProps } from "./Card";
import CardDialog from "./CardDialog";
import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";

export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];
};

export default function CardList({ id, name, cards }: CardListProps) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="w-80 p-6">
        <div className="flex gap-4">
          {edittingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a new name for this list..."
                sx={{ fontSize: "2rem" }}
                inputRef={inputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingName(true)}
              className="w-full hover:bg-white/10 p-2 rounded-md"
            >
              <Typography className="text-start" variant="h4">
                {name}
              </Typography>
            </button>
          )}
          <div className="grid place-items-center">
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
          <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a card
          </Button>
        </div>
      </Paper>
      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      />
    </>
  );
}
