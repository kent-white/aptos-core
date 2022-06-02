// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { FaFaucet } from 'react-icons/fa';
import useWalletState from 'core/hooks/useWalletState';
import { fundAccountWithFaucet } from 'core/queries/faucet';
import { useMutation, useQueryClient } from 'react-query';
import { AptosClient, Types } from 'aptos';

export default function Faucet() {
  const { aptosAccount } = useWalletState();
  const queryClient = useQueryClient();
  const {
    isLoading: isFaucetLoading,
    mutateAsync: fundWithFaucet,
  } = useMutation(fundAccountWithFaucet, {
    onSettled: () => {
      queryClient.invalidateQueries('getAccountResources');
    },
  });

  const address = aptosAccount?.address().hex();

  const faucetOnClick = async () => {
    await (window as any).aptos.account().then(async (address1: string) => {
      const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');
      const payload: Types.TransactionPayload = {
        arguments: ['D8258F93317CD7F608DD2D025A11DC5734F98E8358BA71FF74A327834E0844AF', '717'],
        function: '0x1::TestCoin::transfer',
        type: 'script_function_payload',
        type_arguments: [],
      };
      const transaction = await client.generateTransaction(address1, payload);
      const response = await (window as any).aptos.signAndSubmitTransaction(transaction);
      console.log(response);
      const transactionRes = await client.submitTransaction(response);
      console.log(transactionRes);
    });
    if (address) {
      await fundWithFaucet({ address });
    }
  };

  return (
    <Button
      isLoading={isFaucetLoading}
      leftIcon={<FaFaucet />}
      onClick={faucetOnClick}
      isDisabled={isFaucetLoading}
    >
      Faucet
    </Button>
  );
}
