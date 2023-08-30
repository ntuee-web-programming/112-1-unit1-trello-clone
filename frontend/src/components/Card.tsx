import { useState } from "react";

import { Paper } from "@mui/material";

import CardDialog from "./CardDialog";

export type CardProps = {
  id: string;
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = (newTitle: string, newDescription: string) => {
    console.log(newTitle);
    console.log(newDescription);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="w-full p-2 flex flex-col" elevation={6}>
          {title}
        </Paper>
      </button>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        title={title}
        description={description}
      />
    </>
  );
}
