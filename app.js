const express = require("express");
const { randomUUID } = require("crypto"); // -> gerar id universal
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "UTF-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data); 
    }

});

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

    ProductFile();

    return response.json(product);
});


app.get("/products", (request, response) => { // => GET, buscar informação.
    return response.json(products);
});

app.get("/products/:id", (resquest, response) => {
    const { id } = resquest.params;
    const product = products.find(product => product.id === id); // -> vai percorrer o array até encontrar um ID igual
    return response.json(product);
});

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex((product) => product.id === id);
    
    products[productIndex] = {
        ...products[productIndex], // -> Rest Operator: pegar todas as informações menos as duas abaixo
        name,
        price
    };

    ProductFile();

    return response.json({ message: "Produto alterado com Sucesso!" })
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);

    ProductFile();

    return response.json({ message: "Produto removido com Sucesso!"})
});

function ProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Produto Inserido com Sucesso!")
        }
    }); 
}

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));