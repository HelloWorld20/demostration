<template>
    <div class="container">
        <div class="year heiti">{{ animatedNumber }}</div>
        <transition enter-active-class="animated fadeIn">
            <p v-show="showTips">营销也可以很好玩</p>
        </transition>
    </div>
</template>

<script>
import config from '@/config/config'
export default {
    data() {
        return {
            loaded: 0,
            totalLen: '',
            showTips: false,
            number: 0,
            animatedNumber: 0,
            start: new Date().getTime(),
            DELAY: 4000,
            year: (new Date()).getFullYear()
        }
    },
    mounted() {
        this.initImg();
        
        // 不做音乐预加载，因为ios音乐预加载有问题，
        // this.number = this.year
    },
    methods: {
        initImg() {
            window.imagesCache = [];
            this.totalLen = config.images.length;
            
            let delay = 0;
            let percentage = 0

            config.images.forEach( (v, i) => {
                let img = new Image();
                img.src = require('@/assets/' + v);

                window.imagesCache[i] = img
                img.onerror = img.onload = () => {
                    this.loaded++;

                    percentage = this.loaded/this.totalLen
                    if(percentage < delay) {
                        this.number = percentage*this.year

                        if(this.loaded >= this.totalLen) {
                            this.number = this.year
                            this.handleLoaded();
                        }
                    }

                    
                }
            })
            // 如果加载不够5秒，强行加到5秒
            let timer = setInterval(() => {

                delay = (new Date().getTime() - this.start)/this.DELAY;

                if(delay < percentage) {
                    this.number = delay*this.year
                }

                if(delay > 1) {
                    clearInterval(timer)
                    if(this.loaded >= this.totalLen) {
                        this.number = this.year
                        this.handleLoaded();
                    }
                }
            }, 300)


        },
        handleLoaded() {
            // if(this.showTips) return
            setTimeout(() => {
                this.showTips = true
                setTimeout(() => {
                    // this.$router.push('./main')
                    this.$emit('nextPage')
                }, 3000);
            }, 500);
        }
    },
    watch: {
    number: function(newValue, oldValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(0)
        })
        .start()
      animate()
    }
  }
}
</script>

<style scoped lang="scss">
$green: rgb(40,113,55);

@function tr($px){
    @return $px/240*1rem;
}

@function tw($px) {
    @return $px/750*100%;
}



.container{
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/bg-loading.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center top;
    color: $green;
    text-align: center;

    .year {
        font-size: tr(72);
        height: tr(95);
        border-bottom: $green 1px solid;
        top: tr(460);
        position: relative;
        width: tw(516);
        margin: 0 auto;
    }
    p {
        position: relative;
        display: block;
        font-size: tr(36);
        top: tr(460);
        margin: tr(24);
    }
}

</style>