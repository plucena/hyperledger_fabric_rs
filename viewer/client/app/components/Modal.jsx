import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import '../styles/modal.scss';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.onToggle();
  }

  render() {
    return (
        <Modal isOpen={this.props.isOpen} toggle={this.toggle} {...this.props}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody style={{ wordBreak: 'break-all' }}>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default ModalExample;
