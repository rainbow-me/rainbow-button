import WalletConnectClient from "@walletconnect/client"

/**
 * Go to rainbow app via deeplink
 */
export const goToRainbow = (): void => {
    window.location.href = 'https://rnbwapp.com/wc'
}
  
/**
 * Returns an array containing session topics, if any
 * 
 * @param client - WalletConnectClient
 * @returns - Session topics
 */
export const getClientPairings = (client: WalletConnectClient): string[] => {
    return client?.session?.topics || []
}
  