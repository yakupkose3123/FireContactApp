import './App.css';
import {useState} from "react";
import FormComponent from './components/form/FormComponent';
import Contacts from "./components/contacts/Contacts"
import { AddUser,EditUser } from './utils/functions';
import { ToastContainer } from "react-toastify";

const initialValues={username:"",phoneNumber:"",gender:"NO INFO"}


function App() {
 const [info,setInfo]=useState(initialValues);
 const [buttonType, setButtonType] = useState(true)

 const handleFormSubmit=(e)=>{
   e.preventDefault();
  //  console.log(info)
  if (info.id) {
    EditUser(info)
  }
   else  {AddUser(info)};

  !buttonType && setButtonType(true);
  setInfo(initialValues)
 }

 const editHandler=(id,username,phoneNumber,gender)=>{
  setButtonType(false)
   setInfo({id,username,phoneNumber,gender})
 }

  return (
    <div className="App">
      <FormComponent info={info} setInfo={setInfo} handleFormSubmit={handleFormSubmit} buttonType = {buttonType} />
      <Contacts editHandler={editHandler}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
