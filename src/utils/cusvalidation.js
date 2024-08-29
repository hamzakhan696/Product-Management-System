/**  validation.js Instruction
Import it -> import { validateEmail, validateName } from './validation'
(Read this how to add the validation)
Create a Function like handleValidation store the value in the state like 
const [error , setError ] = useState("")
const FunctionName = (e) => {
    const Error = e.target.value;
    setYourFeildState(Error);

    if (!ExportFunctionName(Error)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };
****************************************************************************/

export const validateNumber = (Number) => {
  return Number > 0 ? "" : "Please fill it .";
};

export const validateSelectBox = (value) => {
  return value ? "" : "Please select an option.";
};

export const validateName = (name) => {
  return name.trim().length > 0 ? "" : "Please enter a valid name.";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Please enter a valid email address.";
};

  