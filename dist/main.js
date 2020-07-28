const getDegaultImg = function(img){
    img.src = 'https://i.pinimg.com/originals/a0/b1/46/a0b146c880ff8e95d1d8fa84d2d656c7.jpg'
}

const renderer = new Renderer()


$('#getBtn').click(function(){
    const teamName = $('#inputTeam').val()
    $.get(`/teams/${teamName}`, function(result){
        renderer.renderTeam(result)
    })
})



$('#getDreamTeamBtn').click(async function(){
    await $.get('/dreamTeam',function(response){
        renderer.renderDreamTeam(response)
    })
})



$('#players-conatainer').on('click','.saveToDreamTeamBtn',function(){
    const dreamPlayer = $(this).closest('.player').html()
    const dataOfPlayer = {dreamPlayerKey : dreamPlayer}
    $.post('/roster',dataOfPlayer,function(response){
        alert(response)
    })
})

