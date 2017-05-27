
$(function () {
    $("#login").click(function () {
        var params = { email: $("input[id='mail']").val(), password: $("input[id='pass']").val() }
        var data = Ajaxcall(params, "login");
        if (data.status == "OK")
            window.location.href = data.url;
        else {
            alert(data.msg)

        }

    })
    $("#signup").click(function () {
        var params = { firstName: $("input[id='first']").val(), lastName: $("input[id='last']").val(), email: $("input[id='mail']").val(), password: $("input[id='pass']").val() }
        var data = Ajaxcall(params, "register");
        alert(data);

    })
})

