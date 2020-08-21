import { Tabcast } from '../src';

describe('Tabcast', () => {
  it('broadcasts messages', () => {
    const tabcast = new Tabcast();
    const setItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
    tabcast.broadcast('Hello world!');

    expect(setItem).toBeCalledWith('___tabcast', '"Hello world!"');
  });

  it('receives messages', () => {
    const tabcast = new Tabcast();
    const fn = jest.fn();
    tabcast.on('message', fn);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: '___tabcast',
        newValue: '"Hello world!"',
      })
    );

    expect(fn).toBeCalledWith('Hello world!');
  });

  it('broadcasts messages in a named channel', () => {
    const tabcast = new Tabcast('channel');
    const setItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
    tabcast.broadcast('Hello world!');

    expect(setItem).toBeCalledWith('___tabcast_channel', '"Hello world!"');
  });

  it('receives messages from a named channel', () => {
    const tabcast = new Tabcast('channel');
    const fn = jest.fn();
    tabcast.on('message', fn);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: '___tabcast_channel',
        newValue: '"Hello world!"',
      })
    );

    expect(fn).toBeCalledWith('Hello world!');
  });
});
