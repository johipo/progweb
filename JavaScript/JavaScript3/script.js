
let counter = function (b) {
    let secret = b;
    function N(v) {
        secret ++;
        return secret;
    };
    return N;
};

let incrementar = counter(1);
console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());





