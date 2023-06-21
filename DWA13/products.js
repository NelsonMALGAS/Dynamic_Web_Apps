const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: '  ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  // Task 1: Console log each product name
  products.forEach((product) => { 
    console.log(product.product);
  });
  
  // Task 2: Filter out products with a name longer than 5 characters
  const filteredProducts = products.filter((product) => product[product.length] <= 5);
  console.log(filteredProducts);
  
  // Task 3: Convert string prices to numbers and remove products without prices
  const validProducts = products.filter((product) => (product.price) !== '' && (product.price) !== '  ')
  .map((product) => ({
    ...product,
    price: parseInt(product.price),
  }));
  console.log(validProducts);
  
  // Calculate the combined price of all remaining products using reduce
  const combinedPrice = validProducts.reduce((total, product) => total + product.price, 0);
  console.log('The total is :' + " " ,combinedPrice);
  
  // Task 4: Concatenate all product names into a string
  const productNamesString = products.reduce((acc, product, index) => {
    if (index === 0) {
      return product.product;
    }
    return acc + ', ' + product.product;
  }, '');
  console.log(productNamesString);
  
  // Task 5: Calculate the highest and lowest-priced items
  const { highest, lowest } = products.reduce(
    (acc, product) => {
      if (product.price > acc.highest.price) {
        acc.highest = product;
      }
      if (product.price < acc.lowest.price) {
        acc.lowest = product;
      }
      return acc;
    },
    { highest: products[0], lowest: products[0] }
  );
  console.log(`Highest: ${highest.product}. Lowest: ${lowest.product}`);
  
  // Task 6: Recreate the object with modified keys using Object.entries and reduce
  const modifiedProducts = products.map((product) => {
    const modifiedProduct = {};
    Object.entries(product).forEach(([key, value]) => {
      const modifiedKey = key === 'product' ? 'name' : key === 'price' ? 'cost' : key;
      modifiedProduct[modifiedKey] = value;
    });
    return modifiedProduct;
  });
  console.log(modifiedProducts);
