<template>
    <div id="app">
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

@font-face {
    font-family: 'heiti-fonts';
    src: url('./assets/font/heiti.ttf');
    font-weight: normal;
    font-style: normal;
}

.heiti {
    font-family: 'heiti-fonts';
}

* {
    font-family:'SourceHan-S-SCe837b487819f94';
}

/* @font-face {
    font-family: 'songti-fonts';
    src: url('./assets/font/Songall.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.songti {
    font-family: 'songti-fonts';
} */

</style>
