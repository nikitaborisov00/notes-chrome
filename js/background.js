setInterval(function(){
    chrome.storage.local.get(['notes'], function(result){
        if(!('notes' in result)){
            result.notes = [];
        }

        for(let i = 0; i < result.notes.length; i++){
            if(new Date(dateFormat(result.notes[i].date)) > new Date()){
                continue;
            }

            (function(i){
                fetch('https://api.telegram.org/bot1623850806:AAGl0ywMxWMR1vWsvtY6e77i2eGd-OluOG4/sendMessage?chat_id=258486084&text=' + encodeURIComponent('Уведомление — ' + result.notes[i].name));

                result.notes.splice(i, 1);

                chrome.storage.local.set({
                    notes: result.notes
                });
            })(i);
        }
    });
}, 10000);

function dateFormat(datetime){
    let date = datetime.split(' ')[0];
    let time = datetime.split(' ')[1];

    date = date.split('.').reverse().join('-');

    return date + ' ' + time;
}