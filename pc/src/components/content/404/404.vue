<template>
    <div class="not-found">
        <div class="cont">
            <img src="@/resource/images/404.png" alt="">
            <p class="sorry">抱歉，你访问的页面不存在</p>
            <p class="second">
                <span class="font-red">
                    <strong>{{num}}</strong>s</span>&nbsp;后自动跳转回首页</p>
            <div class="go-back">
                <router-link to="/">返回首页</router-link>
            </div>

        </div>
    </div>
</template>

<script>
let timer;
export default {
    data () {
        return {
            num: 5
        }
    },
    mounted () {
        let vm = this;
        timer = setInterval(() => {
            vm.num--
            if (vm.num <= 0) {
                clearInterval(timer);
                vm.$router.push('/');
            }
        }, 1000)
    },
    destroyed () {
        clearInterval(timer);
    }
}
</script>
<style scoped>
.not-found {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
.not-found .cont {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}
.not-found .cont img {
    width: 80%;
}
.sorry,
.second,
.go-back {
    width: 100%;
    text-align: center;
}
.not-found .sorry {
    color: #333;
    font-size: 1rem;
    margin-top: 1rem;
}
.not-found .font-red {
    color: #ec0022;
}
.not-found .font-red strong {
    font-size: 1rem;
}
.not-found .go-back {
    height: 1.6rem;
    line-height: 1.6rem;
    width: 8rem;
    background: #ec0022;
    border-radius: 3px;
    font-size: 0.8rem;
    margin-top: 0.6rem;
}
.not-found .go-back a {
    color: #fff;
    display: block;
    width: 100%;
    height: 100%;
}
</style>

