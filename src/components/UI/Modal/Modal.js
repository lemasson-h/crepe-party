import React, { Component } from 'react';

import './Modal.css';

class Modal extends Component {
  render() {
    const classes = ["Modal", this.props.show ? 'ModalOpen' : 'ModalClosed'];

    return (
      <div>
        {this.props.show ? <div className="Backdrop" onClick={this.props.closeModal}></div> : null }
        <div className={classes.join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
