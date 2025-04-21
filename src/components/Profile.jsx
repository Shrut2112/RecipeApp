import { StyleSheet, Text, View,Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditIcon from 'react-native-vector-icons/dist/FontAwesome';
import FavIcon from 'react-native-vector-icons/dist/MaterialIcons';
import HelpIcon from 'react-native-vector-icons/dist/AntDesign';
import LogoutIcon from 'react-native-vector-icons/dist/Entypo';

const Profile = ({navigation}) => {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [image, setimage] = useState('');

    useEffect(() => {
  const fetchUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        const parsedData = JSON.parse(data);
        setusername(parsedData.username || '');
        setemail(parsedData.email || '');
        setimage(parsedData.image || '');
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };
  fetchUserData();
}, []); 

    const handelLogout= async()=>{
        await AsyncStorage.removeItem('user')
        Alert.alert('Logout Successfull','We will miss you......')
        navigation.navigate('Welcom')
    }

  return (
    <View style={styles.container}>
      <Image source={{uri:image || "https://i.pinimg.com/474x/50/fe/42/50fe423cf7b42c9b23e66977fa4f37a5.jpg"}} style={styles.dpimage}/>
      <View style={styles.profileCont}>
        <View style={styles.infoCont}>
             <Text style={styles.name}>{username}</Text>
             <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.btnCont}>
                <Pressable style={styles.btn} onPress={()=> navigation.navigate('EditProfile')}>
                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                    <EditIcon name='user' size={25} color="black"/>
                    <Text style={styles.btnText}>Edit Profile</Text>
                    </View>
                    <EditIcon name='arrow-circle-right' size={25}/>
                </Pressable>
                <Pressable style={styles.btn}>
                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                      <FavIcon name='favorite' size={25} color='black'/>
                    <Text style={styles.btnText}>Your Favorites</Text>
                    </View>
                    <EditIcon name='arrow-circle-right' size={25}/>
                </Pressable>
                <Pressable style={styles.btn}>
                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                      <HelpIcon name='infocirlce' size={25} color='black'/>
                      <Text style={styles.btnText}>Help Center</Text>
                    </View>
                    <EditIcon name='arrow-circle-right' size={25}/>
                </Pressable>
                <Pressable style={styles.btn} onPress={handelLogout}>
                    <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                      <LogoutIcon name='log-out' size={25} color='rgb(241,30,30)'/>
                      <Text style={[styles.btnText,{color:'rgb(241, 30, 30)',fontWeight:'bold'}]}>Log out</Text>
                    </View>
                    <EditIcon name='arrow-circle-right' size={25} color='rgb(241,30,30)'/>
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