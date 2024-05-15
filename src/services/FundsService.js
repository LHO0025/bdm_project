import { Web3Context } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { Web3 } from 'web3';
import { ABI } from "../resources/abi.js";

const web3 = new Web3(window.ethereum);
let contract = new web3.eth.Contract(ABI,'0x68E1cFB6fa1168132c8f1D5508abF0113F5D4672');
var accountAddress = ""

export function setAccountAddress(address) {
    accountAddress = address
}

export function getAccountAddress() {
    return accountAddress
}

export function getWeb3() {
    return web3
}

export function getFunds() {
    return contract.methods.getAllProjects().call()
}


export async function createFund(nickname, description, title, expirationDate, targetAmount) {
    const expDate = Math.floor(expirationDate)
    const _target = Math.floor(targetAmount)

    // const expDate = Math.floor((Date.now() / 1000) + 100)

    console.log(nickname, description, title, parseInt(expirationDate), parseInt(targetAmount), expDate)
    return contract.methods.createProject(nickname, description, title, expDate, _target).send({from: accountAddress})
}

export function contributeToFund(fundIndex, _wei) {
    return contract.methods.contributeToProject(fundIndex).send({
        from: accountAddress,
        value: _wei
    })
}

export function withdraw(fundIndex) {
    return contract.methods.withdrawMoney(fundIndex).send({
        from: accountAddress
    })
}

export function reclaim(fundIndex) {
    return contract.methods.reclaimMoney(fundIndex).send({
        from: accountAddress
    })
}
