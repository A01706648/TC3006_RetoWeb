/*Material Initialization*/
M.AutoInit();

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
        document.getElementById("form_story_detail").submit();
    }

    //alert('Done');
}