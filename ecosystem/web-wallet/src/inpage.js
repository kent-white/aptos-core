// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

const extensionId = 'jmmhmakollmjgkjgnbeppkccgddmjnib'

import { getAptosAccountSharedStorage } from './utils/account'

class Web3 {
  account () {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get('account', function(data) {
        console.log('account ' + data.account)
        resolve(account)
      })
    })
    // const account = await getAptosAccountSharedStorage()
    // if (account.address) {
    //   return undefined
    // } else {
    //   return account.address().hex()
    // }
    // return new Promise(function (resolve, reject) {
    //   chrome.runtime.sendMessage(extensionId, { method: 'getAccountAddress' }, function (response) {
    //     if (response.address) {
    //       resolve(response.address)
    //     } else {
    //       reject(response.error ?? 'Error')
    //     }
    //     return true
    //   })
    // })
  }

  signTransaction (transaction, completion) {
    return new Promise(function (resolve, reject) {
      chrome.runtime.sendMessage(extensionId, { method: 'signTransaction', transaction }, function (response) {
        if (response.transaction) {
          resolve(response.transaction)
        } else {
          reject(response.error ?? 'Error')
        }
        return true
      })
    })
  }
}

window.aptos = new Web3()
