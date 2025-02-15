package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/peer"
)

// Product represents the structure of a product
type Product struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
}

// SimpleChaincode implements the chaincode interface
type SimpleChaincode struct{}

// Init is called during chaincode instantiation
func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

// Invoke is called to invoke the chaincode functions
func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	function, args := stub.GetFunctionAndParameters()

	switch function {
	case "createProduct":
		return t.createProduct(stub, args)
	case "readProduct":
		return t.readProduct(stub, args)
	case "updateProduct":
		return t.updateProduct(stub, args)
	case "deleteProduct":
		return t.deleteProduct(stub, args)
	default:
		return shim.Error("Invalid function name. Available functions: createProduct, readProduct, updateProduct, deleteProduct")
	}
}

// createProduct adds a new product to the ledger
func (t *SimpleChaincode) createProduct(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expected: id, name, price")
	}

	// Parse the price as an integer
	price := 0
	_, err := fmt.Sscanf(args[2], "%d", &price)
	if err != nil {
		return shim.Error("Price must be a number")
	}

	// Create a new product
	product := Product{
		ID:    args[0],
		Name:  args[1],
		Price: price,
	}

	// Convert the product to JSON
	productJSON, err := json.Marshal(product)
	if err != nil {
		return shim.Error("Failed to marshal product to JSON")
	}

	// Save the product to the ledger
	err = stub.PutState(product.ID, productJSON)
	if err != nil {
		return shim.Error("Failed to save product to the ledger")
	}

	return shim.Success(nil)
}

// readProduct retrieves a product from the ledger by its ID
func (t *SimpleChaincode) readProduct(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expected: id")
	}

	// Retrieve the product from the ledger
	productJSON, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to read product from the ledger")
	}
	if productJSON == nil {
		return shim.Error("Product not found")
	}

	return shim.Success(productJSON)
}

// updateProduct updates an existing product in the ledger
func (t *SimpleChaincode) updateProduct(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expected: id, name, price")
	}

	// Retrieve the existing product
	productJSON, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to read product from the ledger")
	}
	if productJSON == nil {
		return shim.Error("Product not found")
	}

	// Parse the price as an integer
	price := 0
	_, err = fmt.Sscanf(args[2], "%d", &price)
	if err != nil {
		return shim.Error("Price must be a number")
	}

	// Update the product
	product := Product{
		ID:    args[0],
		Name:  args[1],
		Price: price,
	}

	// Convert the updated product to JSON
	updatedProductJSON, err := json.Marshal(product)
	if err != nil {
		return shim.Error("Failed to marshal updated product to JSON")
	}

	// Save the updated product to the ledger
	err = stub.PutState(product.ID, updatedProductJSON)
	if err != nil {
		return shim.Error("Failed to update product in the ledger")
	}

	return shim.Success(nil)
}

// deleteProduct removes a product from the ledger by its ID
func (t *SimpleChaincode) deleteProduct(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expected: id")
	}

	// Delete the product from the ledger
	err := stub.DelState(args[0])
	if err != nil {
		return shim.Error("Failed to delete product from the ledger")
	}

	return shim.Success(nil)
}

// main function starts the chaincode
func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting SimpleChaincode: %s", err)
	}
}
