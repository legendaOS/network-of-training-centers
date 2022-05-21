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

async function createApplication(element){
    let el = $(element.parentNode.children[0])
    let num = el.html()
    console.log(num)

    axios({
        method: 'post',
        headers:{
            authorization: token_
        },
        url: 'http://localhost:5000/application',
        data:{
            id_schedules: num
        }
    })
    .then(function (response) {
        console.log(response.data)

        let buf = $(element).html()
        $(element).html(buf + ' Успешно')

        setTimeout(()=>{$(element).html(buf)}, 3000)
    })
    .catch(function (error) {
        console.log(error)

        let buf = $(element).html()
        $(element).html(buf + ' Ошибка')

        setTimeout(()=>{$(element).html(buf)}, 3000)
    })
}

async function deleteApplication(element){
    let el = element.parentNode.parentNode
    let num = $(el.children[0]).html()
    //$(el).fadeOut();
    console.log(num)

    await axios.delete(`http://localhost:5000/application`, {headers:{authorization: token_},
        data:{
            id: num
        }})
        .then(function (response) {
            $(el).fadeOut();
            
        })
        .catch(function (error) {
            $(element).html(Ошибка)
        })
}

async function getApplications(){

    let buf 

    await axios.get(`http://localhost:5000/applications`, {headers:{authorization: token_}})
        .then(function (response) {
            
            buf = response.data
        })
        .catch(function (error) {
            buf = []
        })

    console.log(buf)

    let elem_appls_html = ''

    for(element of buf){
        elem_appls_html += `<tr class="element_applications">
                                <td class="into_element_applications">${element.id}</td>
                                <td class="into_element_applications">${element.date}</td>
                                <td class="into_element_applications">${element.time}</td>
                                <td class="into_element_applications">${element.center_in}</td>
                                <td class="into_element_applications">${element.fio}</td>
                                <td class="into_element_applications">${element.topic}</td>
                                <td class="into_element_applications">
                                    <span class = 'animated_bot' id = '' onclick = "deleteApplication(this)">Удалить</span>
                                </td>
                            </tr>`
    }

    let html = `<div id = 'usersl'><span class = 'animated_bot' id = '' onclick = "createMain()">Назад</span></div>
                <table id="applications">


                    <tr class="element_applications">
                        <td class="into_element_applications">ID</td>
                        <td class="into_element_applications">Дата</td>
                        <td class="into_element_applications">Время</td>
                        <td class="into_element_applications">Центр</td>
                        <td class="into_element_applications">Имя</td>
                        <td class="into_element_applications">Название</td>
                        <td class="into_element_applications">Действие</td>
                    </tr>

                    ${elem_appls_html}

                </table>`

    $("#content").html(html)
}


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
            ${i.time} ${i.date} (<span>${i.id}</sapn>) <br><br>
            ${i.topic}
        </div>
        `
    }

    for(i of buf.schedules){
        schedules += `
        <div class="elenemtNews">
            ${i.time} ${i.date} (<span>${i.id}</span>)<br><br>
            ${i.topic} <br><br>
            <span class = 'animated_bot' onclick = 'createApplication(this)'>Записаться</span>
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

async function deleteUser(element){
    let parent = $(element.parentNode.parentNode)
    let num = $(element.parentNode.parentNode.children[0]).html()

    await axios.delete(`http://localhost:5000/user`, {headers:{authorization: token_},
        data:{
            id: num
        }})
        .then(function (response) {
            $(parent).fadeOut();
            
        })
        .catch(function (error) {
            $(parent).html(Ошибка)
        })
}

async function UPUser(element){
    let parent = $(element.parentNode.parentNode)
    let num = $(element.parentNode.parentNode.children[0]).html()
    let role = $(element.parentNode.parentNode.children[3]).html()

    

    let roles = ['USER', 'ADMIN', 'SUPERUSER']

    let newRole = roles.indexOf(role) + 1
    newRole = newRole > 2 ? roles[2] : roles[newRole]

    let statusOrRole = await changeRole(num, newRole)

    if (statusOrRole){
        element.parentNode.parentNode.children[3].innerHTML = statusOrRole
    }
    

}

async function DOWNUser(element){
    let parent = $(element.parentNode.parentNode)
    let num = $(element.parentNode.parentNode.children[0]).html()
    let role = $(element.parentNode.parentNode.children[3]).html()

    let roles = ['USER', 'ADMIN', 'SUPERUSER']

    let newRole = roles.indexOf(role) - 1
    newRole = newRole > 0 ? roles[newRole] : roles[0]

    let statusOrRole = await changeRole(num, newRole)

    if (statusOrRole){
        element.parentNode.parentNode.children[3].innerHTML = statusOrRole
    }
}


