
﻿function Ajaxcall(params, method) {
    var resData;
    $.ajax({
        url: '/' + method,
        type: 'Post',
        data: params,
        dataType: 'json',
        async:false,
        success: function (data) {
            resData = data;
        },
        error: function (error, status, text) {
            console.log("Error: " + JSON.stringify(error))
            console.log("Status Code: " + status)
            console.log("statusText: " + text)
            alert("An error has occurred")
            $('#info').html('<p>An error has occurred</p>');
            resData = "Something went be wrong!!";
        },        
    });
    return resData;
}
function AjaxcallGet(params, method) {
    var resData;
    $.ajax({
        url: '/' + method,
        type: 'Get',
        data: params,
        dataType: 'json',
        async: false,
        success: function (data) {
            resData = data;
        },
        error: function (error, status, text) {
            console.log("Error: " + JSON.stringify(error))
            console.log("Status Code: " + status)
            console.log("statusText: " + text)
            alert("An error has occurred")
            $('#info').html('<p>An error has occurred</p>');
            resData = "Something went be wrong!!";
        },
    });
    return resData;
}