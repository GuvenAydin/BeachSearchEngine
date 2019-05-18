var CONTENT_LOADER_DISABLED = false;
var PAGE_INDEX = 1;
var LOADING_CONTENT = false;


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
    console.log("getting more contents");
    
    $.ajax({
        contentType: 'application/json;',
        data: {
            "pageIndex": PAGE_INDEX
        },
        type: "GET",
        url: "/"
    }).done(function (result) {
        if (!result.trim()) {
            CONTENT_LOADER_DISABLED = true;
            return;
        }
        LOADING_CONTENT = false;

        PAGE_INDEX = PAGE_INDEX + 1;

        $(".beach-feed-content").last().after(result);
    });
}