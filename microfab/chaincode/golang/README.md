# Package

go mod init example

go mod tidy

peer lifecycle chaincode package example.tar.gz --path . --lang golang --label example_1.0


# install 
peer lifecycle chaincode install example.tar.gz

# Approve
peer lifecycle chaincode approveformyorg --channelID mychannel --name example --version 1.0 --package-id <package-id> --sequence 1 --tls true --cafile /path/to/tls/ca.crt

# Commit
peer lifecycle chaincode commit -o orderer.example.com:7050 --channelID mychannel --name example --version 1.0 --sequence 1 --tls true --cafile /path/to/tls/ca.crt --peerAddresses peer0.org1.example.com:7051 --tlsRootCertFiles /path/to/tls/peer0.org1.example.com.crt

#Test

peer chaincode invoke -o orderer.example.com:7050 --tls true --cafile /path/to/tls/ca.crt -C mychannel -n example -c '{"Args":["createProduct", "product1", "Product One", "100"]}'



