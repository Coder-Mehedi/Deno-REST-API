import { Product } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let products: Product[] = [
	{
		id: "1",
		name: "Product One",
		description: "This is product one",
		price: 29.99,
	},
	{
		id: "2",
		name: "Product Two",
		description: "This is product two",
		price: 39.99,
	},
	{
		id: "3",
		name: "Product Three",
		description: "This is product three",
		price: 59.99,
	},
];

// @desc    Get all products
// @route   GET /api/products
const getProducts = ({ response }: { response: any }) => {
	response.body = {
		success: true,
		data: products,
	};
};

// @desc    Get single products
// @route   GET /api/products/:id
const getProduct = ({
	params,
	response,
}: {
	params: { id: string };
	response: any;
}) => {
	const product: Product | undefined = products.find(
		(product) => product.id === params.id
	);
	if (product) {
		response.status = 200;
		response.body = {
			success: true,
			data: product,
		};
	} else {
		response.status = 404;
		response.body = {
			success: false,
			msg: "No product found",
		};
	}
};

// @desc    add product
// @route   POST /api/products
const addProduct = async ({
	request,
	response,
}: {
	request: any;
	response: any;
}) => {
	const body = await request.body();
	if (!request.hasBody) {
		response.status = 400;
		response.body = {
			success: false,
			msg: "No data",
		};
	} else {
		const product: Product = body.value;
		product.id = v4.generate();
		products.push(product);
		response.status = 201;
		response.body = {
			success: true,
			data: product,
		};
	}
};

// @desc    update product
// @route   PUT /api/products/:id
const updateProduct = async ({
	params,
	request,
	response,
}: {
	params: { id: string };
	request: any;
	response: any;
}) => {
	const product: Product | undefined = products.find(
		(product) => product.id === params.id
	);
	if (product) {
		const body = await request.body();
		const updateData: { name?: string; description?: string; price?: number } =
			body.value;

		products = products.map((product) =>
			product.id === params.id ? { ...product, ...updateData } : product
		);
		response.status = 200;
		response.body = {
			success: true,
			data: products,
		};
	} else {
		response.status = 404;
		response.body = {
			success: false,
			msg: "No product found",
		};
	}
};

// @desc    delete product
// @route   DELETE /api/products/:id
const deleteProduct = ({
	params,
	response,
}: {
	params: { id: string };
	response: any;
}) => {
	products = products.filter((product) => product.id !== params.id);
	response.body = {
		success: true,
		msg: "Product removed",
	};
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
