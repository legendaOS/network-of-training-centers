$(document).ready(async function () {

    await createMain()



});

async function createMain(){
    $.ajax({
        url: "http://localhost:5000/centers",
        type: 'GET',
        success: function(res) {

            let str = ''
            
            for(elm of res){
                
                str += `<div id="center">
                            <div class="name">
                                ${elm["name"]}
                            </div>
                            <div>
                                ${elm["adress"]}
                            </div>
                            <div>
                                ${elm["info"]}
                            </div>
                        </div>`

            }

            $("#content").html(str)

        }
    });
}

async function autorize(){
    $.ajax({
        url: "http://localhost:5000/centers",
        type: 'GET',
        success: function(res) {

        },
        error: function(err){
            alert('не авторизован')
        } 
    });
}


