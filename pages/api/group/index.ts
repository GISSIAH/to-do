// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Group } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Group | Group[]>
) {
  if(req.method === "POST"){
    const group = await prisma.group.create({
      data:req.body
    })
    res.status(201).json(group);

  }else if(req.method === "GET"){
    const groups = await prisma.group.findMany()
    res.status(200).json(groups)
  }
  
}
