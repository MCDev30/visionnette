<template>
  <div class="container" v-bind:class="{ contain }">
    <section class="section">
      <div class="logo">
        <img
          class="logoOptique"
          src="https://s3-alpha-sig.figma.com/img/8fb3/5ea8/63b623c16b621057e8ebae323c193d51?Expires=1701043200&Signature=CrXdXxc-OTw6Ed15dgEZjp~Hh0RGOCTCOM7kJPrG9V0SYEOPOA8icfD50TEyd9VKQZu8kH3VYDIXZLxBlo-oFi~bNDF~lDt6zDgSoXA8D13b1~jUvgMLlxBFqJZCXJoEpvvzYkE1n~DxdkogZz~nRugxSQ4I0m-RoSzKZXSi93ZvHCtY4MFCDuaYIMBr~~rz-VpsZrQ4avkAONJQ7mEuWxfBM0tjWFvt6lNTJyb8Xt16WR3~wP~QvnK0yO~sPvk91iq7GbNL7Kv~SlSccjAHi3cL983Dkcrq0Nu2nr87HZ9qZgBq7G3o2sKa0CYkM3tr1HbtzvhH0eHZtTVNdSeqAw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="Visionette Optique"
          width="168"
        />
      </div>
      <div class="menu">
        <RouterLink to="/dashboard">
          <div class="onglet">
            <img
              src="https://s3-alpha-sig.figma.com/img/e74d/c0af/24c07f09765c411ca7006ed944bcf5ba?Expires=1701648000&Signature=M2mN~M0xb6OBjnyIi5AlJhAs9F-T~ARLkYoVfevj503q1ShyU3epeaIYbhpkN1UEvK2516dM1C7Thfr0awukP5plUjafC37AZxH9a0E9p1wv~1tVWO2b0YPLvl3lBCfpSi3~HpSJqn4rX4uYgv~qOKOkRhGD6jBYJWturdSoHUFFUNIDz84FsMLastkQxRzbvMu3YmxJz-DYc1d3bHVW4cbQEbN7c67p~YvQbmpjklFMDc9~aRTZEGunM2D55cjBxVsxvNI2FREGfa~9JwzgUO2yqNRVjg0Gy9jS4SxCdUijwVpBg1KZGAmG-t5E6ctEsfc-5jYVkNH-MhCx4OWXAg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <p>Dashboard</p>
          </div>
        </RouterLink>

        <RouterLink to="/patients">
          <div class="onglet" id="active">
            <img
              src="https://s3-alpha-sig.figma.com/img/871d/603e/d329db58a6dbeec9073a29d9eb802ed9?Expires=1701648000&Signature=Qq336yyIWKL~qN0zxS2nxhEhstfHLM9qerEC3UDzIsXb82R46YqpWRHRU~0thvC3sKm-4BV8OmJCdZ5R-6vl0SQs8~k~Nz17mFahs3WXDxAj8CfflzVWT2NyMpPUIWqGPU6PCeBduQsrCHhmzDSDItgWJN7cDSqZT4jHC2CGH-Bw-rDJPEZ0P8VTNnlUYnE-6TJkWgjPbVbt3P9iM6qhNYqABLpxfjr62mUtsz9fBp85sWhhIDBhdZ5kG00t1ZvCKMrAEtIJcUB649nomjCTxaQPDYzXXRH8WNiPIQMNe8EO7gppTIrTxm0dCXcCCuaEueHZ4q--a4~S76ynquOCMQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <p>Patients</p>
          </div>
        </RouterLink>

        <RouterLink to="/notification">
          <div class="onglet">
            <img
              src="https://s3-alpha-sig.figma.com/img/e9cc/edfa/bfb90c9fc721160f5618fc29c8f59f59?Expires=1701648000&Signature=MAKHpmxFMnAioXGola3edY9s0PHOlvA6V4zoKKBwm1YSru0nUpSwGqWgJ5gZOLMqXrLcP70AIJsMK-WhFUdpEK4kZWyPh7i4HxJg12kaJYyfeoRK2D5wqK3TOUwfxoIwBfrijjI-UH3Tk8IQ6kwqNJ~gnjWsb1C8MVCbzW8~6VthNEcVoPw9joKuOO5ajlz-Fd0xSyM97Fbm2nXkDzRBX2qpxbDqNseu-FTATEEYecp0oYU-7IKlG-bq849M3ugzpzTx~l-U74D23XmeyL2qKq7LzUd35CxWPnOz8jnakcxfcXPOPPxnMBmFXZItmqCEFT~v1i7xDCMC90ijqnW-Xg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <p>Notifications</p>
            <p id="nbre" v-if="nbre !== 0">{{ nbre }}</p>
          </div>
        </RouterLink>

        <RouterLink to="/disconnect">
          <div class="onglet">
            <img
              src="https://s3-alpha-sig.figma.com/img/1784/efbc/d7b02f0b8cd1e1b1ab3a1fd03f57cae1?Expires=1701648000&Signature=YwNcODC5nMLM80w2gmKRpc7vazROJFLTrccySowY37qsRoLBqYZMQlc8a4FGJAQeuG359Desytn7AcZr7zG~2zM17v-UPeT1PABFY-TJFyG75CIOOiKp6G~44gOM5a7KtIEZ7KC14r-QP7fL5jeaeWF8fjELqWX8WZejA4faiWbwXS3VcV53PdetfExdGq8kLKOeojEUnnwq8l9WCX81zDjdDYbkPa-IiJH-neg~BhvzxbSkRDz-FTN~JHEFxD1Tbn9S6ASgtP3ZcQaz72U-ZyQTAr~srHx3g6lvI2Xyp83cjH-pU7aBiAvU8xvYd-5xrGtP35vHyJy5hpeViEZZlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <p>Se déconnecter</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <aside class="aside">
      <div class="topPanel">
        <div class="admin">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspS_ukYMLvsWX4vPkC7PcTiCqJYIASaWapw&usqp=CAU"
            alt=""
          />
        </div>
        <!-- bind the data from api -->
        <div class="infos">
          <p>{{ current }}</p>
          <p id="second">{{ admin }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="patients">
          <div class="searchContainer">
            <div class="left" style="visibility:hidden">
              <div class="search">
                <input type="text" placeholder="Rechercher" />
                <img src="../../assets/Vector.png" />
              </div>
              <div class="filter">
                <span>Classer par</span>
                <select class="choice" name="choice">
                  <option value="first" selected>Date de renouvellement</option>
                  <option value="second">Option 2</option>
                  <option value="third">Option 3</option>
                </select>
              </div>
            </div>
            <div class="right">
              <RouterLink to="/new-patient">
                <p>Nouveau patient</p>
              </RouterLink>
            </div>
          </div>

          <div class="vue">
            <div class="addCard">
              <div class="color">
                <p>Nouvau patient</p>
              </div>
              <p style="font-size:12px; opacity:0.7; text-align:center; margin-top:10px">Etatpe 2/4</p>
              <div class="contenu">
                <p>Contact</p>
                <form action="">
                  <input type="email" placeholder="Email" v-model="email" />
                  <input type="text" placeholder="Numero" v-model="numero"/>
                  <div class="liens">
                  <button id="submit" type="submit">
                    <RouterLink to="/new-patient"><p id="tex">Précédent</p></RouterLink>
                  </button>

                  <button id="submit" type="submit" @click="set_one">
                    <RouterLink to="/etape-3"><p id="tex">Suivant</p></RouterLink>
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        admin: localStorage.getItem('admin_mail'),
        email: localStorage.getItem('email') ? localStorage.getItem('email') : "",
        numero: localStorage.getItem('phone_number') ? localStorage.getItem('phone_number') : "",
        nbre: parseInt(sessionStorage.getItem('nbre')),
        current: sessionStorage.getItem('user')
      }
    },
    methods: {
      set_one() {
        localStorage.setItem('email', this.email), localStorage.setItem('phone_number', this.numero)
      }
    }
}
</script>

