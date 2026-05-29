
import fs from 'fs';
const jsonPath = 'testdata/testexcersiceFile.json';
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// console.log(jsonData)
// console.log(jsonData.email, jsonData.password)
// console.log(jsonData['email'])


console.log(jsonData.arr[1])
console.log(jsonData.numbers['num1'])