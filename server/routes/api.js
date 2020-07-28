const express = require('express')
const urllib = require('urllib')
const router = express.Router()


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
    "wizards": "1610612764",
    "raptors": "1610612761",
    "spurs": "1610612759",
    "rockets": "1610612745"
}


const dreamTeam = []   //max 5

let teamsData

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json',function(err,response){
    teamsData = JSON.parse(response.toString()).league.standard
})


router.get('/teams/:teamName',function(req,res){
    const teamName = req.params.teamName
    const requestedTeamData = teamsData.filter(player=> player.isActive && player.teamId === teamToIDs[teamName])
    .map(player => ({firstName:player.firstName, lastName:player.lastName,jersey: player.jersey, pos:player.pos}))
    requestedTeamData.forEach(player => player.imgURL = `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`)
    res.send(requestedTeamData)
},)



router.put('/team/:teamName/:teamId',function(req,res){
    const teamName = req.params.teamName
    const teamId = req.params.teamId
    teamToIDs[teamName] = teamId
    res.send(`Added ${teamName} with id ${teamId} successfully to teamIdBank`)
})



router.get('/dreamTeam',function(req,res){
    res.send(dreamTeam)
})


router.post('/roster',function(req,res){
    if(dreamTeam.length <5){
        const player = req.body.dreamPlayerKey
        if(!dreamTeam.includes(player)){
            dreamTeam.push(player)
            res.send('Added to your dream team!')
        } else {
            res.send('This player is already in dream team')
        }
    } else {
        res.send('Team full')
    }
})



router.get('/playerStats/:player',function(req,res){
    const player = req.params.player
    const playerFirstName = player.split(' ')[0]
    const playerLastName = player.split(' ')[1]
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${playerLastName}/${playerFirstName}`,function(err,response){
        res.send(response)
    })
})


module.exports = router

