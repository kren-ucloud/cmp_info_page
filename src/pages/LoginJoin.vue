<template>
    <div class="gray-background"></div>
    <div class="loading-background" v-if="isLoading"></div>
    <div class="loading-items" v-if="isLoading">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="main-container" >  
        <div class="login-container">
            <img src="../assets/KREN-logo.png" class="logo" alt="KREN" />
            <div class="text-container">
                <span>이메일</span>
                <input type="text" placeholder="ex) abc@kren.kr" v-model="signup.email" maxlength="30" @input="ScheduleEmailRedundancyCheck" autofocus/>
                <p class="redundancy-text">&nbsp;{{ emailRedundancyText }}&nbsp;</p>
            </div>
            <div class="text-container">
                <span>기관명</span>
                <input type="text" placeholder="ex) 한국교육정보화재단" v-model="signup.org_name" maxlength="30" @input="ScheduleOrgRedundancyCheck" @keyup.enter="Signup()"/>
                <p class="redundancy-text">&nbsp;{{ orgRedundancyText }}&nbsp;</p>
            </div>     
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox" v-model="isChecked" id="myCheckbox">
                <li>[필수] 개인정보 수집 및 이용 동의 <a href="https://kren.kr/main/sub/sub01_05_list.html?pageNo=2" class="look_more" target="_blank">보기</a></li>       
            </div>
            <button @click="Signup" type="button" :class="buttonClass">
                가입하기
            </button>  
            <div class="line-container">
                <div class="line2"></div>or<div class="line2"></div>
            </div>  
            <div class="grey">
                <span>이미 계정이 있으신가요?</span>
                <a href="https://cloud.kren.kr/sign-in/?nextPath=%2Fhome-dashboard" class="purple"> 로그인하기 </a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import endpointData from '../../production.json'; 
