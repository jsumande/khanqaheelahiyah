import React, { useState, useEffect , useContext } from 'react';
import { SafeAreaView,View ,Text,Image,TextInput , TouchableHighlight , TouchableOpacity ,StyleSheet , ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';



import { GlobalContext } from '../context/GlobalContext.js';

export default function GroundTest() {

    const {uid} = useContext(GlobalContext);

    const [toggleCheckBox, setToggleCheckBox] = useState([ { data : true, data : false} ])
    const [selectedFruits, setSelectedFruits] = useState([])

    const [fruits, setFruits] = useState([
      {
         "father_name":"test",
         "first_name":"test 1",
         "gender":"Male",
         "last_name":"test",
         "middle_name":"test",
         "mother_name":"test",
         "name":"test 1 test test",
         "patient_id":"3ZwTm1gx3aHoZ24EkrgU",
         "profile_pic":"https://firebasestorage.googleapis.com/v0/b/khanqaheelahiyah.appspot.com/o/patient%2F3ZwTm1gx3aHoZ24EkrgU?alt=media&token=498252e4-039a-4097-a6bb-5445c09dd628",
         "selected":false
      },
      {
         "father_name":"Test",
         "first_name":"Test 2",
         "gender":"Male",
         "last_name":"Test",
         "middle_name":"Test",
         "mother_name":"Test",
         "name":"Test 2 Test Test",
         "patient_id":"Wom8J8dtBdl2lyX6h9uX",
         "profile_pic":"https://firebasestorage.googleapis.com/v0/b/khanqaheelahiyah.appspot.com/o/patient%2FWom8J8dtBdl2lyX6h9uX?alt=media&token=78c08340-8ec2-4626-a51f-9eb431184b3d",
         "selected":false
      }
   ]);

   const [arr, setArr] = useState(['foo', 'bar', 'baz']);

   function addPatient(data) {

        let value = null;

        if(fruits[data]['selected'] == true) value = false;
        else value = true;
        setFruits((fruits) => {
          const newfruits = [...fruits];
          newfruits[data]['selected'] = value;
          return newfruits;
        });

        // console.log(fruits);
    

   }
   
   
    return (
        <View  style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <Text style={{color : "black"}}>Hello</Text>

          {  fruits.map((item,index) => { 

            return(

              <View key={index}>

                  <CheckBox
                    disabled={false}
                    value={item.selected}
                    onValueChange={() => addPatient(index)}
                    tintColors={true}
                  />

                  <Text style={{color : "black"}}>{item.father_name} {index}</Text>
              </View>

              
            )})
          }
               
        </View>

      //   <View  style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'black'}}>
      //   {fruits.map((a, i) => {
      //     return (
      //       <TextInput
      //         value={a}
      //         key={i}
      //         onChangeText={(t) => {
      //           setArr((arr) => {
      //             const newArr = [...arr];
      //             console.log(newArr);
      //             newArr[i] = t;
      //             return newArr;
      //           });
      //         }}
      //       />
      //     );
      //   })}
      //   <Text style={{color : "white"}}>{arr.join(', ')}</Text>
      // </View>
    );
}

const styles = StyleSheet.create({
    
});


 {/* <ScrollView style={styles.scrollView}>

                { list.map((item,index) => 
                
                <View style={tailwind('mt-2 w-11/12 self-center py-6 justify-center border-b border-gray-200')} key={index}>

                        
                        <View style={tailwind('justify-between flex flex-row ')}>

                            <View style={tailwind('flex flex-row')}>

                                <TouchableOpacity 
                                style={tailwind('border-4 border-green-200  bg-green-700 w-14 h-14 rounded-full items-center justify-center')}
                                onPress={() => { props.navigation.reset({ index: 10,routes: [{ name: 'MemberProfile' , user_id : item.user_id }],}); }}>
                                    <Text style={tailwind('text-2xl font-bold text-white')}>{first_letter(item.name)}</Text>           
                                </TouchableOpacity>

                                
                                <View style={tailwind('flex flex-col ml-4 mt-1')}>
                                    <Text style={tailwind('text-black font-bold text-base')}>{item.name}</Text>
                                    <View style={tailwind('flex flex-row')}>
                                        <Image style={tailwind('w-6 h-6 mt-1')} source={require('../assets/icon/Location.png')} />
                                        <Text style={tailwind('text-black font-thin text-base mt-1')}> {item.nationality} </Text>
                                    </View>
                                </View>

                            </View>
                        
                            <View style={tailwind('flex flex-row')}>
                                <Image style={tailwind('w-8 h-8 mt-3')} source={require('../assets/icon/right.png')} />
                            </View>

                        </View>

                    </View>
                
                )}
            
                
                <View style={tailwind('mt-7')}>

                </View>
                

            </ScrollView> */}