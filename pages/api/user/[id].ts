// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

type UserResponse = {
  id: number;
  email: string;
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | {message:string}>
) {
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.query.id),
      },
      include:{
        groups:true,
        items:true
      }
    });

    if (user) {
      const { password, ...rest } = user;
      res.status(200).json(rest);
    }else{
        res.status(404).json({message:"User not found"})
    }
    
  }else{
    return
  }
}
