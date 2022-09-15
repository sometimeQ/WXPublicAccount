const sessionCache = {
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue))
        }
    },
    getJSON(key) {
        const value = this.get(key)
        if (value != null) {
            return JSON.parse(value)
        }
    }
}
export default {
    /**
     * 会话级缓存
     */
    session: sessionCache,

}
