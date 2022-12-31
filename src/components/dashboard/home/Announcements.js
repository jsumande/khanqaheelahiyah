import React, { useState, useEffect } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';

function Announcements(props) {

    const [list, setList] = useState([]);

    let obj2 = [];
    let data;
    let doc_id;
    useEffect(() => {   
        firestore().collection('Announcement').get().then(querySnapshot  => {
            
            querySnapshot.forEach(documentSnapshot => {
                data = documentSnapshot.data();
                doc_id = documentSnapshot.id;

                obj2.push( {
                    'doc_id' : doc_id,
                    'title' : data['title'],
                    'message' : data['message'],
                    'date_created' : data['date_created']
                } );
            });
            setList(obj2);
        });
        
    }, [] );

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

                <View style={ tailwind('flex flex-row justify-around') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 4,routes: [{ name: 'Dashboard' , role : props.route['role'] }] }); }}>
                        <Image style={tailwind('w-8 h-8 mt-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Announcements</Text>
                    <Image style={tailwind('w-8 h-8 mt-4')} source={require('../assets/icon/order.png')} />

                </View>
            </View>
           
            <ScrollView style={styles.scrollView}>
                
                { list.map((todo,index) => 

                    <View style={tailwind('mt-2 w-11/12 self-center py-6 justify-center border-b border-gray-200')} key={index}>

                        <TouchableOpacity onPress={() => { props.navigation.reset({ index: 5,routes: [{ name: 'AnnouncementDetails' , doc_id : todo.doc_id  }],}); }}>
                            <Text style={tailwind('text-black font-bold text-base')}>{todo.title} {todo.User_id} </Text>
                        </TouchableOpacity>

                        <View style={tailwind('mt-3')}>
                            <Text style={tailwind('text-gray-500 font-light text-xs')}>{todo.message}</Text>
                        </View>

                        <View style={tailwind('flex flex-row mt-3')}>
                            <Image style={tailwind('w-5 h-5')} source={require('../assets/img/event.png')} />
                            <Text style={tailwind('text-gray-900 font-light text-sm ml-3')}>{date(todo.date_created)}</Text>
                        </View>

                    </View>
                
                )}
                
                <View style={tailwind('mt-10')}></View>
                
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

export default Announcements;