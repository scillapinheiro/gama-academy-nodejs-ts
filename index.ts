// Importação de biblioteca
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';

// Definição de endereço / URL
const port = 5000

// Implementação da regra de negócio
const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    const urlparse = url.parse(request.url ? request.url : '', true);

    var resposta;

    // Receber informações do usuário
    const params = parse(urlparse.search ? urlparse.search : '');

    // Criar um usuário - Atualizar um usuário
    if(urlparse.pathname == '/criar-atualizar-usuario'){

        //Salvar as informações
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if (err) throw err;
            console.log('Saved!');

            resposta = 'Usuario criado/atualizado com sucesso';

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
        });
    }
});

// Execução
server.listen( port, () => {
    console.log(`Server running on port ${port}`);
});