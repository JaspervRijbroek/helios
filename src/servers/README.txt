The idea of the servers is to parse the incoming information and make them useful for the handlers
This way you can have a single structure of the handlers and some utils and keeps the system small and upgradable.

Threading, each server will be started in its own thread, this makes it so that each thread will have a single responsibility,
however single threading will be a configuration option. Only enabled for debugging and bug-fixing.

The request coming into the server will dictate which handler is being called, so each server will trigger this by itself.