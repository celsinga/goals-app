import Web3 from 'web3';

let web3: Web3;

export async function init(): Promise<string[]> {

  web3 = new Web3(process.env.NODE_ENV === 'production' ? Web3.givenProvider : 'ws://localhost:7545');
  return await web3.eth.personal.getAccounts();
}
