const fatherlist = document.getElementById('fatherlist');
const loader = document.getElementById('loading');
let checking = document.getElementById('hoverTab');
let subBox;
function listGen(act,bool) {
    bool = bool.toString();
    let mainDiv= document.createElement("div");
    mainDiv.classList.add('listIt');
    let mainP = document.createElement("p");
    mainP.classList.add('pList');
    let mainText = document.createTextNode(act);
    mainP.appendChild(mainText);
    let listInputDiv= document.createElement("div");
    listInputDiv.classList.add('listInput');
    let editButton= document.createElement("button");
    let editIcon= document.createElement("i");
    editIcon.classList.add("fa-edit" ,"icon" ,"EDIcon" ,"SIcon");
    editIcon.title = "Edit";
    editButton.appendChild(editIcon)
    editButton.addEventListener("click", editAdd)
    let deleteButton= document.createElement("button");
    let deleteIcon= document.createElement("i");
    deleteIcon.classList.add("fa-trash" ,"icon" ,"DLIcon" ,"SIcon");
    deleteIcon.title = "Delete";
    deleteButton.appendChild(deleteIcon);
    let checkButton= document.createElement("button");
    let checkIcon= document.createElement("i");
    checkIcon.classList.add("icon", "SIcon");
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
    hoverBox.style.display = "flex";
}
function editAdd(){
    openAdd();
    let editBox = this.parentElement;
    let checkingBe = editBox.children[2];
    checking = checkingBe.children[0];
    let mainBox = editBox.parentElement;
    subBox = mainBox.children[0];
    document.getElementById('text').value = subBox.innerHTML;
}
let page = document.getElementById("add");
page.addEventListener('click',openAdd)
function closeAdd(){
    let hoverBox = document.getElementById("hoverTab")
    hoverBox.style.display = "none";
}
let closer = document.getElementById("closeBtn");
closer.addEventListener('click',closeAdd)
function submitChange(){
    let change = document.getElementById("text").value;
    console.log(checking);
    if(checking.classList.contains('SIcon')){
        subBox.innerHTML = change;
        checking = document.getElementById('hoverTab');
        document.getElementById("text").value=null;
        closeAdd();
    }else{
        listGen(change,false);
        document.getElementById("text").value=null;
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
