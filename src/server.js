const grpc = require('grpc')

class Server {
    constructor(service){
        this.service = service
        this.grpc_server = new grpc.Server()
        this.auth = grpc.ServerCredentials.createInsecure()
        this.handlers = {}
    }

    auth(authMiddleware){
        this.auth = authMiddleware
    }

    on(fnName, handler){
        this.handlers[fnName] = handler
    }

    listen(port, callback = null){
        this.grpc_server.addService(this.service.service, this.handlers)
        this.grpc_server.bind(`localhost:${port}`, this.auth)
        this.grpc_server.start()
        if(typeof callback === 'function'){
            callback()
        }
    }
}
module.exports = function(service) {
    return new Server(service)
}