import { Messages } from "./Messages";

const regexValidation = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,6}\b/gm,
    name: /^[a-zA-Z ]{5,30}$/,
    password: /^[A-Za-z\d@.#$!%*?&]{6,15}$/
}
function getMessageValidate(nameValue, formObject){
    return regexValidation[nameValue].test(formObject[nameValue])?"":Messages[nameValue];
}
export default function CustomerFormValidation(formObject) {
    console.log(formObject);
    console.log(regexValidation.email.test(formObject.email))
    let messages = [];
    messages.push(getMessageValidate("name",formObject))
    messages.push(getMessageValidate("email",formObject))
    messages.push(getMessageValidate("password",formObject))
  return messages;
}
