import React, { useState, useContext , useEffect} from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image,TouchableOpacity,ScrollView,TextInput } from 'react-native';

import tailwind from 'tailwind-rn';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons';


function ViewMemberProfile(props) {


    const [first_name, setFirst_name] = useState("A");
    const [middle_name, setMiddle_name] = useState(null);
    const [last_name, setLast_name] = useState(null);

    const [father_name, setFather_name] = useState(null);
    const [mother_name, setMother_name] = useState(null);

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);

    useEffect(() => {

        if(props.route.patient_details['gender'] == "Male") {
            setMale(true);
            setFemale(false);
        } else {
            setMale(false);
            setFemale(true);
        }
            
        setFirst_name(props.route.patient_details['first_name']);
        setMiddle_name(props.route.patient_details['middle_name']);
        setLast_name(props.route.patient_details['last_name']);
                
        setFather_name(props.route.patient_details['father_name']);
        setMother_name(props.route.patient_details['mother_name']);
    }, []);



    return (
        <SafeAreaView style={tailwind('h-full bg-white')}>

           
            <View style={tailwind('mt-3')}>
                {/* Header */}
                <View style={ tailwind('flex flex-row justify-between w-11/12 self-center') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Select_Patient' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4')}>View Details</Text>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Select_Patient' }],}); }}>
                        <Text style={tailwind('text-sm font-normal text-black mt-4')}>Cancel</Text>
                    </TouchableOpacity>
                    

                </View>
                
            </View>

            <ScrollView style={styles.scrollView}>
                
            {/* Header */}


            <View style={ tailwind('self-center items-center mt-10') }>
            
                <View style={tailwind('border-4 border-green-200  bg-green-700 w-24 h-24 rounded-full  mb-4 self-center items-center justify-center')}>
                    <Text style={tailwind('text-4xl font-bold text-white')}>{first_name.substring(0,1).toUpperCase()}</Text>
                </View>
                

            </View>

            {/* Form Area  */}
            <View style={tailwind('')}>
                
            
                {/* Personal */}

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="First name"
                    placeholderTextColor="#E5E7EB"
                    value={first_name}
                    editable={false} selectTextOnFocus={false}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Middle name"
                    placeholderTextColor="#E5E7EB"
                    value={middle_name}
                    editable={false} selectTextOnFocus={false}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Last name"
                    placeholderTextColor="#E5E7EB"
                    value={last_name}
                    editable={false} selectTextOnFocus={false}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Father name"
                    placeholderTextColor="#E5E7EB"
                    value={father_name}
                    editable={false} selectTextOnFocus={false}
                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Mother name"
                    placeholderTextColor="#E5E7EB"
                    value={mother_name}
                    editable={false} selectTextOnFocus={false}
                />


                {/* Gender */}

                <View style={tailwind('mt-5 ml-5')}>
                    <Text style={tailwind('text-base font-bold text-black ml-1.5')}>Gender</Text>

                    <View style={tailwind('mt-2 ml-10 flex flex-row')}>
                        

                        { male == false ? 
                            <TouchableOpacity  style={tailwind('border border-gray-300 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity> : 
                            <TouchableOpacity  style={tailwind('border border-green-300 bg-green-500 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity>
                        }

                        

                        <Text style={tailwind('text-base font-medium text-gray-600 ml-2.5')}>Male</Text>

                        { female == false ? 
                            <TouchableOpacity  style={tailwind('ml-2.5 border border-gray-300 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity> : 
                            <TouchableOpacity  style={tailwind('ml-2.5 border border-green-300 bg-green-500 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity>
                        }

                        {/* <TouchableOpacity style={tailwind('ml-2.5 border border-gray-300 w-5 h-5 self-center rounded-2xl ')}></TouchableOpacity> */}

                        <Text style={tailwind('text-base font-medium text-gray-600 ml-2.5')}>Female</Text>


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

export default ViewMemberProfile;