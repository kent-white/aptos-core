// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0


chrome.storage.sync.get('account', function(data) {
  console.log('account ' + data.account)
})
// function injectScript () {
//   try {
//     const container = document.head || document.documentElement
//     const scriptTag = document.createElement('script')
//     scriptTag.src = chrome.runtime.getURL('inpage.js')
//     container.insertBefore(scriptTag, container.children[0])
//     container.removeChild(scriptTag)
//   } catch (error) {
//     console.error('Aptos injection failed.', error)
//   }
// }

// injectScript()

// const extensionId = 'jmmhmakollmjgkjgnbeppkccgddmjnib'

// class Web3 {
//   account () {
//     return new Promise(function (resolve, reject) {
//       chrome.storage.sync.get('account', function(data) {
//         console.log('account ' + data.account)
//         resolve(account)
//       })
//     })
//     // const account = await getAptosAccountSharedStorage()
//     // if (account.address) {
//     //   return undefined
//     // } else {
//     //   return account.address().hex()
//     // }
//     // return new Promise(function (resolve, reject) {
//     //   chrome.runtime.sendMessage(extensionId, { method: 'getAccountAddress' }, function (response) {
//     //     if (response.address) {
//     //       resolve(response.address)
//     //     } else {
//     //       reject(response.error ?? 'Error')
//     //     }
//     //     return true
//     //   })
//     // })
//   }

//   signTransaction (transaction, completion) {
//     return new Promise(function (resolve, reject) {
//       chrome.runtime.sendMessage(extensionId, { method: 'signTransaction', transaction }, function (response) {
//         if (response.transaction) {
//           resolve(response.transaction)
//         } else {
//           reject(response.error ?? 'Error')
//         }
//         return true
//       })
//     })
//   }
// }

// window.aptos = new Web3()

