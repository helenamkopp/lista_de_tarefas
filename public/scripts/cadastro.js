const fs = require('fs')


function cadastrar() {
    const keys = Object.keys(req.body)

    fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect("/lista")
    })

    return res.send(req.body)
}
