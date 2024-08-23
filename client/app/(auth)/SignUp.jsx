import { View, Text, TextInput, StyleSheet,TouchableOpacity,Alert  } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios'
const SignUp = () => {
  const router=useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handelSubmit=async()=>{
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("http://192.168.63.6:8080/api/v1/user/register", {
        name,
        email,
        password,
      });
      Alert.alert("Success", data && data.message);
      console.log("Register Data==> ", { name, email, password });
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
      router.replace('/(auth)/SignIn');
    }
  }
 
  return (
    <View style={{
      padding:25,
      backgroundColor:Colors.white,
      height:'100%',

    }}>
      <TouchableOpacity onPress={()=>router.back()}>
<Ionicons name="arrow-back" size={24} color="black" style={{marginBottom:40}} />
</TouchableOpacity>
      <Text 
      style={{
        fontSize:28,
        textAlign:'center',
      }}>Create New Account</Text>
   

      <View
      style={{
        marginTop:30,
      }}
        >
        <Text
        style={{
          fontSize:18,
          
        }}>Email</Text>
        <TextInput placeholder='Enter Email' style={styles.input}
         autoComplete="email"
         value={email}
         onChangeText={(text) => setEmail(text)}/>
      </View>
      <View
      style={{
        marginTop:30,
      }}
        >
        <Text
        style={{
          fontSize:18,
        }}>Full Name</Text>
        <TextInput placeholder='Enter Name' style={styles.input}
           value={name}
           onChangeText={(text) => setName(text)}/>
      </View>
      <View
      style={{
        marginTop:30,
      }}
        >
        <Text
        style={{
          fontSize:18,
        }}>Password</Text>
        <TextInput placeholder='Enter Pasword' style={styles.input} secureTextEntry={true}
           value={password}
           onChangeText={(text) => setPassword(text)}/>
      </View>


      <View>
      <TouchableOpacity style={styles.button}
        onPress={handelSubmit}>
            <Text
             style={{
                color:'#fff',
                textAlign:'center',
                fontSize:18,
                
              }}> {loading ? "Please Wait..." : " Create Account"}</Text>
        </TouchableOpacity>
      <TouchableOpacity 
        style={{
          fontSize:28,
          textAlign:'center',
          borderWidth:2,
          marginTop:'10%',
          padding:8,
          borderRadius:16,
        }}
        onPress={()=>router.replace('/(auth)/SignIn')}>
            <Text
             style={{
                textAlign:'center',
                fontSize:18,
                
              }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  input:{
   padding:10,
   borderWidth:2,
   borderRadius:16,
   borderColor:Colors.gray,
  },
  button:{
   marginTop:'20%',
    padding:10,
    backgroundColor:'#000',
    borderRadius:16,

 }
})

export default SignUp