const fatherlist = document.getElementById('fatherlist');
const loader = document.getElementById('loading');
let checking = document.getElementById('hoverTab');
let subBox;
function listGen(act,bool) {
    bool = bool.toString();
    let mainDiv= document.createElement("div");
    mainDiv.classList.add('listIt','darkModeListIt');
    let mainP = document.createElement("p");
    mainP.classList.add('pList');
    let mainText = document.createTextNode(act);
    mainP.appendChild(mainText);
    let listInputDiv= document.createElement("div");
    listInputDiv.classList.add('listInput');
    let editButton= document.createElement("button");
    let editIcon= document.createElement("i");
    editIcon.classList.add("fa-edit" ,"icon" ,"EDIcon" ,"SIcon","darkModeSIcon","gIcon");
    editIcon.title = "Edit";
    editButton.appendChild(editIcon)
    editButton.addEventListener("click", editAdd)
    let deleteButton= document.createElement("button");
    let deleteIcon= document.createElement("i");
    deleteIcon.classList.add("fa-trash" ,"icon" ,"DLIcon" ,"SIcon","darkModeSIcon","gIcon");
    deleteIcon.title = "Delete";
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", deleteAdd);
    let checkButton= document.createElement("button");
    let checkIcon= document.createElement("i");
    checkIcon.classList.add("icon", "SIcon", "darkModeSIcon", "gIcon");
    if(bool=="true"){
        checkIcon.classList.add("fa-check-circle-o" ,"CheckIconTrue");
    }else {
        checkIcon.classList.add("fa-circle-o" ,"CheckIconFalse");
    }
    checkIcon.title = "Check";
    checkButton.appendChild(checkIcon);
    checkButton.addEventListener("click", check)
    listInputDiv.appendChild(editButton)
    listInputDiv.appendChild(deleteButton);
    listInputDiv.appendChild(checkButton);
    mainDiv.appendChild(mainP)
    mainDiv.appendChild(listInputDiv);
    fatherlist.appendChild(mainDiv);
}
let myUpButton= document.getElementById('upBtn');
myUpButton.addEventListener('click',goUp)
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
    let change = this.children[0];
    if(change.classList.contains('CheckIconTrue')){
        change.classList.replace('CheckIconTrue','CheckIconFalse');
        change.classList.replace('fa-check-circle-o','fa-circle-o');
    }else{
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
    document.getElementById('darkModeAdded').innerHTML = "Edit Your Task";
    let editBox = this.parentElement;
    let checkingBe = editBox.children[2];
    checking = checkingBe.children[0];
    let mainBox = editBox.parentElement;
    subBox = mainBox.children[0];
    document.getElementById('text').value = subBox.innerHTML;
}
function deleteAdd(){
    let deleteBox = this.parentElement;
    let mainDelete = deleteBox.parentElement;
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
    console.log(checking);
    if(checking.classList.contains('SIcon')){
        subBox.innerHTML = change;
        checking = document.getElementById('hoverTab');
        closeAdd();
    }else{
        listGen(change,false);
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
        listGen(data.todos[i].todo,data.todos[i].completed);
        // if (i==data.todos.length-1) {
        //
        // }
    }
})
