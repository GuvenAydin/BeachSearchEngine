var CONTENT_LOADER_DISABLED = false;
var PAGE_INDEX = 1;
var LOADING_CONTENT = false;
var SEARCH_STRING ="";


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
    $.ajax({
        contentType: 'application/json;',
        data: {
            "pageIndex": PAGE_INDEX,
            "searchString":SEARCH_STRING
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

        $(".beaches-feed").append(result);
    });
}

$(document).on("click", ".find_beach", function (e) {
   var squery=  $("#search_query").val();
   SEARCH_STRING = squery;
   PAGE_INDEX = 0;
   $(".beaches-feed").html("");
   getSearchConten();
});


function getSearchConten() {
    LOADING_CONTENT = true;
    CONTENT_LOADER_DISABLED = false;

    $.ajax({
        contentType: 'application/json;',
        data: {
            "pageIndex": PAGE_INDEX,
            "searchString":SEARCH_STRING
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
        $(".beaches-feed").append(result);
    });
}