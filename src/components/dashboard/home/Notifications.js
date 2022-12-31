import * as React from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity ,StyleSheet , ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';

function Notifications(props) {


    return (
        <SafeAreaView style={tailwind('bg-white ')}>

        
              
            <View style={tailwind('mt-3')}>


                {/* Header */}

                <View style={ tailwind('flex flex-row justify-around') }>

                    <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Dashboard' }],}); }}>
                        <Image style={tailwind('w-8 h-8 mt-5')} source={require('../../../../src/assets/img/misc/arrow_left.png')} />
                    </TouchableOpacity>

                    <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Notification</Text>
                    <Text style={tailwind('text-sm font-extralight text-gray-900 mt-5')}>Clear all</Text>

                </View>
            </View>
           
            <ScrollView style={styles.scrollView}>
            
                <View style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6 justify-center'),{ 
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.58,
                    elevation: 6,
                    }]}>

                    {/* Title */}
                    <View style={tailwind('justify-between flex flex-row')}>
                        <Text style={tailwind('text-black font-bold text-base ml-5')}>New Annoucement</Text>
                        <Text style={tailwind('text-gray-500 font-thin text-sm mr-5')}>12 mins ago</Text>
                    </View>

                    <View style={tailwind('w-10/12 self-center mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi leo, convallis vel dolor luctus, ultricies volutpat risus.</Text>
                    </View>

                </View>

                <View style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6 justify-center'),{ 
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.58,
                    elevation: 6,
                    }]}>

                    {/* Title */}
                    <View style={tailwind('justify-between flex flex-row')}>
                        <Text style={tailwind('text-black font-bold text-base ml-5')}>Update Application</Text>
                        <Text style={tailwind('text-gray-500 font-thin text-sm mr-5')}>1 day ago</Text>
                    </View>

                    <View style={tailwind('w-10/12 self-center mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi leo, convallis vel dolor luctus, ultricies volutpat risus.</Text>
                    </View>

                </View>

                <View style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6 justify-center'),{ 
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.58,
                    elevation: 6,
                    }]}>

                    {/* Title */}
                    <View style={tailwind('justify-between flex flex-row')}>
                        <Text style={tailwind('text-black font-bold text-base ml-5')}>Update Application</Text>
                        <Text style={tailwind('text-gray-500 font-thin text-sm mr-5')}>1 day ago</Text>
                    </View>

                    <View style={tailwind('w-10/12 self-center mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi leo, convallis vel dolor luctus, ultricies volutpat risus.</Text>
                    </View>

                </View>

                <View style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6 justify-center'),{ 
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.58,
                    elevation: 6,
                    }]}>

                    {/* Title */}
                    <View style={tailwind('justify-between flex flex-row')}>
                        <Text style={tailwind('text-black font-bold text-base ml-5')}>New Annoucement</Text>
                        <Text style={tailwind('text-gray-500 font-thin text-sm mr-5')}>12 mins ago</Text>
                    </View>

                    <View style={tailwind('w-10/12 self-center mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi leo, convallis vel dolor luctus, ultricies volutpat risus.</Text>
                    </View>

                </View>

                <View style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6 justify-center'),{ 
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.58,
                    elevation: 6,
                    }]}>

                    {/* Title */}
                    <View style={tailwind('justify-between flex flex-row')}>
                        <Text style={tailwind('text-black font-bold text-base ml-5')}>New Annoucement</Text>
                        <Text style={tailwind('text-gray-500 font-thin text-sm mr-5')}>12 mins ago</Text>
                    </View>

                    <View style={tailwind('w-10/12 self-center mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi leo, convallis vel dolor luctus, ultricies volutpat risus.</Text>
                    </View>

                </View>

                <View style={[tailwind('mt-10 bg-gray-50 rounded-2xl w-11/12 self-center py-6 justify-center'),{ 
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                    shadowOpacity: 0.58,
                    elevation: 6,
                    }]}>

                    {/* Title */}
                    <View style={tailwind('justify-between flex flex-row')}>
                        <Text style={tailwind('text-black font-bold text-base ml-5')}>New Annoucement</Text>
                        <Text style={tailwind('text-gray-500 font-thin text-sm mr-5')}>12 mins ago</Text>
                    </View>

                    <View style={tailwind('w-10/12 self-center mt-4')}>
                        <Text style={tailwind('text-gray-500 font-light text-sm')}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisi leo, convallis vel dolor luctus, ultricies volutpat risus.</Text>
                    </View>

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
      marginBottom : 50,
    },
    
  });

export default Notifications;