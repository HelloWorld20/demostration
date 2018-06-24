<template>
    <div id="app">
        <p style="position: absolute; z-index: 0; font-size: 20px; text-align: center; width: 100%;margin-top: 200px;">请在移动端访问</p>
        <router-view></router-view>
    </div>
</template>

<script>
    import './config/rem';

    export default {

    };

</script>

<style>

@import './assets/scss/extend.scss';

#app{
    width: 100%;
    height: 100%;
}





/* 
.heiti {
    font-family: 'heiti-fonts';
}

* {
    font-family:'SourceHan-S-SCe837b487819f94';
}
@font-face {
    font-family: 'heiti-fonts';
    src: url('./assets/font/heiti.ttf');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'songti-fonts';
    src: url('./assets/font/Songall.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.songti {
    font-family: 'songti-fonts';
} */

</style>
