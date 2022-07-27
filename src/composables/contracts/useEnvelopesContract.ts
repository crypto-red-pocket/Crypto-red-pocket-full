import { computed } from 'vue'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { currentAccount, provider } from '../useWallet'

import { abi } from '../../abis/RedEnvelope.json'
import { RedEnvelope as address } from '../../../contract-addresses.json'

const Contract = computed(() => {
  return new ethers.Contract(
    address,
    abi,
    provider.value instanceof Web3Provider && currentAccount.value
      ? provider.value.getSigner()
      : provider.value
  )
})


async function createEnvelope(
  tokenAmount: string,
  participantsLimit: number,
  message: string
) {
  const transaction =  await Contract.value
    .createEnvelope(
      ethers.utils.parseEther(tokenAmount),
      participantsLimit,
      message,
      { value: ethers.utils.parseEther(tokenAmount) }
    )
      
  return await transaction.wait().then(res => console.log(res));
}

export {
  createEnvelope
}