import { ethers } from "ethers";
import Web3 from "web3";
import { abi as fundABI } from '../assets/abis/Fund.json';
import { abi as tokenABI } from '../assets/abis/Token.json';
import { toastHandler, TOAST_STATES } from "../helpers/toast";
class BlockchainService {
  static createCampaign = async (endTime, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const contract = new ethers.Contract(process.env.REACT_APP_FUND_CONTRACT_ADDRESS, fundABI, provider.getSigner(address).connectUnchecked())

    const tx = await contract.newFunding(endTime).catch(err => {
      toastHandler({ success: TOAST_STATES.ERROR, message: err.message })
    });

    if (!tx) {
      return
    }

    return provider.waitForTransaction(tx.hash)
      .then((data) => {
        const event = contract.interface.parseLog(data.logs[0])
        toastHandler({ success: TOAST_STATES.SUCCESS, message: 'Created project successfully' })

        return event.args.id.toNumber();
      })
  }

  static invest = async (id, amount, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const contract = new ethers.Contract(process.env.REACT_APP_FUND_CONTRACT_ADDRESS, fundABI, provider.getSigner(address).connectUnchecked())
    const token = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, tokenABI, provider.getSigner(address).connectUnchecked())

    const web3 = new Web3(Web3.givenProvider)
    amount = web3.utils.toWei(amount.toString())

    let tx = await token.approve(contract.address, amount)
    await tx.wait()

    tx = await contract.invest(id, amount).catch(err => {
      toastHandler({ success: TOAST_STATES.ERROR, message: err.message })
    });

    await tx.wait()

    toastHandler({ success: TOAST_STATES.SUCCESS, message: 'Successful investment' })
  }

  static getProjectData = async (id, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const contract = new ethers.Contract(process.env.REACT_APP_FUND_CONTRACT_ADDRESS, fundABI, provider.getSigner(address).connectUnchecked())

    return await contract.projects(id)
  }
}

export default BlockchainService;