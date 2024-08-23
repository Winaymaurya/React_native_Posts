import { TouchableOpacity, StyleSheet,Text } from 'react-native'
import React from 'react'
const CustomButton = ({title,handelPress,loading}) => {
    return (
      <TouchableOpacity style={styles.button} onPress={handelPress} activeOpacity={0.5}>
        <Text style={styles.buttonText}>{loading ? "Please Wait..." : title}</Text>
      </TouchableOpacity>
    )
  }
const styles = StyleSheet.create({
   
    button: {
      margin: 20, 
      height:60,
      width: 'full',
      padding:4,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: '#CCCCFF',
      borderRadius: 15,
    },
    buttonText: {
      textAlign: 'center',
      padding: 6,
      fontSize:18,
      letterSpacing:2,
       borderCurve:20
    },
  });

export default CustomButton