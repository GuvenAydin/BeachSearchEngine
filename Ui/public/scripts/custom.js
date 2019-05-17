var CONTENT_LOADER_DISABLED = false,
PAGE_INDEX = 1,
LOADING_CONTENT =false;


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

$(window).scroll(function () {
    setContentLoader();
});

function nearToBottom() {
    return (!LOADING_CONTENT && $(window).scrollTop() + $(window).height() > $(document).height() - 450);
}

function setContentLoader() {

    if (nearToBottom() === false) {
        return;
    }

    if (CONTENT_LOADER_DISABLED) {
        return;
    }
    LOADING_CONTENT = true;
    PAGE_INDEX++;
    console.log("getting more contents");
    $.ajax({
        contentType: 'application/json',
        data: {
            "page": PAGE_INDEX
        },
        dataType: 'json',
        success: function(data){
            console.log("device control succeeded");
        },
        error: function(){
            console.log("Device control failed");
        },
        type: "GET",
        url: "beach/search"
    }).done(function (result) {
        if (!result.trim()) {
            CONTENT_LOADER_DISABLED = true;
            return;
        }

        LOADING_CONTENT = false;

        // insert new content
        $(".bobi-feed-monte").last().after(result);

    });
}