jQuery.datetimepicker.setLocale('en');

$(function(){
    buildList();


    $(document).on('click', '.notes_list li img', function(){
        let ind = $(this).closest('li').data('index');

        chrome.storage.local.get(['notes'], function(result){
            if(!('notes' in result)){
                result.notes = [];
            }

            result.notes.splice(ind, 1);

            chrome.storage.local.set({
                notes: result.notes
            }, function(){
                buildList();
            });
        });
    });


    $('.add_new_form input[name="date"]').datetimepicker({
        minDate: new Date(),
        step: 1,
        format: 'd.m.Y H:i'
    });

    $('.add_new').on('click', function(){
        $('.notes_list').hide();

        $('.add_new_form').show();
    });

    $('.add_new_form').on('submit', function(event){
        event.preventDefault();


        chrome.storage.local.get(['notes'], function(result){
            if(!('notes' in result)){
                result.notes = [];
            }

            result.notes.push({
                name: $('.add_new_form input[name="name"]').val(),
                date: $('.add_new_form input[name="date"]').val()
            });
    
            chrome.storage.local.set({
                notes: result.notes
            }, function(){
                $('.add_new_form').hide()[0].reset();

                $('.notes_list').show();

                buildList();
            });
        });
    });
});


function buildList(){
    chrome.storage.local.get(['notes'], function(result){
        if(!('notes' in result)){
            result.notes = [];
        }

        $('.notes_list').html('');

        for(let i = 0; i < result.notes.length; i++){
            $('.notes_list').append('<li data-index="' + i + '"><p>' + result.notes[i].name + '<span>' + result.notes[i].date + '</span></p><img width="20" src="images/delete.svg" /></li>');
        }
    });
}