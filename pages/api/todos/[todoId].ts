import { Todo } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

type ErrorResponse = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Todo | ErrorResponse | null>
) => {
  const todoId = Number(req.query.todoId);

  if (req.method === "GET") {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!Boolean(todo)) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(todo);
  }

  if (req.method === "PUT") {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data: req.body,
    });
    res.status(200).json(todo);
  }

  if (req.method === "DELETE") {
    const todo = await prisma.todo.delete({
      where: { id: todoId },
    });

    res.status(200).end();
  }
};

export default handler;
