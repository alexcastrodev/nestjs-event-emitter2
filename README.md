# NestJS Events Sample Application

This is a sample NestJS application that demonstrates how to use the built-in EventEmitter2 module to emit and handle events.

# Installation
To install the application and its dependencies, run:

```bash
npm install
````

Starting the Application
To start the application, run:

```bash
npm start:dev
```

# Instalation with Docker

```bash
docker run --rm -v ${PWD}:/app -w /app node:18-alpine yarn
```

```bash
docker-compose up -d
```

This will start the application in development mode. You can then access the application at http://localhost:3000.

# How it Works

This application has a single route (/) that returns a simple JSON response. However, before returning the response, it emits a get.hello event that is handled by an event handler. The event handler simply logs a message to the console after a delay of eight seconds.

Here's how the application works:

When you visit http://localhost:3000, the AppController class is invoked to handle the request.

The AppService class is injected into the AppController constructor.

The getHello method of the AppService class is called. This method simply returns a JSON object with a "message" property set to "Hello, world!".

Before returning the response, the getHello method emits a get.hello event using the EventEmitter2 instance that is injected into the AppService constructor.

The EventEmitter2 instance is also injected into the AppEventHandler class.

The handleGetHello method of the AppEventHandler class is decorated with @OnEvent('get.hello'). This means that the method will be called whenever a get.hello event is emitted.

The handleGetHello method simply logs a message to the console after a delay of eight seconds.

The JSON response is returned to the client.

# Testing

To test the application, run:

```bash
npm test
```

This will run the Jest test suite, which includes tests for the AppController, AppService, and AppEventHandler classes.


# Conclusion

This sample NestJS application demonstrates how to use the EventEmitter2 module to emit and handle events in a NestJS application. By emitting events, you can separate concerns and create more modular, reusable code.
