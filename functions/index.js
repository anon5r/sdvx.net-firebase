const functions = require('firebase-functions');

exports.index=functions.https.onRequest((req, res) => {
    console.info('req.path=',req.path);
    switch (req.path) {
        case null:
        {
            let nextRelease = new Date();
            nextRelease.setFullYear(2019);	// 2019
            nextRelease.setMonth(1);	// Feb
            nextRelease.setDate(28);	// 28
            if (Date.now() >= nextRelease.getTime())
                res.redirect('https://p.eagate.573.jp/game/sdvx/v/p');
            else
                res.redirect('https://p.eagate.573.jp/game/sdvx/v/p');
            break;
        }
        case /^\d+?/.test(req.path): {
            let r = req.path.match(/\d+?/);
            let romanNum = numberToRoman(r[0]).toLowerCase();
            if (romanNum === 'i')
                romanNum = 'sv';
            let addPath = '/';
            if (req.path.length>r[0].length)
                addPath = '/' + req.path.substr(r[0].length);
            res.redirect('https://p.eagate.573.jp/game/sdvx/' + romanNum + '/p'+addPath);
            break;
        }
        case /^[ivx]+?/gi.test(req.path): {
            let r = req.path.match(/[ivx]+?/);
            let version = r[0];
            if (version==='i')
                version = 'sv';
            let addPath = '/';
            if (req.path.length>r[0].length)
                addPath = '/' + req.path.substr(r[0].length);
            res.redirect('https://p.eagate.573.jp/game/sdvx/' + version + '/p'+addPath);
            break;
        }
        case '/ps':
            res.redirect('https://itunes.apple.com/jp/app/sdvxpsiv/id1287152421?mt=8');
            break;
        case /floor\/?/.test(req.path): {
            let addPath = req.path.substr(5);
            res.redirect('https://p.eagate.573.jp/game/sdvx/sv/p/floor/' + addPath);
            break;
        }
        default:
            res.redirect('https://p.eagate.573.jp/game/sdvx/v/p'+req.path);
    }
});
/*
// numeric
app.get('/([0-9]+)', (req, res) => res.redirect(()=>{
    return 'https://p.eagate.573.jp/game/sdvx/'+numberToRoman(req.params[0])+'/p';
}));
// support roman numeric
app.get('/([ivxmc]+)', (req, res) => res.redirect(()=>{
    return 'https://p.eagate.573.jp/game/sdvx/'req.params[0]+'/p';
}));

*/




// A function to return the Roman Numeral, given an integer
function numberToRoman(num)
{
    // Make sure that we only use the integer portion of the value
    let n = parseInt(num);
    let result = '';
    // Declare a lookup array that we will use to traverse the number:
    let lookup = {
        M: 1000,
        CM: 900, D: 500, CD: 400,  C: 100,
        XC: 90, L: 50, XL: 40, X: 10,
        IX: 9, V: 5, IV: 4,I: 1
    };
    Object.keys(lookup).forEach((roman) => {
        // Determine the number of matches
        var matches = parseInt(n / lookup[roman]);
        // Store that many characters
        result += roman.repeat(matches);
        // Substring that from the number
        n = (n % parseInt(lookup[roman]));
    });

    // The Roman numeral should be built, return it
    return result;
}