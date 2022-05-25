<template>
  <div class="logOrReg">
    <div class="btn" @click="this.isLog = true">Login</div>
    <div class="btn" @click="this.isLog = false">Registration</div>
    <div v-if="isLog" class="log">
      <input type="email" placeholder="Email" v-model="this.logMail" />
      <input type="password" placeholder="Password" v-model="this.logPass" />
      <div class="btn" @click="this.login()">Submit</div>
    </div>
    <div v-else class="reg">
      <input type="text" placeholder="Username" v-model="this.regUser" />
      <input type="email" placeholder="Email" v-model="this.regMail" />
      <input type="password" placeholder="Password" v-model="this.regPass" />
      <input
        type="password"
        placeholder="Repeat Password"
        v-model="this.regRePass"
      />
      <div class="btn" @click="this.reg">Submit</div>
    </div>
    <h1 class="status">{{ status }}</h1>
  </div>
</template>

<script>
import { nullLiteralTypeAnnotation } from "@babel/types";
import axios from "axios";

export default {
  name: "logOrReg",
  data() {
    return {
      isLog: true,

      logMail: "",
      logPass: "",

      regUser: "",
      regMail: "",
      regPass: "",
      regRePass: "",
      dataID: null,

      emailPattern: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      status: "",
    };
  },
  methods: {
    login() {
      if (this.logMail.match(this.emailPattern)) {
        this.submitLog();
      } else {
        this.status = "Wrong email";
      }
    },
    submitLog() {
      axios.get("http://localhost:3000/users").then((res) => {
        let userObj = res.data.find((user) => user.email == this.logMail);
        if (userObj) {
          if (userObj.password == this.logPass) {
            this.status = "You Login!";
            this.logMail = "";
            this.logPass = "";
          } else {
            this.status = "Wrong password!";
          }
        } else {
          this.status = "Email not finded";
        }
      });

      this.reloadPage();
    },
    reg() {
      if (this.regMail != this.regMail.match(this.emailPattern)) {
        this.status = "Wrong email";
      } else if (this.regPass != this.regRePass) {
        this.status = "Mismatch password";
      } else {
        this.submitReg();
      }
    },
    submitReg() {
      axios.get("http://localhost:3000/users").then((res) => {
        this.dataID = res.data.length;
      });
      axios.post("http://localhost:3000/users", {
        id: this.dataID,
        username: this.regUser,
        email: this.regMail,
        password: this.regPass.toLowerCase(),
      });

      (this.regUser = ""),
        (this.regMail = ""),
        (this.regPass = ""),
        (this.regRePass = "");
      this.status = "Done!";

      this.reloadPage();
    },
    reloadPage() {
      setTimeout(() => {
        document.location.reload();
      }, 1400);
    },
  },
};
</script>

<style lang="scss" scoped>
.logOrReg {
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 10px;
  width: 300px;
  height: 328px;
  background-color: #333;

  .log, .reg {
    margin: 0 auto;
    margin-top: 10px;
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 10px;
    }
  }

  .status {
    margin: 0;
    width: 100%;
    height: 40px;
    text-align: center;
    background-color: #000;
  }
}
</style>
