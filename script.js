var h1 = document.getElementById("h1");
var h2 = document.getElementById("h2");
var h3 = document.getElementById("h3");
var pa = document.getElementById("my_paragraph");
var results = document.getElementById("results");
var lis = [];
var liste_information_text = [];
var liste_three = [];


function load_from_local_storage()
{
if(localStorage.length != null)
{
    for (var i = 0; i < localStorage.length; i++)
    {
        document.getElementById('textarea').textContent = localStorage.getItem("texte")
    }

}
    
}
load_from_local_storage()

function get_user_entry()
{
    var select_content_from_texarea = document.getElementById("textarea").value;
    var remove_space_from_text_area = select_content_from_texarea.trim();
    return remove_space_from_text_area
}
 
function transform_entry_on_unicode()
{
    var normalised_text = get_user_entry().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return normalised_text
}

function remove_punctuation()
{
var normalised_text_without_ponctuation = transform_entry_on_unicode().replace(/[.,\/#!$¿?'"%\^&\*;:{}=\-_`~()]/g,"");
var finalString = normalised_text_without_ponctuation.replace(/\s{2,}/g," ");
var remove_line_jump = finalString.replace(/\n/g, " ");
return remove_line_jump
}

function user_text()
{
    var user = document.getElementById("word_to_search").value;
    var normalised_user_text1 = user.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    var user_normalised_exclamation = normalised_user_text1.replace("¡","");
    var user_normalised = user_normalised_exclamation.replace(/[.,\/#!$'¿%?\^&\*;:{}=\-_`~()]/g,"");
    var user_texts = user_normalised.replace(/\s{2,}/g," ");
    return user_texts
}
function get_liste()
{
    const myArray = remove_punctuation().split(" ");
    var liste = [];
    if(remove_punctuation().trim() && user_text().trim())
    {

    for (var i = 0; i < myArray.length; i++)
    {

    if (myArray[i] == user_text().trim())
    {
        liste.push(i+1);
    }

    }
    localStorage.setItem("texte",remove_punctuation().trim())
    return liste;
}


}
function find_word()
{ 
if(remove_punctuation().trim() && user_text().trim())
{
     var txt = "<span style='color:rgb(242, 102, 250);font-weight: bold;'>"+user_text().trim()+"</span>";
    if (get_liste()[0] == null)
    {
    h1.textContent = ("Mot introuvable dans le texte");
    h2.textContent = "";
    h3.textContent = "";
    pa.textContent = "";
    }
    else
    {
        h1.classList.add("text_for_informations");
        h1.textContent = "Le mot '"+user_text().trim()+"' apparait "+get_liste().length+" fois dans le texte";
    
        var splitting_text = remove_punctuation().split(" ");

        function show_results()
        {

            for ( i in splitting_text)
            {
                if (splitting_text[i] == user_text().trim())
                {
                    liste_information_text.push(i);
                }
            }

            for (i in splitting_text)
            {
                liste_three.push(splitting_text[i])
            }

            for (i in liste_information_text)
            {   
                if (liste_three[liste_information_text[i]] == user_text().trim())

                {
                    liste_three[liste_information_text[i]] = txt;
                }
                
                
            }
            
            var three = liste_three.toString().replaceAll(',',' ');
            lis[0] = three;
            pa.innerHTML = lis[0];
            liste_three = [];
        }

       show_results()
    }
    
}
}
    


