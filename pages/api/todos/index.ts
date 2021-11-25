import { Todo } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Todo | Todo[]>
) => {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const todo = await prisma.todo.create({
      data: req.body,
    });
    res.status(200).json(todo);
  }
};

export default handler;
