import * as React from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

function ResetPassword(props) {


    return (
        <SafeAreaView style={tailwind('bg-white ')}>

        <TouchableOpacity onPress={() => { props.navigation.reset({ index: 1,routes: [{ name: 'Login' }],}); }}>
            <Image style={tailwind('w-8 h-8 mt-5 ml-3.5')} source={require('../../../src/assets/img/misc/arrow_left.png')} />
        </TouchableOpacity>
              
        <View style={tailwind('h-full mt-20')}>


            {/* Header */}

            <View style={ tailwind('ml-5 w-10/12') }>
               
                <Text style={tailwind('text-2xl font-bold text-black mt-4')}>Reset Password</Text>
                <Text style={tailwind('text-sm font-extralight text-gray-900 mt-4')}>Enter the email associated with your account and we’ll send you an email with instructions to reset your password.</Text>
            </View>

            {/* Form Area  */}
            <View style={tailwind('')}>
                
                <TextInput
                    style={tailwind('mt-4 border rounded-2xl border-gray-300 w-11/12 self-center text-gray-400 px-5')}
                    placeholder="Email address"
                    placeholderTextColor="#E5E7EB"
                />

            </View>

            {/* Submit Area */}
            
            <View style={tailwind('mt-3')}>

                <TouchableOpacity 
                    onPress={() => { props.navigation.reset({ index: 5,routes: [{ name: 'NewPassword' }],}); }}
                    style={tailwind('bg-green-700 w-11/12 self-center rounded-2xl items-center mt-10 justify-center')}
                >
                    <Text style={tailwind('text-white font-bold py-3')}>Send Instructions</Text>
                </TouchableOpacity>

            </View>

        </View>

        </SafeAreaView>
  );
}

export default ResetPassword;