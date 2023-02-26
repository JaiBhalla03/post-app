'use client'

import Post from '../../components/Post'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {PostType} from "@/app/types/Post";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";


const fetchDetails = async(slug: string)=>{
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

type URL = {
    params: {
        slug: string
    }
}

export default function PostDetail(url: URL){
    const {data, isLoading} = useQuery<PostType[]>({
            queryKey: ['detail-post'],
            queryFn: ()=> fetchDetails(url.params.slug)
    })
    if(isLoading) return <h1>Loading...</h1>
    console.log(data)
    return (
        <div>
            <Post
                id={data.id}
                name={data.user.name}
                avatar={data.user.image}
                postTitle={data.title}
                comments={data.Comment}
            />
            <AddComment id={data?.id}/>
            {data?.Comment?.map((comment)=>(
                <div key={comment.id} className={'my-6 bg-white p-8 rounded-md'}>
                    <div className={'flex items-center gap-2'}>
                        <Image src={comment.user?.image} alt={''} width={24} height={24} className={'rounded-full'}/>
                        <h3 className={'font-bold'}>{comment?.user?.name}</h3>
                        <h3 className={'text-sm'}>{comment.createdAt}</h3>
                    </div>
                    <div className={"py-4"}>{comment.message}</div>
                </div>
            ))}
        </div>
    )
}