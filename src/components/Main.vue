<template>
    
    <div class="main-container">
        <div id="flipbook" @touchmove.prevent>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">
                    <vue-loading @nextPage="nextPage"></vue-loading>
                </div>
            </div>
            <div class="item"></div>
            <div class="item">
                <div class="home revert" :style="{width: itemWidth, height: itemHeight}">
                    <transition name="banner-start" enter-active-class="animated-slow fadeIn">
                        <img v-show="bannerShown" class="banner-start" :src="require('@/assets/img/head-home.png')">
                    </transition>
                    <transition name="logo" enter-active-class="animated-slow fadeIn">
                        <img v-show="logoShown" :src="require('@/assets/img/logo-24.png')" class="logo">
                    </transition>
                    <transition name="words" enter-active-class="animated-slow fadeIn">
                        <img v-show="wordsShown" :src="require('@/assets/img/words.png')" class="words">
                    </transition>
                    <transition name="words2" enter-active-class="animated-slow fadeIn">
                        <img v-show="words2Shown" :src="require('@/assets/img/tips-good.png')" class="words2">
                    </transition>
                    <transition name="hand" enter-active-class="animated-slow fadeIn">
                        <div v-show="handShown">
                            <img :src="require('@/assets/img/icon-hand.png')" class="hand animated-slow infinite breath">
                            <p class="tips songti">向上滑动翻看案例</p>
                        </div>
                    </transition>
                    

                </div>
            </div>
            <div class="item"></div>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">
                    <vue-main-item :id="0" ref="item" @clickPoster="clickPoster" @showDialog="showDialog"></vue-main-item>
                </div>
            </div>
            <div class="item"></div>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">
                    <vue-main-item :id="1" @clickPoster="clickPoster" @showDialog="showDialog"></vue-main-item>
                </div>
            </div>
            <div class="item"></div>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">
                    <vue-main-item :id="2" @clickPoster="clickPoster" @showDialog="showDialog"></vue-main-item>
                </div>
            </div>
            <div class="item"></div>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">
                    <vue-main-item :id="3" @clickPoster="clickPoster" @showDialog="showDialog"></vue-main-item>
                </div>
            </div>
            <div class="item"></div>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">
                    <vue-main-item :id="4" @clickPoster="clickPoster" @showDialog="showDialog"></vue-main-item>
                </div>
            </div>
            
            
            <div class="item"></div>
            <div class="item">
                <div class="revert" :style="{width: itemWidth, height: itemHeight}">

                    <div class="container">
                        <transition name="banner-end" enter-active-class="animated-slow fadeIn">
                            <img v-show="bannerEndShown" :src="require('@/assets/img/head.png')" class="banner-end">
                        </transition>
                        <transition name="tips-end" enter-active-class="animated-slow fadeIn">
                            <p v-show="bannerEndShown" class="next-tips songti">向下滑动查看上一页</p>
                        </transition>
                        <div class="poster-container">
                            <div class="types-btn" v-for="item in typeBtns">
                                <transition name="btn" enter-active-class="animated-slow fadeIn">
                                    <div v-show="btnShown" class="btn songti">{{item}}</div>
                                </transition>
                                <!-- <img :src="plus" class="icon-plus"> -->
                                <div class="icon-plus" :class="{iconPlusShow: iconPlusShown}"></div>
                            </div>
                            
                        </div>
                        <div class="frame">
                            <div class="left relative">
                                <transition enter-active-class="animated rotateIn">
                                    <img v-show="iconShown" :src="require('@/assets/img/icon-true.png')" class="icon">
                                </transition>
                                <div class="desc songti">马上了解<br>抓住时机<br>相互信任</div>
                            </div>
                            <div class="middle relative">
                                <transition name="center" enter-active-class="animated-slow fadeIn">
                                    <img v-show="centerShown" :src="require('@/assets/img/btn-custom.png')" class="icon-center" @click="showDialog">
                                </transition>
                                <div class="desc-center">
                                    <img :src="require('@/assets/img/icon-hand.png')" class="hand animated infinite" :class="{breath: bounceHand}">
                                    <p class="custom-tips songti">点击按钮了解定制详情</p>
                                </div>
                            </div>
                            <div class="right relative">
                                <transition enter-active-class="animated rotateIn">
                                    <img v-show="iconShown" :src="require('@/assets/img/icon-false.png')" class="icon">
                                </transition>
                                <div class="desc songti">想破头脑<br>躲躲藏藏<br>犹豫不决</div>
                            </div>
                        </div>    
                    </div>

            


                </div>
            </div>
            
        </div>
        <vue-swiper :isShown='isSwiperShown' :id="id" @closeSwiper="closeSwiper"></vue-swiper>
        <vue-dialog @closeDialog="closeDialog" :isDialog="isDialog"></vue-dialog>
    </div>
