
const Fabric_Client = require('fabric-client');
const Fabric_CA_Client = require('fabric-ca-client');
const path = require('path');
const connectionFile = require('../config/connection.json');
const store_path = path.join(__dirname, '../config/hfc-key-store');
const client = new Fabric_Client();
client.loadFromConfig(connectionFile);

async function start() {

  const stateStore = await Fabric_Client.newDefaultKeyValueStore({ path: store_path });
  client.setStateStore(stateStore);
  const crypto_suite = Fabric_Client.newCryptoSuite();
	// use the same location for the state store (where the users' certificate are kept)
	// and the crypto store (where the users' keys are kept)
	const crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
	crypto_suite.setCryptoKeyStore(crypto_store);
  client.setCryptoSuite(crypto_suite);

  var	tlsOptions = {
    trustedRoots: [],
    verify: false
  };
  var admin_user = null;
  // be sure to change the http to https when the CA is running TLS enabled
  const fabric_ca_client = new Fabric_CA_Client(
    'https://admin:277f0dc0f3@n5a2e7707bf7b49d4a835cfa0ddf36d84-org1-ca.us05.blockchain.ibm.com:31011', null , 'org1CA', crypto_suite);

  const user_from_store = await client.getUserContext('admin', true);
  if (user_from_store && user_from_store.isEnrolled()) {
    console.log('Successfully loaded admin from persistence');
    admin_user = user_from_store;
  } else {
    // need to enroll it with CA server
    const enrollment = await fabric_ca_client.enroll({
      enrollmentID: 'admin',
      enrollmentSecret: '277f0dc0f3'
    });
    console.log('Successfully enrolled admin user "admin"');
    const user = await client.createUser({
      username: 'admin',
      mspid: 'org1',
      cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
    });
    admin_user = user;
    await client.setUserContext(admin_user);
  }

  const channel = client.getChannel('defaultchannel', true);
  // console.info(await channel.queryBlock(8, 'org1-peer1'));
  console.log(await channel.queryBlockByTxID('74c7dca8c6e35b23629e49291cd4f9a5b5e806b69b6500d4888787a2c710b080', 'org1-peer1'));
}

start().catch(err => console.error(err));
