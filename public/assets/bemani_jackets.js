function imgError(e){
    e.stopPropagation();
    console.error("Image Not Found: " + e.target.getAttribute("src"));
    //e.target.parentNode.removeChild(e.target);
    if (!e.target.classList.contains("img-hidden"))
        e.target.classList.add("img-hidden");
    return true;
}
function zerofill(value, num){
    return (('0'+value).slice(num*-1));
}

const baseURL = 'https://p.eagate.573.jp/game/bemani/fansite/p';
let size = 200;
if (document.body.clientWidth < 1024) {
    size = Math.floor(document.body.clientWidth / 2.6);
    if (size > 200) size = 200;
}
const imgSize = size;



let date = new Date();

Vue.component('img-jacket', {
    props: [
        'ym',
        'game',
        'num',
    ],
    data: () => {
        return {
            'base': baseURL,
            'width': imgSize,
            'height': imgSize
        };
    },
    template: '<img ' +
        ' :src=\'`${base}/images/music/${ym}_jk/${ym}_${game}_${zerofillNum}.jpg`\'' +
        ' :width="`${width}`" :height="`${height}`"' +
        ' class="img-shadow img-load"' +
        ' v-on:error.self.capture="imgError">',
    computed: {
        zerofillNum: function(){
            return zerofill(this.num,2);
        }
    },
    created: function() {
        this.base = baseURL;
    },
    updated: () => {
        let img=document.getElementsByClassName('img-load');
        for (let i in img) {
            if (img[i].classList.contains("img-hidden"))
                img[i].classList.remove("img-hidden");
            img[i].addEventListener("error", imgError);
        }
    },
    methods: {
        'imgError': imgError
    }
});
const vm = new Vue({
    el: '#app',
    data: {
        arcadeList: {
            "iidx"  : "BEATMANIA IIDX",
            "sv"    : "SOUND VOLTEX",
            "jb"    : "jubeat",
            "nst"   : "ノスタルジア",
            "po"    : "pop'n music",
            "gd"    : "GITADORA",
            "dan"   : "DANCERUSH STARDOM",
            "ddr"   : "DanceDance Revolution",
            "de"    : "Dance Evolution",
            "bs"    : "BEAT STREAM",
            "msc"   : "MÚSECA",
            "rb"    : "REFLEC BEAT",
        },
        dateList: [],
        jackets: [],
        game: "",
        ym: "",
        loaded: false,
    },
    created: function(){
        this.listDate();
    },
    watch: {
        game: function(val,old){
            this.loaded = false;
            vm.$forceUpdate();
            if (this.ym!=='')
                this.loaded = true;
        },
        ym: function(val,old){
            this.loaded = false;
            vm.$forceUpdate();
            if (this.game!=='')
                this.loaded = true;
        }
    },
    methods: {
        listDate: function() {
            let current=((date.getFullYear()*100)+(date.getMonth()));
            if (date.getMonth()<1)
                current=((date.getFullYear()-1)*100+12);
            for(let y=date.getFullYear(); y >=2014; y--){
                for(let m=12; m >= 1; m--){
                    let ym=(y*100)+m;
                    if(ym < 201411) break;
                    if(ym > current) continue;
                    this.dateList.push({key:ym, date:(y+"年"+(("0"+m).slice(-2))+"月")});
                }
            }
        }
    }
});
