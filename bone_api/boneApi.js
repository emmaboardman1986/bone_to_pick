// this will contain restful routes
var BoneApi = function(app){
  var bones = require('../client/src/models/bones')();

  var Bone= require('../client/src/models/bone');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


}

module.exports = BoneApi;