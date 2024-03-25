<template>
  <div class="app-container">
    <HomeHeader/>
    <div class="unit">
      <div class="movie-wrap">
        <video class="video-container" autoplay muted loop>
          <source src="https://foundation.miraeasset.com/upload/video/2024/1/20240102115910063696.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="txt_pack">
        <p class="txt1"><b>신뢰</b>와 <b>협력</b>을 기반으로</p>
        <p class="txt1"><b>대학 시스템의 혁신</b>을 주도합니다.</p>
        <p class="txt2">세계를 무대로 꿈꾸는 젊은 인재들에게 기회를 더해줄 수 있도록 함께 하겠습니다.</p>
      </div>
    </div>
    <div className="value-container">
      <img className="value1"/>
      <img className="value2"/>
      <img className="value3"/>
      <img className="value4"/>
      <img className="value5"/>
    </div>
  </div>
</template>

<script>
import HomeHeader from "../components/Header.vue";
export default {
  name: 'HomePage',
  components: {
    HomeHeader
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style>
body {
    background-color: #E9E9E9;
}
.app-container {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'NanumSquare';
}
.unit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.video-container {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
}
.txt_pack {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -30%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.txt1 {
    font-size: 56px;
    font-family: "NanumSquare";
    color: #ff8df2;
    font-weight: 300;
    margin: 0;
}
.txt2 {
    margin-top: 24px;
    font-size: 16px;
    font-family: "NanumSquare";
    color: #ff8df2;
}
.value-container {
    margin-top: 100vh;
    width: 1000px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}
.value1,.value2,.value3,.value4,.value5 {
  width: 300px;
  height: 400px;
  background-color: #E5E5EB;
}
</style>
