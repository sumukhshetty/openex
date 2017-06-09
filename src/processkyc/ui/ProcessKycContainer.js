import { connect } from 'react-redux'
import ProcessKyc from './ProcessKyc'
import { getPhotoId, approveKyc, denyKyc } from './ProcessKycActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    file: state.file,
    userUid: ownProps.userUid,
    country: ownProps.country
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotoId:(userUid)=>{
      console.log("ui.ProcessKycContainer.getPhotoId")
      console.log(userUid)
      dispatch(getPhotoId(userUid))
    },
    approveKyc: (userUid, country)=>{
      console.log("ui.ProcessKycContainer.approveKyc")
      dispatch(approveKyc(userUid, country))
    },
    denyKyc: (userUid)=>{
      console.log("ui.ProcessKycContainer.denyKyc")
      dispatch(denyKyc(userUid))
    },
  }
}

const ProcessKycContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessKyc)

export default ProcessKycContainer
