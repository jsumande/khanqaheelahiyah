import React, { useState, useEffect ,useContext , useRef } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , } from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';

import { GlobalContext } from '../../context/GlobalContext.js';

function New_Message(props) {

    const {uid,updateUid , patients , updatePatients} = useContext(GlobalContext);

    const [message, setMessage] = useState(null);
    const [patientName,setPatientName] = useState(patients);

    
    function sendMessage() {

        let string;
        if(patientName.length != 0) {
            string = JSON.stringify(patientName);
        } else {
            string = "None";
        }
    
       firestore()
        .collection('Request')
        .add({
            uid: uid,
            message: message,
            status : 'Pending',
            patients : string,
            date_created: new Date().toISOString().slice(0, 10),
          })
          .then(() => {
            updatePatients([]);
            props.navigation.reset({ index: 4,routes: [{ name: 'Dashboard' }] });
            console.log('Message Added : ' + inputEl.current.value);
        });

    }

    function remove_patient(data){

        console.log(patientName[data].patient_id);
        

        setPatientName((patientName) => {
            const newPatient = [...patientName];

            newPatient.filter(function(value){ 
                return value.patient_id == patientName[data].patient_id;
            });
           
            newPatient.splice(data,1);

            return newPatient;
        });

    }
  
    return (
        <SafeAreaView style={tailwind('h-full bg-white flex flex-col justify-between')}>

            <View style={tailwind('mt-3')}>


                {/* Header */}

                <View style={ tailwind('flex flex-row justify-between') }>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4 ml-5')}>New Message</Text>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 6,routes: [{ name: 'Dashboard' }],}); }}>
                        <Text style={tailwind('text-sm font-normal text-black mt-4 mr-5')}>Cancel</Text>
                    </TouchableOpacity>


                </View>


                <View style={ tailwind('flex flex-row border-b border-gray-300 pb-2 w-11/12 self-center') }>

                    <Text style={tailwind('text-xs font-normal text-black mt-4 w-1/4')}>Add patient(s): </Text>

                    <View style={ tailwind('flex flex-wrap flex-row mt-1 w-8/12') }>


                        {  patientName.map((item,index) => { 
                            return(
                                <TouchableOpacity onPress={ () => remove_patient(index) } key={index} style={ tailwind('flex flex-wrap flex-row bg-yellow-400 py-1 ml-2 mt-2 px-1 rounded-md') }>

                                    <Text style={tailwind('text-xs font-normal text-black')}>{item.first_name} {item.last_name}</Text>
                                    <Image style={tailwind('w-2 h-2 ml-2 mt-1')} source={require('../assets/icon/cancel.png')} />

                                </TouchableOpacity>
                        )})}

                        

                    </View>

                    <View style={ tailwind('flex flex-wrap flex-row mt-4 mr-5 w-1/12') }>
                        
                        <TouchableOpacity onPress={() => { props.navigation.reset({ index: 6,routes: [{ name: 'Select_Patient' }],}); }}>
                            <Image style={tailwind('w-5 h-5 relative')} source={require('../assets/icon/plus.png')} />
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={ tailwind('flex flex-row border-b border-gray-300 pb-2 w-11/12 self-center') }>

                    <Text style={tailwind('text-xs font-normal text-black mt-4 w-1/4')}>Add report(s): </Text>

                    <View style={ tailwind('flex flex-wrap flex-row mt-1 w-8/12') }>

                        <View style={ tailwind('flex flex-wrap flex-row bg-yellow-400 py-1 ml-2 mt-2 px-1 rounded-md') }>

                            <Text style={tailwind('text-xs font-normal text-black')}>Report.jpg</Text>
                            <Image style={tailwind('w-2 h-2 ml-2 mt-1')} source={require('../assets/icon/cancel.png')} />

                        </View>

                    </View>

                    <View style={ tailwind('flex flex-wrap flex-row mt-4 mr-5 w-1/12') }>
   
                        <Image style={tailwind('w-5 h-5 relative')} source={require('../assets/icon/attach.png')} />

                    </View>

                </View>

            </View>

            <View style={tailwind('flex flex-row w-11/12 mb-6 self-center items-center')}>

                

                <TextInput
                    placeholder="Enter Message"
                    placeholderTextColor="#E5E7EB"
                    multiline={true}
                    numberOfLines={4}
                    ref={input => {message}}
                    style={tailwind('mt-4 border bg-white rounded-2xl border-gray-300 w-full self-center text-gray-400 px-5')}
                    onChange={ (e) => setMessage(e.nativeEvent.text)}
                />


                { !message ? 

                    <View style={tailwind('absolute right-5 bottom-3 bg-gray-700 rounded-full p-2')}>
                        <Icon name="paper-plane" size={20} color="#FFFFFF" />
                    </View> :

                    <TouchableOpacity style={tailwind('absolute right-5 bottom-3 bg-green-700 rounded-full p-2')} onPress={ () => {  sendMessage()} }>
                        <Icon name="paper-plane" size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                }

                

            </View>

            

        </SafeAreaView>
  );
}

export default New_Message;