<style scoped>
.listePatient {
  padding-bottom: 10px;
  margin-bottom: 25px;
}
.liens{
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.table {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  margin: 25px;
}
.table p {
  width: 30%;
}
.violet {
  background-color: #fcf4ff;
}
.contact p {
  color: #6a069a;
  text-align: center;
}
.action p {
  color: #6a069a;
}
.patient {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px;
  padding: 14px;
  border-radius: 6px;
  text-align: center;
  font-size: 12px;
}
.patient p {
  text-align: center;
}
.yellow {
  background-color: #fff9f1;
}
.emptyPatients img {
  filter: blur(6px);
  width: 69px;
  height: 69px;
  margin-bottom: 10px;
}
.emptyPatients {
  margin: auto;
  text-align: center;
  padding-top: 150px;
  padding-bottom: 150px;
  font-size: 15px;
}
.texte p span {
  color: #f5981f;
}
.patients {
  width: 80%;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 25px;
}
.searchContainer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 15px;
  padding: 20px;
}
.left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
}
.contenu p {
  padding: 25px;
  font-size: 15px;
  margin-bottom: 17px;
  text-align: center;
}
.right p {
  color: #fff;
  background-color: #6a069a;
  padding: 10px;
  border-radius: 3px;
  font-size: 14px;
}
.search {
  display: flex;
  border: 1px solid #dadada;
  padding: 7px;
  border-radius: 3px;
  background-color: #fff;
  margin-bottom: 20px;
  margin-right: 10px;
}
.search input {
  border: none;
  outline: none;
}
.search img {
  width: 15px;
  height: 17px;
}
::placeholder {
  color: #00000080;
}
.filter {
  font-size: 12px;
  color: #00000080;
  margin-bottom: 20px;
}
.contenu input {
  width: 300px;
  margin-bottom: 15px;
  margin-left: 12px;
  margin-right: 17px;
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid #dadada;
  border-radius: 3px;
  padding-left: 10px;
  outline: none;
}
#tex {
  height: 1px;
  color: #fff;
  margin-top: -11px;
}
::placeholder {
  color: #adacac;
}
.addCard {
  margin: auto;
  width: 336px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  margin-bottom: 20px;
}
.vue{
  padding-bottom: 10px;
}
.color p {
  padding-top: 21px;
  font-size: 16px;
}
.color {
  background-color: #6a069a;
  height: 60px;
  text-align: center;
  color: #fff;
}
#submit {
  background-color: #6a069a;
  color: #fff;
  width: 40%;
  text-align: center;
  border-radius: 3px;
  border: none;
  margin-bottom: 25px;
  height: 43px;
  margin-top: 10px;
}
.container {
  display: flex;
  background-color: #f6f7fb;
}
.cardSlide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.graphique {
  height: 220px;
  width: 490px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-left: 13px;
  margin-right: 13px;
}
.card {
  width: 238px;
  height: 120px;
  background-color: #fff;
  border-radius: 10px;
  margin-left: 13px;
  margin-right: 13px;
  margin-bottom: 15px;
  margin-top: 13px;
  box-sizing: border-box;
}
.cardContainer {
  border-left: 6px solid #6a069a;
  margin-top: 8px;
  height: 106px;
  border-radius: 4px;
}
#title {
  color: #00000080;
  background-color: #fcf4ff;
  padding: 10px;
  width: max-content;
  border-radius: 1px;
  border-bottom: 1px solid #dadada;
  margin-left: 22px;
  margin-right: 20px;
}
#taux {
  background-color: #fcf4ff;
  padding: 5px;
  border-radius: 5px;
}
#emp3 {
  background-color: #fff9f1;
  color: #fff9f1;
}
#emp3 #taux {
  background-color: #fff9f1;
  color: #f5981f;
}
#emp3 #number {
  background-color: #fff9f1;
  color: #000;
}
.statistique {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 26px;
}
.topVendeur {
  width: 200px;
  height: 220px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-left: 13px;
  margin-right: 13px;
  margin-bottom: 15px;
  margin-top: 13px;
}
.topVendeur #title {
  margin-left: 0;
  margin-bottom: 10px;
}
.topVendeur #taux {
  padding: 6px;
  border-radius: 5px;
  height: 20px;
  padding-top: 10px;
  border: 1px solid #dadada80;
}
.employe img {
  width: 12px;
  height: 12px;
}
.discovery {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #dadada80;
  background-color: #fcf4ff;
  padding: 4px;
  font-size: 13px;
  border-radius: 2px;
}
.discover {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 22px;
  margin-top: 40px;
}
.discover span,
#taux {
  color: #6a069a;
  font-size: 12px;
}
.discover span {
  font-size: 12px;
}
.discover img {
  width: 12px;
  height: 12px;
}

