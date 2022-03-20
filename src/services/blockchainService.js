class BlockchainService {
  static createCampaign = async (contract, provider, endTime) => {
    const tx = await contract.newFunding(endTime);

    if (!tx) {
      return;
    }

    return provider.waitForTransaction(tx.hash)
      .then((data) => {
        return data;
      })
  }
}
