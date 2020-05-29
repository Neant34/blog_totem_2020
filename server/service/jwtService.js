const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');

module.exports = {
    
    sign: (payload) => {
        const signOptions = {
            expiresIn:  "1d",
            algorithm:  "RS256" 
        }

     return jwt.sign(payload, privateKEY, signOptions);
    },

   verify: (token) => {
     const verifyOptions = {
        expiresIn:  "1d",
        algorithm:  "RS256" 
    }

      try {
        return jwt.verify(token, publicKEY, verifyOptions);
      } catch (err) {
        return false;
      }

   }
}