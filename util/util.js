const url = require('url');
const querystring = require('querystring');

/**
 * 将url中的querystring构造成对象
 * @param {String} URL 
 * @return {Object} 构造成的对象形式的query
 */
exports.getQuery = function (URL) {
    const o = url.parse(URL).query || '';
    return querystring.parse(o);
}