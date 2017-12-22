const grpc = require('grpc');
const server = require('./src/server.js')
//const client = require('./src/client.js')

const findPackages = (protoFile) => {
    var packages = {}
    for(var package in protoFile) {
        var services = {}
        for(var service in protoFile[package]){
            services[service] = { 
                createServer: () => { return server(protoFile[package][service]) }
            }
        }
        packages[package] = services
    }
    return packages;
}
module.exports = (protoFilePath) => {
    var protoFile = grpc.load(protoFilePath)
    return findPackages(protoFile)
}