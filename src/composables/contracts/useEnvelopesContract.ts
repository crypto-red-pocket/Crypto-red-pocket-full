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
  participantsLimit: number,
  message: string,
  creatorNickname: string,
  tokenAmount: string,
) {
  const transaction =  await Contract.value
    .createEnvelope(
      participantsLimit,
      message,
      creatorNickname,
      { value: ethers.utils.parseEther(tokenAmount) }
    )
      
  return await transaction.wait().then(res => console.log(res));
}

async function participate(
  envelopeId: string,
) {
  const transaction =  await Contract.value
    .claim(envelopeId)
      
  return await transaction.wait().then(res => console.log(res));
}

async function getEnvelopeById(
  envelopeId: string,
) {
  return  await Contract.value
    .getEnvelope(envelopeId)
}

async function getEnvelopesByAddress(
  address: string,
) {
  return  await Contract.value
    .getCreatorEnvelopes(address)
}

export {
  createEnvelope,
  getEnvelopeById,
  participate,
  getEnvelopesByAddress
}