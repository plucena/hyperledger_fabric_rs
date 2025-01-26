import React from "react";
import { Card, CardHeader, CardBody, Alert } from 'reactstrap';
import Loading from 'react-loading-components';
import ApiService, { TX_URL } from '../services/Api';

import '../styles/transactionsinfo.scss';

export default class TransactionsInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      txs: [],
      err: {},
    };
  }

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions() {
    this.setState({ isLoading: true });

    return ApiService.getBlocks()
      .then((res) => {
        const txs = res.data.slice(0, 30);
        this.setState({ isLoading: false, txs: txs });
      })
      .catch((err) => {
        this.setState({ isLoading: false, err: err });
      });
  }

  showTransactionList() {
    const txs = this.state.txs;
    let list = [];
    for(const tx of txs) {
      list.push(
        <li key={tx.block_hash}>
          <a href={ `${TX_URL.BLOCK_INFO}/${tx.block_hash}` } target="_blank">
            <p>{ 'Number: ' + tx.block_number }</p>
            <p className="text-truncate">{ tx.block_hash }</p>
          </a>
        </li>
      );
    }
    return <ul className="txs-list">{ list }</ul>;
  }

  render() {
    return (
      <div id="tx-info">
        <Card border="dark" className="mb-3 shadow-sm">
          <CardHeader>Transactions</CardHeader>
          <CardBody>
            {
              this.state.isLoading ?
                <p style={{ textAlign:'center' }}><Loading type='tail_spin' fill='#000' width={32} height={32} /></p> :
                <div>
                  {
                    this.state.err.message ?
                      <Alert color='danger'>{this.state.err.message}</Alert> :
                      this.showTransactionList()
                  }
                </div>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}
