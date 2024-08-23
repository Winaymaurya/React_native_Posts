import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../context/authContext'
import { useRouter } from 'expo-router'


import axios from "axios";

const Create = () => {

  const router = useRouter()
  
  const [state] = useContext(AuthContext)

  // local state
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDecription] = useState("");
  const [loading, setLoading] = useState(false);



  const setVal = () => {
    setUser(state?.user._id)

  }

  //handle form data post DATA
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title ");
      }
      if (!description) {
        alert("Please add post  description");
      }
      const { data } = await axios.post("/blog/create", {
        title,
        description,
        user
      });
      setLoading(false);
      alert(data?.message);
    
      if (data?.success) {
        console.log("Navigating to Home");
        router.replace('/');

      }
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setVal()
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="add post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="add post description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDecription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>

            <Text style={styles.postBtnIcon}>
              <Ionicons name="add-circle-outline" size={28} />  {"  "}

            </Text>
            <Text style={styles.postBtnText}>
              {loading ? 'PLease Wait...' : 'Create post'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: '85%',
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    width: '85%',
    marginTop: 30,
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  postBtnIcon: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Create