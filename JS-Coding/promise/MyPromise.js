class MyPromise {

  constructor(executor) {
    this.state = 'pending';
    this.thenPromiseResolve = () => { };
    this.thenPromiseReject = () => { };

    try {
      executor(this.resolveFunc.bind(this), this.rejectFunc.bind(this));
    } catch (e) {
      this.rejectFunc(e)
    }
  }

  resolveFunc(value) {

    if (this.state !== 'pending') return;
    this.state = 'fulfilled';

    queueMicrotask(() => {
      try {
        let onFulfilledResult = undefined
        if (this.onFulfilled !== undefined) {
          onFulfilledResult = this.onFulfilled(value);
        }

        if (onFulfilledResult instanceof MyPromise) {
          onFulfilledResult.then(this.thenPromiseResolve, this.thenPromiseReject);
        } else {
          this.thenPromiseResolve(onFulfilledResult)
        }

      } catch (e) {
        this.thenPromiseReject(e);
      }
    })
  }

  rejectFunc(value) {

    if (this.state !== 'pending') return;
    this.state = 'rejected';

    queueMicrotask(() => {
      try {
        let onRejectedResult = undefined

        if (this.onRejected !== undefined) {
          onRejectedResult = this.onRejected(value);

          if (onRejectedResult instanceof MyPromise) {
            onRejectedResult.then(this.thenPromiseResolve, this.thenPromiseReject);
          } else {
            this.thenPromiseResolve(onRejectedResult)
          }

        } else {
          this.thenPromiseReject(value)
        }

      } catch (e) {
        this.thenPromiseReject(e);
      }
    })
  }

  then(onFulfilled = undefined, onRejected = undefined) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;

    return new MyPromise((resolve, reject) => {
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}