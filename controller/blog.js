const url = require('url');
const querystring = require('querystring');

const config = require('../config/config');
const BlogService = require('../service/blog');
const service = new BlogService();

class BlogController {
    doGET(req, res) {
        const URL = req.url;
        const parse = url.parse(URL);
        const query = querystring.parse(parse.query);
        if (parse.pathname === '/api/blog') {
            // 获取文章 -------------------------------------------------------------
            service.findById(query.id).then(data => {
                let sendData = data ? Object.assign({}, config.successData, {
                    data,
                    msg: '成功获取文章'
                }) : config.failData;
                res.end(JSON.stringify(sendData));
            }).catch(err => {
                res.end(JSON.stringify(config.failData))
            })
        } else if (parse.pathname === '/api/blog_list') {
            // 获取文章列表 --------------------------------------------------------------
            service.findAndCountAll(query).then(data => {
                const sendData = Object.assign({}, config.successData, {
                    data,
                    msg: "成功获取文章列表"
                })
                res.end(JSON.stringify(sendData));
            }).catch(err => {
                res.end(JSON.stringify(config.failData))
            });
        } else {
            res.end(config.failData)
        }
    }
    doPOST(req, res) {
        const URL = req.url;
        const parse = url.parse(URL);

        let reqbody = '';

        req.on('data', (chunk) => {
            reqbody += chunk;
        });

        req.on('end', () => {

            let data = JSON.parse(reqbody);

            if (parse.pathname === '/api/blog_create') {
                // 新增文章--------------------------------------------------------------------
                service.create(data).then(result => {
                    const sendData = Object.assign({}, config.successData, {
                        msg: "成功添加文章",
                        data: result
                    });
                    res.end(JSON.stringify(sendData));
                }).catch(err => {
                    res.end(JSON.stringify(config.failData))
                })
            } else if (parse.pathname === '/api/blog_delete') {
                // 删除文章-----------------------------------------------------------------
                service.del({
                    id: data.id
                }).then(result => {
                    const sendData = Object.assign({}, config.successData, {
                        msg: "成功删除文章",
                        data: {
                            id: data.id
                        }
                    });
                    res.end(JSON.stringify(sendData))
                }).catch(err => {
                    res.end(JSON.stringify(config.failData))
                })
            } else if (parse.pathname === '/api/blog_update') {
                // 更新文章 ---------------------------------------------------------------------
                service.update(data, {
                    id: data.id
                }).then(result => {
                    const sendData = Object.assign({}, config.successData, {
                        msg: "成功修改文章",
                        data: {
                            id: data.id
                        }
                    });
                    res.end(JSON.stringify(sendData))
                }).catch(err => {
                    res.end(JSON.stringify(config.failData))
                })
            }
        })
    }
}


module.exports = BlogController;