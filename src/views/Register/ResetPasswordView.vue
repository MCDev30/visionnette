<template>
  <div class="template">
    <div class="container">
      <div class="left">
        <div class="thirdCard"></div>
        <div class="form">
          <img
            class="logoOptique"
            src="../../assets/logo.png"
            alt="Visionette Optique"
          />
          <div class="menuConnect">
          </div>
          <form @submit.prevent="enregistrer" class="inscription">
            <p id="texte">Modifier le mot de passe</p>
            <label for="email" >Email</label><br />
            <input type="email" name="email" id="email" v-model="email" /><br />
            <label for="password">Nouveau mot de passe</label><br />
            <input type="password" name="password" id="password" v-model="password" /><br />
            <input  id="submit" type="submit" value="Enregistrer le nouveau mot de passe"  />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted(){
    this.email = this.$route.params.email ? this.$route.params.email : ''
    console.log(this.email)
    console.log(this.$route.params.token)
  },
  methods: {
    enregistrer() {
      const data = {
        token: this.$route.params.token,
        email: this.$route.params.email,
        password: this.password,
        password_confirmation: this.password,

      }
      const url = new URL(
          "https://laravel.lazonebleue.com/api/reset-password"
      );

      const headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': `Bearer ${data.token}`
      };

      fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
      }).then(response => response.json())
      .then( body => {
        if (body.success){
          window.location.href = "/"
        }
      })
     }
  },
};

</script>

<style scoped>
.template {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #190022;
  text-decoration: none;
  list-style: none;
  padding: 30px;
  margin-left: 100%;
}
#router {
  color: #000;
  background-color: #fff;
  height: 50px;
}
#texte{
  margin-top: -30px;
  margin-bottom: 15px;
}
.left{
  margin: auto;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.firstCard {
  width: 191px;
  height: 191px;
  background-color: #3f0255;
  border-radius: 10px;
  z-index: 10;
  margin-top: 0;
  margin-left: 150px;
}
/* .secondCard {
  width: 336px;
  height: 336px;
  background-color: #250132;
  border-radius: 10px;
  z-index: 20;
  margin-top: -160px;
  margin-left: 178px;
} */
.img img {
  width: 433px;
  height: 447px;
  border-radius: 10px;
  z-index: 30;
  margin-top: -260px;
  margin-left: 246px;
}
/* .thirdCard {
  width: 402px;
  height: 644px;
  border-radius: 10px;
  background-color: #3f0255;
  position: absolute;
  margin-top: 10px;
  margin-right: 197px;
  z-index: 1;
} */
.form {
  width: 410px;
  height: 644px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: calc(184px - 145px);
  z-index: 10;
  position: relative;
}
.logoOptique {
  width: 117px;
  height: 37px;
  margin-top: 51px;
  margin-left: 150px;
}
.menuConnect {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding-left: 56px;
  padding-right: 56px;
  padding-top: 28px;
  color: #250132;
}
.voyant {
  width: 41px;
  height: 2px;
  background-color: #000;
  margin-left: 73px;
  margin-top: 0px;
  border-radius: 3px;
}
.active {
  background-color: #25013280;
}

form {
  padding: 52px;
}
form p {
  color: #250132;
  font-size: 25px;
  margin-top: -20px;
}
label {
  font-size: 14px;
  color: #25013280;
}
input {
  width: 301px;
  height: 42px;
  border: none;
  outline: none;
  border-bottom: 1px solid #25013280;
  background-color: #2501321a;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  margin-bottom: 34px;
  padding-left: 5px;
}
#submit {
  background-color: #250132;
  color: #fff;
  border-radius: 3px;
  margin-bottom: 0px;
}
.menuConnect button {
  cursor: pointer;
  transition: ease-in-out 0.2s;
  border: none;
  background-color: #fff;
}
.menuConnect button:hover {
  cursor: pointer;
  color: #25013280;
}

</style>
