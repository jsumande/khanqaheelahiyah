import React, { useState, useEffect ,useContext } from 'react';
import { SafeAreaView,View ,Text,ImageBackground,Image ,Dimensions ,TouchableOpacity  } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import tailwind from 'tailwind-rn';

import firestore from '@react-native-firebase/firestore';

import { GlobalContext } from '../../context/GlobalContext.js';

function Home(props) {

    const {updateRole,role,uid,updateUid , user_data} = useContext(GlobalContext);


    const [activeIndex, setActiveIndex] = useState(0);
 
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


    function  _renderItem({item,index}){
        return (
          <View style={tailwind('bg-white rounded-2xl py-8 justify-center')} key={index}>

      
              <TouchableOpacity style={tailwind('w-10/12 self-center')} onPress={() => { props.navigation.reset({ index: 5,routes: [{ name: role == "Admin" ? 'AnnouncementDetailsAdmin'  :'AnnouncementDetails' , doc_id : item.doc_id  }],}); }}>
                <Text style={tailwind('text-black font-bold text-base')}>{item.title}</Text>
              </TouchableOpacity>

              <View style={tailwind('w-10/12 self-center my-4')}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={tailwind('text-gray-500 font-light text-xs')}>{item.message}</Text>
              </View>

              <View style={tailwind('w-10/12 self-center flex flex-row')}>
                <Image style={tailwind('w-5 h-5')} source={require('../assets/img/event.png')} />
                <Text style={tailwind('text-green-900 font-light text-sm ml-3')}>{date(item.date_created)}</Text>
              </View>
            
            
          </View>

        )
    }

    const image = { uri: "../assets/img/BG.png" };

    return (
        <SafeAreaView style={tailwind('h-full bg-green-800')}>
            
            <ImageBackground source={require('../assets/img/calligraphy.png')} style={tailwind('h-full')}>


            {/* Header */}
            <View style={tailwind('flex-row ml-6 mt-5 justify-between')}>

                <View style={tailwind('flex flex-row')}>
                    <Text style={tailwind('text-white font-light text-xl')}>Hello, </Text>
                    <Text style={tailwind('text-white font-bold text-xl')}>{ user_data['first_name'] }</Text>
                </View>

               
                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Notifications' }],}); }} 
                style={tailwind('flex flex-row relative right-2')}>
                        <Image style={tailwind('w-7 h-7')} source={require('../assets/icon/notification.png')} />
                        <View  style={tailwind('h-5 w-5 rounded-full  bg-yellow-300 items-center justify-center relative right-3')}>
                            <Text style={tailwind('text-black font-normal text-xs')}>5</Text>
                        </View>
                </TouchableOpacity>

            </View>
            

            <View style={tailwind('mt-8')}>

                <Carousel
                    layout={"default"}
                    data={list}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width * .85}
                    renderItem={_renderItem}
                    onSnapToItem = { index => setActiveIndex(index) } 
                    
                />

            </View>


            <View style={tailwind('flex flex-col mt-14')}>

                <View style={tailwind('flex flex-row self-center')}>

                    <View style={tailwind('flex flex-col items-center')}>

                            <TouchableOpacity style={tailwind('flex flex-col')} onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],}); }}>
                            
                            <Image style={tailwind('w-20 h-16')} source={require('../assets/icon/patients.png')} />
                            <Text style={tailwind('text-white font-normal text-sm')}>My Patients</Text>

                        </TouchableOpacity>

                       
                    </View>
                    
                    <View style={tailwind('mx-10')}></View>


                    {  role == "Admin" ?

                        <View style={tailwind('flex flex-col items-center')}>
                            <Image style={tailwind('w-20 h-16')} source={require('../assets/icon/mail_white.png')} />
                            <Text style={tailwind('text-white font-normal text-sm')}>Inbox</Text>
                        </View> : 

                        <View style={tailwind('flex flex-col items-center')}>
                            <Image style={tailwind('w-20 h-16')} source={require('../assets/icon/request_white.png')} />
                            <Text style={tailwind('text-white font-normal text-sm')}>My Request</Text>
                        </View>
                    
                    }


                    
                                
                </View>

                <View style={tailwind('flex flex-row self-center mt-16 mr-2')}>

                    <View style={tailwind('flex flex-row self-center')}>

                    <View style={tailwind('flex flex-col')}>

                        <TouchableOpacity style={tailwind('flex flex-col')} onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: role == "Admin" ? 'AnnouncementAdmin' : 'Announcements' }],}); }}>
                       
                            <View style={tailwind('flex flex-row relative')}>
                                <View  style={tailwind('h-5 w-5 rounded-full  bg-yellow-300 items-center justify-center')}>
                                    <Text style={tailwind('text-black font-normal text-xs')}></Text>
                                </View>
                                <Image style={tailwind('w-20 h-14 self-center')} source={require('../assets/icon/horn.png')} />
                            </View>

                            <Text style={tailwind('text-white font-normal text-sm')}>Announcements</Text>

                        </TouchableOpacity>

                    </View>

                    <View style={tailwind('mx-8')}></View>

                    <View style={tailwind('flex flex-col')}>

                        <TouchableOpacity style={tailwind('flex flex-col')} onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'ViewProfile' }],}); }}>
                        
                            <Image style={tailwind('w-14 h-14 self-center')} source={require('../assets/icon/profile_icon.png')} />

                            <Text style={tailwind('text-white font-normal text-sm')}>My Profile</Text>

                        </TouchableOpacity>
                        
                    </View>
                                
                    </View>   

                </View>


                </View>

           

            
            </ImageBackground>
        </SafeAreaView>
  );
}

export default Home;