import React, { useState, useEffect } from "react";
import { getAll, post, put, deleteById } from "../memdb.js";
import "./App.css";
import CustomerAppUpdateForm from "./CustomerAppUpdateForm.js";
import CustomerList from "./CustomerList.js";

function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: "", email: "", password: "" };

  // useState
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  let mode = formObject.id >= 0 ? "Update" : "Add";

  // useEffect
  useEffect(() => {
    getCustomers();
  }, [formObject]);

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    if(formObject.id===item.id){
      item = blankCustomer;
    }
    setFormObject(item);
    
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject};
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    log("in onDeleteClick()");
    if(formObject.id >= 0){
      deleteById(formObject.id);
      }
      setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    log("in onSaveClick()");
    if (mode === 'Add') {
      post(formObject);
      }
      if (mode === 'Update') {
      put(formObject.id, formObject);
      }
      setFormObject(blankCustomer);
  }
  return (
    <div>
      <CustomerList 
      customers={customers} 
      formObject={formObject}
      handleListClick={handleListClick}
      />

        <CustomerAppUpdateForm
          mode={mode}
          formObject={formObject}
          handleInputChange={handleInputChange}
          onCancelClick={onCancelClick}
          onDeleteClick={onDeleteClick}
          onSaveClick={onSaveClick}
        />

    </div>
  );
}

export default App;
