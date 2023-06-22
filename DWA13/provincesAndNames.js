
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Task 1: Console log each name
let count = 0;
names.forEach((name) => {
  console.log(name);
  count++;

  if (count === 7) {
    return;
  }
});

// Task 2: Console log each name with a matching province
count = 0;
names.forEach((name, index) => {
  const province = provinces[index];
  console.log(`${name} (${province})`);
  count++;

  if (count === 7) {
    return;
  }
});

// Task 3: Map over province names and convert to uppercase
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// Task 4: Create an array with the amount of characters in each name
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Task 5: Sort provinces alphabetically using sort
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Task 6: Filter provinces that don't have the word 'Cape' and get the remaining count
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));
const remainingCount = filteredProvinces.length;
console.log('The provinces that dont have "cape" are :', remainingCount + ' ' + 'in number');

// Task 7: Use reduce to create an object indicating the province of an individual
const containsS = names.map(name => name.toLowerCase().includes('s'));
console.log(containsS);


// Task 8 : to determine whether a name contains an
const provinceObject = names.reduce((acc, name, index) => {
  const province = provinces[index];
  acc[name] = province;
  return acc;
}, {});
console.log(provinceObject);




