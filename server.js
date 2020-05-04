const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')


app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


app.get('/teams/:teamName',function(req,res){
    const teamName = req.params.teamName
    console.log(teamName)
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response){
        const data = JSON.parse(response.toString()).league.standard
        const relevantData = data.filter(player=> player.isActive === true && player.teamId === teamToIDs[teamName])
        res.send(relevantData)
    })
},)










const port = 3000
app.listen(port, function(){
    console.log('port is live and strong')
})