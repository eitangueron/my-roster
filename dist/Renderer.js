const source = $('#player-info-template').html()
const template = Handlebars.compile(source)


class Renderer{

    renderPlayer(player){
        const playerName = (player.firstName + " " + player.lastName)
        $.get(`/playerStats/${playerName}`,function(response){
            const playerStats = JSON.parse(response)
            const newHTML = template(
                {name: playerName,
                number: player.jersey,
                position: player.pos,
                imgURL: player.imgURL,
                games_played: playerStats.games_played,
                player_efficiency_rating: playerStats.player_efficiency_rating
            })
            $('#players-conatainer').append(newHTML)             
        })
    }

    renderTeam(team){
        $('#players-conatainer').empty()
        team.forEach(player => this.renderPlayer(player))
    }

    renderDreamTeam(dreamTeam){
        $('#players-conatainer').empty()
        dreamTeam.forEach(function(player){
            $('#players-conatainer').append(`<div class='player dreamTeam'>${player}</div>`)
        })
    }
}

