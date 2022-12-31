import * as React from 'react';
import { SafeAreaView,View ,Text,TouchableOpacity,Image } from 'react-native';
import tailwind from 'tailwind-rn';

function Success(props) {




    return (
        <SafeAreaView style={tailwind('h-full bg-white items-center justify-center')}>

            <Image style={tailwind('w-48 h-24')} source={require('../assets/icon/Success.png')} />
            <Text style={tailwind('text-lg font-bold text-black mt-4')}>Your Patient</Text>
            <Text style={tailwind('text-lg font-bold text-black mt-1')}>has been added!</Text>

            <TouchableOpacity 
            onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'View_Patient' }],}); }}
            style={tailwind('flex flex-row mt-10')}>

                <Image style={tailwind('w-4 h-3 mt-1')} source={require('../assets/icon/arrow.png')} />
                <Text style={tailwind('text-sm font-normal text-gray-400 ml-2')}>Go back to patient listing</Text>
                
            </TouchableOpacity>

        </SafeAreaView>
  );
}

export default Success;