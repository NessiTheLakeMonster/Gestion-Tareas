const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    console.log(uid);

    let token = jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '24h'
    });

    return token;

}

module.exports = {
    generarJWT
}