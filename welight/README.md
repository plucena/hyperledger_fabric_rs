# org.welight

fabric created using tools scripts

code based on

https://hyperledger.github.io/composer/tutorials/developer-tutorial

Generate Import  PeerAdmin@hlfv1 card

/fabric-dev-servers/createPeerAdminCard.sh


1 - composer archive create -t dir -n .

2 - composer network install -c PeerAdmin@hlfv1 -a welight@0.0.1.bna

3 - composer network start -c PeerAdmin@hlfv1 -n welight -V 0.0.1 -A admin -S adminpw

4 - composer card import --file admin@welight.card

5 - composer network ping --card admin@welight

6 - nohup composer-rest-server -c admin@welight -p 80  -n  "never" &
