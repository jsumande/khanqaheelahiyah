import React, { useState, useEffect ,useContext } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView , Alert  } from 'react-native';
import { SwipeListView , SwipeRow } from 'react-native-swipe-list-view';

import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

import firestore from '@react-native-firebase/firestore';


import { GlobalContext } from '../../context/GlobalContext.js';

function Request_Admin(props) {

    const [list, setList] = useState([]);
    const [alert , setAlert] = useState(false);
    const [user_name , setUserName] = useState(null);
    let obj2 = [];
    let data;

    useEffect(() => {    
        get_firebase_data()
    },[])

    const get_firebase_data = () => {
        firestore().collection('User_data').where('role', '==', "User").get().then(querySnapshot  => {

            querySnapshot.forEach(documentSnapshot => {
             
                data = documentSnapshot.data();
                obj2.push( {
                    "user_id" : documentSnapshot.id,
                    "name" : data['first_name'] + " " + data['middle_name'] + " " +data['last_name'],
                    "nationality" : data['nationality'],
                    "role" : data['role'],
                    "profile_pic" : data['profile_pic']
                } );
            });
            setList(obj2);
            
        });
    }


    function first_letter (data) {
        return data.substring(0,1).toUpperCase();
    }

    const make_admin = (data) => {
        console.log(data.item.user_id);

        firestore().collection('User_data').doc(data.item.user_id).update({
            role: "Admin",
        }).then(() => {
            get_firebase_data();
            setAlert(true);
            setUserName("New Admin Added"+data.item.name)
            setTimeout(() => {
                setAlert(false);
              }, 2000);
            
        console.log('User updated!');
        });

    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={tailwind('w-11/12 self-center justify-center')} >

                        
            <View style={tailwind('justify-between flex flex-row py-8')}>


                <TouchableOpacity 
                onPress={() => { props.navigation.reset({ index: 10,routes: [{ name: 'MemberProfile' , user_id : data.item.user_id }],}); }}
                style={tailwind('ml-4')}> 
                    <View style={tailwind('flex flex-col')}>
                            <Icon name="ios-person-circle" size={28} color="#00C55E" />
                            <Text style={tailwind('text-green-500 font-semibold text-xs self-center mb-2')}>View</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                >
                    <View style={tailwind('flex flex-col')}>
                            <Image style={tailwind('w-6 h-6 mb-1 self-center')} source={require('../assets/icon/Block_white.png')} />
                            <Text style={tailwind('text-white font-semibold text-xs mb-2')}> Block </Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => make_admin(data) }
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                >
                        <View style={tailwind('flex flex-col')}>
                            <Image style={tailwind('w-6 h-6 mb-1 self-center')} source={require('../assets/icon/user_outline_white.png')} />
                            <Text style={tailwind('text-white font-semibold text-xs mb-2')}> Make Admin </Text>
                        </View>
                </TouchableOpacity>


            </View>
        </View>
    );



    const renderItem = data => (
        

        <View style={tailwind('w-11/12 self-center py-3 justify-center border-b border-gray-200 bg-white')} >

                        
            <View style={tailwind('justify-between flex flex-row ')}>

                <View style={tailwind('flex flex-row')}>


                    { data.item.profile_pic != "None" ? 

                        <Image style={tailwind('border-4 border-green-200  bg-green-700 w-14 h-14 rounded-full items-center justify-center')}
                        source={{uri : data.item.profile_pic }} /> : 
                         <View style={tailwind('border-4 border-green-200  bg-green-700 w-14 h-14 rounded-full items-center justify-center')}>
                            <Text style={tailwind('text-2xl font-bold text-white')}>{first_letter(data.item.name)}</Text>           
                        </View>
                    
                    }

                    <View style={tailwind('flex flex-col ml-4 mt-1')}>
                        <Text style={tailwind('text-black font-bold text-base')}>{data.item.name}</Text>
                        <View style={tailwind('flex flex-row')}>
                            <Image style={tailwind('w-6 h-6 mt-1')} source={require('../assets/icon/Location.png')} />
                            <Text style={tailwind('text-black font-thin text-base mt-1')}> {data.item.role}  </Text>
                        </View>
                    </View>

                </View>
            
                <View style={tailwind('flex flex-row')}>
                    <Image style={tailwind('w-8 h-8 mt-3')} source={require('../assets/icon/right.png')} />       
                </View>

            </View>

        </View>

    );

    return (
        <SafeAreaView style={tailwind('h-full  bg-white ')}>
            
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title="Successfully"
                message={user_name}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
 
            />
        
              
            <View style={tailwind('mt-3')}>


                {/* Header */}

                <View style={ tailwind('flex flex-row justify-between') }>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4 ml-5')}>Members</Text>

                </View>

                <View style={ tailwind('') }>

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Search by name, keyword"
                    placeholderTextColor="#E5E7EB"
                />

                </View>


                
            </View>

                <SwipeListView
                    data={list}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewOpenDelay={1000}
                />
           
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 0,
      marginTop : 5,
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'red',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'grey',
        right: 0,
    },
    
  });

export default Request_Admin;