// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {method} = req;
    if(method === "GET"){
        try{
            const data = await prisma.post.findMany({
                include:{
                    user: true,
                    Comment: true,
                },
                orderBy:{
                    createdAt: 'desc'
                }
            })
            res.status(200).json(data)
        }
        catch(err){
            res.status(403).json({error: "error fetching the posts"})
        }
    }
}
