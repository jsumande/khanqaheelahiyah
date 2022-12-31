import React, { useState, useEffect ,useContext } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView , FlatList  } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';
import { GlobalContext } from '../../context/GlobalContext.js';

function Select_Patient(props) {

    const {uid , updatePatients} = useContext(GlobalContext);

    const [list, setList] = useState([]);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [patient_list , setPatientList] = useState([]);

    let obj2 = [];
    let data;

    useEffect(() => { 
        get_data() 
    },[])

    function get_data () {
        firestore().collection('Patients').where('assign_patient', '==', uid).get().then(querySnapshot  => {

            querySnapshot.forEach(documentSnapshot => {
                data = documentSnapshot.data();
                obj2.push( {
                    "patient_id" : documentSnapshot.id,
                    "name" : data['first_name'] + " " + data['middle_name'] + " " +data['last_name'],
                    "first_name" :  data['first_name'],
                    "middle_name" :  data['middle_name'],
                    "last_name" :  data['last_name'],
                    "mother_name" :  data['mother_name'],
                    "father_name" :  data['father_name'],
                    "gender" : data['gender'],
                    "selected" : false,
                    "profile_pic" : data['profile_pic'],
                } );
            });
            setList(obj2);
      
        });
    }

    function first_letter (data) {
        return data.substring(0,1);
    }


    function addPatient (data) {

        let value = null;
        setToggleCheckBox(false);
        if(list[data]['selected'] == true) {
            value = false;
            patient_list.filter(function(value){ 
                return value.patient_id == list[data]['patient_id'];
            });
            patient_list.splice(0,1);
        }
        else { 
            value = true;
            patient_list.push(list[data]);
        }
        
        setList((list) => {
          const newlist = [...list];
          newlist[data]['selected'] = value;
          return newlist;
        });

    } 

    function selectAll(){

        if(toggleCheckBox) { 

            setToggleCheckBox(false);
            
            for(let i = 0;i < list.length;i++) {
                setList((list) => {
                    const newlist = [...list];
                    newlist[i]['selected'] = false;
                    return newlist;
                  });

                patient_list.filter(function(value){ 
                    return value.patient_id == list[i]['patient_id'];
                });
                patient_list.splice(0,1);
            }

        }
        else { 

            setToggleCheckBox(true);

            for(let i = 0;i < list.length;i++) {
                setList((list) => {
                    const newlist = [...list];
                    newlist[i]['selected'] = true;
                    return newlist;
                  });
                  patient_list.push(list[i]);
            }

         }

        
    }

    function addMessage (data) {
        updatePatients(patient_list);
        props.navigation.reset({ index: 1,routes: [{ name: 'New_Message' }],});
    }

    return (
        <SafeAreaView style={tailwind('bg-white h-full')}>

            <View style={tailwind('mt-3')}>
                {/* Header */}
                <View style={ tailwind('flex flex-row justify-between w-11/12 self-center') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'New_Message' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Patients</Text>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'AddMemberProfile' }],}); }}>
                            <Image style={tailwind('w-8 h-8 mt-4')} source={require('../assets/icon/patient.png')} />
                    </TouchableOpacity>


                </View>

                <View style={ tailwind('flex flex-row border-b border-gray-300 pb-2 mt-3 w-11/12 self-center') }>

                    <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={() => selectAll()}
                            tintColors={true}
                    />

                    <Text style={tailwind('text-xs font-normal text-black mt-2')}>Select All</Text>

                </View>


            </View>

            
            <ScrollView style={styles.scrollView} >

                {  list.map((item,index) => { 
                return(
                    <View key={index} style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6'),
                    { 
                        shadowColor: "black",
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 6,
                        shadowOpacity: 0.58,
                        elevation: 6,
                    }]}>

                    <View style={tailwind('flex flex-row w-11/12 ml-5 pb-6')}>

                        <CheckBox
                            disabled={false}
                            value={item.selected}
                            onValueChange={() => addPatient(index)}
                            tintColors={true}
                        />

                        <View style={tailwind('flex flex-row ml-5')}>

                            { item.profile_pic != "None" ? 

                                <Image style={tailwind('w-14 h-14 rounded-full items-center justify-center')}
                                source={{uri : item.profile_pic }} /> :
                                
                                <View style={tailwind('border-4 border-green-200  bg-green-700 w-14 h-14 rounded-full items-center justify-center')}>
                                    <Text style={tailwind('text-2xl font-bold text-white')}>{first_letter(item.name)}</Text>           
                                </View>  
                            }

                            

                            <View style={tailwind('flex flex-col ml-3')}>
                                <Text style={tailwind('font-bold text-black text-base')}>{item.name}</Text>
                                <Text style={tailwind('font-normal text-gray-400 text-sm')}>Gender: {item.gender}</Text>
                            </View>

                        </View>

                    </View>

                    <TouchableOpacity 
                        onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'ViewMemberProfile' , patient_details : item }],}); }}
                        style={tailwind('w-11/12 items-end mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>View details</Text>
                    </TouchableOpacity>

                </View>

            );
        })
                
                
                
                }
            
                <View style={tailwind('mt-10')}></View>
                
            </ScrollView>

            { patient_list.length != 0 ?

                <TouchableOpacity onPress={() => addMessage()}
                     style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mb-6 justify-center')}>
                    <Text style={tailwind('text-white font-bold py-3')}>Add to Message</Text>
                </TouchableOpacity> : null

            }

            

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 0,
      marginBottom : 50,
    },
    
  });

export default Select_Patient;