
$('#getBtn').click(function(){
    const teamName = $('#inputTeam').val()
    $.get(`/teams/${teamName}`, function(result){
    //    console.log(result)
    //render data
    $('body').append(`<p>${result[0].firstName}</p>`) // just check render
    })

})
