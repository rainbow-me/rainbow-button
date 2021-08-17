export const SUPPORTED_METHODS = [
  "eth_sendTransaction", "personal_sign", "eth_signTypedData"
]

export const supportedMainChainsInfoEip155 = {
  'eip155:1': { name: "Ethereum Mainnet", color: '#0E76FD'},
  'eip155:10': { name: "Optimism", color: '#FF4040'},
  'eip155:137': { name: "Polygon", color: '#8247E5'},
  'eip155:42161': { name: "Arbitrum", color: '#2D374B'},
}

export const supportedMainChainsInfo = {
  '1': { name: "Ethereum", color: '#0E76FD', value: "ethereum", iconWidth: "20"},
  '10': { name: "Optimism", color: '#FF4040', value: "optimism", iconWidth: "42"},
  '137': { name: "Polygon", color: '#8247E5', value: "polygon", iconWidth: "42"},
  // '42161': { name: "Arbitrum", color: '#2D374B', value: "arbitrum", iconWidth: "42"},
}
