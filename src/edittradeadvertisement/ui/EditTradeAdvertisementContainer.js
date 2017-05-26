import { connect } from 'react-redux'
import EditTradeAdvertisement from './EditTradeAdvertisement'
import * as actions from './EditTradeAdvertisementActions'


const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    etherPrice: state.etherPrice,
    user: state.user,
    users: state.users,
    buytradeadvertisements: state.buytradeadvertisements,
    selltradeadvertisements: state.selltradeadvertisements,
    tradeAdvertisementId: ownProps.tradeAdvertisementId,
    tradeAdvertisementType: ownProps.tradeAdvertisementType,
    edittradeadvertisement: state.edittradeadvertisement
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: (tradeAdvertisementId, tradeAdvertisementType, buytradeadvertisements, selltradeadvertisements) => {
      dispatch(actions.setEditTradeAdvertisement(tradeAdvertisementId, tradeAdvertisementType, buytradeadvertisements, selltradeadvertisements))
    },
    onBeforeComponentWillUnmount: () => {
      dispatch(actions.clearState())
    },
    updateTradeAdvertisement:(editTradeAdvertisementData, tradeAdvertisementId, tradeAdvertisementType)=>{
      actions.updateTradeAdvertisement(editTradeAdvertisementData, tradeAdvertisementId, tradeAdvertisementType)
    }
  }
}

const EditTradeAdvertisementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTradeAdvertisement)

export default EditTradeAdvertisementContainer
