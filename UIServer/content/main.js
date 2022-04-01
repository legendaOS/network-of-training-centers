$(document).ready(async function () {

    $.ajax({
        url: "http://localhost:5000/centers",
        type: 'GET',
        success: function(res) {
            console.log(res);
        }
    });

});


