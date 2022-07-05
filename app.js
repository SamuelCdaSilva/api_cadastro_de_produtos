const express = require("express");
const { randomUUID } = require("crypto"); // -> gerar id universal
const { response } = require("express");

const app = express();

app.use(express.json());

const products = [];

/**
 *  Body -> Sempre que quiser enviar dados para minha aplicação
 *  Params -> /product/2238723907283
 *  Query -> /product/id=12312312312312value=312342134123124
 */

app.post("/products", (request, response) => {
    // Nome e Preço => Name and Price

    const { name, price } = request.body;

    const product = ({
        name,
        price,
        id: randomUUID(),
    });
    

    products.push(product); 

    return response.json(product);
});


app.get("/products", (request, response) => { // => GET, buscar informação.
    return response.json(products);
});

app.get("/products/:id", (resquest, response) => {
    const {id } = resquest.params;
    const product = products.find(product => product.id === id); // -> vai percorrer o array até encontrar um ID igual
    return response.json(product);
});




app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