export default {
    name: 'LoginJoin',
    data () {
        return {
            isLoading: 0,
            emailRedundancyText: "",
            orgRedundancyText: "",
            emailTimerId : null,
            orgTimerId : null,
            signup: {
                email: '',
                org_name: ''
            },
            isChecked: false,
            regexEmail: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        }
    },
    props: {
        msg: String
    },
    computed: {
        buttonClass() {
        // signup.org_name이 존재하고 signup.email이 null이 아닌 경우 "loginbutton" 클래스를 반환합니다.
        return ((this.signup.org_name && this.signup.email !== null)&&this.isChecked) ? "signupbtnon" : "signupbtn";
        }
    },
    methods:{
        ScheduleEmailRedundancyCheck() {
            this.emailRedundancyText = ""
            // 타이머가 이미 설정되어 있는 경우 기존 타이머를 제거합니다.
            if (this.emailTimerId) {
                clearTimeout(this.emailTimerId);
            }
            // 1.5초 후에 EmailRedundancyCheck 함수를 실행하는 타이머를 설정합니다.
            this.emailTimerId = setTimeout(() => {
                if(this.signup.email==""){
                    this.emailRedundancyText=""
                }else{
                    this.EmailRedundancyCheck();
                }     
                // 타이머가 끝난 후에는 다시 null로 설정하여 다음 호출을 위해 준비합니다.
                this.emailTimerId = null;
            }, 1500);
        },
        EmailRedundancyCheck() {
            // 서버로 POST 요청을 보냅니다.
            axios.post(endpointData.endpoint + '/registration/v1/user/is-available', {
                email: this.signup.email
            })
            .then(response => {
                //console.log(response.data.is_available); // 서버로부터의 응답을 로그에 출력합니다.
                if(response.data.is_available == true){               
                    this.emailRedundancyText = "이미 사용중인 아이디 입니다." 
                } else {
                    this.emailRedundancyText = "사용가능한 아이디 입니다." 
                }
                // 여기에 필요한 추가 작업을 수행할 수 있습니다.
            })
            .catch(error => {
                console.error('Error submitting email:', error); // 오류가 발생하면 오류를 출력합니다.
            });
        },
        ScheduleOrgRedundancyCheck() {
            this.orgRedundancyText = ""
            // 타이머가 이미 설정되어 있는 경우 기존 타이머를 제거합니다.
            if (this.orgTimerId) {
                clearTimeout(this.orgTimerId);
            }
            // 1.5초 후에 OrgRedundancyCheck 함수를 실행하는 타이머를 설정합니다.
            this.orgTimerId = setTimeout(() => {
                if(this.signup.org_name==""){
                    this.orgRedundancyText=""
                }else{
                    this.OrgRedundancyCheck();
                }
                // 타이머가 끝난 후에는 다시 null로 설정하여 다음 호출을 위해 준비합니다.
                this.orgTimerId = null;
            }, 1500);
        },
        OrgRedundancyCheck() {
            // 서버로 POST 요청을 보냅니다.
            axios.post(endpointData.endpoint + '/registration/v1/organization/is-available', {
                name: this.signup.org_name
            })
            .then(response => {
                //console.log(response.data.is_available); // 서버로부터의 응답을 로그에 출력합니다.
                if(response.data.is_available == true){
                    this.orgRedundancyText = "이미 사용중인 기관명 입니다." 
                } else {
                    this.orgRedundancyText = "사용가능한 기관명 입니다." 
                }
                // 여기에 필요한 추가 작업을 수행할 수 있습니다.
            })
            .catch(error => {
                console.error('Error submitting org_name:', error); // 오류가 발생하면 오류를 출력합니다.
            });
        },
        Signup : function () {
            if (this.signup.email == '') {
                alert('이메일을 입력해주세요.');return;
            }
            if (this.signup.org_name == '') {
                alert('기관명을 입력해주세요.');return;
            }
            if (this.isChecked == false) {
                alert('개인정보처리방침에 체크해주세요.'); return;
            }
            if(this.regexEmail.test(this.signup.email)===false){
                alert("이메일 형식이 올바르지 않습니다.");return;
            }
            this.isLoading = 1;
            axios.post(endpointData.endpoint + '/registration/v1/user/create', { 
                email : this.signup.email , 
                org_name : this.signup.org_name
            })
            .then(res => {               
                if (res.data.user_id == this.signup.email) {
                    //console.log(res.data);
                    alert('가입완료되었습니다. 이메일을 확인해 주세요.');
                    window.location.href = 'https://cloud.kren.kr/sign-in/?nextPath=%2Fhome-dashboard';
                } else {
                    //console.log(res.data);
                    alert('이미 등록된 이메일이거나 기관명입니다');
                    this.isLoading = 0;
                }
            })
            .catch(error => {
                // 네트워크 오류 또는 다른 예외 처리
                console.error('Error:', error);
                alert('서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.');
                this.isLoading = 0;
            });

        },
    }
    
}
</script>
<style scoped>
.gray-background{
  position: fixed;
  z-index: 1;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color:rgba(245,245,249);
}
.main-container{
    display: flex;
    width: 100%;
    height: 98vh;
    margin :auto;
    font-family: 'NanumSquare';
}
.login-container {
    z-index: 2;
    margin: auto;
    align-items: center;
    padding: 50px;
    border-radius: 6px;
    box-shadow: 0 1px 20px 1px #cccccc;
    background-color: #fff;
    text-align: center;
}
.logo{
    width: 250px;
    margin-top: 25px;
    margin-bottom: 50px;
}
.text-container{
    display: flex;
    flex-direction: column;
    margin: 20px auto;
}
.text-container span{
    align-self: start;
    color: #32475c99;
}
.text-container input[type=text], .text-container input[type=password]{
    width: 337px;
    height: 36px;
    margin-top: 5px;
    padding: 5px 16px;
    border-radius: 6px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    font-size: 11pt;
    font-family: 'NanumSquare';
}
.redundancy-text{
    margin: 0px;
    font-size: 12px;
    color: #9e917d;
}
.checkbox-container {
    display: flex;
    margin-bottom: 50px;
}
.checkbox {
  /* 체크박스 크기 조정 */
  width: 18px;
  height: 18px;
  margin: 2px;
  /* 체크박스 외관 숨기기 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* 사용자 정의 체크박스 스타일 */
  border: 2px solid #cccccc; /* 테두리 스타일 */
  border-radius: 4px; /* 테두리의 모서리를 둥글게 만듭니다 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경합니다 */
}
.checkbox:checked {
  background-color: #696CFF; 
  border-color: #696CFF; 
}
.checkbox:checked::before {
  content:"";
  display: block; 
  width: 4px; 
  height: 8px; 
  border: solid white; 
  border-width: 0 2px 2px 0; 
  transform: rotate(45deg); 
  position: relative; 
  top: 0px; 
  left: 4px;
}
.checkbox-container li {
    margin-left: 5px;
    font-size: 14px;
    color: #9e917d;    
}
.look_more{
    color:#696CFF;
    margin-left: 5px;
}

.signupbtn {
    margin: 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    border: 0;
    border-radius: 6px;
    background-color: #c2c2c2;
    font-size: 16px;
    font-weight: 1000;
    color: #fff;
    cursor: pointer;
    font-family: 'NanumSquare';
}
.signupbtnon {
    margin: 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;
    height: 44px;
    border: 0;
    border-radius: 6px;
    background-color: #696CFF;
    font-size: 16px;
    font-weight: 1000;
    color: #fff;
    cursor: pointer;
    font-family: 'NanumSquare';
}
.line-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px auto;
    color: #32475c99;
}
.line2{
    width: 150px;
    border-top: 1px solid #e5e5e5;
    margin: 5px;
}



.grey{
    color: #32475c99;
}
.purple{
    color: #696CFF;
    text-decoration: none;
}
li {
  list-style-type: none;
}


.loading-background{
  position: fixed;
  z-index: 10;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(180, 180, 180, 0.2);
}
.loading-items {
    z-index: 11;
    display: inline-block;
    position: fixed;
    width: 50px;
    height: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.loading-items div {
    display: inline-block;
    position: absolute;
    background-color: #696CFF;
    width: 10px;
    height: 45px;
    animation: loading-items 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loading-items div:nth-child(1) {
    left: 0px;
    animation-delay: -0.96s;
}
.loading-items div:nth-child(2) {
    left: 20px;
    animation-delay: -0.84s;
}
.loading-items div:nth-child(3) {
    left: 40px;
    animation-delay: -0.72s;
}
@keyframes loading-items {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 25px;
  }
}
@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');
</style>