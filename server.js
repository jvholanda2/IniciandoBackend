const express = require('express')
const nunjucks = require('nunjucks')
const { ServerResponse } = require('http')
const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req,res) {
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/49560042?s=460&u=525de05c220977cc6c945da605fa1948bf3fa41e&v=4",
        name: "João Vitor",
        role: "Desenvolvimento Web",
        description: 'Estudante de ciência da computação, desenvolvedor front-end: <a href="https://github.com/jvholanda2"target="_blank" > Github</a>',
        links: [
            { name: "Github", url: "https://github.com/jvholanda2"},
            { name: "Facebook", url: "https://www.facebook.com/j.viitor2"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/jo%C3%A3o-vitor-alves-holanda-73ab13a9/"},

        ]
    }
    return res.render('about', {about:about})
})

server.get("/portifolio", function(req,res) {
    
    return res.render('portifolio', { items: videos })
})

server.get("/video", function(req,res) {
    const id = req.query.id;
    
    const video = videos.find(function(video){
        if (video.id == id) {
            return true;
        }
    })

    if (!video) {
        return res.send("Video not found!")
    }
    
    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log('Tá rodando')
})

