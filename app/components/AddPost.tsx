'use client'

import {useState} from "react";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import toast from "react-hot-toast";

export default function CreatePost(){
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let toastPostID: string
    // creating a posts
    const { mutate } = useMutation(
        async (title: string) =>
            await axios.post("/api/posts/addPost", {
                title,
            }),
        {
            onError: (error) => {
                toast.error(error?.response?.data.message, {id: toastPostID})
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success("Post has been made 🔥", {id: toastPostID})
                queryClient.invalidateQueries(["posts"])
                setTitle("")
                setIsDisabled(false)
            },
        }
    )
    const submitPost = async(e:React.FormEvent)=>{
        e.preventDefault()
        toastPostID = toast.loading("Creating your post")
        setIsDisabled(true)
        mutate(title)
    }
    return (
        <form className={'bg-white my-8 p-8 rounded-md'} onSubmit={submitPost}>
            <div className={'flex flex-col my-4'}>
                <textarea
                    name={'title'}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder={'Whats on yours mind?'}
                    className={'p-4 text-lg rounded-md my-2 bg-gray-200'}
                />
            </div>
            <div className={'flex items-center justify-center justify-between gap-2'}>
                <p
                    className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-400"}`}
                >{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className={"text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"}
                    type={"submit"}
                >
                    Create a Post
                </button>
            </div>
        </form>
    )
}