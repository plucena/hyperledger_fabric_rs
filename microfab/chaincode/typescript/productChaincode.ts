import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

@Info({ title: 'ProductContract', description: 'Smart contract for handling products' })
export class ProductContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const products: Product[] = [
            { id: '1', name: 'Product 1', price: 100 },
            { id: '2', name: 'Product 2', price: 200 },
            { id: '3', name: 'Product 3', price: 300 }
        ];

        for (const product of products) {
            await ctx.stub.putState(product.id, Buffer.from(JSON.stringify(product)));
            console.info(`Product ${product.id} initialized`);
        }
    }

    @Transaction()
    public async CreateProduct(ctx: Context, id: string, name: string, price: number): Promise<void> {
        const exists = await this.ProductExists(ctx, id);
        if (exists) {
            throw new Error(`The product ${id} already exists`);
        }

        const product: Product = { id, name, price };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
    }

    @Transaction(false)
    @Returns('Product')
    public async ReadProduct(ctx: Context, id: string): Promise<Product> {
        const productJSON = await ctx.stub.getState(id);
        if (!productJSON || productJSON.length === 0) {
            throw new Error(`The product ${id} does not exist`);
        }
        return JSON.parse(productJSON.toString());
    }

    @Transaction()
    public async UpdateProduct(ctx: Context, id: string, name: string, price: number): Promise<void> {
        const exists = await this.ProductExists(ctx, id);
        if (!exists) {
            throw new Error(`The product ${id} does not exist`);
        }

        const product: Product = { id, name, price };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
    }

    @Transaction()
    public async DeleteProduct(ctx: Context, id: string): Promise<void> {
        const exists = await this.ProductExists(ctx, id);
        if (!exists) {
            throw new Error(`The product ${id} does not exist`);
        }

        await ctx.stub.deleteState(id);
    }

    @Transaction(false)
    @Returns('boolean')
    public async ProductExists(ctx: Context, id: string): Promise<boolean> {
        const productJSON = await ctx.stub.getState(id);
        return productJSON && productJSON.length > 0;
    }

    @Transaction(false)
    @Returns('Product[]')
    public async GetAllProducts(ctx: Context): Promise<Product[]> {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record: Product;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return allResults;
    }
}

interface Product {
    id: string;
    name: string;
    price: number;
}