const arr = ['url0', 'url1', 'url2']

const getRandomArbitrary = (min, max) =>
    Math.floor(Math.random() * (max - min) + min)

console.log(`url: ${arr[getRandomArbitrary(0, arr.length)]}`)
