// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosClient } from 'aptos'
import { DEVNET_NODE_URL } from './core/constants'
import { MessageMethod } from './core/types'
import { getAptosAccountState } from './core/utils/account'
import { showPopup } from './notification/notification-manager'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const account = getAptosAccountState()
  if (account === undefined) {
    sendResponse({ error: 'No Accounts' })
    return
  }
  switch (request.method) {
    case MessageMethod.GET_ACCOUNT_ADDRESS:
      getAccountAddress(account, sendResponse)
      break
    case MessageMethod.SIGN_TRANSACTION:
      signTransaction(account, request.transaction, sendResponse)
      break
    default:
      throw new Error(request.method + ' method is not supported')
  }
  return true
})

function getAccountAddress (account, sendResponse) {
  if (account.address()) {
    sendResponse({ address: account.address().hex() })
  } else {
    sendResponse({ error: 'No accounts signed in' })
  }
}

const NOTIFICATION_HEIGHT = 620;
const NOTIFICATION_WIDTH = 360;

async function signTransaction (account, transaction, sendResponse) {
  try {
    const left = 0;
    const top = 0;
    // create new notification popup
    await chrome.windows.create({
      height: NOTIFICATION_HEIGHT,
      left,
      top,
      type: 'popup',
      url: 'notification.html',
      width: NOTIFICATION_WIDTH,
    });
    sendResponse('test')
    // const client = new AptosClient(DEVNET_NODE_URL)
    // const address = account.address()
    // const txn = await client.generateTransaction(address, transaction)
    // const signedTxn = await client.signTransaction(account, txn)
    // const response = await client.submitTransaction(account, signedTxn)
    // sendResponse(response)
  } catch (error) {
    sendResponse({ error })
  }
}
