'use strict'
/**
 * All the routes of the service related to blogPost
 */
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  /**
   * Create new post route
   */
  app.post('/post', options.validationMiddleware(options.joiSchema.blogPOST, 'body'), (req, res, next) => {
    repo.createPost(req.body.title, req.body.content, req.body.year).then(post => {
      res.status(status.OK).json({
        result: true
      });
    }).catch(next)
  });

  /**
   * Update post by id route
   */
  app.put('/post/:id', options.validationMiddleware(options.joiSchema.blogDETAIL, 'params'), options.validationMiddleware(options.joiSchema.blogPOST, 'body'), (req, res, next) => {
    repo.updatePostById(req.params.id, req.body.title, req.body.content, req.body.year).then(post => {
      res.status(status.OK).json({
        result: true
      });
    }).catch(next)
  });

  /**
   * Get post by id
   */
  app.get('/post/:id', options.validationMiddleware(options.joiSchema.blogDETAIL, 'params'), (req, res, next) => {
    repo.getPostById(req.params.id).then(post => {
      res.status(status.OK).json({
        result: true,
        post
      });
    }).catch(next)
  });

  /**
   * Get list of post
   */
  app.get('/posts', options.validationMiddleware(options.joiSchema.blogLIST, 'query'), (req, res, next) => {
    repo.getAllPosts((req.query.page-1)*req.query.pageSize, Number(req.query.pageSize)).then(posts => {
      res.status(status.OK).json({
        result: true,
        posts
      });
    }).catch(next)
  });
}