const array = [1]



function app() {
    var b = 2
    this.a = 12 + b
    var a = 10
}


class Pe {
    constructor() {
        let a = 12
        this.a = a + 10
    }
}

const a = new Pe()


app()

console.log(a)

