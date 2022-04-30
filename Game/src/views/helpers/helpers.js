import { path } from "express/lib/application";

export function toUpper(str) {
    return str.toUpperCase();
}

export function toLower(str) {
    return str.toLowerCase();
}

function checked(currentValue, value){
    if(currentValue == value){
        return "checked";
    }else{
        return "";
    }
}

function printError(errors, campo){
    let message;
    if(typeof errors != 'undefined'){//ajeitar erro de acessar o formulario diretamente
        errors.errors.forEach(error => {
            if(error.path === campo){
                message = error.message;
            }
        });
    }
    return message
}

module.exports = { toLower, toUpper, checked, printError }//exportar função