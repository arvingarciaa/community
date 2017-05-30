'use strict';var _express=require('express'),_express2=_interopRequireDefault(_express),_serveFavicon=require('serve-favicon'),_serveFavicon2=_interopRequireDefault(_serveFavicon),_path=require('path'),_path2=_interopRequireDefault(_path),_bodyParser=require('body-parser'),_bodyParser2=_interopRequireDefault(_bodyParser),_passport=require('passport'),_passport2=_interopRequireDefault(_passport),_coreServer=require('./config/core.server.app-config'),_coreServer2=_interopRequireDefault(_coreServer),_coreServer3=require('./config/core.server.db'),_coreServer4=_interopRequireDefault(_coreServer3),_coreServer5=require('./routes/core.server.routes'),_coreServer6=_interopRequireDefault(_coreServer5);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var app=(0,_express2.default)();app.use((0,_serveFavicon2.default)(_path2.default.join(__dirname+' /../../../client/core/assets','images','favicon.ico'))),app.use(_bodyParser2.default.json()),app.use(_passport2.default.initialize()),(0,_coreServer6.default)(app),app.use(_express2.default.static(__dirname+' /../../../public')),app.use(_express2.default.static(__dirname+' /../../../client')),app.use(_express2.default.static(__dirname+' /../../../uploads')),app.all('/*',function(a,b){b.sendFile(_path2.default.join(__dirname+'/../../../client/core/base-view/core-content.client.view.html'))}),app.listen(_coreServer2.default.port,function(){console.log('Server running on '+_coreServer2.default.host+':'+_coreServer2.default.port)});
//# sourceMappingURL=core.server.app.js.map