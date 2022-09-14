/*Material Initialization*/
M.AutoInit();

//Init DatePicker
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {format:'yyyy-mm-dd', autoClose:true});
});

// Or with jQuery

$(document).ready(function(){
$('.datepicker').datepicker();
});


function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function SaveBtnHandler()
{
    /*
    //alert("btn");
    let isOK = false;

    //clean all the span text
    let span_text_list = document.getElementsByTagName("span");
    for(span_text of span_text_list)
    {
        span_text.value = '';
    }

    //alert(1);
    //check all the input necessary
    //name not empty
    let name = document.getElementById("name");
    if(!isEmptyOrSpaces(name.value))
    {
        isOK = true;
    }
    else
    {
        //alert('Empty');
        document.getElementById("name_helper").innerHTML = 'Name shall not be empty';
    }

    if(isOK)
    */
    {//sumbmit
        document.getElementById("form_predict_param").submit();
    }

    //alert('Done');
}