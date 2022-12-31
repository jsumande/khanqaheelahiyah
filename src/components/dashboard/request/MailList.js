import React, { useState, useEffect ,useContext , useRef } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView } from 'react-native';
import { SwipeListView , SwipeRow } from 'react-native-swipe-list-view';

import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

import firestore from '@react-native-firebase/firestore';


import { GlobalContext } from '../../context/GlobalContext.js';

function MailList(props) {

    const {uid,updateUid} = useContext(GlobalContext);
    const [list, setList] = useState([]);
    let obj2 = [];
    let data;

    useEffect(() => {    
        get_firebase_data();
    })

    const get_firebase_data = () => {
        firestore().collection('Request').get().then(querySnapshot  => {
            
            querySnapshot.forEach(documentSnapshot => {
                data = documentSnapshot.data();
                doc_id = documentSnapshot.id;

                obj2.push( {
                    'message_id' : documentSnapshot.id,
                    'date_created' : data['date_created'],
                    'message' : data['message'],
                    'status' : data['status'],
                    'uid' : data['uid']
                } );
            });
            setList(obj2);
        });
    }


    const date = (data) =>{

        let calendar = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let today = new Date(data);
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        return calendar[month] + " " + day + " " + year;

    }


    function updateMessage(data){

        firestore().collection('Request').doc(data).update({
            status: "Seen",
        }).then(() => {
            props.navigation.reset({ index: 1,routes: [{ name: 'MessageDetail' , message_id : data  }],});
        });

    }

    function deleteMessage (data) {
        console.log(data.item.message_id);
        firestore().collection('Request').doc(data.item.message_id).delete().then(() => {
            get_firebase_data();
        });
    }

    const renderHiddenItem = (data, rowMap) => (
        <View style={tailwind('w-11/12 self-center justify-center')} >

                        
            <View style={tailwind('justify-between flex flex-row py-8')}>


                <TouchableOpacity onPress={() => { updateMessage(data.item.message_id)  }}> 
                    <View style={tailwind('flex flex-col ml-3')}>
                            <Icon name="mail" size={28} color="#00C55E" />
                            <Text style={tailwind('text-green-500 font-semibold text-xs self-center mb-6')}>View</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => deleteMessage(data) }
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                >
                        <View style={tailwind('flex flex-col')}>
                            <Image style={tailwind('w-6 h-6 mb-1 self-center')} source={require('../assets/icon/Delete_white.png')} />
                            <Text style={tailwind('text-white font-semibold text-xs mb-4')}> Delete </Text>
                        </View>
                </TouchableOpacity>


            </View>
        </View>
    );



    const renderItem = data => (
        

        <View style={tailwind('w-11/12 self-center py-3 justify-center border-b border-gray-200 bg-white')}>

        
            <View style={tailwind('justify-between flex flex-row ')}>

                { data.item.status == "Pending" ? 
                    <Text style={tailwind('text-yellow-300 font-normal text-sm')}>Unread</Text> :
                    <Text style={tailwind('text-green-300 font-normal text-sm')}>Read</Text>
                }

                <View style={tailwind('flex flex-row')}>
                    <Text style={tailwind('text-black font-thin text-sm')}>{date(data.item.date_created)} </Text>
                    <Image style={tailwind('w-5 h-5 mt-1')} source={require('../assets/icon/right.png')} />
                </View>

            </View>

            <View style={tailwind('mt-3')}>

                <TouchableOpacity onPress={() => { updateMessage(data.item.message_id)  }}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={tailwind('text-gray-500 font-light text-sm')}>{data.item.message}</Text>
                </TouchableOpacity>
                
            </View>

        </View>

    );




    return (
        <SafeAreaView style={tailwind('h-full  bg-white ')}>

        
              
            <View style={tailwind('mt-3')}>


                {/* Header */}

                <View style={ tailwind('flex flex-row justify-between') }>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4 ml-5')}>Inbox</Text>


                </View>

                <View style={ tailwind('') }>

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Search by keyword"
                    placeholderTextColor="#E5E7EB"
                />

                </View>


                
            </View>

            <SwipeListView
                    data={list}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    previewOpenDelay={1000}
            />
           
            {/* <ScrollView style={styles.scrollView}>
            
                { list.map((item,index) => 
                
                    <View style={tailwind('mt-2 w-11/12 self-center py-6 justify-center border-b border-gray-200')} key={index}>

        
                        <View style={tailwind('justify-between flex flex-row ')}>

                            { item.status == "Pending" ? 
                                <Text style={tailwind('text-yellow-300 font-normal text-sm')}>Unread</Text> :
                                <Text style={tailwind('text-green-300 font-normal text-sm')}>Read</Text>
                            }

                            <View style={tailwind('flex flex-row')}>
                                <Text style={tailwind('text-black font-thin text-sm')}>{date(item.date_created)} </Text>
                                <Image style={tailwind('w-5 h-5 mt-1')} source={require('../assets/icon/right.png')} />
                            </View>

                        </View>

                        <View style={tailwind('mt-3')}>

                            <TouchableOpacity onPress={() => { updateMessage(item.message_id)  }}>
                                <Text numberOfLines={2} ellipsizeMode="tail" style={tailwind('text-gray-500 font-light text-sm')}>{item.message}</Text>
                            </TouchableOpacity>
                
                        </View>

                    </View>
                
                
                )}



                <View style={tailwind('mt-7')}>

                </View>
                

            </ScrollView> */}


        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 0,
      marginTop : 5,
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },

    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    
  });

export default MailList;