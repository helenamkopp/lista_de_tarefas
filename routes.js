const express = require('express')
const routes = express.Router()


routes.get('/', function(req, res) {
    return res.render("pages/inicio")
})

routes.get('/inicio', function(req, res) {
    return res.render("pages/inicio")
})

routes.get('/login', function(req, res) {
    return res.render("pages/login")
})

routes.get('/cadastro', function(req, res) {
    return res.render("pages/cadastro")
})

routes.post('/lista', function(req, res) {
    return res.send(req.body)
})

routes.get('/lista', function(req, res) {
    return res.render("pages/lista")
})

routes.get('/nova-tarefa', function(req, res) {
    return res.render("pages/nova-tarefa")
})


module.exports = routes

