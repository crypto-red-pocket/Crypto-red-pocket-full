import { computed } from 'vue'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { currentAccount, provider } from '../useWallet'

import abi from '../../abis/alerts.json'

const Contract = computed(() => {
  return new ethers.Contract(
    import.meta.env.VITE_ALERTS_CONTRACT,
    abi,
    provider.value instanceof Web3Provider && currentAccount.value
      ? provider.value.getSigner()
      : provider.value
  )
})

async function submitReport(
  name: string,
  composition: string,
  location: string,
  comment: string
) {
  const transaction = await Contract.value
    .createAlert(name, composition, location, comment, Date.now())
  return await transaction.wait();
}

async function isChecker( address: string ) {
  return await Contract.value.isChecker(address)
}

export {
  isChecker,
  submitReport
}