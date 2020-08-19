import { Tabcast } from '../src';

describe('Tabcast', () => {
  it('broadcasts messages', () => {
    const tabcast = new Tabcast();
    tabcast.broadcast('Hello world!');

    expect(localStorage.getItem('___tabcast')).toEqual('"Hello world!"');
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
});
