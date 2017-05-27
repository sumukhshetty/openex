import { connect } from 'react-redux'
import Admin from '../ui/Admin'
import { disputedTrades, clearState } from './../ui/AdminActions'

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    disputedtrades: state.disputedtrades,
    purchaserequests: state.purchaserequests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBeforeComponentLoad: () => {
      dispatch(disputedTrades())
    },
    onBeforeComponentWillUnmount: ()=>{
      dispatch(clearState())
    }
  }
}

const AdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps)(Admin)

export default AdminContainer
