'use strict'

/**
 * This file deal with the database and contain all the functions for CRUD for DB
 */
const ObjectID = require('mongodb').ObjectID;

const repository = (db) => {
  const collection = db.collection('blogpost')

  /**
   * 
   * @param title title of the post
   * @param content content of the post
   * @param year year of the post
   */
  const createPost = (title, content, year) => {
    return new Promise((resolve, reject)=>{
      collection.insert({title, content, year}, (err, doc)=>{
        if(err) reject(err);
        resolve(doc);
      });
    });
  }

  /**
   * 
   * @param id id of the post
   * @param title title of the post
   * @param content content of the post
   * @param year year of the post
   */
  const updatePostById = (id, title, content, year) => {
    return new Promise((resolve, reject)=>{
      collection.update({_id: ObjectID(id)},{$set: {title, content, year}}, (err, doc)=>{
        if(err) reject(err);
        resolve(doc);
      });
    });
  }

  /**
   * 
   * @param id id of the post
   */
  const getPostById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 1, title: 1, content: 1}
      const sendPost = (err, post) => {
        if (err) {
          reject(new Error(`An error occured fetching a post with id: ${id}, err: ${err}`))
        }
        resolve(post)
      }
      collection.findOne({_id: ObjectID(id)}, projection, sendPost);
    })
  }

  /**
   * 
   * @param skip number of records to skip or offset from where we need to pick record
   * @param size size of records how many records we want to pick
   */
  const getAllPosts = (skip, size) => {
    return new Promise((resolve, reject) => {
      const posts = []
      const cursor = collection.find({}).project({_id: true,title:true}).sort({_id: -1}).skip(skip).limit(size);
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

  /**
   * Disconnect the repo connect
   */
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

/**
 * 
 * @param connection connection with db 
 */
const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})