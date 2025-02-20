// simpleZustand.js
class SimpleZustand {
  constructor() {
      this.state = {};
      this.listeners = new Set();
  }

  // 设置初始状态
  setState(newState) {
      this.state = { ...this.state, ...newState };
      this.notify();
  }

  // 获取当前状态
  getState() {
      return this.state;
  }

  // 订阅状态变化
  subscribe(listener) {
      this.listeners.add(listener);
      // 返回一个取消订阅的函数
      return () => {
          this.listeners.delete(listener);
      };
  }

  // 通知所有订阅者
  notify() {
      this.listeners.forEach(listener => listener(this.state));
  }
}

// 创建一个实例
const createStore = () => new SimpleZustand();

// 使用示例
const store = createStore();

// 订阅状态变化
const unsubscribe = store.subscribe((state) => {
  console.log('State changed:', state);
});

// 设置初始状态
store.setState({ count: 0 });

// 更新状态
store.setState({ count: store.getState().count + 1 });

// 取消订阅
unsubscribe();