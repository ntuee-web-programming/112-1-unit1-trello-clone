import { useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Typography,
} from "@mui/material";

type NewCardDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
};

type EditCardDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (title: string, description: string) => void;
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function CardDialog(props: CardDialogProps) {
  const { variant, open, onClose, onSave } = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";

  const [edittingTitle, setEdittingTitle] = useState(variant === "new");
  const [edittingDescription, setEdittingDescription] = useState(
    variant === "new",
  );
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleClose = () => {
    onClose();
    if (variant === "edit") {
      setNewTitle(props.title);
      setNewDescription(props.description);
    }
  };

  const handleSave = () => {
    onSave(newTitle, newDescription);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {edittingTitle ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingTitle(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow"
              placeholder="Enter a title for this card..."
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
        {variant === "edit" && (
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="w-[600px]">
        {edittingDescription ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingDescription(false);
              }
            }}
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
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
