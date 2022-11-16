var browse = document.getElementsByClassName('chooseFiles')[0];
var selectDialog = document.createElement("INPUT");
var submit = document.getElementsByClassName('submit')[0];
selectDialog.setAttribute("type", "file");
selectDialog.setAttribute("multiple", "true");
selectDialog.style.display = "none";
var csrf_token = document.getElementById("csrf_token").innerHTML
var progressUpload = document.getElementsByClassName("progressUpload")[0];
var text1 = document.getElementById("text1");
var progress;
addProgressBar();
browse.addEventListener("click", function(){    
    selectDialog.click();
        
});
submit.addEventListener("click", function(){

    sendFiles(selectDialog.files);

})
    
function sendFiles(files){
        
    resetProgressBar();
    var req = new XMLHttpRequest();       
    req.upload.addEventListener("progress", updateProgress);
    req.upload.addEventListener("load", done)
    req.open("POST", "/upload/");
    var form = new FormData();
    for(var file = 0; file < files.length; file++){         
            
        form.append("file" + file, files[file], files[file].name);
    } 
    form.append("csrfmiddlewaretoken", csrf_token)
    req.send(form);  
}
function updateProgress(e){   
        
    progress.style.width = (((e.loaded/e.total)*100))+ "%";

    
}
function done(){

    progress.style.width = "0%"
    text1.innerHTML = "Done"

}
function resetProgressBar(){
    progress.style.width = "0%";

}
function addProgressBar(){
    var progressBar = document.createElement("div");
    progressBar.className = "progressBar";
    progressUpload.appendChild(progressBar);
    var innerDIV = document.createElement("div");
    innerDIV.className = "progress";
    progressBar.appendChild(innerDIV);
    progress = document.getElementsByClassName("progress")[0];
}