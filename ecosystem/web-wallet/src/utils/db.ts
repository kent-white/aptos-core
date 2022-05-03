// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import { AptosAccountObject } from 'aptos'

const DB_NAME = 'aptos_account_a'
const DB_ACCOUNTS_OBJECT = 'accounts'

export function testdb () {
  console.log('started')
  const open = indexedDB.open(DB_NAME, 1)

  // Creation
  open.onupgradeneeded = function () {
    console.log('creation')
    const db = open.result
    db.createObjectStore(DB_ACCOUNTS_OBJECT, { keyPath: 'account_index' })
  }

  open.onsuccess = function () {
    console.log('transaction')
    // start transaction
    const db = open.result
    const transaction = db.transaction(DB_ACCOUNTS_OBJECT, 'readwrite')
    const store = transaction.objectStore(DB_ACCOUNTS_OBJECT)

    // Add some data
    store.put({ account_index: 0, account: 'test' })

    // getter
    const getAccount = store.get(0)

    getAccount.onsuccess = function () {
      console.log(getAccount.result)
    }

    // Close the db when the transaction is done
    transaction.oncomplete = function () {
      console.log('closing')
      db.close()
    }
  }
}

// function connect () {
//   return new Promise((resolve, reject) => {
//     const open = indexedDB.open(DB_NAME, 1)
//     open.onupgradeneeded = () => {
//       const db = open.result
//       db.createObjectStore(DB_ACCOUNTS_OBJECT, { keyPath: 'account_index' })
//     }
//     open.onsuccess = () => resolve(open.result)
//     open.onerror = () => reject(open.error)
//     open.onblocked = () => console.warn('pending till unblocked')
//   });
// }

// async function putCurrentAccount (account: AptosAccountObject) {
//   let db = await connect()
//   const transaction = db.transaction(DB_ACCOUNTS_OBJECT, 'readwrite')
//   const store = transaction.objectStore(DB_ACCOUNTS_OBJECT)
// }

// function getCurrentAccount () {

// }

// function removeCurrentAccount () {

// }
