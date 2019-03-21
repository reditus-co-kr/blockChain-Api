let users = [
    {
      id: 1,
      name: 'alice'
    },
    {
      id: 2,
      name: 'bek'
    },
    {
      id: 3,
      name: 'chris'
    }
]

function getUser(userId){ 
    return users.filter(users => users.id === userId)[0];
}

function findIndex(userId){
  return users.findIndex(users => users.id === userId);
}

module.exports.users = users;
module.exports.getUser = getUser;
module.exports.findIndex = findIndex;
