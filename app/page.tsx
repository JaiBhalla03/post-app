'use client'
import CreatePost from './components/AddPost'
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Post from "./components/Post";
import {PostType} from "@/app/types/Posts";

const allPosts = async ()=>{
    const response = await axios.get("/api/posts/getPost")
    return response.data
}

export default function Home() {
    const {data, error, isLoading } = useQuery<PostType[]>({
        queryFn: allPosts,
        queryKey: ["posts"],
    })
    // if(error) return error
    // if(isLoading) return "Loading..."
    console.log(data)
  return (
    <main>
      <h1>Hello next</h1>
        <CreatePost/>
        {
            data?.map((post)=>(
                <Post
                    comments={post.Comment}
                    key={post.id}
                    name={post.user.name}
                    avatar={post.user.image}
                    postTitle={post.title}
                    id={post.id}
                />
            ))
        }
    </main>
  )
}
