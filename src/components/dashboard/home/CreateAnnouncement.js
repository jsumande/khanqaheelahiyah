import React, { useState, useEffect } from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image , ScrollView , TextInput , TouchableOpacity , ActivityIndicator  } from 'react-native';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';

function CreateAnnouncement(props) {

    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

     // Validation Text
     const [validate, setValidate] = useState(false);
     const [validateText, setValidateText] = useState(null);
     const [loading, setLoading] = useState(false);

    const validation = () => {
        setLoading(true);

        if (!title || !message) {
            setValidate(true);
            setLoading(false);
            setValidateText("Please enter required field")
        } else {
            createAnnouncements();
        }

    }
  

    function createAnnouncements () {

        firestore().collection('Announcement').add({
            title: title,
            message: message,
            date_created: new Date().toISOString().slice(0, 10),

        }).then((e) => { props.navigation.reset({ index: 5,routes: [{ name: 'AnnouncementAdmin' }],}); });
       
    }

    return (
        <SafeAreaView style={tailwind('h-full bg-white justify-center')}>
            
        
        <ScrollView style={styles.scrollView}>
                
            {/* Header */}

            <View style={ tailwind('flex flex-row justify-between') }>

        
                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'AnnouncementAdmin' }],}); }}>
                    <Image style={tailwind('w-8 h-8 mt-5 ml-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                </TouchableOpacity>

                <Text style={tailwind('text-2xl font-bold text-black mt-4 mr-6')}>New Announcement</Text>

                <View style={tailwind('w-8 h-8 mt-5')} />

            </View>
        

            {/* Form Area  */}
            <View style={tailwind('')}>
                
                {/*  Credential */}

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5')}
                    placeholder="Tittle"
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>   setTitle(e.nativeEvent.text)}

                />

                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-900 px-5 pb-36')}
                    placeholder="Message"
                    multiline={true}
                    umberOfLines={4}
                    placeholderTextColor="#E5E7EB"
                    onChange={ (e) =>   setMessage(e.nativeEvent.text)}
                />

                {
                    validate == true ?                 
                    <Text style={tailwind('text-base font-normal text-red-600 mt-4 self-center')}>{validateText}</Text> : null
                }


                <TouchableOpacity onPress={() => validation()} style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-10 justify-center')}>
                    {
                        loading ? 
                        <ActivityIndicator color="white" style={tailwind('py-3')} /> :
                        <Text style={tailwind('text-white font-bold py-3')}>Publish Announcement</Text>
                    }
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

export default CreateAnnouncement;