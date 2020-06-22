const db = require('./db-connect')
const JWT = require('jsonwebtoken');
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
  let response = usersRef.add(user)
  .then(ref => {
    console.log(ref);

    const token = createToken(user.userName)

    let userAuth = {
      token,
      userId: ref.id
    }
  
    return userAuth
  })
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
        return userLogin(snapshot, password)
      }
    }).catch(err => {
      throw Error(err.message)
    })
}

// Search database for users
exports.searchUsernames = (userName) => {
  
  let usersRef = db.db.collection('users');
  let userQuery = usersRef.orderBy('userName').startAt(userName).endAt(userName + '~').get()
  .then(snapshot => {
    if(snapshot.empty) {
      return false
    }
    else {
      let users = []

      snapshot.forEach(doc => {
        let data = doc.data() 
        let user = {}
        user['name'] = data.userName
        user['id'] = doc.id
        users.push(user)
      });
      
      return users
    }

  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  
  return userQuery
}

const comparePassword = async (hash, password) => {
  const compareRes = await bcrypt.compare(password, hash)
  return compareRes
}

const userLogin = async (snapshot, enteredPassword) => {
  let message = {}
  await snapshot.forEach( doc => {
    const data = doc.data()
    const  {userName, password} = data
    
    const passwordRes = comparePassword(password, enteredPassword)
    
    message = passwordRes.then(newData => {
      if(newData) {

        const token = createToken(userName)
        
        return {
          message: 'Login Sucessful!',
          token: token,
          userId: doc.id,
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

const createToken = userName => {
  return JWT.sign({userName}, process.env.JSON_SECRET)
}