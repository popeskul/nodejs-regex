const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', function (req, res, next) {
  const URL = 'https://dou.ua/';
  const regex = /src=.*.(png|svg|jpg)\"/g;
  const images = [];

  axios.get(URL).then(({ data }) => {
    let regExGroups;

    while ((regExGroups = regex.exec(data)) !== null) {
      if (regExGroups.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      regExGroups.forEach((match, groupIndex) => {
        if (groupIndex === 0) {
          const imageLink = match.split('src="')[1].split('"')[0];
          images.push(imageLink);
        }
      });
    }

    res.render('index', { images });
  });
});

module.exports = router;
