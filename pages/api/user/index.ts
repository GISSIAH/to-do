// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import { group } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

type UserResponse = {
    id: number;
    email: string;
    username: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | UserResponse[]>
) {
  if(req.method === "POST"){
    const user = await prisma.user.create({
      data:req.body
    })
    const {password, ...rest} = user
    res.status(201).json(rest);

  }else if(req.method === "GET"){
    const users = await prisma.user.findMany({
    })
    const resUsers = users.map((user)=>{
        const {password, ...rest} = user

        return rest
    })
    res.status(200).json(resUsers)
  }
  
}
