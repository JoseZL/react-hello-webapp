export const initialStore=()=>{
    return{
        fName: "Jose",
        lName: "Zamora",
        baseUrl: "https://playground.4geeks.com/contact/",
        contactInfo: {"name": "",
                "phone": "",
                "email": "",
                "address": ""
            },
        contacts: []    
    }
    }
    export default function storeReducer(store, action = {}){
    if(action.type == "set-fName"){
        return {
        ...store, fName: action.payload
    }
    }
    if(action.type == "set-lName"){
        return {
        ...store, lName: action.payload
        }
    }
    if(action.type == "set-contactInfo"){
        return {
        ...store, contactInfo: action.payload
        }
    }
    if(action.type == "set-contacts"){
        return {
        ...store, contacts: action.payload
        }
    }
}