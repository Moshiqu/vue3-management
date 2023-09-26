import { createPinia } from "pinia";

const pinia = createPinia()
// 自定义方法reset 
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$state = initialState
    };
});

export default pinia