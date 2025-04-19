import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={{uri:"https://i.pinimg.com/474x/50/fe/42/50fe423cf7b42c9b23e66977fa4f37a5.jpg"}} style={styles.dpimage}/>
      <View style={styles.profileCont}>
        <View style={styles.infoCont}>
             <Text style={styles.name}>Shrut Jain</Text>
             <Text style={styles.email}>jainshrutd211204@gmail.com</Text>
        </View>
        <View style={styles.btnCont}>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>📝 Edit Profile</Text>
                    <Text style={styles.btnText}>→</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>❤️ Your Favorites</Text>
                    <Text style={styles.btnText}>→</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>❤️ Help Center</Text>
                    <Text style={styles.btnText}>→</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={[styles.btnText,{color:'rgb(241, 30, 30)',fontWeight:'bold'}]}>❤️ Log out</Text>
                    <Text style={styles.btnText}>→</Text>
                </Pressable>

        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(238, 237, 237)'
    },
    dpimage:{
        width:150,
        height:150,
        borderRadius:100,
    },
    profileCont:{
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    name:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:10
    },
    email:{
        fontSize:18,
        color:'rgb(24, 103, 249)',
        backgroundColor:'rgb(215, 222, 254)',
        padding:10,
        borderRadius:20
    },
    infoCont:{
        justifyContent:'center',
        alignItems:'center',
    },
    btnCont:{
        marginVertical:20
    },
    btn:{
        flexDirection:'row',
        padding:10,
        paddingHorizontal:20,
        width:"90%",
        justifyContent:'space-between',
        backgroundColor:'rgb(249, 251, 248)',
        margin:10,
        borderRadius:10
    },
    btnText:{
        color:'black',
        fontSize:18,
    }
})