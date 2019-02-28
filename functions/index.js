const functions = require('firebase-functions');

exports.index=functions.https.onRequest((req, res) => {
    console.info('req.path=',req.path);
    let pathWithoutSlash = (req.path !== null) ? req.path.substr(1) : '';

    if (req.path === null || req.path === '/') {
        let nextRelease = new Date();
        nextRelease.setFullYear(2019);	// 2019
        nextRelease.setMonth(1);	// Feb
        nextRelease.setDate(28);	// 28
        if (Date.now() >= nextRelease.getTime())
            res.redirect('https://p.eagate.573.jp/game/sdvx/v/p');
        else
            res.redirect('https://p.eagate.573.jp/game/sdvx/iv/p');
    } else if (/^\d+\/?/.test(pathWithoutSlash)) {
        let r = req.path.match(/\d+/);  // req.path will start /3 or /4 or /5
        let romanNum = numberToRoman(r[0]).toLowerCase();
        if (romanNum === 'i')
            romanNum = 'sv';
        let addPath = '/';
        if (req.path.length>(r[0].length+1))
            addPath = req.path.substr(r[0].length+1);
        res.redirect('https://p.eagate.573.jp/game/sdvx/' + romanNum + '/p'+addPath);
        //res.send('https://p.eagate.573.jp/game/sdvx/' + romanNum + '/p'+addPath);
    } else if (/^(gw|hh|vw)\/?/i.test(pathWithoutSlash)) {
        // Short code
        let version = 'sv';
        switch (pathWithoutSlash.substring(0, 2).toLowerCase()) {
            case 'gw':
                version = 'iii';
                break;     // GRAVITY WARS
            case 'hh':
                version = 'iv';
                break;      // Heavenly Haven
            case 'vw':
                version = 'v';
                break;       // Vivid Wave
        }
        let addPath = '';
        if (req.path.length > 3)    // req.path will start likes /gw, /hh or /vw
            addPath = '/' + req.path.substr(3);
        res.redirect('https://p.eagate.573.jp/game/sdvx/' + version + '/p' + addPath);
    //} else if (req.path === '/ps') {
    //  // /ps will be worked configured by firebase,json
    //         res.redirect('https://itunes.apple.com/jp/app/sdvxpsiv/id1287152421?mt=8');
    } else if (/^floor\/?/i.test(pathWithoutSlash)) {
        let addPath = req.path.substr(6);   // req.path starts with /floor
        res.redirect('https://p.eagate.573.jp/game/sdvx/sv/p/floor/' + addPath);
    } else if (/^[vx]?i{0,3}[vx]?\/?.*$/i.test(pathWithoutSlash)) {
        let r = pathWithoutSlash.match(/^[vx]?i{0,3}[vx]?/i);
        let version = r[0].toLowerCase();
        if (version==='i')
            version = 'sv';
        let addPath = '/';
        if (req.path.length>r[0].length)
            addPath = '/'+req.path.substr(r[0].length+1);
        res.redirect('https://p.eagate.573.jp/game/sdvx/' + version + '/p'+addPath);
        //res.send('https://p.eagate.573.jp/game/sdvx/' + version + '/p'+addPath);
    } else {
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