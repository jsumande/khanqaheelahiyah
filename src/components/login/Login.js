import React, { useState, useContext} from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image,TextInput, TouchableOpacity ,ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

import { GlobalContext } from '../context/GlobalContext.js';

function Login(props) {

    const {updateRole, updateUid, updateUserData, updateUserCred ,updateImgUrl} = useContext(GlobalContext);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // Validation Text
    const [validate, setValidate] = useState(false);
    const [validateText, setValidateText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayPass, setDisplayPass] = useState(true);

    SignIn = () => {
        setLoading(true);

        if(!email || !password){
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your credentials")
        }
        else{
            setValidate(false);
            auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {

                

                firestore().collection('User_data').doc(response['user']['uid']).get().then(documentSnapshot => {
                    
                    if (documentSnapshot.exists) {
                        

                        let data = documentSnapshot.data();
                        setLoading(false);

                        updateRole(data['role']);
                        updateUid(response['user']['uid']);
                        updateUserData(data);
                        updateUserCred(response['user']);
                        updateImgUrl(data['profile_pic']);

                        props.navigation.reset({ index: 4,routes: [{ name: 'Dashboard'}],});

                    }
                
                });

            })
            .catch(error => {

                setValidate(true);
                setValidateText("Invalid credentials")
                setLoading(false);
                
            })
        }

    }

    return (
        <SafeAreaView style={tailwind('h-full bg-white justify-center')}>


            <AwesomeAlert
            show={loading}
            showProgress={true}
            title="Loading.."
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={false}
 
            />

            {/* Header */}

            <View style={ tailwind('items-center') }>
                <Image style={tailwind('w-32 h-32')} source={require('../../../src/assets/img/logo/logo_1.png')} />
                <Text style={tailwind('text-2xl font-bold text-black')}>Welcome back!</Text>

                {
                    validate == true ? 
                    <View style={tailwind('pt-2 pb-2 px-4 rounded-md bg-red-100 flex-row items-center mt-3')}>
                        <Icon name="close-circle" size={20} color="red" />
                        <Text style={tailwind('text-base font-medium text-red-500 ml-2')}>{validateText}</Text>
                    </View>: 
                    <Text style={tailwind('text-base font-extralight text-gray-900 mt-4')}>Enter your credentials to continue</Text>
                }


       
            </View>

            

            {/* Form Area  */}
            <View style={tailwind('')}>
                
                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Email"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) => setEmail(e.nativeEvent.text)}
                />

                <View style={tailwind('flex flex-row w-11/12 self-center items-center')}>

                    <TextInput
                        placeholder="Password"
                        secureTextEntry={displayPass}
                        placeholderTextColor="#E5E7EB"
                        onChange={ (e) => setPassword(e.nativeEvent.text)}
                        style={tailwind('mt-4 border bg-white rounded-2xl border-gray-300 w-full self-center text-gray-400 px-5')}
                    />


                    {
                        displayPass ? 
                            <TouchableOpacity style={tailwind('relative right-12 top-2')} onPress={ () => { setDisplayPass(false) } }>
                                <Icon name="ios-eye-outline" size={28} color="#d1d5db" />
                            </TouchableOpacity> : 

                            <TouchableOpacity style={tailwind('relative right-12 top-2')} onPress={ () => { setDisplayPass(true) } }>
                                <Icon name="ios-eye-off-outline" size={28} color="#d1d5db" />
                            </TouchableOpacity>
                    }

                    
         
                </View>

                

                

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 3,routes: [{ name: 'ResetPassword' }],}); }}>
                    <Text style={tailwind('text-base font-extralight text-gray-900 mt-4 text-right mr-4')}>Forgot password?</Text>
                </TouchableOpacity>


        
            </View>


            {/* Submit Area */}
            
            <View style={tailwind('mt-10')}>

                <View style={tailwind('self-center flex flex-row')}>
                    <Text style={tailwind('text-base font-extralight text-gray-900')}>Dont' have an account?</Text>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 2,routes: [{ name: 'Register' }],}); }}>
                        <Text style={tailwind('text-base font-bold text-black ml-1.5')}>Register</Text>
                    </TouchableOpacity>

                </View>


                <TouchableOpacity onPress={() => SignIn()}
                style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-10 justify-center')}>

                    {/* {
                        loading ? 
                        <ActivityIndicator color="white" style={tailwind('py-3')} /> :
                        <Text style={tailwind('text-white font-bold py-3')}>Sign In</Text>
                    } */}
                    <Text style={tailwind('text-white font-bold py-3')}>Sign In</Text>

                </TouchableOpacity>

                

            </View>


        </SafeAreaView>
  );
}

export default Login;