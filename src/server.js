const express = require("express")
const server = express()

// pegar o banco de dados

const db = require("./database/db")
//configurar pasta publica

server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))



//utilizando template engine
const nunjuckts = require("nunjucks")
nunjuckts.configure("src/views",{
    express: server,
    noCache: true
})




//configurar caminhos da minha aplicação
//pagina inicial
// req : requisição
//res : resposta
server.get("/",(req,res) =>{
    return res.render("index.html")
} )

server.get("/create-point",(req,res) =>{

    //req.query: Query strings da nossa url
    // req.query



    return res.render("create-point.html")
} )

server.post("/savepoint",(req,res) =>{

    //req.body: o corpo do nosso formulario
    //inserir dados no banco de dados
     //inserir dados na tabela
    const query = `
    INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
     
    ]

    function afterInsertData(err){
        if (err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html",{saved:true})
    }
    


    db.run(query,values,afterInsertData )


})







server.get("/search",(req,res) =>{

    const search = req.query.search

    if(search == ""){
        // pesquisa vazia
        return res.render("search-results.html",{total : 0})
    }



    //pegar os dados do banco de dados
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if (err){
            return console.log(err)
        }

        const total = rows.length
        // console.log("Aqui estão seus registros")
        // console.log(rows)
        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html",{places : rows,total: total})

    })

    
} )

// ligar o servidor 
server.listen(3000)

