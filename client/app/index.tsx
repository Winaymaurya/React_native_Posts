import { Redirect,router } from 'expo-router'
import React,{useEffect,useContext} from "react";
import { ScrollView, Text, View ,StyleSheet,TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Video ,ResizeMode} from 'expo-av';
import CustomButton from '../components/CustomButton'
import { AuthContext } from '../context/authContext'
import { useRouter } from 'expo-router'
export default function Index() {
  const video= React.useRef(null)
  const [state]=useContext(AuthContext)
  const router=useRouter()
  const loginLocal=()=>{
   if(state?.user){
    router.replace('/(tabs)/Home');
   }
  }
  useEffect(()=>{
    loginLocal()
    })
  return (
    
    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: 'https://cdn.pixabay.com/video/2023/09/15/180776-865216724_large.mp4' }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
        />

        <View style={styles.overlay}>
          <Text style={styles.headerText}>
            Explore Endless Possibilities with <Text style={styles.highlightedText}>XYZ Solutions</Text>.
          </Text>
          <Text style={styles.subText}>
            Innovate, Integrate,Inspire
          </Text>
        </View>
     <View style={styles.containerBtn}>
     <CustomButton title={'Login'} handelPress={()=>router.push('/(auth)/SignIn')}/>
     <CustomButton title={'Register'} handelPress={()=>router.push('/(auth)/SignUp')}/>
     </View>

      </View>
      <StatusBar backgroundColor="transparent" translucent />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Fallback background color
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBtn: {

   width:'80%'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#dcd7c9',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightedText: {
    color: '#FFC300',
    fontSize: 50,
  },
  subText: {
    color: '#CCCCFF',
    fontSize: 20,
    textAlign: 'center',
  },
});