import * as React from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image } from 'react-native';
import tailwind from 'tailwind-rn';

function Patients(props) {

    return (
        <SafeAreaView style={tailwind('h-full bg-white items-center justify-center')}>

            <Image style={tailwind('w-40 h-40')} source={require('../../../../src/assets/img/logo/logo_1.png')} />
            <Text style={tailwind('text-sm text-black mt-4 font-normal')}>Patients</Text>

        </SafeAreaView>
  );
}

export default Patients;