import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalCompoennts: Record<string, any> = { SvgIcon }

export default {
    install(app: { component: (arg0: string, arg1: any) => void }) {
        Object.keys(allGlobalCompoennts).forEach(key => {
            app.component(key, allGlobalCompoennts[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}