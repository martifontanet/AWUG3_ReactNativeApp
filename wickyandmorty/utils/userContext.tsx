import { Session } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./clientSupabase";
import { Profile } from "./SupabaseApi";
import { Alert } from "react-native";

export interface UserInfo {
  session: Session | null;
  profile: Profile | null;
  loading?: boolean;
  avatarUpdated: boolean;
  saveProfile?: (updatedProfile: Profile) => void;
  setAvatarUpdated?: (updated: boolean) => void;
  signOut?: () => void;
}

const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
  avatarUpdated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    session: null,
    profile: null,
    avatarUpdated: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserInfo(prevState => ({ ...prevState, session }));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo(prevState => ({ ...prevState, session, profile: null }));
    });
  }, []);

  const getProfile = async () => {
    if (!userInfo.session) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userInfo.session.user.id);
    if (error) {
      console.log(error);
    } else {
      setUserInfo(prevState => ({ ...prevState, profile: data[0] }));
    }
  };

  useEffect(() => {
    getProfile();
  }, [userInfo.session]);

  const saveProfile = async (updatedProfile: Profile) => {
    setLoading(true);

    try {
      if (updatedProfile.avatar_url && userInfo.avatarUpdated) {
        const { avatar_url } = updatedProfile;

        const fileExt = avatar_url.split(".").pop();
        const fileName = avatar_url.replace(/^.*[\\\/]/, "");
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: avatar_url,
          name: fileName,
          type: `image/${fileExt}`,
        } as unknown as Blob;
        formData.append("file", photo);

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, formData);

        if (uploadError) throw uploadError;

        updatedProfile.avatar_url = filePath;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: updatedProfile.username,
          avatar_url: updatedProfile.avatar_url,
        })
        .eq("id", userInfo?.profile?.id);

      if (updateError) throw updateError;

      await getProfile();

      // Reset avatarUpdated to false
      setUserInfo(prevState => ({ ...prevState, avatarUpdated: false }));

    } catch (error: any) {
      Alert.alert("Server Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserInfo({
      session: null,
      profile: null,
      avatarUpdated: false,
    });
  };

  return (
    <UserContext.Provider value={{
      ...userInfo,
      loading,
      saveProfile,
      setAvatarUpdated: (updated: boolean) => setUserInfo(prevState => ({ ...prevState, avatarUpdated: updated })),
      signOut,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserInfo() {
  return useContext(UserContext);
}
