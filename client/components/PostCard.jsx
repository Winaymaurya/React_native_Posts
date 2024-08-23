import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const PostCard = ({ title, description, user, onEdit, onDelete,loginUser,name }) => {
  
    return (
        <View style={loginUser == user
            ?styles.postContainerMy:styles.postContainer}>
            <View style={styles.h}>

                <Text style={styles.title}>{title}</Text>
           {loginUser == user
           ?
            <View style={styles.icons}>
                <TouchableOpacity onPress={onEdit}>
                <FontAwesome6 name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
                <MaterialIcons name="delete-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>
            :''}
            </View>
            
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.user}>Posted by: {loginUser == user?'You' :name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainerMy: {
        backgroundColor: '#e8f8f5',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    postContainer: {
        backgroundColor: '#fdedec',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    h: {
        paddingBottom:5,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        marginBottom:4
    },
    icons: {
        flexDirection: 'row',
    },
    deleteIcon: {
        marginLeft: 15,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    user: {
        fontSize: 14,
        color: '#999',
        textAlign: 'right',
    },
});

export default PostCard;
