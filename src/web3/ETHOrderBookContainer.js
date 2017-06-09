import { connect } from 'react-redux'
import ETHOrderBook from './ETHOrderBook'
import { loadUserOrderBook, clearOrderBook } from './ETHOrderBookActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    user: state.user,
    orderBook: state.orderBook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadETHOrderBook: (web3, orderBookAddress) => {
      dispatch(loadUserOrderBook(web3, orderBookAddress))
    },
    clearETHOrderBook: () => {
      dispatch(clearOrderBook());
    }
  }
}

const ETHOrderBookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ETHOrderBook)

export default ETHOrderBookContainer
