import React, { useState, useContext , useEffect} from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity , ActivityIndicator  } from 'react-native';

import {launchCamera, launchImageLibrary , ImagePicker} from 'react-native-image-picker';

import tailwind from 'tailwind-rn';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { GlobalContext } from '../../context/GlobalContext.js';

function Edit_Patient(props) {

    const {uid} = useContext(GlobalContext);

    const [first_name, setFirst_name] = useState("A");
    const [middle_name, setMiddle_name] = useState(null);
    const [last_name, setLast_name] = useState(null);

    const [father_name, setFather_name] = useState(null);
    const [mother_name, setMother_name] = useState(null);

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);

    const [image, setImage] = useState(null);
    const [imageCheck, setImageCheck] = useState(null);
    const [checkUpload , setCheckUpload] = useState(false);

    // Validation Text
    const [validate, setValidate] = useState(false);
    const [validateText, setValidateText] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(props.route.patient_details['gender'] == "Male") {
            setMale(true);
            setFemale(false);
        } else {
            setMale(false);
            setFemale(true);
        }

        if(props.route.patient_details['profile_pic'] != "None") {
            setImage(props.route.patient_details['profile_pic'])
        }
            
        setFirst_name(props.route.patient_details['first_name']);
        setMiddle_name(props.route.patient_details['middle_name']);
        setLast_name(props.route.patient_details['last_name']);
                
        setFather_name(props.route.patient_details['father_name']);
        setMother_name(props.route.patient_details['mother_name']);
    }, []);

    const validation = () => {
        setLoading(true);

        if (!first_name || !middle_name || !last_name || !father_name || !mother_name || male == false && female == false) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your personal information")

        }  else {
            updateRecord();
        }

    }

    function updateRecord () {

        let gender;
        if(male){
            gender = "Male";
        } else if (female) {
            gender = "Female";
        }

        firestore()
            .collection('Patients')
            .doc(props.route.patient_details['patient_id'])
            .update({

                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                father_name: father_name,
                mother_name: mother_name,
                gender : gender,

            })
            .then((e) => {

               
                if(imageCheck == "Added") {

                    if(props.route.patient_details['profile_pic'] != "None") {
                        console.log("Re upload");
                        storage().ref('patient/'+props.route.patient_details['patient_id']).delete().then(() => {

                        storage().ref('patient/'+props.route.patient_details['patient_id']).putFile(image).then((snapshot) => {

                            storage().ref('patient/'+props.route.patient_details['patient_id']).getDownloadURL().then((url) => {

            
                                firestore().collection('Patients').doc(props.route.patient_details['patient_id']).update({
                                    profile_pic : url
                                }).then((e) => { setLoading(false); props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],}); });
                                
                            });  
                        });
                        
                    }).catch((e) => console.log('getting downloadURL of image error => ', e));

                    } else {
                        console.log("new upload");

                        storage().ref('patient/'+props.route.patient_details['patient_id']).putFile(image).then((snapshot) => {

                            storage().ref('patient/'+props.route.patient_details['patient_id']).getDownloadURL().then((url) => {
            
                                firestore().collection('Patients').doc(props.route.patient_details['patient_id']).update({
                                    profile_pic : url
                                }).then((e) => { setLoading(false); props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],}); });
                                
                            });  
                        });

                    }

                } else {
                    setLoading(false);
                    props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],});
                }

          
            });
    }

    const cameraPic = () => {
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          launchCamera(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
                setImage(response.assets[0]['uri']);
                setImageCheck("Added");
            }
          });
    }

    const uploadPic = () => {
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

          launchImageLibrary(options, (response) => {
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
      
                setImage(response.assets[0]['uri']);
                setImageCheck("Added");
            }
          });
    }


    function first_letter (data) {
        console.log(data)
        return data.substring(0,1).toUpperCase();
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
           
            <View style={tailwind('mt-3')}>
                {/* Header */}
                <View style={ tailwind('flex flex-row justify-between w-11/12 self-center') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Edit Patient</Text>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],}); }}>
                        <Text style={tailwind('text-sm font-normal text-black mt-4')}>Cancel</Text>
                    </TouchableOpacity>
                    

                </View>
                
            </View>

            <ScrollView style={styles.scrollView}>
                
            {/* Header */}


            <View style={ tailwind('self-center items-center mt-10') }>
            
                {/* <View style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full  mb-4 self-center items-center justify-center')}>
                    <Text style={tailwind('text-4xl font-bold text-white')}>{first_name.substring(0,1).toUpperCase()}</Text>
                </View> */}

                { image ? 

                    <TouchableOpacity  onPress={ () => setCheckUpload(true) }>
                        <Image style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full  mb-4 self-center items-center justify-center')}
                        source={{uri :image}} />
                    </TouchableOpacity>
                     : 

                    <TouchableOpacity onPress={ () => setCheckUpload(true) }
                        style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full  mb-4 self-center items-center justify-center')}>
                        <Text style={tailwind('text-4xl font-bold text-white')}>{first_name.substring(0,1).toUpperCase()}</Text>
                    </TouchableOpacity>

                }

                {checkUpload ? 

                    <View style={tailwind('flex-row')}>
                        <TouchableOpacity  onPress={() => cameraPic()} 
                        style={tailwind('bg-green-700 w-2/6 self-center rounded-md items-center justify-center')}>
                        
                            <Text style={tailwind('text-white font-bold py-2')}>Camera Roll</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  onPress={() => uploadPic()} 
                        style={tailwind('bg-green-700 w-2/6 self-center rounded-md items-center justify-center ml-3')}>
                        
                            <Text style={tailwind('text-white font-bold py-2')}>Image Upload</Text>
                        </TouchableOpacity>

                    </View> : null

                }

            </View>

            {/* Form Area  */}
            <View style={tailwind('')}>
                
            
                {/* Personal */}

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="First name"
                    placeholderTextColor="#E5E7EB"
                    value={first_name}
                    onChange={ (e) =>  setFirst_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Middle name"
                    placeholderTextColor="#E5E7EB"
                    value={middle_name}
                    onChange={ (e) =>  setMiddle_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Last name"
                    placeholderTextColor="#E5E7EB"
                    value={last_name}
                    onChange={ (e) =>  setLast_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Father name"
                    placeholderTextColor="#E5E7EB"
                    value={father_name}
                    onChange={ (e) =>  setFather_name(e.nativeEvent.text)}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Mother name"
                    placeholderTextColor="#E5E7EB"
                    value={mother_name}
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


                <TouchableOpacity onPress={() => validation()} style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-10 justify-center')}>
                    <Text style={tailwind('text-white font-bold py-3')}>Save Changes</Text>
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

export default Edit_Patient;