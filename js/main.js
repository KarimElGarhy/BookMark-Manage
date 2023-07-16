var bookMarkName = document.getElementById('btnBookmarkName')
var siteUrl = document.getElementById('btnSiteUrl')
var table = document.getElementById(`tableBody`)

// getDataFromLocalStorage and show
if (localStorage.bookmarks != null) {
    bookMarkArray = JSON.parse(localStorage.bookmarks)
} else {
    bookMarkArray = []
}

showBookMarks()
//Create Object
function saveDataInObject() {
    var bookMark = {
        name: bookMarkName.value,
        url: siteUrl.value
    }
    console.log(bookMark)
    bookMarkArray.push(bookMark)
}

//reset Inputs
function resetInputs() {
    bookMarkName.value = ``
    siteUrl.value = ``
}
//save data inLocalStorage
function saveDataInLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookMarkArray))
}
function showBookMarks() {
    var bodyHtml = ``
    for (var i = 0; i < bookMarkArray.length; i++) {
        bodyHtml += `
        <tr>
        <th>${i}</th>
        <th>${bookMarkArray[i].name}</th>
        <th>
            <a class="text-decoration-none btn bg-light-green text-white"  href="${bookMarkArray[i].url}" target="_blank">
                <i class="fa-solid fa-eye pe-2" ></i>
                Visit
            </a>
        </th>
        <th><button class="btn btn-danger text-white" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can" ></i> Delete </button></th>
        </tr>
    `
    }
    table.innerHTML = bodyHtml
}
// makeSure the Input not Empty!
function checkInputIfEmpty(inputId) {
    if (inputId.value == null || inputId.value == ``) {
        return false
    } else {
        return true
    }
}

// makeSure the siteUrl Is Good
var regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

function checkRegex(){
    if(!(regex.test(siteUrl.value))){
        Swal.fire({
            icon: 'info',
            width: 800,
            text: 'The url must have start with https:// or http:// and valid URL ',
        })
        resetInputs()
    }else{
        return true
    }
}

//check if the url&name is duplicated or not
function checkUrlDuplication(){
    var count = 0;
    for(var i = 0 ; i < bookMarkArray.length;i++){
        if(bookMarkArray[i].url == siteUrl.value || bookMarkArray[i].name == bookMarkName.value){
            count++;
        }
    }
    if(count>0){
        Swal.fire({
            icon: 'warning',
            width: 800,
            text: 'you Enter It Before, Focus !',
        })
        resetInputs()
    }
    else{
        return true
    }
}

// all check Function
function allInputChecks(){

    if(checkInputIfEmpty(bookMarkName) && checkInputIfEmpty(siteUrl)){
        if(checkRegex()){
            if(checkUrlDuplication()){
                return true
            }
        }
        
    }else{
        Swal.fire({
            icon: 'error',
            width: 800,
            title: 'Please Enter Name & Website Url ',
            showConfirmButton: false,
            timer: 1500
        })
        resetInputs();
    }
}


//Submit Data
function saveData() {
    if (allInputChecks()) 
    {
        saveDataInObject()
        resetInputs()
        saveDataInLocalStorage()
        showBookMarks()
        Swal.fire({
            icon: 'success',
            title: 'BookMark Is Saved, Thanks',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
//delete BookMark
function deleteBookMark(indexArray) {
    bookMarkArray.splice(indexArray, 1);
    saveDataInLocalStorage()
    showBookMarks()
}

