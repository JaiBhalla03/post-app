// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {method} = req;
    if(method === "GET"){
        try{
            const data = await prisma.post.findUnique({
                where:{
                    id: req.query.details
                },
                include:{
                    user: true,
                    Comment: {
                        orderBy:{
                            createdAt: "desc"
                        },
                        include:{
                            user:true,
                        }
                    }
                }
            })
            return res.status(200).json(data)
        }
        catch(err){
            res.status(403).json({error: "error occured while getting the auth user"})
        }
    }
}
