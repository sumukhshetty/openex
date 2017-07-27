module.exports = {
  'SellerInterfaceAbi':[{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"isContract","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"},{"name":"buyer","type":"address"},{"name":"amount","type":"uint256"},{"name":"price","type":"uint256"},{"name":"currency","type":"string"}],"name":"addOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"}],"name":"completeOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"inputs":[{"name":"_seller","type":"address"},{"name":"_orderDb","type":"address"}],"payable":false,"type":"constructor"}],
  'SellerInterfaceFactoryAbi':[{"constant":false,"inputs":[],"name":"createSellerInterface","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_orderDb","type":"address"}],"name":"setOrderDb","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"}],"name":"createSellerInterface","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"orderDb","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_orderDb","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"seller","type":"address"},{"indexed":false,"name":"orderAddress","type":"address"}],"name":"SellerInterfaceCreated","type":"event"}],
  'DisputeResolver':[{"constant":false,"inputs":[{"name":"id","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"disputeQueryIds","outputs":[{"name":"ethOrderBook","type":"address"},{"name":"uid","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"},{"name":"proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"}],"name":"resolveDisputeBuyer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_uid","type":"string"},{"name":"_ethOrderBook","type":"address"},{"name":"country","type":"string"},{"name":"assignee","type":"address"}],"name":"assignDispute","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_uid","type":"string"},{"name":"_ethOrderBook","type":"address"},{"name":"country","type":"string"}],"name":"assignDispute","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"}],"name":"resolveDisputeSeller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"ownerIndex","type":"uint256"}],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_disputeInterface","type":"address"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ethOrderBook","type":"address"},{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"assignee","type":"address"},{"indexed":false,"name":"assigner","type":"address"}],"name":"DisputeAssigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ethOrderBook","type":"address"},{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"assignee","type":"address"},{"indexed":false,"name":"assigner","type":"address"}],"name":"DisputeEscalated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ethOrderBook","type":"address"},{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"resolvedTo","type":"string"},{"indexed":false,"name":"assignee","type":"address"}],"name":"DisputeResolved","type":"event"}],
  'OrderDB':[{"constant":true,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"}],"name":"getBuyer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"}],"name":"getStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"}],"name":"getMaxAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"uid","type":"string"}],"name":"getStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"uid","type":"string"}],"name":"getBuyer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feeRecipient","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"}],"name":"getFeeRecipient","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"}],"name":"getMinAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"},{"name":"buyer","type":"address"},{"name":"amount","type":"uint256"},{"name":"price","type":"uint256"},{"name":"currency","type":"string"},{"name":"fee","type":"uint256"}],"name":"addOrder","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"orderBook","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_feePercent","type":"uint256"}],"name":"setFeePercent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"feePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"_feePercent","type":"uint256"}],"name":"setSpecialFeePercent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_disputeResolver","type":"address"}],"name":"setDisputeResolver","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_orderBook","type":"address"}],"name":"setOrderBook","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"}],"name":"getFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"}],"name":"resolveDisputeSeller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"disputeInterface","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"},{"name":"buyer","type":"address"},{"name":"amount","type":"uint256"},{"name":"price","type":"uint256"},{"name":"currency","type":"string"},{"name":"fee","type":"uint256"}],"name":"addOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newBalance","type":"uint256"}],"name":"updateBalance","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_disputeInterface","type":"address"}],"name":"setDisputeInterface","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"min","type":"uint256"},{"name":"max","type":"uint256"}],"name":"setLimits","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"},{"name":"status","type":"uint8"}],"name":"setStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"min","type":"uint256"},{"name":"max","type":"uint256"}],"name":"setSpecialLimits","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"}],"name":"getFeePercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"orderBook","type":"address"},{"name":"uid","type":"string"}],"name":"setDisputed","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"availableBalances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"},{"name":"status","type":"uint8"}],"name":"setStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"newBalance","type":"uint256"}],"name":"updateBalance","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"seller","type":"address"},{"name":"uid","type":"string"}],"name":"getAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"uid","type":"string"}],"name":"getAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_feeRecipient","type":"address"}],"name":"setFeeRecipient","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"uid","type":"string"}],"name":"getFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"disputeResolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sellerInterface","type":"address"},{"indexed":false,"name":"newBalance","type":"uint256"}],"name":"BalanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderBook","type":"address"},{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"buyer","type":"address"}],"name":"OrderDisputed","type":"event"}]
,
  'OrderBook':[{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"seller","type":"address"}],"name":"calculateFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"},{"name":"buyer","type":"address"},{"name":"amount","type":"uint256"},{"name":"price","type":"uint256"},{"name":"currency","type":"string"}],"name":"addOrder","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"string"},{"name":"caller","type":"address"}],"name":"completeOrder","outputs":[],"payable":true,"type":"function"},{"inputs":[{"name":"_orderDb","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"currency","type":"string"},{"indexed":false,"name":"availableBalance","type":"uint256"}],"name":"OrderAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"OrderCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"uid","type":"string"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"resolvedTo","type":"string"}],"name":"DisputeResolved","type":"event"}]


}
