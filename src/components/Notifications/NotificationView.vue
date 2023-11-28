<template>
  <div class="container" v-bind:class="{ contain }">
    <section class="section">
      <div class="logo">
        <img
          class="logoOptique"
          src="../../assets/logo.png"
          alt="Visionette Optique"
          width="168"
        />
      </div>
      <div class="menu">
        <RouterLink to="/dashboard">
          <div class="onglet">
            <img
              src="../../assets/dash-blanc.png"
            />
            <p>Dashboard</p>
          </div>
        </RouterLink>

        <div class="onglet" style="cursor: pointer" @click="redirect('/patients')">
          <img
            src="../../assets/user-blanc.png"
          />
          <p>Patients</p>
        </div>

        <RouterLink to="/notification">
          <div class="onglet" id="active">
            <img
              src="../../assets/notif-violet.png"
            />
            <p>Notifications</p>
            <!-- <p id="nbre" v-if="sessionStorage.getItem('nbre')" >{{ notif_lenght }}</p> -->
          </div>
        </RouterLink>

        <RouterLink to="/disconnect">
          <div class="onglet">
            <img
              src="../../assets/logout-blanc.png"
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
            src="../../assets/image.png"
            alt=""
          />
        </div>
        <div class="infos">
          <p>{{ current }}</p>
          <p id="second">{{ admin }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="notification">
          <div class="component">
            <div class="div">
              <p id="tous" style="cursor: pointer" @click="redirect('/notification')">
                Toutes les notifications
              </p>

              <!-- <p id="nlues" style="cursor:pointer" @click="redirect('/non-lue')">Non lues</p> -->
            </div>
            <!-- <button>Tous supprimer</button> -->
          </div>
          <h3>Récentes</h3>
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <div v-for="not in notif" :key="not.id" class="toast recentes">
            <img
              @click="deleteit(not.id)"
              style="margin-top: 10px; cursor: pointer"
              src="https://s3-alpha-sig.figma.com/img/a73f/9ad9/8a71e60c7d3f7ce6647073f7ad735830?Expires=1701648000&Signature=NphsSRip9wcTd21Bte-Ekuu9gJGGiFE9deqRLLteKBcZZ36-P~uiSQQaf73WMMmSxIzaBVvpvvGwo4Li6OeJltPnqftvmoTQDtCMts1zmCkwYklPxyiJ-NhZ7rkO8yYkiZeDjI8lZAn~Q8snEpLS5afseP35C5MJlZ7XdC4cgb6wXuVYqZ980sRgSRzDFAhY2ygG54oHEIIhePQwIHDF4zzPMcgHCpLW3WKQqzhCGIabFVb9ICkOaqSFsnJRd89ytf9ZEK~xTJlGmJCsRjeVHn7eb~~CoVKDPxjZKxMbzvFrciMu52jk7baNX7Zxxp8PCEBUZblKubiJexzouZoeUQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <p id="moment">
              {{
                not.created_at.split('T')[0] === today
                  ? "Aujourd'hui"
                  : not.created_at.split('T')[0]
              }}
            </p>
            <p style="font-size:13px">
              <span>
                {{
                not.created_at.split('T')[0] === today
                  ? "Aujourd'hui est"
                  : 'Le ' + not.created_at.split('T')[0] + ' était la date'
              }}
              </span>
               la date de renouvellement des verres du (de la) patient(e) enregistré(e) au nom de
              <b>{{ not.patient.last_name }} {{ not.patient.first_name }}</b>
            </p>
          </div>
          <div v-if="isAncient">
            <h3>Plus anciennes</h3>
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <div v-for="notif in notifAnciennes" class="toast ancienne">
              <img
                src="../../assets/cross.png"
              />
              <p id="moment" style="padding-top: 10px">{{ not }}</p>
              <p>{{ notif.msg }}</p>
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
      notif: [],
      mail: 'employe@email.com',
      admin: localStorage.getItem('admin_mail'),
      current: sessionStorage.getItem('user'),
      isAncient: false,
      today: ''
    }
  },
  mounted() {
    const url2 = new URL('https://laravel.lazonebleue.com/api/notifications')
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    fetch(url2, {
      method: 'POST',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        this.notif = body.body.reverse()
        const date = new Date()
        this.today = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
          '0' + date.getDate()
        ).slice(-2)}`
      })
    const url = new URL('https://laravel.lazonebleue.com/api/notifications')

    fetch(url, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        sessionStorage.setItem('nbre', body.body)
        // if (body.body > 0) {
        //   if (body.body === 1) {
        //     let utterance = new SpeechSynthesisUtterance(`Une notification non lue!`)
        //     utterance.lang = 'fr'
        //     speechSynthesis.speak(utterance)
        //   } else {
        //     let utterance = new SpeechSynthesisUtterance(`${body.body} notifications non lues!`)
        //     utterance.lang = 'fr'
        //     speechSynthesis.speak(utterance)
        //   }
        // }
      })
  },
  methods: {
    redirect(route) {
      window.location.href = route
    },
    deleteit(id) {
      const url = new URL(`https://laravel.lazonebleue.com/api/notifications/${id}`)
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      fetch(url, {
        method: 'DELETE',
        headers
      }).then((response) => response.json())
      .then( body => {
        if (body.success) {
          window.location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>
.notification {
  width: 70%;
  margin: auto;
  background-color: #fff;
  margin-top: 40px;
  border-radius: 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  margin-bottom: 30px;
}
.component {
  display: flex;
  justify-content: space-between;
  width: 91%;
  margin: auto;
}
#tous {
  background-color: #fcf4ff;
  border-bottom: 1px solid #6a069a;
  color: #6a069a;
}
.div p {
  color: #00000080;
  font-size: 14px;
  padding: 5px;
}
h3 {
  color: #00000080;
  font-size: 13px;
  font-weight: 100;
  text-align-last: left;
  width: 91%;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 10px;
}
button {
  border: none;
  cursor: pointer;
  background-color: #fff;
  font-size: 15px;
  color: #00000080;
}
.div {
  display: flex;
}
.toast {
  margin-top: 17px;
  padding: 5px;
  border-radius: 7px;
  margin: auto;
  color: #000000;
  font-size: 18px;
  width: 90%;
  margin-bottom: 10px;
}
.toast p {
  font-size: 14px;
  padding-left: 7px;
}
#moment {
  color: #00000080;
  font-size: 12px;
}
.recentes {
  background-color: #fcf4ff;
}
.ancienne {
  background-color: #fff9f1;
}
.toast p {
  margin-top: -4px;
  margin-bottom: 10px;
}
.contenu p {
  padding: 25px;
  font-size: 15px;
  margin-bottom: 17px;
  text-align: center;
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
  margin-top: 140px;
  overflow: hidden;
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
  width: 50%;
  text-align: center;
  border-radius: 3px;
  border: none;
  margin-bottom: 25px;
  height: 43px;
  margin-left: 25%;
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
  width: 125px;
  padding: 7px;
  outline: none;
  background-color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 3px;
  height: 42px;
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

.toast img {
  margin-left: 95%;
  width: 17px;
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
