import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { getHelloEvent } from './common/events/HelloEvent';

@Injectable()
export class MessageEventHandler {
  @OnEvent('get.hello')
  handleMessageCreated(event: getHelloEvent) {
    setTimeout(() => {
      console.log(`message is: ${event.message}`);
    }, 3000);
  }
}
