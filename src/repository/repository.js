'use strict'

const ObjectID = require('mongodb').ObjectID;

const repository = (db) => {
  const collection = db.collection('blogpost')

  const createPost = (title, content, year) => {
    return new Promise((resolve, reject)=>{
      collection.insert({title, content, year}, (err, doc)=>{
        if(err) reject(err);
        resolve(doc);
      });
    });
  }

  const updatePostById = (id, title, content, year) => {
    return new Promise((resolve, reject)=>{
      collection.update({_id: ObjectID(id)},{$set: {title, content, year}}, (err, doc)=>{
        if(err) reject(err);
        resolve(doc);
      });
    });
  }

  const getPostById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, title: 1, content: 1, year: 1 }
      const sendPost = (err, post) => {
        if (err) {
          reject(new Error(`An error occured fetching a post with id: ${id}, err: ${err}`))
        }
        resolve(post)
      }
      collection.findOne({_id: ObjectId(id)}, projection, sendPost);
    })
  }

  const getAllPosts = () => {
    return new Promise((resolve, reject) => {
      const posts = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addPost = (post) => {
        posts.push(post)
      }
      const sendPosts = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all posts, err:' + err))
        }
        resolve(posts.slice())
      }
      cursor.forEach(addPost, sendPosts)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    createPost,
    updatePostById,
    getPostById,
    getAllPosts,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})