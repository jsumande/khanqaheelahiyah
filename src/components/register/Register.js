import React, { useState, useContext , useEffect} from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity , ActivityIndicator  } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import list_country from './country_nationality.json';
import list_number from './country_number.json';

import {launchCamera, launchImageLibrary , ImagePicker} from 'react-native-image-picker';

import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { GlobalContext } from '../context/GlobalContext.js';


function Register(props) {

    const {updateRole, updateUid, updateUserData, updateUserCred , updateImgUrl} = useContext(GlobalContext);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [Cpassword, setCpassword] = useState(null);
    

    // Info

    const [first_name, setFirst_name] = useState(null);
    const [first_letter, setFirst_letter] = useState(null);
    const [middle_name, setMiddle_name] = useState(null);
    const [last_name, setLast_name] = useState(null);

    const [father_name, setFather_name] = useState(null);
    const [mother_name, setMother_name] = useState(null);

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);

    const [nationality, setNationality] = useState(null);
    const [residence, setResidence] = useState(null);
    const [number, setNumber] = useState(null);
    const [contact, setContact] = useState(null);

    const [cnic, setCnic] = useState(null);

    const [image , setImage] = useState(null);
    const [checkUpload , setCheckUpload] = useState(false);

     // Validation Text
     const [validate, setValidate] = useState(false);
     const [validateText, setValidateText] = useState(null);
     const [loading, setLoading] = useState(false);

     const [displayPass, setDisplayPass] = useState(true);
     const [displayPass2, setDisplayPass2] = useState(true);
     

    //  Dropdown

    const [dropdown_nationality, setDropdownNationality] = useState(null);
    const [dropdown_country, setDropdownCountry] = useState(null);


    let obj = [];
    let obj2 = [];
    let num = [];
    useEffect(() => { 

        for(let i = 0; i < list_country.length;i++){
            obj.push(list_country[i]['nationality'])
        }
        
        for(let i = 0; i < list_number.length;i++){
            obj2.push(list_number[i]['name'])
        }

        setDropdownNationality(obj);
        setDropdownCountry(obj2);
    },[]);


    const DialCodes = (data) => {
        let bigCities = list_number.filter(function (e) {
            return e.name == data;
        });

        setNumber(bigCities[0]['dialCode']);
    }

    const SignUp = () => {
        setLoading(true);

        if(password != Cpassword) {
            setValidate(true);
            setLoading(false);
            setValidateText("Confirm Password doesn't matched")

        } else if (!email || !password || !Cpassword) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your credentials")

        } else if (password.length < 6 ) {
            setValidate(true);
            setLoading(false);
            setValidateText("Password should be at least 6 characters")

        }else if (!first_name || !middle_name || !last_name || !father_name || !mother_name || male == false && female == false) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your personal information")

        } else if (!nationality || !residence) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your address information")

        } else if (!number || !contact) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your contact information")

        } else if (!cnic) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter your cnic number")

        } 
        else {
            setValidate(false);

            auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                User_data(response);
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/email-already-in-use') {
                    setValidate(true);
                    setValidateText("Email already exists")
                    setLoading(false);
                }
            });

        }

    }

    const User_data = (response) => {

        console.log(response);

        let gender;
        if(male){
            gender = "Male";
        } else if (female) {
            gender = "Female";
        }

        firestore()
            .collection('User_data')
            .doc(response['user']['uid'])
            .set({

                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                father_name: father_name,
                mother_name: mother_name,
                gender : gender,

                nationality: nationality,
                residence: residence,
                number: number,
                contact: contact,
                cnic: cnic,
                role : "User",
                profile_pic : "None"


            })
            .then(() => {

                let user_datas = {
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    father_name: father_name,
                    mother_name: mother_name,
                    gender : gender,

                    nationality: nationality,
                    residence: residence,
                    number: number,
                    contact: contact,
                    cnic: cnic,
                    role : "User",
                };

                updateRole("User");
                updateUid(response['user']['uid']);
                updateUserData(user_datas);
                updateUserCred(response['user']);


                if( image != null ) {
                    

                    console.log(image);

                    storage().ref('member/'+response['user']['uid']).putFile(image).then((snapshot) => {
                        storage().ref('member/'+response['user']['uid']).getDownloadURL().then((url) => {
                                updateImgUrl(url)
                                firestore().collection('User_data').doc(response['user']['uid']).update({
                                    profile_pic : url,
                                }).then((e) => {

                                });
                                
                        });
                    }).catch((e) => console.log('uploading image error => ', e));

                }
                else{
                    console.log(image);
                    updateImgUrl("None");
                }

                props.navigation.reset({ index: 4,routes: [{ name: 'Dashboard' }],});
                setLoading(false);

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
            }
          });
    }

    const uploadPic = () => {


        console.log("Open");
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
                console.log(response.assets[0]['uri']);
              setImage(response.assets[0]['uri']);
            
            }
          });
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

            
        <ScrollView style={styles.scrollView}>
                
            {/* Header */}


            <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Login' }],}); }}>
                <Image style={tailwind('w-8 h-8 mt-5 ml-3.5')} source={require('../../../src/assets/img/misc/arrow_left.png')} />
            </TouchableOpacity>
            

            <View style={ tailwind('items-center mt-5') }>
            

                <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Create Account</Text>

                <Text style={tailwind('text-base font-extralight text-gray-900 mt-4 w-3/5 text-center')}>
                    Enter your details to register to join the community!
                </Text>

                {/* <Image style={tailwind('w-32 h-32 mt-5')} source={require('../../../src/assets/img/logo/User.png')} /> */}


                { image ? <Image
                    style={tailwind('w-28 h-28 rounded-full mt-4 mb-4 items-center justify-center')}
                    source={{uri : image }} />: 

                    <TouchableOpacity onPress={ () => setCheckUpload(true) }
                        style={tailwind('border-2 border-gray-200   w-28 h-28 rounded-full mt-4 mb-4 items-center justify-center')}>
                        <View style={tailwind('items-center flex-col')}>
                            <Image style={tailwind('w-8 h-8 ')} source={require('../dashboard/assets/icon/user_upload.png')} />
                            <Text style={tailwind('text-xs text-gray-600 mt-1')}>Upload Picture</Text>
                        </View>
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
                
                {/*  Credential */}

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

                <View style={tailwind('flex flex-row w-11/12 self-center items-center')}>

                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry={displayPass2}
                        placeholderTextColor="#E5E7EB"
                        onChange={ (e) => setCpassword(e.nativeEvent.text)}
                        style={tailwind('mt-4 border bg-white rounded-2xl border-gray-300 w-full self-center text-gray-400 px-5')}
                    />


                    {
                        displayPass2 ? 
                            <TouchableOpacity style={tailwind('relative right-12 top-2')} onPress={ () => { setDisplayPass2(false) } }>
                                <Icon name="ios-eye-outline" size={28} color="#d1d5db" />
                            </TouchableOpacity> : 

                            <TouchableOpacity style={tailwind('relative right-12 top-2')} onPress={ () => { setDisplayPass2(true) } }>
                                <Icon name="ios-eye-off-outline" size={28} color="#d1d5db" />
                            </TouchableOpacity>
                    }

                </View>
                

                <View style={tailwind('py-1 border-t border-gray-300 w-11/12 self-center mt-5')}></View>

                {/* Personal */}

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="First name"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) => { setFirst_name(e.nativeEvent.text); setFirst_letter( e.nativeEvent.text.substring(0,1) ) } } 
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

                <View style={tailwind('py-1 border-t border-gray-300 w-11/12 self-center mt-5')}></View>

                {/* <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Select your Nationality"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>  setNationality(e.nativeEvent.text)}
                /> */}

                

                {/* <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Country of Residence"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>  setResidence(e.nativeEvent.text)}
                /> */}

                    <SelectDropdown
                    defaultButtonText={'Select your Nationality'}
                    data={dropdown_nationality}
                    buttonStyle={tailwind('mt-4 border rounded-2xl bg-white border-gray-300 w-11/12  self-center px-5')}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    onSelect={(selectedItem, index) => {
                        setNationality(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={28} color="#d1d5db" />;
                    }}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />

                <SelectDropdown
                    defaultButtonText={'Country of Residence'}
                    data={dropdown_country}
                    buttonStyle={tailwind('mt-4 border rounded-2xl bg-white border-gray-300 w-11/12  self-center px-5')}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    onSelect={(selectedItem, index) => {
                        setResidence(selectedItem);
                        DialCodes(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={28} color="#d1d5db" />;
                    }}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />

                <View style={tailwind('flex flex-row self-center')}>
                    
                    <TextInput
                        style={tailwind('mt-4 border rounded-2xl bg-gray-300 border-gray-300 w-1/4 text-gray-400 px-5 mr-2.5')}
                        placeholder="No."
                        placeholderTextColor="#E5E7EB"
                        value={number}
                        editable={false} selectTextOnFocus={false}
                    />

                    <TextInput
                        style={tailwind('mt-4 border rounded-2xl border-gray-300 w-7/12 text-gray-400 px-5')}
                        placeholder="Contact #"
                        placeholderTextColor="#E5E7EB"
                        keyboardType='numeric'
                        onChange={ (e) =>  setContact(e.nativeEvent.text)}
                    />

                </View>

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="CNIC Number"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>   setCnic(e.nativeEvent.text)}
                />

                {
                    validate == true ?    
                    
                    <View style={tailwind('pt-2 pb-2 px-4 rounded-md bg-red-100 flex-row self-center  items-center mt-3')}>
                        <Icon name="close-circle" size={20} color="red" />
                        <Text style={tailwind('text-base font-medium text-red-500 ml-2')}>{validateText}</Text>
                    </View>

                    : null
                }


                <TouchableOpacity  onPress={() => SignUp()}
                style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-10 mb-10 justify-center')}>
                    {/* {
                        loading ? 
                        <ActivityIndicator color="white" style={tailwind('py-3')} /> :
                        <Text style={tailwind('text-white font-bold py-3')}>Join Us</Text>
                    } */}
                    
                    <Text style={tailwind('text-white font-bold py-3')}>Join Us</Text>
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
    dropdown1BtnTxtStyle: {color: '#9ca3af', textAlign: 'left' , fontSize:13},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#9ca3af', textAlign: 'left'},
  });

export default Register;