/* This file is adapted from the npm package 'lunicode-creepify' so as to be usable in a browser.
 * All credit goes to the original author of the package github.com/awaigand and the author of the library that
 * package is based on github.com/combatwombat
 */

'use strict';

const diacriticsTop = [ "̀", "́", "̂", "̃", "̄", "̅", "̆", "̇", "̈", "̉", "̊", "̋", "̌", "̍", "̎", "̏", "̐", "̑", "̒", "̓",
    "̔", "̕", "̚", "̛", "̽", "̾", "̿", "̀", "́", "͂", "̓", "̈́", "̈́", "͆", "͊", "͋", "͌", "͐", "͑", "͒", "͗", "͘", "͛",
    "͝", "͝", "͠", "͡" ];

const diacriticsMiddle = ["̴", "̵", "̶", "̷", "̸" ];

const diacriticsBottom = ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̡", "̢", "̣", "̤", "̥", "̦", "̧", "̨", "̩", "̪", "̫", "̬", "̭",
    "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "͜", "͟" ];

const creepify = {
    encode: function (input) {
        let result = '',
            currentChar;
        for (i in input) {
            currentChar = input[i];

            // Middle
            // Put just one of the middle characters there, or it gets crowded
            if (this.options.middle) {
                currentChar += diacriticsMiddle[Math.floor(Math.random() * diacriticsMiddle.length)]
            }

            // Top
            if (this.options.top) {

                // Put up to this.options.maxHeight random diacritics on top.
                // optionally fluctuate the number via the randomization value (0-100%)
                // randomization 100%: 0 to maxHeight
                //                30%: 70% of maxHeight to maxHeight
                //                 x%: 100-x% of maxHeight to maxHeight
                const diacriticsTopLength = diacriticsTop.length - 1;
                const howManyTops = this.options.maxHeight - Math.random() *
                                    ((this.options.randomization / 100) * this.options.maxHeight);
                for (var i = 0; i < howManyTops; i++) {
                    currentChar += diacriticsTop[Math.floor(Math.random() * diacriticsTopLength)]
                }
            }


            // Bottom
            if (this.options.bottom) {

                const diacriticsBottomLength = diacriticsBottom.length - 1;
                const howManyBottoms = this.options.maxHeight - Math.random() *
                                       ((this.options.randomization / 100) * this.options.maxHeight);
                for (let j = 0; j < howManyBottoms; j++) {
                    currentChar += diacriticsBottom[Math.floor(Math.random() * diacriticsBottomLength)]
                }

            }


            result += currentChar;
        }
        return result;
    },

    decode: function (input) {
        let result = '',
            charCode;

        //Check if other, none diametric chars could get accidentally cut.
        for (let i in input) {
            charCode = input[i].charCodeAt(0);
            if (charCode < 768 || charCode > 865) {
                result += input[i];
            }
        }
        return result;
    },

    options: {
        top: true,
        middle: true,
        bottom: true,
        maxHeight: 2,   // How many diacritic marks shall we put on top/bottom?
        randomization: 50 // 0-100%. maxHeight 100 and randomization 20%: the height goes from 80 to 100. randomization 70%, height goes from 30 to 100.
    }
};

window.Creepify = creepify;
