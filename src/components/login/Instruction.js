import * as React from 'react';
import { SafeAreaView,View ,Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

function Instruction(props) {



    return (
        <SafeAreaView style={tailwind('h-full bg-white justify-center')}>

            <View style={ tailwind('items-center mb-52') }>
                <Image style={tailwind('w-24 h-24')} source={require('../../../src/assets/img/misc/mail.png')} />
                <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Check your mail</Text>
                <Text style={tailwind('text-base font-extralight text-gray-900 mt-4 w-4/5 text-center')}>
                    We have sent a password recover instructions to your email.
                </Text>
            </View>


            <View style={ tailwind('items-center') }>
  
                <Text style={tailwind('text-base font-extralight text-gray-900 mt-4 text-center')}>
                    Did not recieve the email? Check your spam filter.
                </Text>

                <TouchableOpacity onPress={() => { props.navigation.reset({ index: 3,routes: [{ name: 'ResetPassword' }],}); }}>

                    <Text style={tailwind('text-base font-bold text-gray-900 mt-2 w-4/5 text-center')}>or try another email address</Text>

                </TouchableOpacity>

                
            </View>

        </SafeAreaView>
  );
}

export default Instruction;