
# INSTALAÇÃO DO HYPERLEDGER FABRIC E DO COMPOSER COMPUTADOR/SERVIDOR LOCAL

Requisitos gerais 

-  Recomendavel 8 GB de RAM local ou na VM

- A ferramenta de desenvolvimento Composer só funciona no  Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), ou Mac OS 10.12 ou mais novo. Caso não tenha estes como seu sistema operacional recomendamos fazer uma instalação numa VM - http://br.releases.ubuntu.com/16.04/

- A instalcação deve ser feita como usuario comum. Não funciona como root. Usar seu usuario. Ou criar um usuario novo. Exemplo:

    adduser blockchain

    usermod -aG sudo blockchain

# Instalando os pre-requisitos 

O Hyperledger roda como Docker e o Composer depende do node e de varias bibliotecas criptográficas. Um unico script instala todas as dependencias necessárias:

    curl -O https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh

    chmod u+x prereqs-ubuntu.sh

    ./prereqs-ubuntu.sh

fazer logout da sessão

# Instalar o Fabric 1.2

fazer login em nova sesão

    mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

    curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz

    tar -xvf fabric-dev-servers.tar.gz

    cd ~/fabric-dev-servers

    export FABRIC_VERSION=hlfv12

    ./downloadFabric.sh
    
    ./startFabric.sh
    
    
 use *docker ps* para ver se todos os 4 dockers estão ok
 
 ![Fabric](https://raw.githubusercontent.com/plucena/hyperledger-course/master/setup/img/fabric1.png)



# Instalar o Composer

instalação obrigatoriamente como usuario comum.  root não funciona. 

cd para o home do seu usuario. Ex: *cd /home/blockchain/* 

    npm install -g composer-cli@0.20

    npm install -g composer-rest-server@0.20

    npm install -g generator-hyperledger-composer@0.20

    npm install -g yo


# Gerando as chaves de acesso do Fabric ao Composer

   cd ~/fabric-dev-servers
    
    export FABRIC_VERSION=hlfv12
    
    ./startFabric.sh
    
    ./createPeerAdminCard.sh

a chave deve ter sido gerada e importada com sucesso

 ![Fabric](https://raw.githubusercontent.com/plucena/hyperledger-course/master/setup/img/composer.png)


# Testar um projeto

    cd  ~
    
    git clone https://github.com/plucena/composer-example
    
    cd ~/composer-example/animaltracking-model/
    
    composer archive create -t dir -n .

    composer network install -c PeerAdmin@hlfv1 -a animaltracking-model@0.2.3.bna

    composer network start -c PeerAdmin@hlfv1  -n animaltracking-model -V 0.2.3 -A admin -S adminpw

    composer card import -f ./admin@animaltracking-model.card

    composer network ping -c admin@animaltracking-model

    composer-rest-server -c admin@animaltracking-model -p 8080 -n "never"
    
    
 os smart contracts estão disponiveis no localhost:8080 ou ipdoservidor:8080
 
  ![Fabric](https://raw.githubusercontent.com/plucena/hyperledger-course/master/setup/img/rest.png)

