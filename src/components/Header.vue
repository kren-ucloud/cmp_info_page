<template>
    <div class="header-container" :style="{ backgroundColor: headerBackground }">
        <div class="inner-container">
            <router-link to="/home" style="text-decoration: none; color: #120D4D;"><img class="logo" src="../assets/KREN-logo.png" alt="KREN" style="width: 100px;"></router-link>
        <div class="letter-frame">
            <div class="letter-text">재단소개</div>
            <div class="letter-text"><router-link to="/info" style="text-decoration: none; color: #120D4D;">서비스</router-link></div>
            <div class="letter-text">IT교육</div>
            <div class="letter-text">컨퍼런스</div>
            <div class="letter-text">커뮤니티</div>
        </div>
        <div class="menu-frame">
            <div class="login-button">로그인</div>
            <img class="search-button" src="../assets/icon_search.svg" alt="Search"/>
            <img class="menu-button" src="../assets/icon_menu.svg" alt="Menu"/>
        </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted, onUnmounted } from 'vue';
export default {
    name: 'HomeHeader',
    setup() {
        const headerBackground = ref('rgba(255, 255, 255, 0.4)');
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const headerHeight = 370;

            if (scrollPosition >= headerHeight) {
                headerBackground.value = '#E5E5EB';
            } else {
                headerBackground.value = 'rgba(255, 255, 255, 0.4)';
            }
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            headerBackground
        };
    }
};
</script>
  
<style scoped>
.header-container {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 5%;
  font-family: 'NanumSquare';
}
.inner-container{
  display: flex;
  justify-content: space-between;
}
.letter-frame{
  width: 40%;
  min-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
}
.letter-text{
    color: #120D4D;
    cursor: pointer;
    font-weight: 1000;
}
.menu-frame{
  color: #120D4D;
  width: 13%;
  min-width: 130px;
  max-width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}
.login-button, .search-button, .menu-button {
  cursor: pointer;
}
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
</style>
  