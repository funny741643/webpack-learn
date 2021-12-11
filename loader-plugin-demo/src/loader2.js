// 异步loader
module.exports = function (source) {
    const callback = this.async()

    /**
     * 参数一： error，这里设置为null
     * 参数二： 处理完后的源码
     */
    setTimeout(() => {
        callback(null, `${source.replace(/;/g, '')}`)
    }, 3000)
}