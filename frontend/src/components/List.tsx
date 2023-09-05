import { useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button, Divider, Paper, Typography } from "@mui/material";

import Card, { type CardProps } from "./Card";
import CardDialog from "./CardDialog";

export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];
};

export default function CardList({ id, name, cards }: CardListProps) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);

  return (
    <>
      <Paper className="w-80 p-6">
        <Typography variant="h4">{name}</Typography>
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
