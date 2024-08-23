import { View, Text, TextInput, StyleSheet, TouchableOpacity,Alert} from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import {AuthContext} from "../../context/authContext"
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignIn = () => {
 const [state ,setState]=useContext(AuthContext)


  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
  
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });
       
      
       
       
       Alert.alert("Success", data?.message);
       
       if(data?.success){
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
  
        // Update global state with user data
        setState((prevState) => ({
          ...prevState,
          user: data.user,
          token: data.token,
        }));
  
        // Navigate to Home page
          router.replace('/(tabs)/Home');
        }
      
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

 
  return (
   

   
    <View style={{
      padding: 25,
      backgroundColor: '',
      height: '100%',

    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" style={{ marginBottom: 80 }} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 28,
          textAlign: 'center',
        }}>Let's Sign You In</Text>
      <Text
        style={{
          fontSize: 24,
          color: Colors.gray,
          marginTop: 10,
          textAlign: 'center',
        }}>Welcome Back</Text>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,

          }}>Email</Text>
        <TextInput placeholder='Enter Email' style={styles.input}
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)} />
      </View>
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}>Password</Text>
        <TextInput placeholder='Enter Pasword' style={styles.input} secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)} />
      </View>



      <View>
        <TouchableOpacity style={styles.button}
          onPress={handleSubmit}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
            }}>LogIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            fontSize: 28,
            textAlign: 'center',
            borderWidth: 2,
            marginTop: '10%',
            padding: 8,
            borderRadius: 16,
          }}
          onPress={() => router.replace('/(auth)/SignUp')}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,

            }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: Colors.gray,
  },
  button: {
    marginTop: '20%',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 16,

  }
})

export default SignIn