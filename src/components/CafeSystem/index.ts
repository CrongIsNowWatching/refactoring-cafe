type notifyPayload = {
  action: string;
  payload: {
    id: number;
    name: string;
    status: "ready" | "making" | "done";
  } | null;
};

type callbackPayload = {
  action: string;
  callback: Function;
};

class MySystem {
  actions: callbackPayload[];

  constructor() {
    this.actions = [];
  }

  execute({ action, payload = null }: notifyPayload): void {
    this.actions.forEach(({ action: actionName, callback }) => {
      if (actionName === action ) {
        // if (action === "makeCoffee" || action === "doneMenu") {
          // callback(payload)
        // } else {
          payload ? callback(payload) : callback();
        // }
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
    return payload.action && payload.callback ? true : false;
  }

  private subscribe(payload: callbackPayload) {
    this.actions.push(payload);
  }

  private unsubscribe(action: string) {
    this.actions = this.actions.filter(
      ({ action: actionName }) => actionName !== action
    );
  }
}

const CafeSystem = new MySystem();
export default CafeSystem;