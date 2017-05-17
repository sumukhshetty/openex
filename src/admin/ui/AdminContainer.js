import { connect } from 'react-redux'
import Admin from '../components/Admin'

const mapStateToProps = (state, props) => {
  return {
    //activeTrades: state.activeTrades,
    //viewerRole: props.viewerRole,
    //tradeId: props.tradeId,
    //order: props.order,
    user: state.user
  }
}

const AdminContainer = connect(
  mapStateToProps)(Admin)

export default AdminContainer
