import React, { useState, useEffect ,useContext } from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

import { GlobalContext } from '../../context/GlobalContext.js';

function Menu(props) {

    const {imgUrl,uid,user_data} = useContext(GlobalContext);

    console.log(" "+imgUrl);

    const [first_letter, setFirst_letter] = useState(null);


    useEffect(() => {
        setFirst_letter(user_data['first_name'].substring(0,1))
    });

    return (
        <SafeAreaView style={tailwind('h-full bg-white')}>

            <View style={tailwind('mt-3')}>

                {/* Header */}

                <View style={ tailwind('flex flex-row-reverse') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Setting' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-4 mr-5')} source={require('../assets/icon/Setting.png')} />
                    </TouchableOpacity>
                    

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'EditProfile' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-4 mr-5')} source={require('../assets/icon/edit.png')} />
                    </TouchableOpacity>
                    

                </View>

            </View>

            <View style={tailwind('mt-10')}>

                <View style={tailwind('flex flex-row w-11/12 self-center')}>

                {imgUrl != "None" ? 

                    <Image style={tailwind('items-center justify-center bg-gray-300 h-16 w-16 rounded-full')}
                    source={{uri : imgUrl }} /> : 

                    <View style={tailwind('items-center justify-center bg-gray-300 h-16 w-16 rounded-full')}>
                        <Text style={tailwind('text-gray-500 text-3xl')}>{ first_letter }</Text>
                    </View>

                }

                    

                    <TouchableOpacity style={tailwind('flex flex-col ml-5 mt-2')}
                    onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'ViewProfile' }],}); }}>
                        <Text style={tailwind('text-gray-800 font-bold text-xl')}>{ user_data['first_name'] } { user_data['middle_name'] } { user_data['last_name'] }</Text>
                        <Text style={tailwind('text-gray-500  text-sm')}>View Profile</Text>
                    </TouchableOpacity>

                </View>

                <View style={tailwind('w-11/12 self-center mt-5 border-b border-gray-200  rounded-md pb-3')}>

                    <Text style={tailwind('text-black font-bold text-2xl')}>Home</Text>

                </View>

                <View style={tailwind('w-11/12 self-center mt-5 border-b border-gray-200  rounded-md pb-3')}>

                    <Text style={tailwind('text-black font-bold text-2xl')}>Patients</Text>

                </View>
                
                <View style={tailwind('w-11/12 self-center mt-5 border-b border-gray-200  rounded-md pb-3')}>

                    <Text style={tailwind('text-black font-bold text-2xl')}>Announcements</Text>

                </View>

                <View style={tailwind('w-11/12 self-center mt-5 border-b border-gray-200  rounded-md pb-3')}>

                    <Text style={tailwind('text-black font-bold text-2xl')}>My Requests</Text>

                </View>

            </View>

        </SafeAreaView>
  );
}

export default Menu;