import { Item } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | Item[]>
) {
  if(req.method === "POST"){
    const item = await prisma.item.create({
      data:req.body
    })
    res.status(201).json(item);

  }else if(req.method === "GET"){
    const items = await prisma.item.findMany()
    res.status(200).json(items)
  }
  
}
