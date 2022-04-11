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
            ${i.time} ${i.date} (${i.id}) <br><br>
            ${i.topic}
        </div>
        `
    }

    for(i of buf.schedules){
        schedules += `
        <div class="elenemtNews">
            ${i.time} ${i.date} (${i.id})<br><br>
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
        console.log(responsetok.data)
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
        html_insert += `<span class="animated_bot" onclick = "createNewsMenu()">Новость</span>
        <span class="animated_bot" onclick = "createShMenu()">Расписание</span>`
    }
    if(userPremission == 'SUPERUSER'){
        html_insert += `<span class="animated_bot" onclick = "createNewsMenu()">Новость</span>
        <span class="animated_bot" onclick = "createShMenu()">Расписание</span>`
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


async function deletenews(element){
    let id_elem = element.parentNode.children[0].value
    console.log(id_elem)

    console.log(token_)

    await axios({
        method: 'post',
        url: 'http://localhost:5000/news_delete',
        data:{
            "id":id_elem
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Удалено')

        setTimeout(()=>{elme.html(buf)}, 3000)
        
    })
    .catch(function (error) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Ошибка')

        setTimeout(()=>{elme.html(buf)}, 3000)
    })
}

async function addnews(element){
    let date_elm = element.parentNode.children[0].value
    let time = element.parentNode.children[1].value
    let text = element.parentNode.children[2].value
    let name = element.parentNode.children[3].value

    console.log([date_elm, time, text, name])

    await axios({
        method: 'post',
        url: 'http://localhost:5000/news',
        data:{
            "center_in":name,
            "topic":text,
            "time":time,
            "date": date_elm
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Создано')

        setTimeout(()=>{elme.html(buf)}, 3000)
        
    })
    .catch(function (error) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Ошибка')

        setTimeout(()=>{elme.html(buf)}, 3000)
    })
}

async function createNewsMenu(){
    let ht = `  <div class="panel">
                    <span class = 'animated_bot' id = '' onclick = "createMain()">Назад</span>
                    <div class="deletionelement">
                        <input type="text" placeholder="id"> 
                        <span class = 'animated_bot' onclick = 'deletenews(this)'>Удалить</span>
                    </div>
                    <div class="addelement">
                        <input type="date">
                        <input type="time">
                        <input type="text" class="added_text">
                        <input type="text" placeholder="Название центра">
                        <span class = 'animated_bot' onclick = 'addnews(this)'>Добавить</span>
                    </div>
                </div>`


    $('#content').html(ht)
}

async function createShMenu(){
    let ht = `  <div class="panel">
                    <span class = 'animated_bot' id = '' onclick = "createMain()">Назад</span>
                    <div class="deletionelement">
                        <input type="text" placeholder="id"> 
                        <span class = 'animated_bot' onclick = 'deleteSh(this)'>Удалить</span>
                    </div>
                    <div class="addelement">
                        <input type="date">
                        <input type="time">
                        <input type="text" class="added_text">
                        <input type="text" placeholder="Название центра">
                        <span class = 'animated_bot' onclick = 'addSh(this)'>Добавить</span>
                    </div>
                </div>`


    $('#content').html(ht)
}

async function deleteSh(element){
    let id_elem = element.parentNode.children[0].value
    console.log(id_elem)

    console.log(token_)

    await axios({
        method: 'post',
        url: 'http://localhost:5000/shedules_delete',
        data:{
            "id":id_elem
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Удалено')

        setTimeout(()=>{elme.html(buf)}, 3000)
        
    })
    .catch(function (error) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Ошибка')

        setTimeout(()=>{elme.html(buf)}, 3000)
    })
}

async function addSh(element){
    let date_elm = element.parentNode.children[0].value
    let time = element.parentNode.children[1].value
    let text = element.parentNode.children[2].value
    let name = element.parentNode.children[3].value

    console.log([date_elm, time, text, name])

    await axios({
        method: 'post',
        url: 'http://localhost:5000/shedules',
        data:{
            "center_in":name,
            "topic":text,
            "time":time,
            "date": date_elm
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Создано')

        setTimeout(()=>{elme.html(buf)}, 3000)
        
    })
    .catch(function (error) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Ошибка')

        setTimeout(()=>{elme.html(buf)}, 3000)
    })
}