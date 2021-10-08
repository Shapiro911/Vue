export default {
    install(Vue) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.prototype.$contextMenu = {
            show() {
                console.log('kek')
            },
            hide() {

            }
        }
    }
}