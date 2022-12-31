import React, { useState, useEffect ,useContext , useRef } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';


import { GlobalContext } from '../../context/GlobalContext.js';

function Requests(props) {

    const {uid,updateUid} = useContext(GlobalContext);
    const [list, setList] = useState([]);
    let obj2 = [];
    let data;

    useEffect(() => {    

        firestore()
        .collection('Request').where('uid', '==', uid)
        .get()
        .then(querySnapshot => {
        
            querySnapshot.forEach(documentSnapshot => {
                // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              data = documentSnapshot.data();
              doc_id = documentSnapshot.id;

              obj2.push({

                message_id : documentSnapshot.id,
                date_created : data['date_created'],
                message : data['message'],
                status : data['status'],
                uid : data['uid']

              });
            });
            setList(obj2);

        });

    },[])


    const date = (data) =>{

        let calendar = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let today = new Date(data);
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        return calendar[month] + " " + day + " " + year;

    }




    return (
        <SafeAreaView style={tailwind('h-full  bg-white ')}>

        
              
            <View style={tailwind('mt-3')}>


                {/* Header */}

                <View style={ tailwind('flex flex-row justify-between') }>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4 ml-5')}>My Requests</Text>

                    <TouchableOpacity style={tailwind('flex flex-col')} onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'New_Message' }],}); }}>
                       
                        <Image style={tailwind('w-8 h-8 mt-4 mr-5')} source={require('../assets/icon/edit.png')} />

                    </TouchableOpacity>


                </View>

                <View style={ tailwind('') }>

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Search by keyword"
                    placeholderTextColor="#E5E7EB"
                />

                </View>


                
            </View>
           
            <ScrollView style={styles.scrollView}>
            
                { list.map((item,index) => 
                
                    <View style={tailwind('mt-2 w-11/12 self-center py-6 justify-center border-b border-gray-200')} key={index}>

        
                        <View style={tailwind('justify-between flex flex-row ')}>

                            { item.status == "Pending" ? 
                                <Text style={tailwind('text-yellow-300 font-normal text-sm')}>Pending</Text> :
                                <Text style={tailwind('text-green-300 font-normal text-sm')}>Seen</Text>
                            }

                            <View style={tailwind('flex flex-row')}>
                                <Text style={tailwind('text-black font-thin text-sm')}>{date(item.date_created)} </Text>
                                <Image style={tailwind('w-5 h-5 mt-1')} source={require('../assets/icon/right.png')} />
                            </View>

                        </View>

                        <View style={tailwind('mt-3')}>

                            <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'MessageDetail' , message_id : item.message_id  }],}); }}>
                                <Text numberOfLines={2} ellipsizeMode="tail" style={tailwind('text-gray-500 font-light text-sm')}>{item.message}</Text>
                            </TouchableOpacity>
                
                        </View>

                    </View>
                
                
                )}



                <View style={tailwind('mt-7')}>

                </View>
                

            </ScrollView>


        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 0,
      marginTop : 5,
},
    
  });

export default Requests;