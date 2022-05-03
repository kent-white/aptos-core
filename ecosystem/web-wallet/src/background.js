// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosAccount, AptosClient, Types } from 'aptos'
import { devnetNodeUrl } from './constants'
import { MessageMethod } from './types'
import { getAptosAccountState } from './utils/account'

console.log('-1')
chrome.runtime.onMessageExternal.addListener(async function (request, _sender, sendResponse) {
  console.log('0')
  const account = getAptosAccountState()
  console.log('0.5')
  if (account === undefined) {
    sendResponse({ error: 'No Accounts' })
    return
  }
  console.log('0.6')
  switch (request.method) {
    case MessageMethod.GET_ACCOUNT_ADDRESS:
      console.log('0.7')
      getAccountAddress(account, sendResponse)
      break
    case MessageMethod.SIGN_TRANSACTION:
      signTransaction(account, request.transaction, sendResponse)
      break
    default:
      throw (request.method + ' method is not supported')
  }
})

function getAccountAddress (account, sendResponse) {
  console.log('1')
  if (account.address()) {
    console.log('2')
    sendResponse({ address: account.address().hex() })
  } else {
    sendResponse({ error: 'No accounts signed in' })
  }
}

async function signTransaction (account, transaction, sendResponse) {
  const client = new AptosClient(devnetNodeUrl)
  const message = await client.createSigningMessage(transaction)
  const signatureHex = account.signHexString(message.substring(2))
  const transactionSignature = {
    type: 'ed25519_signature',
    public_key: account.pubKey().hex(),
    signature: signatureHex.hex()
  }
  sendResponse({ transaction: { signature: transactionSignature, ...transaction } })
}
