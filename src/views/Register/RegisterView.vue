<template>
  <div class="template">
    <div class="container">
      <div class="right">
        <div class="firstCard"></div>
        <div class="secondCard"></div>
        <div class="img">
          <img src="../../assets/femme.png" alt="" />
        </div>
      </div>
      <div class="left">
        <div class="thirdCard"></div>
        <div class="form">
          <img
            class="logoOptique"
            src="../../assets/logo.png"
            alt="Visionette Optique"
          />
          <div class="menuConnect">
            <RouterView />
            <RouterLink to="/"><button id="router">S’enregistrer</button></RouterLink>
            <RouterView />
            <RouterLink to="/login"><button id="router">Se connecter</button></RouterLink>
          </div>
          <div class="voyant"></div>
          <form @submit.prevent="enregistrer" class="inscription">
            <p id="texte">S’enregistrer en tant qu’administrateur</p>
            <label for="email" >Email</label><br />
            <input type="email" name="email" id="email" v-model="email" /><br />
            <label for="password">Mot de passe</label><br />
            <input type="password" name="password" id="password" v-model="password" /><br />
            <label for="password">Mot de passe</label><br />
            <input type="password" name="password_conf" id="password" v-model="password_confirmation" /><br />
            <input  id="submit" type="submit" value="Enregistrer"  />
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
      name: "admin",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    enregistrer() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
      fetch("https://laravel.lazonebleue.com/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
      })
      .then(response => response.json())
      .then((body) => {
        console.log(body);
        localStorage.setItem('token',body.body.token)
        if (body.success) {
          console.log('Register successful!')
          localStorage.setItem('admin_mail', this.email)
          localStorage.setItem('isChecked', false)
          setTimeout(window.location.href = "/dashboard", 100)
        } else {
          console.log('register not successful! Try again')
        }
      })
      .catch((error) => {
          console.error('Fetch error:', error)
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
  margin-left: 20px;
}
.right{
  margin-right: 50px;
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
.secondCard {
  width: 336px;
  height: 336px;
  background-color: #250132;
  border-radius: 10px;
  z-index: 20;
  margin-top: -160px;
  margin-left: 178px;
}
.img img {
  width: 433px;
  height: 447px;
  border-radius: 10px;
  z-index: 30;
  margin-top: -260px;
  margin-left: 246px;
}
.thirdCard {
  width: 402px;
  height: 644px;
  border-radius: 10px;
  background-color: #3f0255;
  position: absolute;
  margin-top: 10px;
  margin-right: 197px;
  z-index: 1;
}
.form {
  width: 414px;
  height: 644px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: calc(184px - 145px);
  margin-left: 30px;
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

@media (max-width: 800px) {
  .template {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #190022;
  text-decoration: none;
  list-style: none;
}
#texte{
  margin-top: -30px;
  margin-bottom: 15px;
  text-align: center;
}
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}
.right{
  position: fixed;
  margin-left: -85px;
  margin-top: -70px;
}
.firstCard {
  width: 91px;
  height: 91px;
  background-color: #3f0255;
  border-radius: 10px;
  z-index: 10;
  margin-top: 40px;
  margin-left: 150px;
}
.secondCard {
  width: 107px;
  height: 107px;
  background-color: #250132;
  border-radius: 10px;
  z-index: 20;
  margin-top: -75px;
  margin-left: 165px;
}
.img img {
  width: 139px;
  height: 143px;
  border-radius: 10px;
  z-index: 30;
  margin-top: -80px;
  margin-left: 190px;
}
.thirdCard {
  width: 100%;
  background-color: #3f0255;
  position: absolute;
  margin-top: 212px;
  overflow: hidden;
  border-radius: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  left: 1px;
  z-index: 1;
}
.right{
  position: absolute;
  top: -110px;
  margin-top: 100px;
}
.form {
  width: 100%;
  background-color: #fff;
  margin-top: 245px;
  z-index: 10;
  position: absolute;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
  left: -30px;
}
}
</style>
