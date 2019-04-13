const multer = require( 'multer');

//Organizar o caminho
const path = require('path');

//biblioteca para gerar conjunto de caracters unicos
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    //armazenar no disco - onde está a aplicação
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if (err) cb(err);

                //2138yeas7dy7412-teste.jpg
                //'hex' = hexadecimal
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })
        }
    })
}