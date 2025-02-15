# create package

npm init -y

npm install fabric-contract-api fabric-shim

npm install --save-dev typescript @types/node

npx tsc --init

peer lifecycle chaincode package productChaincode.tar.gz --path ./ --lang node --label productChaincode_1.0


# install package

peer lifecycle chaincode install productChaincode.tar.gz 


# Approve the chaincode definition

peer lifecycle chaincode queryinstalled

export CC_PACKAGE_ID=chaincode_id_from_above

peer lifecycle chaincode approveformyorg  --channelID channel1 --name productChaincode --version 1.0 --sequence 1 --signature-policy "OR('SampleOrg.admin')" --package-id $CC_PACKAGE_ID --sequence 1



# Commit the Chaincode Definition

peer lifecycle chaincode commit --channelID channel1 --name productChaincode  --version 1.0  --sequence 1 --signature-policy "OR('SampleOrg.admin')"
  
# interact with package

Create a Product:
peer chaincode invoke -C mychannel -n productChaincode -c '{"Args":["CreateProduct", "1", "Product 1", "100"]}'


Read a Product:
peer chaincode query -C mychannel -n productChaincode -c '{"Args":["ReadProduct", "1"]}'

Update a Product:

peer chaincode invoke -C mychannel -n productChaincode -c '{"Args":["UpdateProduct", "1", "Updated Product 1", "150"]}'
Delete a Product:

Delete a product:

peer chaincode invoke -C mychannel -n productChaincode -c '{"Args":["DeleteProduct", "1"]}'

Get All Products:
peer chaincode query -C channel1 -n productChaincode -c '{"Args":["GetAllProducts"]}'


Problem: The peer lifecycle chaincode commit transaction is successful, but when I try to invoke the chaincode for the first time, it fails with the following error:

Error: endorsement failure during invoke. response: status:500 message:"make sure the chaincode name has been successfully defined on channel channel1 and try again: chaincode definition for 'NAME' exists, but chaincode is not installed"

Solution: You may not have set the correct --package-id when you approved your chaincode definition. As a result, the chaincode definition that was committed to the channel was not associated with the chaincode package you installed and the chaincode was not started on your peers. If you are running a docker based network, you can use the docker ps command to check if your chaincode is running:
