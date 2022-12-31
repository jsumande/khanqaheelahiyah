import React,{ useState,createContext } from 'react';


export const GlobalContext = createContext();


function GlobalProvider (props) {

    const [role ,setRole] = useState(null);
    const [uid ,setUid] = useState(null);
    const [user_data ,setUserData] = useState([]);
    const [user_cred ,setUserCred] = useState([]);
    const [imgUrl ,setImgUrl] = useState([]);
    const [patients , setPatients ] = useState([]);

    function updateRole(data){
        setRole(data)
    }

    function updateUid(data){
        setUid(data)
    }

    function updateUserData(data){
        setUserData(data)
    }

    function updateUserCred(data){
        setUserCred(data)
    }

    function updateImgUrl(data){
        setImgUrl(data)
    }

    function updatePatients(data){
        setPatients(data)
    }

    const value = { role, updateRole, uid, updateUid, user_data, updateUserData, user_cred , updateUserCred ,imgUrl , updateImgUrl , patients, updatePatients }

    return(
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    ) 
}


export default GlobalProvider;