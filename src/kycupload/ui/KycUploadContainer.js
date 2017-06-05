import { connect } from 'react-redux'
import KycUpload from './KycUpload'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    uploadKycFile:(user, file)=>{
      console.log("ui.KycUploadContainer.uploadKycFile")
      console.log(user, file)
      dispatch(uploadKycFile(user, file))
    },
  }
}*/

const KycUploadContainer = connect(
  mapStateToProps,
  //mapDispatchToProps
)(KycUpload)

export default KycUploadContainer
