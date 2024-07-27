import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [rating, setRating] = useState('');
    const [sortBy, setSortBy] = useState('');

    const fetchProducts = () => {
        axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [category, company, minPrice, maxPrice, rating, sortBy]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Top Products</h1>
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Phone">Phone</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>Company</InputLabel>
                <Select value={company} onChange={(e) => setCompany(e.target.value)}>
                    <MenuItem value="AMZ">AMZ</MenuItem>
                    <MenuItem value="FLP">FLP</MenuItem>
                </Select>
            </FormControl>

            <TextField label="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <TextField label="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

            <FormControl>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="discount">Discount</MenuItem>
                </Select>
            </FormControl>

            <Button onClick={fetchProducts}>Apply Filters</Button>

            <h1>Top Products</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Company: {product.company}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Discount: {product.discount}%</p>
                        <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
                        <Link to={`/product/${product.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;
