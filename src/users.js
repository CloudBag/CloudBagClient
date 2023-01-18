const fs = require('fs');
const path = require('path');
const fetch = require('electron-fetch').default;
const main = require('./main');

exports.validateUser = async (credentials) => {
  try {
    console.log(main.url);
    let response = await fetch(main.url + '/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
          {nickName: credentials[0], Password: credentials[1]}),
    });
    if (response.status === 400){
      return null;
    }else {
      return await response.json();
    }
  } catch (e) {
    console.log('Error al conectar');
    return null;
  }
}
;