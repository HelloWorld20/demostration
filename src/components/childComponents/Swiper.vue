<template>
    <!-- 要用v-if，关闭的时候要把dom清楚掉 -->
    <div class="container" v-if="isShown">
        <div class="mask" @click="closeSwiper"></div>
        <div class="close" @click="closeSwiper">

        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in datas">
                    <div class="swiperItem" :style="{backgroundImage: 'url('+item+')'}"></div>
                </div>
                <div class="swiper-slide">
                    <div class="swiperItem qrcode">
                        <img :src="qrUrl">
                        <h4>长按扫描二维码进行体验</h4>
                        <p>（体验完要记得回来哦）</p>
                    </div>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            
            <!-- 如果需要滚动条 -->
            <!-- <div class="swiper-scrollbar"></div> -->
        </div>
    </div>
</template>

<script>
import config from '@/config/config'
export default {
    data() {
        return {
            datas: [],
            mainData: null,
            qrUrl: ''
        }
    },
    props: ['isShown', 'id'],
    mounted() {
        if(this.isShown && this.isIdLegal()) {
            this.initSwiper()
        }
        
    },
    methods: {
        initSwiper() {
            this.mainData = config.mainData
            // 第一张图片
            this.datas = [
                require('@/assets/' + this.mainData[this.id].posterImg)
            ]
            
            // 后面的 图片
            config.mainData[this.id].swiper.forEach(v => {
                this.datas.push(require('@/assets/' + v))
            })

            // 最后的二维码
            var qr = config.mainData[this.id].qr
            this.qrUrl = require('@/assets/' + qr);

            this.$nextTick(() => {
                var mySwiper = new Swiper ('.swiper-container', {
                    
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    
                    // 如果需要前进后退按钮
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',

                })
            })

             
        },
        closeSwiper() {
            this.$emit('closeSwiper')
        },
        // 判断id是否合法，0以上数字
        isIdLegal() {
            let result = this.id === 0 || this.id > 0

            if(!result) 
                console.warn('id is Illegal:', this.id)

            return result
        }
    },
    watch: {
        isShown(val, oldVal) {
            console.log('watch', val)
            if(val && this.isIdLegal()) {
                this.initSwiper()
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/extend.scss';
.container{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    
    z-index: 100;
}

.mask{
    position: absolute;
    background-color: rgba(1, 1, 1, .7);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.qrcode{
    position: relative;
    background-color: transparent;
    padding-top: 0.83rem;
    box-sizing: border-box;
    color: white;
    text-align: center;
    img{
        display: block;
        position: relative;
        width: 68%;
        height: auto;
        margin: 0 auto 0;
    }
    h4{
        margin-top: tr(30);
        font-size: tr(30);
    }
    p{
        font-size: tr(22);
    }
}
.close{
    height: tr(60);
    width: tr(60);
    position: absolute;
    right: tr(30);
    top: tr(20);
    background-image: url(../../assets/img/btn-close.png);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 999;
}

.swiperItem{
    width: tw(600);
    height: 4rem;
    display: block;
    margin: tr(100) auto;
    // background-image: url(../../assets/img/poster-wild.png);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;

}

.swiper-button-next{
    width: tr(40);
    height: tr(50);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: contain;
    background-image:url(../../assets/img/btn-right.png);
}

.swiper-button-prev{
    width: tr(40);
    height: tr(50);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: contain;
    background-image:url(../../assets/img/btn-left.png);
}

.swiper-pagination-bullet{
    height: tr(23);
    width: tr(23);
    border: 1px solid white;
    background-color: transparent;
    opacity: 1;
}

.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom: 0;
}

.swiper-pagination-bullet-active{
    background-color: white;

}

</style>

