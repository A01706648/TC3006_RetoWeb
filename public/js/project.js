
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
    {//sumbmit
        document.getElementById("form_project_detail").submit();
    }

    //alert('Done');
}

/*Select the value of Select Compoment according to it's value*/
/*
function PreSetSelectComp()
{
    let SelectComp_List = document.getElementsByTagName("select");

    for(let SelectComp of SelectComp_List)
    {
        let Option_List = SelectComp.childNodes;
        let value = SelectComp.value;

        for(child of Option_List)
        {
            if(child.value == value)
            {
                alert(child.innerHTML + value.toString());
                child.selected = "selected";
            }
        }
    }
}

PreSetSelectComp();
*/