const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const authSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin:{
    type: Boolean,
    default: true,
  }
});

const User = mongoose.model('user', authSchema);

exports.createNewUser = (username,email,password) => {
  return new Promise((resolve, reject) => {
    User.findOne({email: email})
      .then(user => {
        if(user){
            reject('email is already in use')
        } else {
            return bcrypt.hash(password,10)
        }
      }).then(hashedPassword => {
        let user = new User({
            username: username,
            email:email,
            password: hashedPassword,

        })
        return user.save()
      }).then(()=>{
        resolve()
      })
      .catch(err => reject(err));
  });
};

exports.login = (email,password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then(user => {
        if(!user){
            reject('email not found')
        } else {
            // this return boolean value this compare between the value that you pass and the value in data 
            bcrypt.compare(password, user.password).then((same) => {
            if(!same){
                reject('password is not correct')
            } else {
                resolve({
                  id:user._id,
                  isAdmin:user.isAdmin
                })
            }
          })
         }
      }).catch(err => reject(err));
  })
};

exports.getUserByEmail = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .then(user => {
        if (!user) {
          reject('Email not found');
        } else {
          resolve(user);
        }
      })
      .catch(err => reject(err));
  });
};

