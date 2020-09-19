'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  // app.post('/post', options.validationMiddleware(options.joiSchema.blogPOST, 'body'), (req, res, next) => {
  //   repo.createPost(req.body.title, req.body.content, req.body.year).then(post => {
  //     res.status(status.OK).json({
  //       result: true
  //     });
  //   }).catch(next)
  // });

  // app.put('/post/:id', options.validationMiddleware(options.joiSchema.blogPOST, 'param'), options.validationMiddleware(options.joiSchema.blogPOST, 'body'), (req, res, next) => {
  //   repo.updatePostById(req.param.id, req.body.title, req.body.content, req.body.year).then(post => {
  //     res.status(status.OK).json({
  //       result: true
  //     });
  //   }).catch(next)
  // });

  app.get('/post/:id', options.validationMiddleware(options.joiSchema.blogDETAIL, 'params'), (req, res, next) => {
    repo.getPostById(req.param.id).then(post => {
      res.status(status.OK).json({
        result: true,
        post
      });
    }).catch(next)
  });

  // app.get('/posts', options.validationMiddleware(options.joiSchema.blogLIST, 'query'), (req, res, next) => {
  //   repo.getAllPosts(req.query.page, req.query.pageSize).then(posts => {
  //     res.status(status.OK).json({
  //       result: true,
  //       posts
  //     });
  //   }).catch(next)
  // });
}