import { TabcastEvents, TabcastMessageEventListener } from './events';

const localStorageItem = '___tabcast';

export class Tabcast<T> {
  private events: TabcastEvents<T> = {
    message: new Set(),
  };

  constructor(private channel?: string) {
    window.addEventListener('storage', e => this.handleStorage(e));
  }

  broadcast(message: T): void {
    localStorage.setItem(this.itemName, JSON.stringify(message));
    localStorage.removeItem(this.itemName);
  }

  /**
   * Adds a listener for a message event.
   * @param eventType Event type. (message)
   * @param listener Listener function.
   */
  on(eventType: 'message', listener: TabcastMessageEventListener<T>): void;

  /**
   * Adds a listener for a given event.
   * @param eventType Event type.
   * @param listener Listener function.
   */
  on(eventType: keyof TabcastEvents<T>, listener: Function): void {
    this.events[eventType].add(listener as any);
  }

  /**
   * Removes a listener for a message event.
   * @param eventType Event type. (message)
   * @param listener Listener function.
   */
  off(eventType: 'message', listener: TabcastMessageEventListener<T>): void;

  /**
   * Removes a listener for a given event.
   * @param eventType Event type.
   * @param listener Listener function.
   */
  off(eventType: keyof TabcastEvents<T>, listener: Function): void {
    this.events[eventType].delete(listener as any);
  }

  private get itemName() {
    return localStorageItem + (this.channel ? '_' + this.channel : '');
  }

  private emit(eventType: keyof TabcastEvents<T>, ...args: any[]) {
    for (const listener of this.events[eventType]) {
      (listener as Function).apply(this, args);
    }
  }

  private handleStorage(e: StorageEvent) {
    if (e.key !== this.itemName || !e.newValue) {
      return;
    }

    try {
      const data = JSON.parse(e.newValue);
      this.emit('message', data);
    } catch {}
  }
}
