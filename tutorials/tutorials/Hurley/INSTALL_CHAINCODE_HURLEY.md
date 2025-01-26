# Using Hurley to manage Hyperledger Fabric Smart Contracts


## Introduction

    The organization WordSiBu has launched, on the early 2019, Hurley, a development environment manager for Hyperledger Fabric which intends to simplify the deployment of smart contracts on the Hyperledger Fabric blockchain. Six months before, on june 2018, the same organization has released, a little bit after the support of Hyperledger Fabric for Javascript was announced, the Convector Suite, a framework to elaborate smart contracts written in this language for this blockchain. Along with it, there is a line command interface to manage it, the CLI (Convector Line Interface); their goal is to make it easier announcing Hurley.
    Hurley creates an abstraction layer in which the programmer does not need to concern about creating the stakeholder of the network (organization, users, channels) on a code script, such as Composer does, e.g. He passes for Hurley, via command line, the number of each category of those participants he desire to instantiate, the chaincode that will be inserted into them and Hurley does the implementation itself. The tool supports smart contracts written in Javascript, Go and Typescript.

## How to use
    
    The first step is to download Hurley using the Node Package Manager (NPM):

        npm i -g @wordsibu
    
    Then, the programmer must set the network in which the smart contract is going to be tested:

        hurl new --organizations #numorg --users #numus --channels #numchan

, in which #numorg is the number of organizations, #numus the number of useres and #numchan the number of channels. If none of these arguments are specified, it creates a default network with two organizations, two users per organization and one channel.

Get inside the folder with the chaincode:
    
    cd my_chaincode

Execute hurl install:

        hurl install #name_chaincode #language

    , in which #language can be node or golang.

## Testing the tool and conclusions
    
    When testing the new tool, the proccess of creating the networks were successful: just passing the arguments, Hurley created the topologies as explained in [2]. The last step was also successful; however, arguments are passed to the constructor of the install function, and, when not specifed, the default are:
            
            ' {"Args":["init",""]}'

    For avoiding any mistakes when instantiating the chaincode on the nodes of the network, it is recommended to run hurl install as follows:

    hurl install #chaincode_example #language {"Args":[]}'

    It’s possible to conclude, by the attempts of execution, that Hurley Environment has a good proposal to construct networks to test smart contracts (it offers a basic interface where the user specify how many organizations, users and channels the network should have), summarizing most part of the work in programming the smart contract itself. With it, it is not necessary to define the network in a script, as done with Composer framework and others.

## References

[1] <https://github.com/worldsibu/hurley?ref=hurley_launch>. Acessed in: 01/17/2019.

[2] Hurley:Setup Development Environments for Hyperledger Fabric. Published in: 01/09/2019. Available in: <https://medium.com/worldsibu/hurley-development-environments-for-hyperledger-fabric-41e00f344358>. Acessed in: 01/17/2019.

