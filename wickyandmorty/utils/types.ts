import { Post } from "./SupabaseApi";

// navigationTypes.ts
export type RootStackParamList = {
  Home: undefined;
  PostDetailScreen: { post: Post };
  SearchScreen: undefined;
  UserProfile: { userId: string };
  UsersProfiles: { userId: string };
  MainPage: undefined;
  
};

// Somewhere in your project, possibly in the RootNavigator file
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}