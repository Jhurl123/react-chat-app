const db = require('./db-connect')
const bcrypt = require('bcrypt');

exports.hashPassword = async password => {
  
  const saltRounds = 10;
  const hashPassword = async () => {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }
  
  return hashPassword()
}

// Check to see if a username already exists
exports.checkForUsername = userName => {

  let usersRef = db.db.collection('users');
  let userQuery = usersRef.where('userName', '==', userName).get()
  .then(snapshot => {
    if(snapshot.empty) {
      return false
    }
    else {
      console.log("The user has been found in the database");
      return true
    }

  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  
  return userQuery
}

// Insert the user into the database after validation
exports.insertUser = user => {
  let usersRef = db.db.collection('users');
  let response = usersRef.doc().set(user)
  .then(() => true)
  .catch(err => {
    console.log(err);
    
    throw Error(err)
  })

  return response
}

// Ensure given password belongs to username entered
exports.verifyCredentials = (userName, password) => {
  let usersRef = db.db.collection('users');
  return usersRef.where('userName', '==', userName).get()
    .then(snapshot => {

      if(snapshot.empty) {
        return {
          message: 'Could not find a user with that username!',
          passed: false
        }
      }
      else {
        return checkData(snapshot, password)
      }
    }).catch(err => {
      throw Error(err.message)
    })
}

const comparePassword = async (hash, password) => {
  const compareRes = await bcrypt.compare(password, hash)
  return compareRes
}

const checkData = async (snapshot, password) => {
  let message = {}
  await snapshot.forEach( doc => {
    const data = doc.data()
    console.log(doc.id);
    
    const passwordRes = comparePassword(data.password, password)
    
    message = passwordRes.then(newData => {
      if(newData) {
        return {
          message: 'Login Sucessful!',
          userID: doc.id,
          passed: true
        }
      }
      else { 
        return {
          message: 'Password doesn\'t match the one attached to this username',
          passed: false
        }
      }
    })

    
  })

  return message
}