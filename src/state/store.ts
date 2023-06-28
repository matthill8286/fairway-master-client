import { BehaviorSubject } from "rxjs";

interface State {
  [key: string]: any;
}

const initialState: State = {};

export const actionSubject = new BehaviorSubject<any>(null);
export const state = new BehaviorSubject<State>(initialState);

export const store = {
  getState: () => state.value,
  dispatch: (action: any) => actionSubject.next(action),
};

actionSubject.subscribe((action) => {
  Object.keys(store.getState()).forEach((reducerKey) => {
    const reducer = store.getState()[reducerKey];
    const newState = reducer(state.value[reducerKey], action);
    state.next({
      ...state.value,
      [reducerKey]: newState,
    });
  });
});

export function registerReducer(reducerKey: string, reducer: Function) {
  store.dispatch({ type: "@@INIT" });
  state.next({
    ...state.value,
    [reducerKey]: reducer(undefined, { type: "@@INIT" }),
  });
}
