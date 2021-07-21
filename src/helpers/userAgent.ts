const userAgentIsMobile = (): boolean => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
        return true
    }
    return false
}

export { userAgentIsMobile }