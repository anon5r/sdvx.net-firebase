const aclist={
    "iidx"  : "BEATMANIA IIDX",
    "sv"    : "SOUND VOLTEX",
    "jb"    : "jubeat",
    //"nst"   : "Nostalgia",
    "nst"   : "ノスタルジア",
    "po"    : "pop'n music",
    "gd"    : "GITADORA",
    "dan"   : "DANCERUSH STARDOM",
    "ddr"   : "DanceDance Revolution",
    "de"    : "Dance Evolution",
    "bs"    : "BEAT STREAM",
    "msc"   : "MÚSECA",
    "rb"    : "REFLEC BEAT",
};
let date = new Date();
const d = document;
d.addEventListener('DOMContentLoaded',(e) => {
    // select arcade
    let sel_ac=d.querySelector("#select-ac");
    for(let key in aclist){
        let opt = d.createElement("option");
        opt.value = key;
        if(typeof opt.textContent=="function")
            opt.textContent = aclist[key];
        else opt.innerText = aclist[key];
        sel_ac.appendChild(opt);
    }
    // select date
    let sel_month=d.querySelector("#select-month");
    let cym=((date.getFullYear()*100)+(date.getMonth()));
    if (date.getMonth()<1)
        cym=((date.getFullYear()-1)*100+12);
    for(let y=date.getFullYear(); y >=2014; y--){
        for(let m=12; m >= 1; m--){
            let ym=(y*100)+m;
            if(ym < 201411) break;
            if(ym > cym) continue;
            let opt=d.createElement("option");
            opt.value = ym;
            if(typeof opt.textContent=="function")
                opt.textContent = (y+"年"+(("0"+m).slice(-2))+"月");
            else opt.innerText = (y+"年"+(("0"+m).slice(-2))+"月");
            sel_month.appendChild(opt);
        }
    }

    sel_ac.addEventListener("change",(e) => {
        let opts=d.querySelectorAll("#select-month option");
        let idx=d.querySelector("#select-month").selectedIndex;
        let month=opts[idx].value;
        let acopts=d.querySelectorAll("#select-ac option");
        console.log("acopts=",acopts);
        let acidx=d.querySelector("#select-ac").selectedIndex;
        console.log("acidx=",acidx);
        let ac=acopts[acidx].value;
        if(ac.length <= 0) return false;
        if(month.length <= 0) return false;
        drawJackets(ac,month);
    });

    sel_month.addEventListener("change",(e) => {
        let opts=d.querySelectorAll("#select-ac option");
        let idx=d.querySelector("#select-ac").selectedIndex;
        let ac=opts[idx].value;
        if(ac.length <= 0) return false;
        if(ac.length <= 0){
            alert("先に筐体を選択してください");
            this.value = "";
            return false;
        }
        opts=d.querySelectorAll("#select-month option");
        idx=d.querySelector("#select-month").selectedIndex;
        let ym=opts[idx].value;
        drawJackets(ac,ym);
    });
});
const drawJackets = (ac,ym) => {
    let listImg=d.getElementById("jacket-list");
    let row=d.createElement('li');
    row.classList.add("img-row");
    //let r=1;
    listImg.innerHTML = '';
    for(let i=0;i<=30;i++){
        let img=createImage(ac, ym, i);
        if (img===true) continue;
        row.appendChild(img);
        listImg.appendChild(row);
        /*
        row.appendChild(img);
        if(r%6==0) {
            listImg.appendChild(row);
            row=d.createElement('div');
            row.classList.add("img-row");
            r=0;
        }
        r++;
        */
    }
};
const createList = (element) => {
    let li=d.createElement("li");
    li.appendChild(element);
    return li;
};
const createImage = (ac,ym,i) => {
    let imgUrl="https://p.eagate.573.jp/game/bemani/fansite/p/images/music/"+ym+"_jk/"+ym+"_"+ac+"_"+(('0'+i).slice(-2))+".jpg";
    img=d.createElement("img");
    let attrs={
        "src": imgUrl,
        "width": 200,
        "height": 200,
        "data-original": imgUrl
    };
    let keys = Object.keys(attrs);
    for (let i in keys)
        img.setAttribute(keys[i], attrs[keys[i]]);
    img.addEventListener("error",function(e){
        this.parentNode.removeChild(this);
        console.error("Image Not Found: " + this.getAttribute("src"));
        return true;
    });
    img.classList.add("img-shadow");
    return img;
};