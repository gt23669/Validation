window.onload = function () {
    console.log("JavaScript is working!");


    var myform = document.getElementById("regForm");

    myform.onsubmit = function () {
        // alert("function1 hit");
        var myform = document.getElementById("regForm");

        var firstName = myform["firstName"].value;
        var lastName = myform["lastName"].value;

        var phoneRegex = [/\d\(\d\d\d\)\d\d\d-\d\d\d\d/,/\d\(\d\d\d\)\s\d\d\d-\d\d\d\d/,/\(\d\d\d\)\d\d\d-\d\d\d\d/
            ,/\(\d\d\d\)\s\d\d\d-\d\d\d\d/,/\d\d\d-\d\d\d-\d\d\d\d/,/\d\d\d\d\d\d\d\d\d\d/]

        validateIsNotEmpty("firstName", "firstNameError", "First name is not valid!");
        validateIsNotEmpty("lastName", "lastNameError", "Last name is not valid!");
        validateRegexMatch("phone","phoneError","Invalid phonee numbr! Please enter in 123-456-7890 format", phoneRegex);



        

        


        // console.log("First name: "+firstName);
        // console.log("Last name: "+lastName);
        return false;
    };

    //returns true if value matches regex
    function validateRegexMatch(inputId, errorId, errorText, inputRegex) {
        var goodReg = false;
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        var temp1 =/[a-z]/;
        var temp2 =/[A-Z]/;
        if(temp1.test(value)||temp2.test(value)||value.length<10){ //tests if any character exists in value and is at least 10+ length
            console.log("character hit")
            errorElement.textContent = errorText;
            inputElement.classList.add("errorInput");
        }else{
            for(var i = 0;i<inputRegex.length;i++){
                if(inputRegex[i].test(value)){
                    goodReg = true;
                    break;
                }else{
                    goodReg = false;
                }
            }
            if (!value || goodReg==false) { //If Invalid
    
                errorElement.textContent = errorText;
                inputElement.classList.add("errorInput");
    
            } else { //Is Valid
                errorElement.textContent = "";
                inputElement.classList.remove("errorInput");
                var phone = myform["phone"].value;
                console.log("Phone number is valid: "+ phone);

            }

        }
         

    }

    function validateIsNotEmpty(inputId, errorId, errorText) {
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        if (!value || value == "" || value.length <2) { //If Invalid

            errorElement.textContent = errorText;
            inputElement.classList.add("errorInput");

        } else { //Is Valid
            errorElement.textContent = "";
            inputElement.classList.remove("errorInput");
        }

    }
}