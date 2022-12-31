import React, { useState, useEffect } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';

function AnnouncementDetailsAdmin(props) {

    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {

        firestore().collection('Announcement').doc(props.route['doc_id']).get().then(documentSnapshot => {
            
            if (documentSnapshot.exists) {
                let data = documentSnapshot.data();
                setTitle(data['title']);
                setMessage(data['message']);
                setDate(data['date_created']);
        
            }
        });
       
    }, []);

    const dates = (data) =>{

        let calendar = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let today = new Date(data);
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        return calendar[month] + " " + day + " " + year;

    };


    const delete_announcement = (data) =>{

        firestore()
        .collection('Announcement')
        .doc(data)
        .delete()
        .then((response) => {
            props.navigation.reset({ index: 5,routes: [{ name: 'AnnouncementAdmin' }],}); 
        });

    };

    return (
        <SafeAreaView style={tailwind('h-full  bg-white ')}>

            <View style={tailwind('mt-3')}>


                {/* Header */}

                <View style={ tailwind('flex flex-row justify-between') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'AnnouncementAdmin' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5 ml-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'UpdateAnnouncement' , doc_id : props.route['doc_id'] }],}); }}>
                        <Image style={tailwind('w-5 h-6 mt-4 mr-6')} source={require('../assets/icon/Vector.png')} />
                    </TouchableOpacity>


                </View>
            </View>

            <View style={tailwind('mt-2 w-11/12 self-center py-6 justify-center')}>

                {/* Title */}
                <View style={tailwind('')}>
                    <Text style={tailwind('text-green-600 font-bold text-lg')}> {title} </Text>
                </View>

                <View style={tailwind('flex flex-row mt-3')}>
                    <Image style={tailwind('w-5 h-5')} source={require('../assets/img/event.png')} />
                    <Text style={tailwind('text-gray-900 font-light text-sm ml-3')}>{ dates(date) }</Text>
                </View>

            </View>
           
            <ScrollView style={styles.scrollView}>

                <View style={tailwind('text-justify w-11/12 self-center')}>

                    <Text style={tailwind('text-gray-500 font-light text-sm mt-5')}>
                        { message }
                    </Text>


                </View>

                <View style={tailwind('mt-5')}>

                    <TouchableOpacity 
                        onPress={() => { props.navigation.reset({ index: 5,routes: [{ name: 'AnnouncementAdmin' }],}); }}
                        style={tailwind('w-11/12 self-center rounded-2xl items-center mt-10 justify-center border')}
                    >
                        <Text style={tailwind('text-gray-600 font-bold py-3')}>Add to Calendar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => { delete_announcement(props.route['doc_id']) }}
                        style={tailwind('w-11/12 self-center rounded-2xl items-center mt-5 justify-center border')}
                    >
                        <Text style={tailwind('text-gray-600 font-bold py-3')}>Delete</Text>
                    </TouchableOpacity>

                </View>
            
                <View style={tailwind('mt-10')}>

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

export default AnnouncementDetailsAdmin;