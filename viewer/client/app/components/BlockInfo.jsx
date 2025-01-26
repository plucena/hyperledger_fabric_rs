import React from 'react';
import { Alert } from 'reactstrap';
import ApiService from '../services/Api';
import JsonTree from './JsonTree.jsx';
import Modal from './Modal.jsx';

import '../styles/blockinfo.scss';

export default class BlockInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        isOpen: false,
        content: <pre></pre>,
      }
    };
    this.onToggleModal = this.onToggleModal.bind(this);
  }

  viewBlockchain(txId) {
    const modal = this.state.modal;
    modal.isOpen = true;
    modal.content = <p>Loading...</p>
    this.setState({ modal });
    ApiService.getBlockByTxId(txId)
      .then(res => {
        const modal = this.state.modal;
        const value = res.data;
        modal.content = <pre><JsonTree data={value}></JsonTree></pre>;
        this.setState({ modal });
      })
      .catch(err => {
        console.error(err);
        const modal = this.state.modal;
        modal.content = <Alert color='danger'>{err.message}</Alert>;
        this.setState({ modal });
      });
  }

  onToggleModal() {
    const modal = this.state.modal;
    modal.isOpen = false;
    this.setState({ modal });
  }

  render() {
    const data = this.props.data;
    return (
      <div id="block-info">
        <p>{this.props.summary}</p>
        <hr/>
        <JsonTree data={data}></JsonTree>
        { data.hasOwnProperty('transactionId') ?
          <>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => this.viewBlockchain(data.transactionId)}>
              View blockchain &nbsp;
              <span className="icon"><i className="fa fa-external-link-alt"></i></span>
            </button>
            <Modal title={`Transaction ${data.transactionId}`} isOpen={this.state.modal.isOpen} onToggle={this.onToggleModal}
              size="lg">
              {this.state.modal.content}
            </Modal>
          </>
          :
          <span></span>
        }
      </div>
    );
  }
}