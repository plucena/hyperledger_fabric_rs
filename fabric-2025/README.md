# hyperledger-fabric Version: 2.4.6 - Linux

**install default fabric peers and docker images - make sure deps are Ok docker, golang, etc**

    curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh

    cd hyperledger-fabric/fabric samples

**install binaries and dockers**

    curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s --

**binaries are now on , add to PATH edit .bashrc and add:**

    export PATH=$PATH:~/hyperledger-fabric/fabric-samples/bin

    cd :~/hyperledger-fabric/fabric-samples/test-network

**start network and cereate mychannel**

    cd test-network
    
    ./network.sh up createChannel -c mychannel

    ./monitordocker.sh fabric_test


**compile, package, commit and approve using network script (much easeier!)**

    export FABRIC_CFG_PATH=$PWD/../config/

    ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go

     ./network.sh cc list -org 1

 **Initialize chaincoe**

     ./network.sh cc invoke -c mychannel  -ccic '{"function":"InitLedger","Args":[]}'


**QUERY CHAINCODE**

    ./network.sh cc query -c mychannel  -ccic '{"Args":["GetAllAssets"]}'


**INVOKE CHAINCODE**
 ./network.sh cc invoke -c mychannel  -ccic '{"Args":["CreateAsset","asset100","red","10","fred","500"]}'
