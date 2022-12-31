import React, { useState, useEffect ,useContext } from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity  } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import { GlobalContext } from '../../context/GlobalContext.js';

function ViewProfile(props) {
    
    const {uid,imgUrl , user_data} = useContext(GlobalContext);

    const [image, setImage] = useState(null);

    useEffect(() => { 

        setImage(imgUrl);
       
    },[]);


    const first_letter = (data) => {
        return data.substring(0,1).toUpperCase();
    }
    
    


    return (
        <SafeAreaView style={tailwind('h-full bg-white justify-center')}>
            
        
        <ScrollView style={styles.scrollView}>
                
            {/* Header */}


            <View style={ tailwind('flex flex-row justify-between') }>

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],}); }}>
                    <Image style={tailwind('w-8 h-8 mt-5 ml-3.5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'EditProfile' }],}); }}>
                    <Image style={tailwind('w-6 h-6 mt-6 mr-6')} source={require('../assets/icon/pencil.png')} />
                </TouchableOpacity>



                </View>
            

            <View style={ tailwind('items-center mt-5') }>


                {image != "None" ? 

                    <Image style={tailwind('w-32 h-32 rounded-full mt-4 mb-4 items-center justify-center')}
                    source={{uri : image }} /> : 

                    <View style={tailwind('border-4 border-green-200  bg-green-700 w-32 h-32 rounded-full mt-4 mb-4 self-center items-center justify-center')}>
                        <Text style={tailwind('text-4xl font-bold text-white')}>{first_letter(user_data['first_name'])}</Text>
                    </View>

                }
            
            
                <Text style={tailwind('text-xl font-bold text-black mt-4')}>{ user_data['first_name'] } {  user_data['middle_name'] } {  user_data['last_name']}</Text>

            </View>

            {/* Form Area  */}
            <View style={tailwind('mt-5')}>
                
                {/*  Credential */}

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>First Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['first_name'] }</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Middle Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['middle_name'] }</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Last Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['last_name'] }</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Mother's Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['mother_name'] }</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Father's Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['father_name'] }</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Gender</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['gender'] }</Text>
                    </View>

                </View>

                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Nationality</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['nationality'] }</Text>
                    </View>

                </View>

                                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Residence</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['residence'] }</Text>
                    </View>

                </View>

                
                                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Phone</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['number'] } { user_data['contact'] }</Text>
                    </View>

                </View>

                                
                                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>N.I.C #</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{ user_data['cnic'] }</Text>
                    </View>

                </View>
            
            </View>


        </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 0,
      marginBottom : 15,
    },
    
  });

export default ViewProfile;