.select_menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 13px;
  padding-left: 37px;
  padding-right: 37px;
}
#active p {
  color: #6a069a;
}
.choice {
  width: 200px;
  padding: 7px;
  outline: none;
  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 3px;
  height: 33px;
  margin-left: 5px;
}
* {
  font-family: Arial;
}
.gestion {
  height: 42px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #6a069a;
  border-radius: 4px;
}
.gestion p {
  margin-top: 13px;
  margin-left: 13px;
  margin-right: 13px;
  color: #fff;
  font-size: 14px;
}
.space {
  padding: 10px;
}
.toast {
  margin-top: 17px;
  background-color: #fff;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin: auto;
  color: #6a069a;
  font-size: 18px;
  width: 401px;
  width: 40%;
}
.toast p {
  margin-top: -4px;
  margin-bottom: 10px;
}
.toast img {
  margin-left: 90%;
}
section {
  position: fixed;
  top: 0;
  left: 0;
  grid-column: 1;
  width: 270px;
  height: 100vh;
  background-color: #190022;
}
.logoOptique {
  margin-top: 20px;
  margin-left: 47px;
  height: 60px;
  width: 158px;
  margin-bottom: 36px;
}
.onglet img {
  width: 27px;
  height: 27px;
  margin-right: 17px;
}
a {
  text-decoration: none;
}
.onglet {
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 21px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 260px;
  height: 25px;
  transition: ease-in-out 0.2s;
}
#nbre {
  width: 23px;
  background-color: #f5981f;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-left: 20px;
  margin-top: 10px;
  padding: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bold;
}
#active {
  background-color: #f6f7fb;
  border-left: 3px solid #6a069a;
}
.onglet p {
  color: #ffffff80;
  font-size: 20px;
  margin-bottom: 7px;
  padding-top: 8px;
}
aside {
  position: absolute;
  width: calc(100% - 270px);
  margin-left: 270px;
  grid-column: 2;
  height: 100vh;
  background-color: #f6f7fb;
  overflow-y: scroll;
}
.topPanel {
  height: 80px;
  background-color: #ffffff;
  display: flex;
  justify-content: right;
  border-bottom: 1px solid #dadada;
}
.admin img {
  width: 45px;
  height: 45px;
  background-color: #d9d9d9;
  margin-top: 18px;
  margin-bottom: 19px;
  margin-right: 15px;
  border-radius: 50%;
}
.infos p {
  font-size: 15px;
  color: #000000;
  margin-right: 46px;
  margin-top: 20px;
}
#second {
  margin-top: 6px;
}
</style>
