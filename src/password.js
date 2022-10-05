import { upperCase } from "lodash";

const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const symbols = [
    ',', '?', '.', ';', '/', ':', '$', '&', '@', '#', '(', ')', '!'
];

export default class Password {
    constructor(length, params){
        this.length = length;
        this.params = params;
        this.pass = this.generate();
    }

    displaylog(){
        console.log("Length : "+ this.length+" password : "+this.pass);
    }

    setLength(l){
        this.length = l;
    }

    generate(){
        if (this.params == []) {
            return "Select at least one char type"
        }
        let p = '';
        for (var i=0; i<this.length; i++) {
            var chartype = this.params[Math.floor(Math.random() * this.params.length)];
            switch (chartype){
                case "lowercase" : p += alphabet[Math.floor(Math.random() * alphabet.length)];
                break;
                case "uppercase" : p += alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
                break;
                case "numbers" : p += Math.floor(Math.random() * 10);
                break;
                case "symbols" : p += symbols[Math.floor(Math.random() * symbols.length)];
                break;
                default:
                    console.log("no params");
            }
        } 
        return p;
    }
}