import { ethers } from "ethers";
import { abi } from '../assets/abis/Fund.json';
import { toastHandler, TOAST_STATES } from "../helpers/toast";
class BlockchainService {
  static createCampaign = async (endTime, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const contract = new ethers.Contract(process.env.REACT_APP_FUND_CONTRACT_ADDRESS, abi, provider.getSigner(address).connectUnchecked())

    const tx = await contract.newFunding(endTime).catch(err => {
      toastHandler({ success: TOAST_STATES.ERROR, message: err.message })
    });

    if (!tx) {
      return
    }

    return provider.waitForTransaction(tx.hash)
      .then((data) => {
        const event = contract.interface.parseLog(data.logs[0])
        return event.args.id.toNumber();
      })
  }
}

export default BlockchainService;