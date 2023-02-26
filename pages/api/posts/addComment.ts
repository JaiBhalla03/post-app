// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getServerSession} from "next-auth/next";
import {authOptions} from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {method} = req;
    if(method === "POST"){
        const session = await getServerSession(req,res, authOptions)
        if(!session) return res.status(401).json({message: "Please sign in"})
        //get the user
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })
        //adding a comment
        try{
            const {title, postId} = req.body.data
            if(!title.length) return res.status(401).json({message: "Please enter something"})
            const result = await prisma.Comment.create({
                data:{
                    message: title,
                    userId: prismaUser?.id,
                    postId,
                },
            })
            res.status(200).json(result)
        }
        catch(err){
            res.status(403).json({error: "error occured while getting the auth user"})
        }
    }
}
