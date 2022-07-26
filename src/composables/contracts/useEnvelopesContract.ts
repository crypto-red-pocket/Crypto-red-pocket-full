import { computed } from 'vue'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { currentAccount, provider } from '../useWallet'

import abi from '../../abi/pills.json'

const Contract = computed(() => {
  return new ethers.Contract(
    import.meta.env.VITE_ENVELOPES_CONTRACT,
    abi,
    provider.value instanceof Web3Provider && currentAccount.value
      ? provider.value.getSigner()
      : provider.value
  )
})


async function mint(
  // payableAmount: number, amount: number, coupon: object, couponType: number
) {
  const transaction =  await Contract.value
    .mint({ value: ethers.utils.parseEther(`0.0000001`) })
      
  return await transaction.wait();
}

export {
  // Contract,
  mint
}