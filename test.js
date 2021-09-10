const Myges = require('./services/myges');

const myges = new Myges()

myges.getProfile().then((res) => {
    console.log(res)
})
