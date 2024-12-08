var siteName = document.querySelector("#markerName")
var siteUrl = document.querySelector("#siteUrl")
var marksList=[]

if(localStorage.getItem("BookMarks") !=null){
    marksList=JSON.parse(localStorage.getItem("BookMarks"))
    display(marksList)
}



function add(){
    var list ={
        name : siteName.value,
        url : siteUrl.value,
    }
    marksList.push(list)
    display(marksList)
    addToStorage()
    clear()
}
function display(marks){
    var cartona=``
    for ( var i = 0; i<marksList.length ;i++ ){
        cartona+=`<tr>
                <td>${i+1}</td>
                <td>${marksList[i].name}</td>
                <td><button class="btn btn-primary text-capitalize" onclick="visitWebsite(${this})"><i class="fa-solid fa-eye"></i> visit</button></td>
                <td><button class="btn btn-danger text-capitalize" onclick="deleteMark(${i})"><i class="fa-solid fa-trash-can"></i> delete</button></td>
                </tr>`
    }
    document.querySelector("#myData").innerHTML=cartona
}
function clear(){
    siteName.value=null,
    siteUrl.value=null
}
function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteUrL)) {
    open(bookmarks[websiteIndex].siteURL);
    } else {
    open(`https://${bookmarks[websiteIndex].siteUrL}`);
    }
}
function deleteMark(number){
    marksList.splice(number,1)
    display(marksList)
    addToStorage()
}
function addToStorage(){
    localStorage.setItem("BookMarks",JSON.stringify(marksList))
}
function inputValided(element){
    var valdtion= {
        markerName : /^.{3,}$/,
        siteUrl : /^(https:\/\/)?.+(\.com)$/
    }
    if(valdtion[element.id].test(element.value) == true){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.add("d-none")
    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.remove("d-none")
    }
}

var nameRegex = /^.{3,}$/;
var urlRegex = /^(https:\/\/)?.+(\.com)$/;

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
    validate(siteUrl, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    }
}