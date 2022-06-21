const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	// const products = await Product.find({}).sort('name price');
	const products = await Product.find({}).select('name price');

	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	const { featured, company, price, name, sort, fields } = req.query;
	const queryObject = {};

	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}

	if (company) {
		queryObject.company = { $regex: company, $options: 'i' };
	}

	if (price) {
		queryObject.price = price;
	}

	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}

	let result = Product.find(queryObject);

	//sorts
	if (sort) {
		const sortList = sort.split(',').join(' ');

		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	//fields(select)

	if (fields) {
		const fieldList = fields.split(',').join(' ');
		result = result.select(fieldList);
	}
	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
