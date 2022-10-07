import { upperCase } from "lodash";
import { letters, symbols} from './alphabets.js';

export default class Password {
    constructor(length, params){
        this.length = length;
        this.params = params;
        this.pass = this.generate();
        this.strength = this.computeStrength();
    }

    generate() {
        if (this.params == []) {
            return "Select at least one char type"
        }
        let p = '';
        for (var i=0; i<this.length; i++) {
            var chartype = this.params[Math.floor(Math.random() * this.params.length)];
            switch (chartype){
                case "lowercase" : p += letters[Math.floor(Math.random() * letters.length)];
                break;
                case "uppercase" : p += letters[Math.floor(Math.random() * letters.length)].toUpperCase();
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

    computeStrength() {
        if (this.params.length == 0) {
            return "INSUFFICIENT";
        }
        var score = Math.pow(2,this.params.length) * (this.length - 5);
        if (score >70) {
            return "VERY HIGH";
        }
        if (score >40) {
            return "HIGH";
        }
        if (score >20) {
            return "MEDIUM";
        }
        if (score >= 10) {
            return "LOW";
        }
        return "INSUFFICIENT";
    }
}