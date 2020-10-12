/*
    domonstrating the 500 errors by the API. We call fake CDN endpoints.
    We like to purge the cache because sometimes the CDN is caching 404 for weeks.
    When we purge a lot of url's we get a 500 error, no Api limits anywhere.
*/

const API_TOKEN = 'api token';
const CDN_ID = 'cdn id';

const DigitalOcean = require("do-wrapper").default;

const instance = new DigitalOcean(API_TOKEN);
const files = [];

// set index, so we don't purge the same multiple times
let index = 0;

// set interval, don't go over API limits
// purge a lot of files
setInterval(() => {
    for (let i = index; i <= (index + 20); i++) {
        files.push(`${i}_2image.jpg`);
    }

    instance.cdn.purgeEndpointCache(CDN_ID, files).then(() => {
        console.log('successfull purged');
    }).catch((err) => {
        console.log('err while purging ', err.response.statusCode);
        console.log(err.response.body);
    });

    index += 20;
}, 1000);