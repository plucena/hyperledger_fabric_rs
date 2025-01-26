
module.exports = {
  client: null,
  crypto_suite: null,
  connectionFile: {},

  async init() {
    const Fabric_Client = require('fabric-client');
    const path = require('path');
    this.connectionFile = require('../config/connection.json');
    const store_path = path.join(__dirname, '../config/hfc-key-store');
    this.client = new Fabric_Client();
    this.client.loadFromConfig(this.connectionFile);

    const stateStore = await Fabric_Client.newDefaultKeyValueStore({ path: store_path });
    const crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
    this.client.setStateStore(stateStore);
    this.crypto_suite = Fabric_Client.newCryptoSuite();
    this.crypto_suite.setCryptoKeyStore(crypto_store);
    this.client.setCryptoSuite(this.crypto_suite);
  },

  async getBlockByTxID(txid) {
    // let	tlsOptions = {
    //   trustedRoots: [],
    //   verify: false
    // };
    let admin_user = null;
    const user_from_store = await this.client.getUserContext('admin', true);
    if (user_from_store && user_from_store.isEnrolled()) {
      // console.log('Successfully loaded admin from persistence');
      admin_user = user_from_store;
    } else {
      // need to enroll it with CA server
      const Fabric_CA_Client = require('fabric-ca-client');
      const fabric_ca_client = new Fabric_CA_Client(
        'https://admin:87f8309f49@ndea2a8e877a243718b9a2886d7639cd8-org1-ca.us05.blockchain.ibm.com:31011', null , 'org1CA', this.crypto_suite
      );
      const enrollment = await fabric_ca_client.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: '87f8309f49'
      });
      // console.log('Successfully enrolled admin user "admin"');
      const user = await this.client.createUser({
        username: 'admin',
        mspid: 'org1',
        cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
      });
      admin_user = user;
      await this.client.setUserContext(admin_user);
    }

    const channel = this.client.getChannel('defaultchannel', true);
    return await channel.queryBlockByTxID(txid, 'org1-peer1');
  }
}
