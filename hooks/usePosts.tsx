/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";
import axios from "../lib/axios.config";

export default function usePosts() {
    const router = useRouter();
    const toast = useToast();

    const [deletingPost, setDeletingPost] = useState(false);
    const [addingPost, setAddingPost] = useState(false);

    const { data: posts, mutate: mutatePosts, error: errorFetchingPosts } = useSWR<Post[]>("/posts",
        async (url: string) => {
            const { data } = await axios.get<Post[]>(url);
            return data;
        }
    );

    const deletePost = async (postId: number) => {
        setDeletingPost(true);
        try {
            await axios.delete(`/posts/${postId}`);
            const updatedPosts = posts?.filter((post) => post.id !== postId);
            mutatePosts(updatedPosts);
            toast.show("Post deleted successfully", {
                type: 'success'
            });
            router.push("/posts");
        } catch (error) {
            console.log(error);
            toast.show("An error occurred while deleting post", {
                type: 'danger'
            });
        } finally {
            setDeletingPost(false);
        }
    }

    const addPost = async (post: {
        title: string,
        body: string
    }) => {
        setAddingPost(true);
        try {
            const { data } = await axios.post("/posts", post);
            console.log("data from adding post : ", data);

            mutatePosts([{
                ...data,
                isCustom: true
            }, ...(posts || [])], false);

            toast.show("Post added successfully", {
                type: 'success'
            });
            router.push("/posts");
        } catch (error) {
            console.log(error);
            toast.show("An error occurred while adding post", {
                type: 'danger'
            });
        } finally {
            setAddingPost(false);
        }
    }

    return {
        posts,
        fetchingPosts: !posts && !errorFetchingPosts,
        deletePost,
        deletingPost,
        addingPost,
        addPost
    }

}