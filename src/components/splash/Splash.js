import React, { useState, useEffect , useContext } from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image } from 'react-native';
import tailwind from 'tailwind-rn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { GlobalContext } from '../context/GlobalContext.js';

function Splash(props) {

    const {updateRole, updateUid, updateUserData, updateUserCred , updateImgUrl} = useContext(GlobalContext);


    function onAuthStateChanged(user) {

        if(user) {
            firestore()
            .collection('User_data')
            .doc(user['uid'])
            .get()
            .then(documentSnapshot => {

                if (documentSnapshot.exists) {
                    let data = documentSnapshot.data();
                    setTimeout(function(){ 

                        updateRole(data['role']);
                        updateUid(user['uid']);
                        updateUserData(data);
                        updateUserCred(user);
                        updateImgUrl(data['profile_pic'])

                        props.navigation.reset({ index: 4,routes: [{ name: 'Dashboard' , uid : user['uid'] , role : data['role'] }],}); 
                    }, 3000);
                }
                
            });

        } else {
            setTimeout(function(){ props.navigation.reset({ index: 1,routes: [{ name: 'Login' }],}); }, 2000);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);        
        return subscriber;
    }, []);


    // auth()
    // .signOut()
    // .then(() => console.log('User signed out!'));

    return (
        <SafeAreaView style={tailwind('h-full bg-white items-center justify-center')}>

            <Image style={tailwind('w-40 h-40')} source={require('../../../src/assets/img/logo/logo_1.png')} />
            <Text style={tailwind('text-sm text-black mt-4 font-normal')}>Loading..</Text>
            
        </SafeAreaView>
  );
}

export default Splash;