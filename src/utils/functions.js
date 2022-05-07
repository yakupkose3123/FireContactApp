// Database bilgi ekleme,bilgiyi alma, bilgi silme ve değiştirme
import firebase from "./firebase"
import {useState,useEffect} from "react";
import { getDatabase,ref,set,push,onValue, remove,update} from "firebase/database";
import Toastify from "./toast";

// Bilgi Ekleme
export const AddUser=(info)=>{
    const db = getDatabase();
    const userRef=ref(db,"users");//  users diye bir database oluşturduğumu söyledim. Bunu realtime dan yapıyoruz firebase de
    const newUserRef=push(userRef)
    set((newUserRef),{
        username:info.username,
        phoneNumber:info.phoneNumber,
        gender:info.gender,
    })
}

// Bilgi Çağırma

export const useFetch=()=>{
    const [isLoading,setIsLoading]=useState();
    const [contactList,setContactList]=useState();

    useEffect(() => {
        setIsLoading(true)

        const db = getDatabase();
        const userRef=ref(db,"users");

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const usersArray=[];
            //Gelen bilgiyi kullanmak için bir arraya atıyorum
            for(let id in data){
                usersArray.push({id,...data[id]})
            }          
            setContactList(usersArray);
            setIsLoading(false);
        });
    },[])
    return {isLoading,contactList}
}

// Bilgi silme
export const DeleteUser=(id)=>{
        const db = getDatabase();
        const userRef=ref(db,"users");
        remove(ref(db,"users/"+id))

        Toastify("Kullanıcı bilgisi silindi")
}

// Bilgi Değiştirme

export const EditUser=(info)=>{
    const db = getDatabase();
    const updates = {};

    updates["baglanti/"+info.id]=info;
    return update(ref(db),updates);

}