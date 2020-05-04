const source = $('#player-info-template').html()
const template = Handlebars.compile(source)

$('#getBtn').click(function(){
    const teamName = $('#inputTeam').val()
    $.get(`/teams/${teamName}`, function(result){
    //    console.log(result)
       $('#players-conatainer').empty()
       result.forEach(function(player){
           newHTML = template({name: player.firstName + " " + player.lastName,number: player.jersey,position: player.pos, imgURL: player.imgURL})
           $('#players-conatainer').append(newHTML)
       })
    })

})


$('#getDreamTeamBtn').click(function(){
    $('#players-conatainer').empty()
    $.get('/dreamTeam',function(dreamTeam){
        dreamTeam.forEach(function(player){
        $('#players-conatainer').append(`<div class='player dreamTeam'>${player}</div>`)
        })
    })
})


$('#players-conatainer').on('click','.player',function(){
    const playerDiv = $(this).html()
    const data = {player:playerDiv}
    $.post('/roster',data,function(response){
        alert(response)
    })
})
