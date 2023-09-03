import CardModel from "../models/card";
import ListModel from "../models/list";
import { genericErrorHandler } from "../utils/errors";
import type { Request, Response } from "express";

import type { CreateListInput, UpdateListInput } from "@lib/shared_types";

// Get all lists
export const getLists = async (_: Request, res: Response) => {
  try {
    const lists = await ListModel.find({});

    // Return only the id and name of the list
    const listsToReturn = lists.map((list) => {
      return {
        id: list.id,
        name: list.name,
      };
    });

    return res.status(200).json(listsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a list
export const getList = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const lists = await ListModel.findById(id).populate("cards");
    if (!lists) {
      return res.status(404).json({ error: "id is not valid" });
    }
    return res.status(200).json(lists);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a list
export const createList = async (
  req: Request<never, never, CreateListInput>,
  res: Response,
) => {
  try {
    const list = await ListModel.create(req.body);
    return res.status(201).json(list);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a list
export const updateList = async (
  req: Request<{ id: string }, never, UpdateListInput>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Update the list
    const newList = await ListModel.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true },
    );

    // If the list is not found, return 404
    if (!newList) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a list
export const deleteList = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    // Delete the list
    const deletedList = await ListModel.findByIdAndDelete(id);

    // If the list is not found, return 404
    if (!deletedList) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // Delete all the cards in the list
    deletedList.cards.forEach(async (cardId) => {
      await CardModel.findByIdAndDelete(cardId);
    });

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
