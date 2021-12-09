type notifyPayload = {
  action: string;
};

type callbackPayload = {
  actionName: string;
  callback: Function;
};

class MySystem {
  actions: callbackPayload[];

  constructor() {
    this.actions = [];
  }

  execute({ action }: notifyPayload): void {
    this.actions.forEach(({ actionName, callback }) => {
      if (actionName === action) {
        callback();
      }
    });
  }

  // https://radlohead.gitbook.io/typescript-deep-dive/type-system/exceptions#throw
  register(payload: callbackPayload): void | Error {
    if (this.validate(payload)) this.subscribe(payload);
    else return new Error("등록할 수 없는 작업입니다.");
  }
  remove(action: string) {
    this.unsubscribe(action);
  }

  private validate(payload: callbackPayload): boolean {
    return payload.actionName && payload.callback ? true : false;
  }

  private subscribe(payload: callbackPayload) {
    this.actions.push(payload);
  }

  private unsubscribe(action: string) {
    this.actions = this.actions.filter(
      ({ actionName }) => actionName !== action
    );
  }
}
