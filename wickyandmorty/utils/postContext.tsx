import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../utils/clientSupabase";
import { fetchPosts, Post } from "../utils/SupabaseApi";

interface PostsContextProps {
  posts: Post[];
  addPost: (post: Post) => void;
  refreshPosts: () => void;
}

export const PostsContext = createContext<PostsContextProps | undefined>(
  undefined
);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = async () => {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  };

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, refreshPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
