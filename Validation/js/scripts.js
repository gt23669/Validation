window.onload = function () {
    console.log("JavaScript is working!");


    var myform = document.getElementById("regForm");

    myform.onsubmit = function () {
        // alert("function1 hit");
        var myform = document.getElementById("regForm");

        var firstName = myform["firstName"].value;
        var lastName = myform["lastName"].value;

        var phoneRegex = [/\d\(\d\d\d\)\d\d\d-\d\d\d\d/, /\d\(\d\d\d\)\s\d\d\d-\d\d\d\d/, /\(\d\d\d\)\d\d\d-\d\d\d\d/
            , /\(\d\d\d\)\s\d\d\d-\d\d\d\d/, /\d\d\d-\d\d\d-\d\d\d\d/, /\d\d\d\d\d\d\d\d\d\d/];
        var addressRegex = /[a-z]\s[a-z]/;
        var stateAbbr = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]
        var zipCodeReg = [/\d\d\d\d\d/,/\d\d\d\d\d-\d\d\d\d/];
        validateIsNotEmpty("firstName", "firstNameError", "First name is not valid! Field must have 2 or more characters and no numbers.");
        validateIsNotEmpty("lastName", "lastNameError", "Last name is not valid! Field must have 2 or more characters and no numbers.");
        validateAddress("address", "addressError", "Invalid address!", addressRegex);
        validateCity("city", "cityError", "Invalid city! Must be longer than one character and no numbers.");
        validateState("state", "stateError", "Invalid state! Must be a two character valid US state code and no numbers.",stateAbbr);
        validateZipCode("zipCode", "zipCodeError", "Invalid zipcode! Ex: 00000 or 00000-0000.",zipCodeReg);
        validateRegexMatch("phone", "phoneError", "Invalid phonee numbr! Please enter in 0000000000 format.", phoneRegex);

        return false;
    };
    //returns true if value matches regex
    function validateRegexMatch(inputId, errorId, errorText, inputRegex) {
        var goodReg = false;
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        var temp1 = /[a-z]/;
        var temp2 = /[A-Z]/;
        if (temp1.test(value) || temp2.test(value) || value.length < 10) { //tests if any character exists in value and is at least 10+ length
            console.log("character hit")
            errorElement.textContent = errorText;
            inputElement.classList.add("errorInput");
        } else {
            for (var i = 0; i < inputRegex.length; i++) {
                if (inputRegex[i].test(value)) {
                    goodReg = true;
                    break;
                } else {
                    goodReg = false;
                }
            }
            if (!value || goodReg == false) { //If Invalid

                errorElement.textContent = errorText;
                inputElement.classList.add("errorInput");

            } else { //Is Valid
                errorElement.textContent = "";
                inputElement.classList.remove("errorInput");
                var phone = myform["phone"].value;
                console.log("Phone number is valid: " + phone);

            }
        }
    }

    function validateIsNotEmpty(inputId, errorId, errorText) {
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        var temp1 = /[0-9]/;
        if (!value || value == "" || value.length < 2 || temp1.test(value)) { //If Invalid

            errorElement.textContent = errorText;
            inputElement.classList.add("errorInput");

        } else { //Is Valid
            errorElement.textContent = "";
            inputElement.classList.remove("errorInput");
        }
    }

    function validateAddress(inputId, errorId, errorText, inputRegex) {
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        if (inputRegex.test(value)) {
            console.log("good address");
            errorElement.textContent = "";
            inputElement.classList.remove("errorInput");
        } else {
            console.log("bad address");
            errorElement.textContent = errorText;
            inputElement.classList.add("errorInput");
        }
    }
    function validateCity(inputId, errorId, errorText){
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        if(value.length<2||/[0-9]/.test(value)){
            errorElement.textContent = errorText;
            inputElement.classList.add("errorInput");
        }else{
            errorElement.textContent = "";
            inputElement.classList.remove("errorInput");
        }
    }
    function validateState(inputId, errorId, errorText, inputRegex){
        var value = myform[inputId].value.toUpperCase();
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
        for(var i = 0;i<inputRegex.length;i++){
            if(!/[0-9]/.test(value)){

                if(value.match(inputRegex[i])){
                    console.log("good match")
                    errorElement.textContent = "";
                    inputElement.classList.remove("errorInput");
                    break;
                }else{
                    console.log("bad match")
                    errorElement.textContent = errorText;
                    inputElement.classList.add("errorInput");
                }
            }else{
                errorElement.textContent = errorText;
                    inputElement.classList.add("errorInput");
            }
        }
    }
    function validateZipCode(inputId, errorId, errorText, inputRegex){
        var value = myform[inputId].value;
        var inputElement = document.getElementById(inputId);
        var errorElement = document.getElementById(errorId);
       
            if((inputRegex[0].test(value)&&value.length == 5)||inputRegex[1].test(value)&&value.length==10){
                errorElement.textContent = "";
                inputElement.classList.remove("errorInput");
                console.log("good zip");

            }else{
                errorElement.textContent = errorText;
                inputElement.classList.add("errorInput");
                console.log("bad zip");
            }
        
    }
}