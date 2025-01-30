import React, { useState } from 'react';
import axios from 'axios';

const Scanner = ({ token }) => {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${barcode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProduct(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch product details');
      setProduct(null);
    }
  };

  return (
    <div>
      <h2>Barcode Scanner</h2>
      <input
        type="text"
        placeholder="Enter barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={handleScan}>Scan</button>

      {error && <p>{error}</p>}

      {product && (
        <div>
          <h3>{product.product.name}</h3>
          <img src={product.product.image} alt={product.product.name} />
          <p>
            <strong>Health Rating:</strong> {product.healthRating}
          </p>
          <p>
            <strong>Recommendation:</strong> {product.recommendation}
          </p>
          <p>
            <strong>Nutritional Information:</strong>
          </p>
          <ul>
            <li>Fiber: {product.product.nutrients.fiber || 'N/A'}g</li>
            <li>Protein: {product.product.nutrients.proteins || 'N/A'}g</li>
            <li>Sugar: {product.product.nutrients.sugar || 'N/A'}g</li>
            <li>
              Saturated Fat:{' '}
              {product.product.nutrients['saturated-fat'] || 'N/A'}g
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Scanner;
