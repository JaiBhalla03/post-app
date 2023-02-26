'use client'

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {AuthPost} from "@/app/types/AuthPost";
import EditPost from "@/app/dashboard/EditPost";

const fetchAuthPosts = async()=>{
    const response = await axios.get("/api/posts/authPost")
    return response.data;
}

export default function MyPost(){
    const {data, isLoading} = useQuery<AuthPost>({
            queryFn: fetchAuthPosts,
            queryKey: ["auth-posts"]
    })
    if(isLoading){
        return <h1>Loading...</h1>
    }
    console.log(data)
    return (
        <div>
            {
                data?.post?.map((post)=><EditPost
                    id={post.id}
                    key={post.id}
                    avatar={data.image}
                    name={data.name}
                    title={post.title}
                    comments={post.Comment}
                />)
            }
        </div>
    )
}