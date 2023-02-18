import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageEventHandler } from './app.event.handler';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { getHelloEvent } from './common/events/HelloEvent';

describe('AppController', () => {
  let appController: AppController;
  let eventEmitter: EventEmitter2;
  let spy: jest.SpyInstance;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      controllers: [AppController],
      providers: [AppService, MessageEventHandler],
    }).compile();

    appController = app.get<AppController>(AppController);
    eventEmitter = app.get<EventEmitter2>(EventEmitter2);
    spy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    spy.mockRestore();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should emit "get.hello" event with message "Hello World!"', () => {
      const message = 'Hello World!';
      const event = new getHelloEvent(message);

      // Set up a mock implementation for the emit method
      eventEmitter.emit = jest.fn();

      appController.getHello();

      // Assert that the emit method was called with the expected event and arguments
      expect(eventEmitter.emit).toHaveBeenCalledWith('get.hello', event);
    });

    it('should execute "get.hello" event handler with message "Hello World!"', async () => {
      const handler = jest.fn();
      eventEmitter.on('get.hello', handler);

      const message = 'Hello World!';
      const event = new getHelloEvent(message);

      appController.getHello();

      // Wait for the event loop to empty before asserting that the handler was called
      await new Promise(setImmediate);

      // Assert that the event handler was called with the expected arguments
      expect(handler).toHaveBeenCalledWith(event);
    });
  });
});
