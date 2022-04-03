var token_;

$(document).ready(async function () {

    await createMain()

    $("#login_button").click(function (e) { 
        login()
    });

    $("#reg_button").click(function (e) { 
        registration()
    });

});


async function showDataCenter(name){

    let schedules = ``
    let news = ``

    let buf

    await axios.get(`http://localhost:5000/data?center_in=${name}`)
        .then(function (response) {
            // handle success
            buf = response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    console.log(buf)

    for(i of buf.news){
        news += `
        <div class="elenemtNews">
            ${i.time} ${i.date} <br><br>
            ${i.topic}
        </div>
        `
    }

    for(i of buf.schedules){
        schedules += `
        <div class="elenemtNews">
            ${i.time} ${i.date} <br><br>
            ${i.topic}
        </div>
        `
    }


    let html_insert = `<div id="centerInfo">

    <div class="nameCenter">
        <div class="nameCentername">
            ${name} 
        </div>
        
        <span class = 'animated_bot' id = '' onclick = "createMain()">Назад</span> 
    </div>

    <div id="newsCenter">
        
        <div class="nameincat">
            Новости
        </div>
        
       <div class = "toElements">
            ${news}
       </div>
        

    </div>

    <div id="shedulesCenter">

        <div class="nameincat">
            Группы
        </div>
        
       
        <div class = "toElements">
            ${schedules}
       </div>

    </div>
</div>`



    $("#content").html(html_insert)


}

async function registration(){

    console.log("click")

    axios({
        method: 'post',
        url: 'http://localhost:5000/reg',
        data:{
            "login":$("#reg_login").val(),
            "password":$("#reg_password").val(),
            "fio": $("#reg_fio").val()
        }
    })
    .then(function (response) {
        createRegMenu(true)
        
    })
    .catch(function (error) {
        createRegMenu(false)
    })

    $("#reg_login").val('')
    $("#reg_password").val('')
    $("#reg_fio").val('')

}

async function createRegMenu(p){
    if(p){
        let buf = $('#footer').html()
        $('#footer').html(buf + "Пользователь зарагестрирован")

        setTimeout(()=>{$('#footer').html(buf)}, 3000)
        
    }
    else{
        let buf = $('#footer').html()
        $('#footer').html(buf + "Логин занят или имя введено неверно")

        setTimeout(()=>{$('#footer').html(buf)}, 3000)
    }
}

async function login(){
    console.log("click")

    axios({
        method: 'post',
        url: 'http://localhost:5000/login',
        data:{
            "login":$("#login").val(),
            "password":$("#password").val()
        }
    })
    .then(function (responsetok) {
        token_ = responsetok.data.token
        createUserMenu(responsetok.data.fio, responsetok.data.role)
        
    })
    .catch(function (error) {
        $('#header_left').html('<span id = "fio">Неверный логин или пароль</span>')
    })

    $("#login").val('')
    $("#password").val('')
}


  
async function createUserMenu(userName, userPremission){
    let html_insert = `
    <span id = "fio">Приветствуем, ${userName}!</span>
    `

    if(userPremission == 'ADMIN'){
        html_insert += `<span class="animated_bot">Новость</span>
        <span class="animated_bot">Расписание</span>`
    }
    if(userPremission == 'SUPERUSER'){
        html_insert += `<span class="animated_bot">Новость</span>
        <span class="animated_bot">Расписание</span>
        <span class="animated_bot">Центр</span>`
    }

    $('#header_left').html(html_insert)
}


async function createMain(){
    $.ajax({
        url: "http://localhost:5000/centers",
        type: 'GET',
        success: function(res) {

            let str = ''
            
            for(elm of res){
                
                str += `<div id="center" center_name = "${elm["name"]}" onclick = showDataCenter("${elm["name"]}")>
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


