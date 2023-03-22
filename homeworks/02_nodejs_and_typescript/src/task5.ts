/**
 * Write your own implementation of EventEmitter class (Publisher/Subscriber).
 */

 type EventCallback = (...args: any[]) => void;

class MyEventEmitter {
    private listeners: { [key: string]: EventCallback[] } = {};

    public registerHandler(event: string, callback: EventCallback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    public emitEvent(event: string, ...args: any[]): void {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(callback => callback(...args));
    }
}

 const emitter = new MyEventEmitter();

 emitter.registerHandler('usedUpdated', () => console.log('User was updated'));
 
 emitter.emitEvent('usedUpdated'); // User was updated