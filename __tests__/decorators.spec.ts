import { debounce, throttle, once } from '../src';
jest.mock('lodash.debounce');
jest.mock('lodash.throttle');
import * as throttleFn from 'lodash.throttle';
import * as debounceFn from 'lodash.debounce';

jest.useFakeTimers();

describe('Decorators', () => {
  describe('debounce', function() {
    const func = function() {
      return 'called';
    };
    debounceFn['mockImplementation'](function() {
      return func;
    });
    class TestDebounce {
      @debounce(3000)
      method() {
        console.log('Debounce Worked!');
      }
    }
    it('should call debounce', function() {
      new TestDebounce().method();
      expect(debounceFn).toBeCalled();
      expect(debounceFn['mock'].calls[0][1]).toEqual(3000);
      expect(debounceFn['mock'].calls[0][2]).toEqual({});
    });
  });

  describe('throttle', function() {
    const func = function() {
      return 'called';
    };
    throttleFn['mockImplementation'](function() {
      return func;
    });
    class TestThrottle {
      @throttle(3000)
      method() {
        console.log('Throttle Worked!');
      }
    }
    it('should call throttle', function() {
      new TestThrottle().method();
      expect(throttleFn).toBeCalled();
      expect(throttleFn['mock'].calls[0][1]).toEqual(3000);
      expect(throttleFn['mock'].calls[0][2]).toEqual({});
    });
  });

  describe('once', function() {
    class TestOnce {
      @once
      method() {
        console.warn('Once Worked!');
      }
    }
    it('should call the method only once', function() {
      const instance = new TestOnce();
      const consoleSpy = jest.spyOn(console, 'warn');
      instance.method();
      instance.method();
      instance.method();
      expect(consoleSpy).toBeCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
  });
});
