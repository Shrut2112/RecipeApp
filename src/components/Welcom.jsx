import { StyleSheet, Text, View, Image,ImageBackground, Pressable } from 'react-native'
import React from 'react'
import Home from './Home'

const Welcom = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/36/db/8c/36db8c5d77417ac8342799b7cd68422e.jpg' }}
        style={styles.background}
      >
        <View style={styles.overlay}>
        <View style={styles.header}>
            <Text style={styles.headling}>Welcome</Text>
            <Text style={styles.text}>Cook Like a Chef!</Text>
            <Pressable style={styles.button} onPress={()=> navigation.navigate('Home')} >
            <Text style={styles.btnText}>Get Started</Text>
            </Pressable>
        </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Welcom

const styles = StyleSheet.create({
    background: {
        height:"100%",
        width:"100%",
      },
    header:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    headling:{
        color:'rgb(238, 223, 14)',
        fontSize:65,
        fontWeight:700
    },
    text:{
        color:'rgb(239, 203, 24)',
        fontSize:30,
        fontWeight:500
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // <--- 0.4 is the opacity
      },
    button:{
        color:'#FFF',
        fontSize:25,
        marginTop:50,
        backgroundColor:'rgb(93, 98, 90)',
        borderRadius:50
    },
    btnText:{
        padding:15,
        paddingHorizontal:35,
        fontSize:20,
        color:'#FFF'
    }
      
})