<template>
    <div class="container">
        <img :src="require('@/assets/img/head.png')" class="banner">
        <p class="next-tips songti">向下滑动查看上一页</p>
        <div class="poster-container">
            <img v-show="hasTag" class="tag" :src="require('@/assets/img/icon-24product.png')">
            <img :src="posterImg" class="poster" @click="clickPoster" :class="{shadow: isShadow}">
            <div class="poster-tips songti" :class="{shadow: isShadow}">
                点击图片查看案例详情
            </div>
        </div>
        <div class="frame">
            <div class="left relative">
                <transition enter-active-class="animated rotateIn">
                    <img v-show="iconShown" :src="require('@/assets/img/icon-true.png')" class="icon">
                </transition>
                <div class="desc songti" v-html="positiveTips"></div>
            </div>
            <div class="middle relative">
                <transition name="center" enter-active-class="animated fadeIn">
                    <!-- <img v-show="centerShown" :src="typeImg" class="icon-center"> -->
                    <div v-show="centerShown" class="icon-center">{{title}}</div>
                    
                </transition>
                <div class="desc-center songti" v-html="mainTips"></div>
            </div>
            <div class="right relative">
                <transition enter-active-class="animated rotateIn">
                    <img v-show="iconShown" :src="require('@/assets/img/icon-false.png')" class="icon">
                </transition>
                <div class="desc songti" v-html="nagativeTips"></div>
            </div>
        </div>
        <!-- <transition name="sideTab" enter-active-class="animated slideInRight">
            <div v-show="sideTabShown" class="sideTab songti" @click="showDialog">我要定制</div>
        </transition> -->
    </div>
</template>

<script>

import config from '@/config/config'
import {bus} from '@/config/util'
export default {
    data() {
        return{
            // id: 0,
            mainData: null,
            posterImg: '',
            isShadow: false,
            positiveTips: '',
            nagativeTips: '',
            mainTips: '',
            // typeImg: '',
            hasTag: false,
            sideTabShown: false,
            iconShown: false,
            centerShown: false,
            timer1: null,
            timer2: null,
            hideQrcode: false,
            title: '',
        }
    },
    props: ['id'],
    mounted() {

        this.hideQrcode = this.$route.query.noQrcode;
        if(this.hideQrcode) {
            this.sideTabShown = false;
        }
        this.mainData = config.mainData[this.id || 0]

        if(!this.mainData) 
            this.mainData = config.mainData[0]

        this.posterImg = require('@/assets/' + this.mainData.posterImg || '');
        // console.log(this.posterImg)
        // this.typeImg = require('@/assets/' + this.mainData.typeImg || '');
        this.title = this.mainData.title

        this.positiveTips = this.mainData.positiveTips || '';
        this.nagativeTips = this.mainData.nagativeTips || '';
        this.mainTips = this.mainData.mainTips || '';
        this.hasTag = this.mainData.hasTag || false;
        bus.$on('turned', page => {
            if(this.id == (page-2)) {
                this.initAnimate()
            } else {
                this.resetAnimate()
            }
            
        })
    },
    methods: {
        clickPoster() {
            this.$emit('clickPoster', this.id)
        },
        showDialog() {
            this.$emit('showDialog')
        },
        initAnimate() {
            // this.timer1 = setTimeout(() => {
                this.centerShown = true
                
            // }, 1000);
            this.timer2 = setTimeout(() => {
                if(!this.hideQrcode) {
                    this.sideTabShown = true
                }
                this.iconShown = true
                this.isShadow = true
            }, 1000);
        },
        resetAnimate() {
            // clearTimeout(this.timer1)
            
            this.sideTabShown = false
            this.iconShown = false
            this.centerShown = false
            this.isShadow = false
        }
    },
    beforeDestroy() {

        clearTimeout(this.timer2)
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



.relative{
    position: relative;
}

.container{
    position: relative;
    width: 100%;
    height: 100%;
}
.banner{
    position: relative;
    height: auto;
    width: tw(665);
    
    display: block;
    margin: 0 auto;
    top: tr(32);
}

.next-tips{
    position: relative;
    font-size: tr(22);
    margin: tr(32)+tr(22) 0 0;
    text-align: center;
    color: $green;
}

.poster-container{
    .poster{
        height: tr(677);
        width: auto;
        display: block;
        margin: tr(22) auto 0;
        transition: all .4s ease-in-out;
    }
    .shadow{
        box-shadow: 4px 4px 10px 0px rgba(1,1,1, .4);
        transform: translateX(-1px) translateY(-2px);
        // transform: ;
    }
    .tag{
        position: absolute;
        height: tr(170);
        left: tw(120);
        top: tr(140);
        z-index: 1;
    }
    .poster-tips{
        color: white;
        font-size: tr(20);
        text-align: center;
        position: relative;
        height: tr(35);
        bottom: tr(35);
        line-height: tr(35);
        background-color: rgba(40,113,55,.5);
        width: tw(281);
        margin: 0 auto;
        transition: all .4s ease-in-out;
    }
}

.frame{
    width: tw(686);
    height: tr(300);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    background-image: url(../assets/img/frame2.png);
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
    }
    .right{
        width: 25%;
        // background-color: rgba(255,255,1,.1)
    }
    div{
        .icon{
            width: tr(77);
            height: auto;
            display: block;
            margin: tr(24) auto 0;
        }
        // .icon-center{
        //     position: absolute;
        //     width: 90%;
        //     left: 5%;
        //     display: block;
        //     top: tr(24);
        // }
        .icon-center{
            position: absolute;
            width: 90%;
            left: 5%;
            display: block;
            top: tr(24);
            font-size: tr(48);
            text-align: center;
            color: white;
            background-color: $green;
            height: tr(70);
            border-radius: 6px;
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

.sideTab{
    height: tr(54);
    width: tw(135);
    background-color: $green;
    position: absolute;
    right: 0;
    top: tr(270);
    font-size: tr(26);
    line-height: tr(60);
    padding-left: tr(25);
    box-sizing: border-box;
    color: white;
    border-radius: tr(27) 0 0 tr(27);
}


</style>

