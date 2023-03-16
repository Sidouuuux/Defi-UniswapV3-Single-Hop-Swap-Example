const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SingleSwap", function () {
  let accounts
  let contractSingleSwap
  let weth9
  let dai
  before(async () => {
    accounts = await ethers.getSigners()

    dai = await ethers.getContractAt("IERC20", DAI)
    weth9 = await ethers.getContractAt("IWETH", WETH9)

    const SingleSwap = await ethers.getContractFactory("SingleSwap")
    contractSingleSwap = await SingleSwap.deploy()
    await contractSingleSwap.deployed()
  })
  it("Should swapExactInputSingle", async function () {

    const amountIn = 10n ** 18n

    await weth9.connect(accounts[0]).deposit({ value: amountIn })
    await weth9.connect(accounts[0]).approve(contractSingleSwap.address, amountIn)
    await contractSingleSwap.swapExactInputSingle(amountIn)
  });

  it("Should swapExactOutputSingle", async function () {

    const wethAmountInMax = 10n ** 18n
    const daiAmountOut = 100n * 10n ** 18n

    await weth9.connect(accounts[0]).deposit({ value: wethAmountInMax })
    await weth9.connect(accounts[0]).approve(contractSingleSwap.address, wethAmountInMax)
    await contractSingleSwap.swapExactOutputSingle(daiAmountOut, wethAmountInMax)
  });
});