</template>

<script>
import VueLoading from '@/components/Loading'
import VueMainItem from '@/components/MainItem'
import VueSwiper from '@/components/childComponents/Swiper'
import VueDialog from '@/components/childComponents/Dialog'
import {bus} from '@/config/util'
export default {
    data() {
        return {
            $books: null,
            itemWidth: window.innerWidth + 'px',
            itemHeight: window.innerHeight + 'px',
            isSwiperShown: false,
            isDialog: false,
            plus: require('@/assets/img/icon-plus.png'),
            id: 0,
            flipMusic: null,
            realbgMusic: null,
            bgMusic: null,
            typeBtns: [
                '全景合成','真人互动','视频+生成','互动交互','恶搞动画','3D视觉控','长屏滑动','音频录制','闯关游戏','投票生成','换脸生成','录屏剧情'
            ],
            btnShown: true,
            iconPlusShown: false,
            bannerEndShown: true, 

            iconShown: false,
            centerShown: false,
            bounceHand: false,

            logoShown: false,
            wordsShown: false,
            words2Shown: false,
            bannerShown: false,
            handShown: false,
            
            logoTimer: null,
            wordsTimer: null,
            words2Timer: null,
            bannerTimer: null,
            handTimer: null,

            timer1: null,
            timer2: null,
            timer3: null,
            timer4: null,
            timer5: null,
            timer6: null,
            timer7: null,
        }
    },
    components: {VueLoading, VueMainItem, VueSwiper, VueDialog},
    mounted(){
        this.initAudio();
        this.initTurn();
        this.initAnimate();
        
    },
    methods: {
        initAudio() {
            this.flipMusic = new Audio()
            // this.flipMusic.loop = true
            
            this.flipMusic.addEventListener('canplaythrough', () => {
                this.flipMusic.play();
                this.flipMusic.pause();
            }, false)
            document.addEventListener('WeixinJSBridgeReady', () => {
                this.flipMusic.play();
                this.flipMusic.pause();
            }, false)
            this.flipMusic.src = require('@/assets/audio/flip.mp3')

            // 这里的背景音乐只能做预加载。因为音乐暂停后再play()不能循环播放
            this.bgMusic = new Audio()       
            this.bgMusic.loop = true

            this.bgMusic.addEventListener('canplaythrough', () => {
                this.bgMusic.play();
                this.bgMusic.pause();
            }, false)
            document.addEventListener('WeixinJSBridgeReady', () => {
                this.bgMusic.play();
                this.bgMusic.pause();
            }, false)
            this.bgMusic.src = require('@/assets/audio/bgm.mp3')


        },
        initTurn() {
            this.$books = $("#flipbook")
            this.$books.turn({
                width: innerHeight*2,
                height: innerWidth,
                turnCorners: "bl,br",
                // page: 3,
                // display: 'single',
                elevation: 300,
                duration: 1500,
                // autoCenter: true
            });
            // 翻书中禁止再翻书
            this.$books.bind('turned', (event, page) => {
                bus.$emit('turned', Math.floor(page/2))
                if(page == (this.$books.turn("pages")-1)) {
                    this.initEndAnimate()
                } else {
                    this.resetEndAnimate()
                }
            })
            // 翻书时设置id
            this.$books.bind('turning', (event, page) => {
                // 两页两页地翻
                this.id = Math.floor(page/2)-2
                this.flipMusic.play()
            })

            this.initSwipe()
        },
        initSwipe() {
            let sx, sy, ex, ey;
            document.addEventListener('touchstart', (event) => {
                sx = event.touches[0].clientX
                sy = event.touches[0].clientY
      
            }, false);

            document.addEventListener('touchend', (event) => {
                ex = event.changedTouches[0].clientX;
                ey = event.changedTouches[0].clientY;

                let offsetX = ex - sx
                let offsetY = ey - sy

                if(Math.abs(offsetX) < innerWidth*0.5 && offsetY > innerHeight*0.2) {
                    // 如果是loading页，不翻
                    if(this.$books.turn("page") <= 3) 
                        return;
                    this.handleSwipe('down');

                    
                } else if (Math.abs(offsetX) < innerWidth*0.5 && offsetY < innerHeight * -0.2) {
                    // 如果是首页和loading页，不翻
                    if(this.$books.turn("page") <= 1) 
                        return;
                    this.handleSwipe('up')
                    

                }

            }, false);

        },
        handleSwipe(method) {
            
            if($("#flipbook").turn("animating")) return;
            
            
            if(method == 'up') {
                this.$books.turn('next');
            } else if(method === 'down') {
                this.$books.turn('previous');
            }

        },
        nextPage() {
            this.handleSwipe('up');

            let platform = (navigator.userAgent.toLowerCase().indexOf('android') < 0) ? 'apple' : 'android';


            // ios下只要正常播放音乐就可以。
            if(platform === 'apple') {
                this.bgMusic.play();
                document.addEventListener('visibilitychange', (e) => {
                    let isHidden = document.hidden
                    if(isHidden) {
                        this.bgMusic.pause();
                    } else {
                        if(this.bgMusic.paused) {
                            // 回来之后无法再播放。。。。
                            this.bgMusic.play();
                        }
                    }
                }, false)
            } else {
                // 其它情况下，已经暂停过的Audio对象，再play不会循环播放，只能在new一个audio。
                if(!this.realbgMusic) {
                    this.realbgMusic = new Audio()
                    this.realbgMusic.loop = true;
                    this.realbgMusic.addEventListener('canplaythrough', () => {
                        this.realbgMusic.play()
                    }, false)
                    document.addEventListener('WeixinJSBridgeReady', () => {
                        this.realbgMusic.play();
                    }, false)

                    this.realbgMusic.src = require('@/assets/audio/bgm.mp3')
                    this.realbgMusic.play();
                    
                    document.addEventListener('visibilitychange', (e) => {
                        let isHidden = document.hidden
                        if(isHidden) {
                            this.realbgMusic.pause();
                        } else {
                            if(this.realbgMusic.paused) {
                                this.realbgMusic.play();
                            }
                        }
                    }, false)
                }
                
            }
                

                
            
        },
        closeSwiper() {
            this.isSwiperShown = false
        },
        clickPoster(id) {
            this.isSwiperShown = true
        },
        initAnimate() {

            this.timer1 = setTimeout(() => {
                this.logoShown = true
                this.wordsShown = true
            }, 1000/3);
            this.timer2 = setTimeout(() => {
                this.bannerShown = true
            }, 2000/3);
            this.timer3 = setTimeout(() => {
                this.words2Shown = true
            }, 3000/3);
            this.timer4 = setTimeout(() => {
                this.handShown = true
            }, 4000/3);
        },
        resetAnimate() {
            clearTimeout(this.timer1) 
            clearTimeout(this.timer2)
            clearTimeout(this.timer3)
            clearTimeout(this.timer4)
            this.logoShown = false
            this.wordsShown = false
            this.bannerShown = false
            this.words2Shown = false
            this.handShown = false
        },
        initEndAnimate() {
            this.iconPlusShown = true
            this.timer7 = setTimeout(() => {
                this.iconShown = true
                this.centerShown = true
                this.bounceHand = true
            }, 1000);
        },
        resetEndAnimate() {
            clearTimeout(this.timer5) 
            clearTimeout(this.timer6)
            clearTimeout(this.timer7)

            this.btnShown = true
            this.iconPlusShown = false
            this.bannerEndShown = true
            this.iconShown = false
            this.centerShown = false
            this.bounceHand = false
        },
        showDialog() {
            if(!this.$route.query.noQrcode) {
                this.isDialog = true
            }
        },
        closeDialog() {
            this.isDialog = false
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer1) 
        clearTimeout(this.timer2)
        clearTimeout(this.timer3)
        clearTimeout(this.timer4)
        clearTimeout(this.timer5) 
        clearTimeout(this.timer6)
        clearTimeout(this.timer7)
        this.bgMusic.pause();
    }
}
</script>

