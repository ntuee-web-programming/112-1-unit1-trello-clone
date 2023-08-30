import { useState } from "react";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  Paper,
  Typography,
} from "@mui/material";

export type CardProps = {
  id: string;
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  const [open, setOpen] = useState(true);
  const [edittingTitle, setEdittingTitle] = useState(false);
  const [edittingDescription, setEdittingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleClickOpen = () => {
    setOpen(true);
    setEdittingTitle(false);
    setEdittingDescription(false);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTitle(title);
    setNewDescription(description);
  };

  const handleSave = () => {
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex gap-4">
          {edittingTitle ? (
            <ClickAwayListener onClickAway={() => setEdittingTitle(false)}>
              <Input
                autoFocus
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
                className="grow"
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingTitle(true)}
              className="w-full hover:bg-white/10 p-2 rounded-md"
            >
              <Typography className="text-start">{newTitle}</Typography>
            </button>
          )}
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="w-[600px]">
          <DialogContentText id="alert-dialog-slide-description">
            {edittingDescription ? (
              <ClickAwayListener
                onClickAway={() => setEdittingDescription(false)}
              >
                <textarea
                  className="bg-white/0 p-2"
                  autoFocus
                  defaultValue={description}
                  placeholder="Add a more detailed description..."
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <button
                onClick={() => setEdittingDescription(true)}
                className="w-full hover:bg-white/10 p-2 rounded-md"
              >
                <Typography className="text-start">{newDescription}</Typography>
              </button>
            )}
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleSave}>save</Button>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
