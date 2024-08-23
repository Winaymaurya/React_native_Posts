import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {AuthProvider} from '../context/authContext'
export default function RootLayout() {

  // 
  return (
    <AuthProvider>
 
    <Stack>
      <Stack.Screen name="(tabs)" options={
        {headerShown:false }
      } />
      <Stack.Screen name="(auth)" options={
        {headerShown:false }
      } />
        <Stack.Screen
          name="index"
          options={{ headerShown: false , title:"Welcome" }} 
          />
    </Stack>
  </AuthProvider>
  );
}
