import React, { useState, useContext,useEffect} from 'react';
import { Text, View , Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tailwind from 'tailwind-rn';

import Home from './home/Home';
import Patients from './patients/Patients';
import Request from './request/Request';
import MailList from './request/MailList';
import Request_Admin from './request/Request_Admin';
import Menu from './menu/Menu';

import { GlobalContext } from '../context/GlobalContext.js';

const Tab = createBottomTabNavigator();


function Dashboard(props) {

    const {updateRole,role,uid,updateUid} = useContext(GlobalContext);

  return (
      <Tab.Navigator
        
        screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle : tailwind('h-16 pb-2')
        })}
        
      >
          
        <Tab.Screen name="Home" component={Home}  initialParams={{ role: props.route['role'] , uid : props.route['uid']  }}

            options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
               
                focused ? <Image
                style={tailwind('w-6 h-6')}
                source={require('./assets/icon/home_active.png')                  
                }/> : 

                <Image
                style={tailwind('w-6 h-6')}
                source={require('./assets/icon/home.png')                  
                }/>

              
           ), 
           tabBarLabel: 'Home' ,
          }}
        />


        {role == "Admin" ? 

            <Tab.Screen name="Members" component={ Request_Admin} 
                options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (

                    focused ? 
                            <Image
                            style={tailwind('w-6 h-6')}
                            source={require('./assets/icon/patient_active.png')                  
                            }/>
                        : 
                            <Image
                            style={tailwind('w-6 h-6')}
                            source={require('./assets/icon/patient.png')                  
                            }/>
                ), 
                tabBarLabel: 'Members',        
            }}/>
         : null}

        

        {role == "Admin" ? 
            <Tab.Screen name="Request" component={ MailList }
                options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (

                    focused ? 
                            <Image
                            style={tailwind('w-6 h-6')}
                            source={require('./assets/icon/mail_active.png')                  
                            }/>
                        : 
                            <Image
                            style={tailwind('w-6 h-6')}
                            source={require('./assets/icon/mail_inactive.png')                  
                            }/>
                    ), 
                tabBarLabel: 'Inbox',            
                }}
            /> : 

            <Tab.Screen name="Request" component={ Request}

                options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (

                    focused ? 
                        <Image
                        style={tailwind('w-6 h-6')}
                        source={require('./assets/icon/request_active.png')                  
                        }/>
                    : 
                        <Image
                        style={tailwind('w-6 h-6')}
                        source={require('./assets/icon/request.png')                  
                        }/>
                ), 
                tabBarLabel: 'Request',            
            }}
        />}

        

        <Tab.Screen name="Menu" component={Menu}

            options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (

                    focused ? 
                        <Image
                        style={tailwind('w-6 h-6')}
                        source={require('./assets/icon/menu_active.png')                  
                        }/>
                    : 
                        <Image
                        style={tailwind('w-6 h-6')}
                        source={require('./assets/icon/menu.png')                  
                        }/>
            ), 
            tabBarLabel: 'Menu',    
            }}
        />

      </Tab.Navigator>
  );
}

export default Dashboard;