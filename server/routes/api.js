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



router.get('/teams/:teamName',function(req,res){
    const teamName = req.params.teamName
    // console.log(teamName)
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response){
        const data = JSON.parse(response.toString()).league.standard
        const relevantData = data.filter(player=> player.isActive === true && player.teamId === teamToIDs[teamName])
        relevantData.forEach(player => player.imgURL = `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`)
        res.send(relevantData)
    })
},)



router.put('/team/:teamName/:teamId',function(req,res){
    const name = req.params.teamName
    const id = req.params.teamId
    teamToIDs[name] = id
    console.log(teamToIDs)
    res.send(`Added ${name} with id ${id} successfully to teamIdBank`)
})



router.get('/dreamTeam',function(req,res){
    res.send(dreamTeam)
})


router.post('/roster',function(req,res){
    if(dreamTeam.length <5){
        const player = req.body.
        dreamTeam.push(player)
        res.send('Added Successfully!')
    } else {
        res.send('Team full')
    }
})



module.exports = router