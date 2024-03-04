const overlay = document.getElementById('overlay')
const addBtn = document.getElementById('add')
const selected = document.querySelector('.selected')
const count = document.getElementById('count')
const form = document.getElementById('form');
const usersUi = document.getElementById('users');
const error = document.getElementById('error')
const startBtn = document.getElementById('start')
const selectedUser = document.getElementById('selected-user')

const emoji = ['😀', '😎', '😝', '😜', '😉', '😃', '🙄', '🙂', '😂', '😁'];
let users = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];

addBtn.onclick = () => {
    overlay.classList.remove('hidden')
}

overlay.ondblclick = () => {
    overlay.classList.add('hidden')
}

selected.ondblclick = () => {
    selected.classList.add('hidden')
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(form.name.value.trim()){
        const randomEmoji = Math.trunc(Math.random() * emoji.length)
        let check = false;
        users.forEach((user) => {
            if(user.title.slice(2) == form.name.value){
                check = true;
            }
        })
        if(check){
            error.style.display = 'block'
            error.textContent = "Bunday ism bazada allaqachon mavjud, yoshi yoki yilini qo'shib kiriting!";

            setTimeout(() => {
                error.style.display = 'none'
            }, 7000)
        }else{
            const newUser = {
                title: emoji[randomEmoji] + form.name.value
            }
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
            overlay.classList.add('hidden')
        }
    }else{
        error.style.display = 'block'
        error.textContent = "Input bo'sh bo'lish mumkun emas!";

        setTimeout(() => {
            error.style.display = 'none'
        }, 3000)
    }    
    form.reset();
    updateUi()
})


function updateUi() {
    usersUi.innerHTML = '';
    users.map((user, i) => {
        usersUi.innerHTML += `
            <div class="user">
                <h1>${user.title}</h1>
                <p onclick="deleteItem(${i})" >&#128465;</p>
            </div>
            `
    })
}

updateUi()


function deleteItem(id) {
    let check = [];
    users.forEach((user, i) => {
        if(i != id){
            check.push(user)
        }
    });
    users = check;
    localStorage.setItem('users', JSON.stringify(users))
    updateUi();
}


error.style.display = 'none'

function randomUser() {
    console.log(users.length)
}

randomUser()

startBtn.addEventListener('click', () => {
    let counts = 3;
    let selectInterval = setInterval(() => {
        count.textContent = counts;
        counts--
    }, 1000)

    setTimeout(() => {
        clearInterval(selectInterval)
        const randomUser = Math.floor(Math.random() * users.length)
        selected.classList.remove('hidden')
        selectedUser.textContent = users[randomUser].title
        counts = 3;
    }, (counts + 1) * 1000)
})