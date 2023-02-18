import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getHelloEvent } from './common/events/HelloEvent';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}

  getHello(): string {
    const message = 'Hello World!';
    const event = new getHelloEvent(message);

    this.eventEmitter.emit('get.hello', event);
    return message;
  }
}