<style lang="scss" scoped>

$green: rgb(40,113,55);

@function tr($px){
    @return $px/240*1rem;
}

@function tw($px) {
    @return $px/750*100%;
}

.animated-slow {
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.animated-slow.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
@-webkit-keyframes breath {
    0%, 100%{
        transform: translate3d(0, 5px, 0);
    }
    50% {
        transform: translate3d(0, 0, 0);
    }

}

@keyframes breath {
    0%, 100%{
        transform: translate3d(0, 5px, 0);
    }
    50% {
        transform: translate3d(0, 0, 0);
    }
}

.breath {
  animation-name: breath;
  transform-origin: center bottom
}



.relative{
    position: relative;
}
.home{
    position: relative;
}
.banner-start{
    position: absolute;
    height: auto;
    width: tw(665);
    left: tw(42);
    display: block;
    // margin: 0 auto;
    top: tr(32);
}
.banner-end{
    position: absolute;
    height: auto;
    width: tw(665);
    left: tw(42);
    display: block;
    // margin: 0 auto;
    top: tr(32);
}

.logo{
    display: block;
    position: relative;
    // margin: tr(32) + tr(120) auto 0;
    margin: 0 auto 0;
    top: tr(215);
    height: tr(336);
    // width: tw(480);
    width: auto;
    // left: tw(135);
}

.words{
    display: block;
    position: relative;
    top: 0;
    height: tr(88);
    width: auto;
    margin: tr(86)+tr(215) auto 0;
}

.words2{
    display: block;
    position: relative;
    top: 0;
    // height: tr(217);
    height: auto;
    margin: tr(40) auto;
    width: tw(630);
}

.hand{
    display: block;
    position: relative;
    top: 0;
    width: tr(50);
    height: auto;
    margin: 0 auto;
}

.tips{
    text-align: center;
    color: $green;
    font-size: tr(42);
}

.next-tips{
    position: absolute;
    width: 100%;
    font-size: tr(22);
    margin: tr(120) 0 0;
    text-align: center;
    color: $green;
}

.poster-container{
    height: tr(730);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: tw(68);
    padding-right: tw(68);
    padding-top: tr(36);
    margin-top: tr(150);
    box-sizing: border-box;
    .types-btn{
        position: relative;
        font-size: tr(38);
        color: $green;
        width: 50%;
        .btn {
            display: block;
            width: tr(200);
            text-align: center;
            border: 1px solid $green;
            border-radius: tr(10);
            padding: 0 tr(12);
            font-weight: bold;
            height: tr(60);
            line-height: tr(70);
        }
        .icon-plus {
            position: absolute;
            display: block;
            width: 0;
            height: tr(70);
            float: right;
            left: tr(240);
            top: tr(-5);
            background-image: url(../assets/img/icon-plus.png);
            background-size: tr(50) tr(50);
            background-repeat: no-repeat;
            background-position: left;
            transition: all .5s ease-in-out;
            // opacity: 0;
        }
        .iconPlusShow{
            width: tr(50);
        }
    }
    
}

.frame{
    width: tw(686);
    height: tr(300);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    background-image: url(../assets/img/frame1.png);
    display: flex;
    justify-content: center;
    margin: 0 auto;

    .left{
        width: 25%;
        // background-color: rgba(1,255,255,.1)
    }
    .middle{
        width: 46%;
        // background-color: rgba(255,1,255,.1)
        .custom-tips{
            font-size: tr(25);
            margin: tr(10);
        }
    }
    .right{
        width: 25%;
        // background-color: rgba(255,255,1,.1)
    }
    div{
        .icon{
            width: tr(77);
            height: tr(77);
            display: block;
            margin: tr(24) auto 0;
        }
        .icon-center{
            position: absolute;
            width: 90%;
            left: 5%;
            display: block;
            top: tr(24);
            // margin: tr(24) auto 0;
        }
        .desc{
            display: block;
            font-size: tr(34);
            color: $green;
            // margin: 0 auto;
            // padding-top: tr(20);
            writing-mode: vertical-rl;
            // width: 100%;
            text-align: center;
            line-height: tr(45);
            width: tr(126);
            text-align: left;

            position: absolute;
            margin-left: tr(-63);
            left: 50%;
            top: tr(116);
        }
        .desc-center{
            position: absolute;
            width: 100%;
            font-size: tr(42);
            color: $green;
            text-align: center;
            line-height: tr(45);
            // margin-top: tr(10);
            top: tr(120);
        }
    }
}



///////////////////////

#flipbook{
    width:400px;
    height:300px;
    top: -5rem;
    left: 100%;
    z-index: 10;
    /* top: -100%; */
    transform-origin: 0 0;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
}

