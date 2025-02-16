//使用zustand 实现状态管理
import {create} from "zustand";

const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({count: state.count + 1})),
    decrement: () => set((state) => ({count: state.count - 1})),
}))

const ZustandPage = () => {
    const {count, increment, decrement} = useStore();
    return (
        <div>
            <h3>ZustandPage</h3>
            <button onClick={increment}>add {count}</button>
            <button onClick={decrement}>decrement {count}</button>
        </div>
    )
}

export default ZustandPage;