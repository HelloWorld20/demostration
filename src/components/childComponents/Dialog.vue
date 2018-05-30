<template>
    <div v-show="isDialog" class="dialog">
        <div class="close" @click="closeDialog"></div>
        <img :src="qrUrl">
        <p>长按扫描二维码咨询定制详情</p>
    </div>
</template>

<script>
export default {
    data() {
        return{
            qrUrl: '',
            salesArr: ['img/qr-柯婷婷.png', 'img/qr-杨晓东.png', 'img/qr-易小琳.png']
        }
    },
    props: ['isDialog'],
    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        }
    },
    watch: {
        isDialog(val) {
            if(val) {
                let sales = this.salesArr[Math.floor(Math.random()*3)]

                this.qrUrl = require('@/assets/' + sales);
            }
        }
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
.dialog{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 99;
    background-color: rgba(1,1,1,.7);
    img {
        width: 58%;
        display: block;
        position: relative;
        margin: 1.5rem auto 0;
    }

    p {
        font-size: .14rem;
        text-align: center;
        color: white;
    }
}

</style>