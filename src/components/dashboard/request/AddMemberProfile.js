import React, { useState, useContext , useEffect} from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity  } from 'react-native';

import tailwind from 'tailwind-rn';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';

import { GlobalContext } from '../../context/GlobalContext.js';

function AddMemberProfile(props) {

    const {uid} = useContext(GlobalContext);

    const [first_name, setFirst_name] = useState(null);
    const [first_letter, setFirst_letter] = useState(null);
    const [middle_name, setMiddle_name] = useState(null);
    const [last_name, setLast_name] = useState(null);

    const [father_name, setFather_name] = useState(null);
    const [mother_name, setMother_name] = useState(null);

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);

    // Validation Text
    const [validate, setValidate] = useState(false);
    const [validateText, setValidateText] = useState(null);
    const [loading, setLoading] = useState(false);

    const AddPatient = () => {

        setLoading(true);

        if (!first_name || !middle_name || !last_name || !father_name || !mother_name || male == false && female == false) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your personal information")
        } else {
            setValidate(false);

            let gender;
            if(male){
                gender = "Male";
            } else if (female) {
                gender = "Female";
        }

            firestore().collection('Patients').add({
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                father_name: father_name,
                mother_name: mother_name,
                gender : gender,
                assign_patient : uid,
    
            }).then((e) => { 
                setLoading(false);
                props.navigation.reset({ index: 5,routes: [{ name: 'Select_Patient' }],}); 
            });

        }

    }


    return (
        <SafeAreaView style={tailwind('h-full bg-white')}>


            <AwesomeAlert
                show={loading}
                showProgress={true}
                title="Loading.."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}

            />


            <View style={ tailwind('flex flex-row justify-between') }>

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Select_Patient' }],}); }}>
                    <Image style={tailwind('w-8 h-8 mt-5 ml-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                </TouchableOpacity>

                <Text style={tailwind('text-xl font-bold text-black mt-4 mr-6')}>Add New Patient</Text>

                <View style={tailwind('w-8 h-8 mt-5')} />

            </View>

            <ScrollView style={styles.scrollView}>
                
            {/* Header */}


            {/* <View style={ tailwind('self-center items-center mt-5 py-10 px-5 rounded-full border border-gray-300 mb-5') }>
            
                    <Image style={tailwind('w-7 h-8 relative')} source={require('../assets/icon/user.png')} />
                    <Text style={ tailwind('text-gray-400') }> Upload picture</Text>

            </View> */}

            <View style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full mt-4 mb-4 self-center items-center justify-center')}>
                <Text style={tailwind('text-4xl font-bold text-white')}>{first_letter}</Text>
            </View>

            {/* Form Area  */}
            <View style={tailwind('')}>
                
            
                {/* Personal */}

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="First name"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) => { setFirst_name(e.nativeEvent.text); setFirst_letter( e.nativeEvent.text.substring(0,1).toUpperCase() ) } } 
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Middle name"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>  setMiddle_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Last name"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>  setLast_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Father name"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>  setFather_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Mother name"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>  setMother_name(e.nativeEvent.text)}
                />


                {/* Gender */}

                <View style={tailwind('mt-5 ml-5')}>
                    <Text style={tailwind('text-base font-bold text-black ml-1.5')}>Gender</Text>

                    <View style={tailwind('mt-2 ml-10 flex flex-row')}>
                        

                        { male == false ? 
                            <TouchableOpacity onPress={() => { setMale(true) , setFemale(false) }} style={tailwind('border border-gray-300 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity> : 
                            <TouchableOpacity onPress={() => { setMale(false) , setFemale(false) } } style={tailwind('border border-green-300 bg-green-500 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity>
                        }

                        

                        <Text style={tailwind('text-base font-medium text-gray-600 ml-2.5')}>Male</Text>

                        { female == false ? 
                            <TouchableOpacity onPress={() => { setMale(false) , setFemale(true) }} style={tailwind('ml-2.5 border border-gray-300 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity> : 
                            <TouchableOpacity onPress={() => { setMale(false) , setFemale(false) } } style={tailwind('ml-2.5 border border-green-300 bg-green-500 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity>
                        }

                        {/* <TouchableOpacity style={tailwind('ml-2.5 border border-gray-300 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity> */}

                        <Text style={tailwind('text-base font-medium text-gray-600 ml-2.5')}>Female</Text>


                    </View>
                    
                </View>

                {
                    validate == true ?    
                    
                    <View style={tailwind('pt-2 pb-2 px-4 rounded-md bg-red-100 flex-row self-center  items-center mt-6 w-11/12')}>
                        <Icon name="close-circle" size={20} color="red" />
                        <Text style={tailwind('text-base font-medium text-red-500 ml-2')}>{validateText}</Text>
                    </View>

                    : null
                }

                <TouchableOpacity  onPress={() => AddPatient()} style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-7 mb-10 justify-center')}>
                    <Text style={tailwind('text-white font-bold py-3')}>Add Patient</Text>
                </TouchableOpacity>
            
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

export default AddMemberProfile;