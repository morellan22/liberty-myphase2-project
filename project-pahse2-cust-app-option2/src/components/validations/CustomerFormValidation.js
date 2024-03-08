import { Messages } from "./Messages";

const regexValidation = {
    email: /^[a-zA-Z ]{3,16}$/,
    name: /^[a-zA-Z ]{5,30}$/,
    password: /^[A-Za-z]{6,15}$/
}
function getMessageValidate(nameValue, formObject){
    return regexValidation[nameValue].test(formObject[nameValue])?"": "\n" + Messages[nameValue];
}
export default function CustomerFormValidation(formObject) {
    console.log(formObject);
    console.log(regexValidation.email.test(formObject.email))
    let messages = getMessageValidate("name",formObject) + getMessageValidate("email",formObject)+ getMessageValidate("password",formObject);
  return messages;
}
