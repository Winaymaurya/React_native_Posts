import { View, Text ,ScrollView,StyleSheet,Modal,Alert,TouchableOpacity,TextInput} from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import PostCard from '../../components/PostCard'
import Ionicons from '@expo/vector-icons/Ionicons';

const MyPost = () => {
    const [state]=useContext(AuthContext)
    
    const [modalVisible, setModalVisible] = useState(false);
    const [postId, setPostId] = useState('')
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDecription] = useState("");

    const getPostOfUser=async()=>{
       
    try {
        const {data}= await axios.get(`/blog/user-blog/${state?.user._id}`)
        setPosts(data?.userBlog?.blogs)
       
    } catch (error) {
        console.log(error)
    }
    }
    const handelPostDelete=async(id)=>{
        try {
          const {data}=await axios.delete(`/blog/delete/${id}`)
          if(data?.success){
            Alert.alert(data?.message)
          }
          getAllPost()
        } catch (error) {
          console.log(error)
        }
    }
    
    const getPostById =async(id)=>{
      try {
        setPostId(id)
        const {data}= await axios.get(`/blog/get-blog/${id}`)
        setTitle(data?.blog?.title)
        setDecription(data?.blog?.description)
        show()
      } catch (error) {
        console.log(error)
      }
    }
    const handelUpdate=async()=>{
    try {
      const {data}=await axios.put(`/blog/update/${postId}`,{title,description})
      Alert.alert(data?.message)
      if(data?.success){
        setModalVisible(false)
      }
      getPostOfUser()
    } catch (error) {
      console.log(error)
      
    }
    }
    const show=()=>{
        setModalVisible(true)
    }

    useEffect(()=>{
        getPostOfUser()
    },[])
  return (
    <>
    <ScrollView style={styles.container}>
    {posts?.map((post) => (
      
      <PostCard
        key={post._id}
        onDelete={() => handelPostDelete(post._id)}
        onEdit={()=>getPostById(post._id)}
        title={post.title}
        description={post.description}
        user={'12'}
        name={post.user.name}
        loginUser={'12'}
        />
        
    ))}
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
              <View style={{ flexDirection: "row",justifyContent:'space-between',alignItems:'center' }}>
          <Text style={styles.heading}>Update</Text>
          <TouchableOpacity
              
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle-outline" size={32} color="black" />
          
            </TouchableOpacity>
              </View>

            <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.inputBox}
            placeholder="Update post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Update post description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDecription(text)}
          />
          <TouchableOpacity  style={styles.postBtn} onPress={handelUpdate}>
            <Text  style={styles.postBtnText}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
          
          </View>
        </View>
      </Modal>
    </>

  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingTop: 20,
      paddingHorizontal: 15,
    },
    openButton: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
      width: 300,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      
    },
  
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    }
    ,  heading: {
      fontSize: 18,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    inputBox: {
      backgroundColor: "#ffffff",
      textAlignVertical: "top",
      paddingTop: 10,
      width: '100%',
      marginVertical: 10,
      fontSize: 16,
      paddingLeft: 15,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
    },
    postBtn: {
      backgroundColor: "black",
      width: '100%',
      marginTop: 10,
      height: 40,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "center",
    },
    postBtnText: {
      color: "#ffffff",
      fontSize: 18,
    },
  });

export default MyPost