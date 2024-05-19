import { Session } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { supabase } from "./clientSupabase";

export interface UserProfile {
    username: String;
    avatarUrl?: String;
}

export interface UserInfo {
    session: Session | null;
    profile: UserProfile | null;
}

const UserContext = createContext<UserInfo>({
    session: null,
    profile: null,
});

export function AuthProvider({ children }: {children: ReactNode}) {
    const [userInfo, setUserInfo] = useState({
        session: null,
        profile: null,
    })

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUserInfo({ ...userInfo, session });
        });
        supabase.auth.onAuthStateChange((_event, session ) => {
            setUserInfo({ session, profile: null });
        });
    }, []);

    const getProfile = async () => {
        if (!userInfo.session) return;
        const {data, error} = await supabase.from('profiles').select('*').eq('id', userInfo.session.user.id)
        if (error) {
            console.log(error)
        } else {
            setUserInfo({ ...userInfo, profile: data[0] });
        }
    };

    useEffect(() => {
        getProfile();
    }, [userInfo.session])

    return (
        <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
    );
}

export function useUserInfo() {
    return useContext(UserContext);
}