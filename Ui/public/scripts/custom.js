function validateForm() {
    var x = document.forms["settingsForm"]["currentPassword"].value;
    if (x == "") {
        var input = document.getElementById("currentPassword");
        input.setAttribute("style", "border: 2px solid red;");
        return false;
    }

    var newPw = document.forms["settingsForm"]["newPassword"].value;
    if (newPw != null) {
        var newPwAgain = document.forms["settingsForm"]["newPasswordAgain"].value;
        if (newPw != newPwAgain) {
            var newInput = document.getElementById("newPassword");
            var newInputAgein = document.getElementById("newPasswordAgain");
            newInput.setAttribute("style", "border: 2px solid red;");
            newInputAgein.setAttribute("style", "border: 2px solid red;");
            return false;
        } 

        document.getElementById("settingsForm").submit();
    }
}
