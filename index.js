const fatherlist = document.getElementById('fatherlist');
const loader = document.getElementById('loading');
let checking = document.getElementById('hoverTab');
let subBox;
let putIdG;
function listGen(act,bool,id) {
    const mainDiv= document.createElement("div");
    const mainP = document.createElement("p");
    const mainText = document.createTextNode(act);
    const listInputDiv= document.createElement("div");
    const editButton= document.createElement("button");
    const editIcon= document.createElement("i");
    const deleteButton= document.createElement("button");
    const deleteIcon= document.createElement("i");
    const checkButton= document.createElement("button");
    const checkIcon= document.createElement("i");

    mainDiv.classList.add('listIt','darkModeListIt');
    mainP.classList.add('pList');
    listInputDiv.classList.add('listInput');
    editIcon.classList.add("fa-edit" ,"icon" ,"EDIcon" ,"SIcon","darkModeSIcon","gIcon");
    editIcon.title = "Edit";
    deleteIcon.classList.add("fa-trash" ,"icon" ,"DLIcon" ,"SIcon","darkModeSIcon","gIcon");
    deleteIcon.title = "Delete";
    checkIcon.classList.add("icon", "SIcon", "darkModeSIcon", "gIcon");
    if(bool===true){
        checkIcon.classList.add("fa-check-circle-o" ,"CheckIconTrue");
    }else {
        checkIcon.classList.add("fa-circle-o" ,"CheckIconFalse");
    }
    checkIcon.title = "Check";

    mainP.appendChild(mainText);
    editButton.appendChild(editIcon)
    editButton.addEventListener("click", editAdd)
    editButton.id="e"+id.toString();

    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", deleteAdd);
    deleteButton.id="d"+id.toString();

    checkButton.appendChild(checkIcon);
    checkButton.addEventListener("click", check);
    checkButton.id="c"+id.toString();

    listInputDiv.appendChild(editButton);
    listInputDiv.appendChild(deleteButton);
    listInputDiv.appendChild(checkButton);
    mainDiv.appendChild(mainP);
    mainDiv.appendChild(listInputDiv);
    mainDiv.id=id.toString();
    fatherlist.appendChild(mainDiv);
}

let myUpButton= document.getElementById('upBtn');
myUpButton.addEventListener('click',goUp);
window.onscroll = function (){scrollFunction()}

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        myUpButton.style.display = "block";
    }else {
        myUpButton.style.display = "none";
    }
}

function goUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function check() {
    let patchHalfId = this.id;
    let patchId = patchHalfId.slice(1);
    let change = this.children[0];
    if(change.classList.contains('CheckIconTrue')){
        fetch("https://dummyjson.com/todos/"+patchId,{
            method: "PATCH",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                completed: false,
            })
        })
            .then(res => res.json())
            .then(console.log);

        change.classList.replace('CheckIconTrue','CheckIconFalse');
        change.classList.replace('fa-check-circle-o','fa-circle-o');
    }else{
        fetch("https://dummyjson.com/todos/"+patchId,{
            method: "PATCH",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                completed: true,
            })
        })
            .then(res => res.json())
            .then(console.log);
        change.classList.replace('CheckIconFalse','CheckIconTrue');
        change.classList.replace('fa-circle-o','fa-check-circle-o');
    }
}

function openAdd(){
    let hoverBox = document.getElementById("hoverTab");
    document.getElementById('darkModeAdded').innerHTML = "Add Your Task";
    hoverBox.style.display = "flex";
}

function editAdd(){
    openAdd();
    let putHalfId = this.id;
    putIdG = putHalfId.slice(1);
    document.getElementById('darkModeAdded').innerHTML = "Edit Your Task";
    let editBox = this.parentElement;
    let checkingBe = editBox.children[2];
    checking = checkingBe.children[0];
    let mainBox = editBox.parentElement;
    subBox = mainBox.children[0];
    document.getElementById('text').value = subBox.innerHTML;
}

function deleteAdd(){
    let deleteHalfId = this.id;
    let deleteId = deleteHalfId.slice(1);
    let deleteBox = this.parentElement;
    let mainDelete = deleteBox.parentElement;
    fetch("https://dummyjson.com/todos/"+deleteId,{
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(console.log);
    if(confirm('Are you sure?')){
        mainDelete.remove();
    }else {}
}

function changeMode(){
    let change = document.getElementById("DarkToggle")
    if(change.classList.contains('fa-toggle-off')){
        change.classList.replace('fa-toggle-off','fa-toggle-on');
        changeStyle();
    }else{
        change.classList.replace('fa-toggle-on','fa-toggle-off');
        changeStyle();
    }
}

function changeStyle(){
    const body = document.body;
    body.classList.toggle('darkModeBody');
    const main = document.getElementById("darkModeMain");
    main.classList.toggle('darkModeMain');
    const header = document.getElementById("darkModeHeader");
    header.classList.toggle('darkModeHeader');
    const add = document.getElementById("add");
    add.classList.toggle('darkModeAdd');
    const mode = document.getElementById("darkModeMode");
    mode.classList.toggle('darkModeMode');
    const modeButtonT = document.getElementById("DarkToggle");
    modeButtonT.classList.toggle('darkModeMode-buttonT');
    const listCon = document.getElementById("fatherlist");
    listCon.classList.toggle('darkModeListCon');
    const SIcon = document.getElementById("darkSIcon");
    SIcon.classList.toggle('darkModeSIcon');
    SIcon.classList.toggle('darkModeUper');
    const textEditor = document.getElementById("darkModeTextEditor");
    textEditor.classList.toggle('darkModeTextEditor');
    const added = document.getElementById("darkModeAdded");
    added.classList.toggle('darkModeAdded');
    const text = document.getElementById("text");
    text.classList.toggle('darkModeText');
    const SIcon2 = document.getElementById("darkSIcon2");
    SIcon2.classList.toggle('darkModeSIcon');
    let list2 = document.getElementsByClassName("gIcon")
    for(i in list2){
        list2[i].classList.toggle('darkModeSIcon');
    }
}

let changer = document.getElementById("darkMode");
changer.addEventListener("click", changeMode)

let page = document.getElementById("add");
page.addEventListener('click',openAdd)

function closeAdd(){
    let hoverBox = document.getElementById("hoverTab")
    hoverBox.style.display = "none";
    document.getElementById("text").value=null;
}

let closer = document.getElementById("closeBtn");
closer.addEventListener('click',closeAdd)

function submitChange(){
    let change = document.getElementById("text").value;
    let postIdG = document.getElementsByClassName("EDIcon").length+1;
    if(checking.classList.contains('SIcon')){
        fetch("https://dummyjson.com/todos/"+putIdG,{
            method: "PUT",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                todo: change,
            })
        })
            .then(res => res.json())
            .then(console.log);
        subBox.innerHTML = change;
        checking = document.getElementById('hoverTab');
        closeAdd();
    }else{
        fetch("https://dummyjson.com/todos/add",{
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                todo: change,
                completed: false,
                userId: postIdG,
            })
        })
            .then(res => res.json())
            .then(console.log);
        listGen(change,false,postIdG);
        closeAdd();
    }
}


let submitBtn = document.getElementById("subBtn");
submitBtn.addEventListener('click',submitChange);

fetch("https://dummyjson.com/todos")
.then(res => res.json())
.then(data => {
    loader.remove();
    for (let i = 0; i < data.todos.length; i++) {
        listGen(data.todos[i].todo,data.todos[i].completed,data.todos[i].id);
        // if (i==data.todos.length-1) {
        //
        // }
    }

})
