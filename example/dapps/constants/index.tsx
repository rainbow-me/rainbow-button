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
  '1': { name: "Ethereum Mainnet", color: '#0E76FD'},
  '10': { name: "Optimism", color: '#FF4040'},
  '137': { name: "Polygon", color: '#8247E5'},
  '42161': { name: "Arbitrum", color: '#2D374B'},
}