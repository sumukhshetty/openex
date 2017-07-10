import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { firebaseStorage } from '../../index.js'
// import PaperClip from '../../images/svgReactComponents/PaperClip.js'
import fileUploadIcon from '../../images/file-plus.svg'

export default class NewChatMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.UploadFile = this.UploadFile.bind(this)
  }

  UploadFile(e) {
    const file = e.target.files[0]
    const uploadTask = firebaseStorage
      .ref('/chatrooms')
      .child(this.props.tradeId)
      .child(this.props.auth.uid)
      .child(file.name)
      .put(file, { contentType: file.type })
    // uploadTask.on('state_changed', (snapshot) => {
    //   this.setState({
    //     transferCurrent: snapshot.bytesTransferred,
    //     transferTotal: snapshot.totalBytes
    //   })
    // })
    uploadTask.then(
      snap =>
        this.props.handleSubmit(
          e,
          snap.downloadURL,
          this.props.auth.uid,
          this.props.tradeId,
          true
        )

      // let user = this.state.user
      // user.chatroomPhoto = snap.downloadURL

      // this.setState({
      //   transferCurrent: null
      // })
    )
  }

  render() {
    return (
      <form
        className="flex cxc bg-white br2 me mv2"
        onSubmit={e =>
          this.props.handleSubmit(
            e,
            this.props.newMessage,
            this.props.auth.uid,
            this.props.tradeId,
            false
          )}
      >
        <div className="file-input dim pointer">
          <input
            type="file"
            accept=".png, .pdf, .jpg"
            onChange={this.UploadFile}
            style={{ minWidth: '25px' }}
            className="mh1"
          />
          <fileUploadIcon className="ph4" />
          {/* <PaperClip className="ph3" /> */}
        </div>
        <input
          type="text"
          placeholder={`Type here to chat...`}
          className=" w-100 bn fsmall mr2 bg-light-gray pa2 br2"
          value={this.props.newMessage}
          onChange={this.props.handleChange}
          required
        />
        <input
          type="submit"
          className="green me fsmall ph3 dim pointer bg-white"
          value="Submit"
        />
      </form>
    )
  }
}
