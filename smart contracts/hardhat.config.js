// https://eth-rinkeby.alchemyapi.io/v2/4vIz4niZICc4lhJNffBmn8WN8phxXiUy

// 0xF4924A73705Ed92B3eE31C7af772Ed13FE98d5F3

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/4vIz4niZICc4lhJNffBmn8WN8phxXiUy",
      accounts: ['bfef28480742cdf7a25d5fe86936af500ec3f6448ca300b045c9dbb6dd3fdcb2'],
    }
  }
}
