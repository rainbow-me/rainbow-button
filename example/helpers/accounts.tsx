
export async function formatTestTransaction(account: string) {
    const [address, chainId] = account.split("@");

    // gasLimit
    const gasLimit = '0x5208'
  
    // value
    const value = '0x0'
  
    const tx = { from: address, to: address, data: "0x", gasLimit, value };
  
    return tx;
  }