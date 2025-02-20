/**
 * SetStateInternal<T> 是一个类型定义，表示一个函数类型，用于更新状态。
 * 它可以接受以下几种参数：
 * 
 * 1. `partial: T` - 一个完整的状态对象。
 * 2. `Partial<T>` - 一个部分状态对象，允许只更新状态的一部分。
 * 3. `{_(state: T): T | Partial<T>}["_"]` - 一个函数，该函数接收当前状态并返回新的状态或部分状态。
 * 
 * 这个类型定义的目的是提供灵活的状态更新方式，使得在更新状态时可以选择性地更新整个状态或仅更新部分状态。
 * 
 * 通过这种方式，开发者可以更方便地管理和更新应用程序的状态，确保状态的不可变性和一致性。
 */

type SetStateInternal<T> = {
  _(
    partial: T | Partial<T> | {_(state: T): T | Partial<T>}["_"],
    replace?: boolean | undefined
  ): void;
}["_"];

type SetStateInternal3<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;


export interface StoreApi<T> {
  getState: () => T;
  // 修改状态
  setState: SetStateInternal<T>;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
  destroy: () => void;
}

export type StateCreator<T> = (
  setState: StoreApi<T>["setState"],
  getState: StoreApi<T>["getState"],
  store: StoreApi<T>
) => T;

type CreateStore = {
  <T>(createState: StateCreator<T>): StoreApi<T>;
  <T>(): (createState: StateCreator<T>) => StoreApi<T>;
};

/*
这段 TypeScript 代码定义了一个状态管理的 API，主要用于创建和管理状态。以下是各个部分的解释：

1. **SetStateInternal<T>**: 
   - 这是一个类型定义，表示一个函数类型，用于更新状态。它可以接受一个完整的状态对象、部分状态对象，或者一个函数，该函数接收当前状态并返回新的状态。

2. **StoreApi<T>**: 
   - 这是一个接口，定义了状态管理 API 的基本功能。它包含以下方法：
     - `getState`: 返回当前状态。
     - `setState`: 更新状态，使用 `SetStateInternal` 类型。
     - `subscribe`: 允许订阅状态变化的监听器。
     - `destroy`: 清理资源，通常用于取消订阅。

3. **StateCreator<T>**: 
   - 这是一个类型定义，表示一个函数，该函数用于创建状态。它接受三个参数：`setState`、`getState` 和 `store`，并返回状态对象。

4. **CreateStore**: 
   - 这是一个类型定义，表示一个函数，可以创建状态管理的实例。它可以接受一个 `StateCreator` 函数，或者不接受参数并返回一个函数。

5. **createStore**: 
   - 这是一个函数，接受一个 `createState` 函数并返回一个状态管理的 API。如果没有提供 `createState`，则返回一个创建状态的函数。

6. **createStoreImpl**: 
   - 这是一个实现 `CreateStoreImpl` 的函数，负责实际的状态管理逻辑。它维护状态、监听器，并提供状态更新和获取的功能。

整体上，这段代码提供了一个灵活的状态管理解决方案，允许开发者创建和管理应用程序的状态，同时支持订阅和更新机制。
*/


type CreateStoreImpl = <T>(createState: StateCreator<T>) => StoreApi<T>;

export const createStore = ((createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore;

export const createStoreImpl: CreateStoreImpl = (createState) => {
  type TState = ReturnType<typeof createState>;
  type Listener = (state: TState, prevState: TState) => void;

  let state: TState;
  const listeners: Set<Listener> = new Set();

  const setState: StoreApi<TState>["setState"] = (partial, replace) => {
    const nextState =
      typeof partial === "function"
        ? (partial as (state: TState) => TState)(state)
        : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state =
        replace ?? typeof nextState !== "object"
          ? (nextState as TState)
          : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState: StoreApi<TState>["getState"] = () => state;
  const subscribe: StoreApi<TState>["subscribe"] = (listener: Listener) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };
  const destroy: StoreApi<TState>["destroy"] = () => {
    listeners.clear();
  };
  const api = {
    getState,
    setState,
    destroy,
    subscribe,
  };
  state = createState(setState, getState, api);
  return api as any;
};

