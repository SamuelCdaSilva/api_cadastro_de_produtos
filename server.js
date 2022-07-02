const http = require ("http");

http
    .createServer((request, response) => { // REQUISIÇÃO E RESPOSTA
        response.writeHead(200, { "Content-Type": "application/json" });

        if (request.url === "/produto") {
            response.end(
                JSON.stringify({
                    message: "Rota de Produto",
                })
            );
        }

        if (request.url === "/usuario") {
            response.end(
                JSON.stringify({
                    message: "Rota de Usuário",
                })
            );
        } /* else {  -> também funciona! 
            response.end(JSON.stringify({message: "OPAAAAA"}))
        }; */

        response.end(
            JSON.stringify({
                message: "Qualquer outra rota",
            })
        );
    })
    .listen(4001, () => console.log("Servidor está rodando na porta 4001"));