// sonic is configured. You can use any of its actions.

// AVAILABLE ACTIONS:
// - get-token-by-ticker: Get token address by ticker symbol
//   Parameters:
//     - ticker (required): Token ticker symbol to look up
// - get-balance: Get $S or token balance
//   Parameters:
//     - address (optional): Address to check balance for
//     - token_address (optional): Optional token address
// - transfer: Send $S or tokens
//   Parameters:
//     - to_address (required): Recipient address
//     - amount (required): Amount to transfer
//     - token_address (optional): Optional token address
// - swap: Swap tokens
//   Parameters:
//     - token_in (required): Input token address
//     - token_out (required): Output token address
//     - amount (required): Amount to swap
//     - volatility_rate (optional): Optional volatility_rate percentage
//     - slippage (optional): Max slippage percentage
//const resultForAction = await Agent_Action({action:"get-balance",connection:"sonic",params:["0xC36d344f77c296a0D35889FfaB47D2F3a45aaA0f"]})
//const resultForAction2 = await Agent_Action({action:"transfer",connection:"sonic",params:["0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4","1.00"]})
      //  console.log("result for action 22",resultForAction2)