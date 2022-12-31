import React, { useState, useEffect ,useContext , useRef } from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity  } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';

import { GlobalContext } from '../../context/GlobalContext.js';

function MessageDetail(props) {

    const [detail, setDetail] = useState([]);
    const [patient , setPatient] = useState([]);
    const {role} = useContext(GlobalContext);

    useEffect(() => {    

        firestore().collection('Request').doc(props.route['message_id']).get().then(documentSnapshot => {
            let data = documentSnapshot.data();
            setDetail(data);
            setPatient( JSON.parse(data['patients']) )
            // console.log(data);
        });
    },[])


    function deleteMessage () {

        firestore().collection('Request').doc(props.route['message_id']).delete().then(() => {
            props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],});
        });
    }


    return (
        <SafeAreaView style={tailwind('h-full bg-white')}>

            { role != "Admin" ? 

                <View style={ tailwind('flex flex-row justify-between') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5 ml-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4 mr-6')}>Message</Text>

                    <View style={tailwind('w-8 h-8 mt-5')} />

                </View>  : 

                <View style={ tailwind('flex flex-row justify-around') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4 mr-6')}>Message</Text>

                    <TouchableOpacity onPress={() => { deleteMessage(); }}>
                        <Image style={tailwind('w-8 h-8 mt-4')} source={require('../assets/icon/delete.png')} />
                    </TouchableOpacity>
                
                </View>
            }

            
            

            <View style={ tailwind('flex flex-row border-b border-gray-300 pb-2 w-11/12 self-center mt-5') }>

                    <View style={ tailwind('flex flex-wrap flex-row mt-4 w-1/12') }>
                        <Image style={tailwind('w-5 h-5 relative')} source={require('../assets/icon/user_outline.png')} />
                    </View>

                    <View style={ tailwind('flex flex-wrap flex-row mt-1 w-8/12') }>

                        {  patient.map((item,index) => { 
                            return(
                                <View key={index} style={ tailwind('flex flex-wrap flex-row bg-gray-200 py-1 ml-2 mt-2 px-1 rounded-md') }>

                                    <Text style={tailwind('text-xs font-normal text-black')}>{item.first_name} {item.last_name}</Text>

                                </View>
                        )})}

                    </View>

            </View>

            
            <View style={ tailwind('flex flex-row border-b border-gray-300 pb-2 w-11/12 self-center') }>

                    <View style={ tailwind('flex flex-wrap flex-row mt-4 w-1/12') }>
                        <Image style={tailwind('w-5 h-5 relative')} source={require('../assets/icon/attach.png')} />
                    </View>

                    <View style={ tailwind('flex flex-wrap flex-row mt-1 w-8/12') }>

                        <View style={ tailwind('flex flex-wrap flex-row bg-gray-200 py-1 ml-2 mt-2 px-1 rounded-md') }>

                            <Text style={tailwind('text-xs font-normal text-black')}>Report.jpg</Text>
                            <Image style={tailwind('w-2 h-2 ml-2 mt-1')} source={require('../assets/icon/cancel.png')} />

                        </View>

                    </View>

            </View>

            <View style={ tailwind('flex flex-row pb-2 w-11/12 self-center justify-between') }>

                <View style={ tailwind('flex flex-row') }>
                    <View style={ tailwind('flex flex-wrap flex-row mt-4') }>
                        <Image style={tailwind('w-5 h-5 relative')} source={require('../assets/icon/message.png')} />
                    </View>

                    <View style={ tailwind('flex flex-wrap flex-row mt-1') }>

                        <View style={ tailwind('flex flex-wrap flex-row ml-2 mt-3') }>

                            <Text style={tailwind('text-xs font-normal text-black')}>Message :</Text>

                        </View>

                    </View>

                </View>

                { detail['status'] == "Pending" ? 

                 <View style={ tailwind('flex flex-wrap flex-row mt-4') }>
                    <TouchableOpacity style={tailwind('border bg-yellow-300 border-yellow-300 w-3 h-3 self-center rounded-2xl mr-1')}></TouchableOpacity>
                    <Text style={ tailwind('text-xs font-normal text-yellow-300') }>Pending</Text>
                </View> : 

                <View style={ tailwind('flex flex-wrap flex-row mt-4') }>
                    <TouchableOpacity style={tailwind('border bg-green-600 border-green-600 w-3 h-3 self-center rounded-2xl mr-1')}></TouchableOpacity>
                    <Text style={ tailwind('text-xs font-normal text-green-600') }>Seen</Text>
                </View>
            
            } 

              

            </View>

            <View style={ tailwind('w-4/5 self-center') }>

                <Text style={ tailwind('text-black text-sm') }>
                    {detail['message']}
                </Text>
            </View>

        </SafeAreaView>
  );
}

export default MessageDetail;