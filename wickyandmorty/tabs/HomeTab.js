import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator >
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Buscador de Gifs" }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({route}) => ({
          title: "Detall de Gif",
          headerLeft: () => <BackButton />,
          headerRight: () => <LikeButton route={route} />,
        })}
      /> */}
    </Stack.Navigator>
  );
}