#flipbook .item {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: left;
    background-image: url(../assets/img/bg-main.png);
}

.revert{
    position: relative;
    /* width: 100%;
    height: 100%; */
    left: 0;
    top: 100%;
    /* background-color: rgba(100, 100, 100, .2); */
    transform-origin: 0 0;
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg);
    -moz-transform:rotate(-90deg);
    -webkit-transform:rotate(-90deg);
    -o-transform:rotate(-90deg);
}

#flipbook .page{
    width:400px;
    height:300px;
    background-color:white;
    line-height:300px;
    font-size:20px;
    text-align:center;
}

#flipbook .page-wrapper{
    -webkit-perspective:2000px;
    -moz-perspective:2000px;
    -ms-perspective:2000px;
    -o-perspective:2000px;
    perspective:2000px;
}

#flipbook .hard{
    background:#ccc !important;
    color:#333;
    -webkit-box-shadow:inset 0 0 5px #666;
    -moz-box-shadow:inset 0 0 5px #666;
    -o-box-shadow:inset 0 0 5px #666;
    -ms-box-shadow:inset 0 0 5px #666;
    box-shadow:inset 0 0 5px #666;
    font-weight:bold;
}

#flipbook .odd{
    background:-webkit-gradient(linear, right top, left top, color-stop(0.95, #FFF), color-stop(1, #DADADA));
    background-image:-webkit-linear-gradient(right, #FFF 95%, #C4C4C4 100%);
    background-image:-moz-linear-gradient(right, #FFF 95%, #C4C4C4 100%);
    background-image:-ms-linear-gradient(right, #FFF 95%, #C4C4C4 100%);
    background-image:-o-linear-gradient(right, #FFF 95%, #C4C4C4 100%);
    background-image:linear-gradient(right, #FFF 95%, #C4C4C4 100%);
    -webkit-box-shadow:inset 0 0 5px #666;
    -moz-box-shadow:inset 0 0 5px #666;
    -o-box-shadow:inset 0 0 5px #666;
    -ms-box-shadow:inset 0 0 5px #666;
    box-shadow:inset 0 0 5px #666;
    
}

#flipbook .even{
    background:-webkit-gradient(linear, left top, right top, color-stop(0.95, #fff), color-stop(1, #dadada));
    background-image:-webkit-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image:-moz-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image:-ms-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image:-o-linear-gradient(left, #fff 95%, #dadada 100%);
    background-image:linear-gradient(left, #fff 95%, #dadada 100%);
    -webkit-box-shadow:inset 0 0 5px #666;
    -moz-box-shadow:inset 0 0 5px #666;
    -o-box-shadow:inset 0 0 5px #666;
    -ms-box-shadow:inset 0 0 5px #666;
    box-shadow:inset 0 0 5px #666;
} 
</style>