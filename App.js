import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
// Screen Display
import Splash from './src/components/splash/Splash';
import Login from './src/components/login/Login';
import ResetPassword from './src/components/login/ResetPassword';
import NewPassword from './src/components/login/NewPassword';
import Instruction from './src/components/login/Instruction';
import Register from './src/components/register/Register';


// Dashboard
import Dashboard from './src/components/dashboard/Dashboard';
import Notifications from './src/components/dashboard/home/Notifications';
import Announcements from './src/components/dashboard/home/Announcements';
import AnnouncementDetails from './src/components/dashboard/home/AnnouncementDetails';
import AnnouncementDetailsAdmin from './src/components/dashboard/home/AnnouncementDetailsAdmin';
import AnnouncementAdmin from './src/components/dashboard/home/AnnouncementAdmin';
import CreateAnnouncement from './src/components/dashboard/home/CreateAnnouncement';
import UpdateAnnouncement from './src/components/dashboard/home/UpdateAnnouncement';
import ViewProfile from './src/components/dashboard/home/ViewProfile';
import EditProfile from './src/components/dashboard/home/EditProfile';

// Request
import MemberProfile from './src/components/dashboard/request/MemberProfile';
import New_Message from './src/components/dashboard/request/New_Message';
import Select_Patient from './src/components/dashboard/request/Select_Patient';
import MessageDetail from './src/components/dashboard/request/MessageDetail';
import ViewMemberProfile from './src/components/dashboard/request/ViewMemberProfile';
import AddMemberProfile from './src/components/dashboard/request/AddMemberProfile';


// Patients
import View_Patient from './src/components/dashboard/patients/View_Patient';
import Add_Patient from './src/components/dashboard/patients/Add_Patient';
import Edit_Patient from './src/components/dashboard/patients/Edit_Patient';
import Success from './src/components/dashboard/patients/Success';

// Menu
import Setting from './src/components/dashboard/menu/Setting';

// GroundTest
import GroundTest from './src/components/groundTest/groundTest';

// Contexts
import GlobalProvider from './src/components/context/GlobalContext.js';

const Stack = createNativeStackNavigator();



function App() {

  
    return (
      <NavigationContainer>
        <GlobalProvider>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">

            {/* User  */}

            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="Instruction" component={Instruction} />
            <Stack.Screen name="Register" component={Register} />


            <Stack.Screen name="Dashboard" component={Dashboard}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
            <Stack.Screen name="Announcements" component={Announcements}/>
            <Stack.Screen name="AnnouncementDetails" component={AnnouncementDetails}/>
            <Stack.Screen name="ViewProfile" component={ViewProfile}/>
            <Stack.Screen name="EditProfile" component={EditProfile}/>


            <Stack.Screen name="MemberProfile" component={MemberProfile}/>
            <Stack.Screen name="New_Message" component={New_Message}/>
            <Stack.Screen name="Select_Patient" component={Select_Patient}/>
            <Stack.Screen name="MessageDetail" component={MessageDetail}/>
            <Stack.Screen name="ViewMemberProfile" component={ViewMemberProfile}/>
            <Stack.Screen name="AddMemberProfile" component={AddMemberProfile}/>

            <Stack.Screen name="View_Patient" component={View_Patient}/>
            <Stack.Screen name="Add_Patient" component={Add_Patient}/>
            <Stack.Screen name="Edit_Patient" component={Edit_Patient}/>
            <Stack.Screen name="Success" component={Success}/>

            <Stack.Screen name="Setting" component={Setting}/>


            {/* Admin  */}
            <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncement}/>
            <Stack.Screen name="UpdateAnnouncement" component={UpdateAnnouncement}/>
            <Stack.Screen name="AnnouncementDetailsAdmin" component={AnnouncementDetailsAdmin}/>
            <Stack.Screen name="AnnouncementAdmin" component={AnnouncementAdmin}/>

            {/* GroundTest */}
            <Stack.Screen name="GroundTest" component={GroundTest}/>


        </Stack.Navigator>
        </GlobalProvider>
      </NavigationContainer>
    );
  
}


export default App;