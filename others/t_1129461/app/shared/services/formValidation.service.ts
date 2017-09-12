import { Injectable } from "@angular/core";

@Injectable()

export class FormValidationService {
    public todayDate: string;
    public todayMonth: string;
    public todayYear: string;
    public fullDate: string;

    // Username validator
    usernameValidator(username) {
        if (username !== undefined) {
            if (username.match(/^[0-9a-zA-Z\s\r\n@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\?]+$/)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    // Email id pattern match validator

    emailMatchValidator(mailid) {
        if (mailid !== undefined) {
            if (mailid === "") {
                return true;
            } else {
            // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if (mailid.match(/([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(org|com|edu)$)/)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }
    // Email id filled check
    emailFilledValidator(mailid) {
        if (mailid === undefined) {
            return false;
        } else {
            return true;
        }
    }
    // Password pattern match validator
    passwordPatternValidator(pwd) {
        if (pwd !== undefined ) {
            if (pwd === "") {
                return true;
            } else {
                if (pwd.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{7,100}$/)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        else {
            return true;
        }
    }
    // Password  filled check
    passwordFilledValidator(pwd) {
        if (pwd === undefined || pwd === "") {
            return false;
        } else {
            return false;
        }
    }
    // Mobile Number Validator
    mobileNumberValidator(mblno) {
        if (mblno !== undefined) {
            if (mblno === "") {
                return true;
            } else {
                if (mblno.length === 10 &&  (mblno.match(/^\d+$/)) ) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }
    // Mobile no  filled check
    mobileNumberFilledValidator(mblno) {
        if (mblno === undefined || mblno === "" ) {
            return false;
        }
        else
            return true;
    }
    // SSN Number Validator
    snnNumberValidator(ssnno) {
        if (ssnno !== undefined && ssnno!=="") {
            if (ssnno.length === 9) {
                 if (ssnno.match(/^\d+$/)) {
                return true;
            } else {
                return false;
            }
            } else {
                return false;
            }
        }
        else {
            return true;
        }
    }

    fieldFilledValidator(arg) {
        if (arg === undefined || arg === "" ) {
            return false;
        }
        else {
            return true;
        }
    }

    onlyDigitsValidator(arg) {
        if (arg !== undefined && arg !== "") {
            if (arg.match(/^\d+$/)) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return true;
        }
    }

     onlyAlphabetsValidator(arg) {
       
        if (arg !== undefined) {
            if (arg !== "") {
                if (arg.match(/^[a-zA-Z '-]{0,150}$/)) {
                    return true;
                } else {
                    return false;
                }
            } else
                return true;
        } else {
            return true;
        }
    }

    memberIdValidator(arg) {
        if (arg !== undefined && arg!=="") {
           
                if (arg.length === 14) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
    }
    debitCardNoValidator(arg) {
        if (arg !== undefined) {
            if (arg.length === 16) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
   // Date validation starts here
    dateValidator(arg) {
        if (arg !== undefined ) {
            if (arg === "") {
                return true;
            } else {
                let inputDate = new Date(arg);
                let todaysDate = new Date();
                let year = arg.substr(arg.length - 4);
                let date = arg.substring(3, 5);
                let month = arg.substring(0, 2);
                let pattern = "^(1[0-2]|0?[1-9])/(3[01]|[12][0-9]|0?[1-9])/(?:[0-9]{2})?[0-9]{2}$";
                if (arg.match(pattern)) {
                if (inputDate.setHours(0, 0, 0, 0) <= todaysDate.setHours(0, 0, 0, 0) && year >= 1900) {
                        // to check whether greater than current date
                        if ((date === "31") &&
                            (month === "4" || month === "6" || month === "9" || month === "11" || month === "04" || month === "06" || month === "09")) {
                            return false; // only 1,3,5,7,8,10,12 has 31 days
                        } else if (month === "2" || month === "02") {
                            // leap year
                            if (year % 4 === 0) {
                                if (date === "30" || date === "31") {
                                    return false;
                                } else {
                                    return true;
                                }
                            } else {// not a leap year
                                if (date === "29" || date === "30" || date === "31") {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            }
                        } else {
                            return true;
                        }
                    }
                } else {// pattern matching ends here
                    return false;
                }
            }
        } else {
            return true;
        }
    }
    // Date validation ends here
    getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
     }
    //Age validation for 18 years and above 
    minimumAgeValidator(arg){
        if(arg!=="" && arg!==undefined){
             if(this.getAge(arg) >= 18) {          
           return true;
        }
        else
        return false;
    }
    else
    return true;
        
    }
    //Alphanumeric validator
     alphaNumericValidator(arg) {
     
        if (arg !== undefined  ) {           
            if (arg === "" ) {
                return true;
            } else {                
                if (arg.match(/^[0-9a-zA-Z]+$/)) {
                    return true;
                } else {
                  
                    return false;
                }
            }
        }
        else {            
            return true;
        }
    }
    // Alpha memid with first 3 charactyers and rest digits
  alphaNumericMemValidator(arg) {
     
        if (arg !== undefined  ) {           
            if (arg === "" ) {
                return true;
            } else {                
                if (arg.match(/^[a-zA-Z]{3}[0-9]{11}$/)) {
                    return true;
                } else {
                  
                    return false;
                }
            }
        }
        else {            
            return true;
        }
    }
}