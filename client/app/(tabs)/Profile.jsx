import { View, Text, TouchableOpacity, Alert,StyleSheet,ScrollView,Image,TextInput } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../context/authContext"
import React,{useContext,useState} from 'react'
import { useRouter } from 'expo-router'
import axios from 'axios';
const Profile = () => {
  const router=useRouter()
  const [state ,setState]=useContext(AuthContext)
  const { user, token } = state;
  //local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);
 
  //handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      
      // Sending update request
      const { data } = await axios.put("/user/update-user", {
        name,
        password,
        email,
      });
  
      console.log("API Response:", data);
  
      // Displaying success message
      if (data && data.message) {
        Alert.alert("Success", data.message);
      }
  
      // Updating state with updated user data
      if (data && data.updatedUser) {
        setState({ ...state, user: data.updatedUser });
        router.replace('/(auth)/SignIn')
      }
  
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  


  const handelLogout=async()=>{
   setState({token:'',user:''})
   await AsyncStorage.removeItem('@auth')
   Alert.alert("Logout Succesfull")
   router.replace('/');
  }
  return (
    <View style={{margin:10}}>
      <View style={styles.view}>
      <TouchableOpacity onPress={handelLogout} style={styles.button}>
        <Text style={{fontSize:15,color:'#fff'}}>Logout</Text></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warningtext}>
          Currently You Can Only Update Your Name And Password*
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Please Wait..." : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent:'center',
    widht:'100%',
    alignItems: 'flex-end',        
  },
  button: {
          
    paddingVertical: 12,         
    paddingHorizontal: 20,       
    backgroundColor: '#e74c3c',  
    borderRadius: 25,            
    width: 100,                 
    alignItems: 'center',        
    justifyContent: 'center',   
    shadowColor: '#000',         
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,                // Elevation for Android to achieve shadow effect
},
container: {
  flex: 1,
  margin: 10,
  justifyContent: "space-between",
  marginTop: 40,
},
warningtext: {
  color: "red",
  fontSize: 13,
  textAlign: "center",
},
inputContainer: {
  marginTop: 40,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},
inputText: {
  fontWeight: "bold",
  width: '20%',
  color: "gray",
},
inputBox: {
  width: '70%',
  backgroundColor: "#ffffff",
  marginLeft: 10,
  fontSize: 16,
  padding: 10,
  borderRadius: 5,
},
updateBtn: {
  backgroundColor: "black",
  color: "white",
  height: 50,
  width: '90%',
  borderRadius: 20,
  marginTop: 60,
  alignItems: "center",
  justifyContent: "center",
},
updateBtnText: {
  color: "#ffffff",
  fontSize: 20,
},
})

export default Profile