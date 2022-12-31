import React, { useState, useEffect ,useContext } from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import auth from '@react-native-firebase/auth';

import { GlobalContext } from '../../context/GlobalContext.js';

function Setting(props) {

    const { updateRole,updateUid, updateUserData,  updateUserCred , updateImgUrl } = useContext(GlobalContext);


    const Logout = () => {
        auth()
        .signOut()
        .then(() => {
            updateRole(null);
            updateUid(null);
            updateUserData(null);
            updateUserCred(null);
            updateImgUrl(null);
            props.navigation.reset({ index: 0,routes: [{ name: 'Splash' }],});
        });
    }


    return (
        <SafeAreaView style={tailwind('h-full bg-white')}>

            {/* Header */}

            <View style={ tailwind('flex flex-row justify-between') }>

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],}); }}>
                    <Image style={tailwind('w-8 h-8 mt-5 ml-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                </TouchableOpacity>

                <Text style={tailwind('text-2xl font-bold text-black mt-4 mr-6')}>Settings</Text>

                <View style={tailwind('w-8 h-8 mt-5')} />

            </View>


            {/* Body */}

            <View style={ tailwind('mt-5 w-11/12 self-center') }>

                <View style={ tailwind('flex flex-row justify-between border-b py-3 border-gray-300') }>

                    <Text style={ tailwind('text-black') }>Language</Text>

                    <View style={ tailwind('flex flex-row justify-between') }>

                        <Text style={ tailwind('text-green-600 pr-2 mr-2 border-r border-gray-300') }>English</Text>

                        <Text style={ tailwind('text-black') }>اُردو</Text>

                    </View>

                </View>

                <View style={ tailwind('flex flex-row justify-between border-b py-4 border-gray-300') }>

                    <Text style={ tailwind('text-black') }>Notifications</Text>

                    <View style={ tailwind('flex flex-row justify-between bg-gray-400 py-1 px-2 items-center rounded-full') }>

                        <View style={ tailwind('bg-white h-4 w-4 rounded-full mr-2') }></View>

                        <Text style={ tailwind('text-white') }>OFF</Text>

                    </View>

                </View>

                <View style={ tailwind('flex flex-col justify-between border-b py-4 border-gray-300') }>

                    <Text style={ tailwind('text-black') }>Font Size</Text>
                    <Image style={tailwind('w-full h-8 mt-4 mr-5')} source={require('../assets/icon/slider.png')} />
                    

                </View>

                <View style={ tailwind('flex flex-row justify-between py-4') }>

                    <Text style={ tailwind('text-black') }>Background App Refresh</Text>

                    <View style={ tailwind('flex flex-row justify-between bg-green-700 py-1 px-2 items-center rounded-full') }>

                        <Text style={ tailwind('text-white') }>ON</Text>
                        <View style={ tailwind('bg-white h-4 w-4 rounded-full ml-2') }></View>

                    </View>

                </View>

                <View style={ tailwind('border-b py-1 border-gray-300 ') }>

                    <View style={ tailwind('w-3/5') }>
                        <Text style={ tailwind('text-gray-400') }>Allow App to refresh periodically & Download content for faster browsing experience</Text>
                    </View>

                </View>

                
                <View style={ tailwind('flex flex-row justify-between border-b py-4 border-gray-300') }>

                    <Text style={ tailwind('text-black') }>Application Version: 1.1.5</Text>

                    <Image style={tailwind('w-5 h-5')} source={require('../assets/icon/cycle.png')} />

                </View>  

                <View style={ tailwind('flex flex-row justify-between border-b py-4 border-gray-300') }>

                    <Text style={ tailwind('text-black') }>Request delete account</Text>

                    <Image style={tailwind('w-5 h-5')} source={require('../assets/icon/delete.png')} />

                </View>

                <TouchableOpacity onPress={ () => Logout() }
                 style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-10 justify-center')}>
                    <Text style={tailwind('text-white font-bold py-3')}>Logout</Text>
                </TouchableOpacity>



            </View>

        </SafeAreaView>
  );
}

export default Setting;