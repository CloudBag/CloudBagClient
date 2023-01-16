const fs = require('fs');
const path = require('path');

exports.validateUser = (credentials) => {
    let userData={
        NickName:null,
        password:null,
        rango:null,
    };
    fetch("/login",{
        method: 'POST',
        body: credentials,
        headers: new Headers()
    })
    return userData;
}