import React, { useState, useEffect ,useContext } from 'react';
import { TabActions } from '@react-navigation/native';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity  } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';


import { GlobalContext } from '../../context/GlobalContext.js';

function MemberProfile(props) {

    const [list, setList] = useState([]);
    const [first_letter , setFirstLetter] = useState([]);

    useEffect(() => {    

        firestore().collection('User_data').doc(props.route['user_id']).get().then(documentSnapshot => {
            if (documentSnapshot.exists) {
                let data = documentSnapshot.data();
                setFirstLetter(data['first_name'].substring(0,1));
                setList(documentSnapshot.data());
            }
        });

    },[])

    
    return (
        <SafeAreaView style={tailwind('h-full bg-white justify-center')}>
            
        
        <ScrollView style={styles.scrollView}>
                
            {/* Header */}


            <View style={ tailwind('flex flex-row justify-between') }>

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],}); }}>
                    <Image style={tailwind('w-8 h-8 mt-5 ml-3.5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                </TouchableOpacity>

                <Image style={tailwind('w-6 h-6 mt-6 mr-6')} source={require('../assets/icon/Block.png')} />
               
                </View>
            

            <View style={ tailwind('items-center mt-5') }>


                { list['profile_pic'] != "None" ? 

                    <Image style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full items-center justify-center')}
                    source={{uri : list['profile_pic'] }} /> : 
                    <View style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full items-center justify-center')}>
                        <Text style={tailwind('text-4xl font-bold text-white')}>{first_letter}</Text>           
                    </View>

                }
            
                <Text style={tailwind('text-xl font-bold text-black mt-4')}>{list['first_name']} {list['middle_name']} {list['last_name']}</Text>

            </View>

            {/* Form Area  */}
            <View style={tailwind('mt-5')}>
                
                {/*  Credential */}

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>First Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['first_name']}</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Middle Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['middle_name']}</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Last Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['first_name']}</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Mother's Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['mother_name']}</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Father's Name</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['father_name']}</Text>
                    </View>

                </View>

                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Gender</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['gender']}</Text>
                    </View>

                </View>

                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Nationality</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['nationality']}</Text>
                    </View>

                </View>

                                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Residence</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['residence']}</Text>
                    </View>

                </View>

                
                                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>Phone</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['number']} - {list['contact']}</Text>
                    </View>

                </View>

                                
                                
                <View style={tailwind('flex-row w-full border-b py-3 border-gray-300 w-11/12 self-center')}>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 text-sm ml-5')}>N.I.C #</Text>
                    </View>

                    <View style={tailwind('w-2/4')}>
                        <Text style={tailwind('text-gray-900 font-bold text-sm')}>{list['cnic']}</Text>
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

export default MemberProfile;