async function changeRole(id, newRole){

    await axios({
        method: 'patch',
        url: 'http://localhost:5000/user',
        data:{
            "id":id,
            "role": newRole
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        
    })
    .catch(function (error) {
        
    })

    return newRole
}


async function usersSudoMenu(){

    let bufhtml = ''
    await axios.get(`http://localhost:5000/users`, {headers:{authorization: token_}})
    .then(function (response) {

        console.log(response.data)
        
        for(element of response.data){

            bufhtml += `<tr class="elementSudoMenu">
                            <td class="blockSudoMenu">${element.id}</td>
                            <td class="blockSudoMenu">${element.fio}</td>
                            <td class="blockSudoMenu">${element.login}</td>
                            <td class="blockSudoMenu">${element.role}</td>
                            <td class="blockSudoMenu">
                                <span class = 'animated_bot' id = '' onclick = "deleteUser(this)">Удалить</span>
                            </td>
                            <td class="blockSudoMenu">
                                <span class = 'animated_bot' id = '' onclick = "UPUser(this)">&#8593;</span>
                                <span class = 'animated_bot' id = '' onclick = "DOWNUser(this)">&#8595;</span>
                            </td>
                        </tr>`

        }
    })
    .catch(function (error) {
        bufhtml = ''
    })

    let html = `<div id = 'usersl'><span class = 'animated_bot' id = '' onclick = "createMain()">Назад</span></div>
        <table id="usersSudoMenu">

                    

                    <tr class="elementSudoMenu">
                        <td class="blockSudoMenu">ID</td>
                        <td class="blockSudoMenu">Имя</td>
                        <td class="blockSudoMenu">Login</td>
                        <td class="blockSudoMenu">Роль</td>
                        <td class="blockSudoMenu">Удалить</td>
                        <td class="blockSudoMenu">Роль</td>
                    </div>

                    ${bufhtml}

                </tr>`
    
    $("#content").html(html)
    
}

  
async function createUserMenu(userName, userPremission){
    let html_insert = `
    <span id = "fio">Приветствуем, ${userName}!</span>
    `

    if(userPremission == 'ADMIN'){
        html_insert += `<span class="animated_bot" onclick = "createNewsMenu()">Новость</span>
        <span class="animated_bot" onclick = "createShMenu()">Расписание</span>
        <span class="animated_bot" onclick = "getApplications()">Записи</span>
        `
    }
    if(userPremission == 'SUPERUSER'){
        html_insert += `<span class="animated_bot" onclick = "createNewsMenu()">Новость</span>
        <span class="animated_bot" onclick = "createShMenu()">Расписание</span>
        <span class="animated_bot" onclick = "centerMenu()">Центры</span>
        <span class="animated_bot" onclick = "getApplications()">Записи</span>
        <span class="animated_bot" onclick = "usersSudoMenu()">Пользователи</span>`
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

async function deleteCenter(element){
    let name_element = element.parentNode.children[0].value

    console.log(name_element)

    await axios({
        method: 'post',
        url: 'http://localhost:5000/center_delete',
        data:{
            "name":name_element
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

async function addCenter(element){

    let adress_element = element.parentNode.children[0].value
    let info_element = element.parentNode.children[1].value
    let name_element = element.parentNode.children[2].value


    console.log([name_element, adress_element, info_element])

    await axios({
        method: 'post',
        url: 'http://localhost:5000/center',
        data:{
            "name":name_element,
            "adress":adress_element,
            "info":info_element
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Создан')

        setTimeout(()=>{elme.html(buf)}, 3000)
        
    })
    .catch(function (error) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Ошибка')

        setTimeout(()=>{elme.html(buf)}, 3000)
    })
}

async function changeCenter(element){

    let adress_element = element.parentNode.children[0].value
    let info_element = element.parentNode.children[1].value
    let name_element = element.parentNode.children[2].value


    console.log([name_element, adress_element, info_element])

    await axios({
        method: 'post',
        url: 'http://localhost:5000/center_change',
        data:{
            "name":name_element,
            "adress":adress_element,
            "info":info_element
        },
        headers: {
            Authorization: token_
        }
    })
    .then(function (response) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Изменен')

        setTimeout(()=>{elme.html(buf)}, 3000)
        
    })
    .catch(function (error) {
        let elme = $(element.parentNode)
        let buf = elme.html()
        
        elme.html(buf + 'Ошибка')

        setTimeout(()=>{elme.html(buf)}, 3000)
    })
}

async function centerMenu(){
    let html = `
            <div class="panel">
                <span class = 'animated_bot' id = '' onclick = "createMain()">Назад</span>
                <div class="deletionelement">
                    <input style="width:300px" type="text" placeholder="Название центра"> 
                    <span class = 'animated_bot' onclick="deleteCenter(this)">Удалить</span>
                </div>
                <div class="addelement">
                    <input type="text" class="added_text" placeholder = 'Адрес центра'>
                    <input type="text" class="added_text" placeholder = 'Информация центра'>
                    <input type="text" placeholder="Название центра">
                    <span class = 'animated_bot' onclick="addCenter(this)">Добавить</span>
                </div>
                <br><br>
                <div class="addelement">
                    <input type="text" class="added_text" placeholder = 'Адрес центра'>
                    <input type="text" class="added_text" placeholder = 'Информация центра'>
                    <input type="text" placeholder="Название центра">
                    <span class = 'animated_bot' onclick="changeCenter(this)">Обновить</span>
                </div>
            </div>
    `

    $("#content").html(html)
}