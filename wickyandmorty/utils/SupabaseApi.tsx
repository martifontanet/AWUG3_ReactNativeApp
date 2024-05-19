import { supabase } from "./clientSupabase";

export const fetchPosts = async () => {
    const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", {
        ascending: false,
    });

    if (error) {
        console.log(error);
        return [];
    } else {
        return data;
    }
};

export type Posts = Awaited<ReturnType<typeof fetchPosts>>;
export type Post = Posts[number];

export const fetchLikes = async (postId: string) => {
    const { data, error } = await supabase
        .from('post_likes')
        .select('user_id, id')
        .eq('post_id', postId);

    if (error) {
        console.log('error', error);
        return[];
    } else {
        return data;
    }
};

export type Likes = Awaited<ReturnType<typeof fetchLikes>>;
export type Like = Likes[number];
