import * as bs58 from 'bs58';
import { Network } from 'src/common/common.enum';
import * as nacl from 'tweetnacl';

export const verifyMessage = (
  network: Network,
  message: string,
  signature: string,
  walletAddress: string,
): boolean => {
  let result = false;
  switch (network) {
    case Network.SOLANA:
      result = nacl.sign.detached.verify(
        new TextEncoder().encode(message),
        bs58.decode(signature),
        bs58.decode(walletAddress),
      );
      break;
    default:
      throw new Error('Unsupported network');
      break;
  }
  return result;
};
