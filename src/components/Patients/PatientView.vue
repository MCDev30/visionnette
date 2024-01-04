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
          <div class="onglet" id="active" style="cursor:pointer" @click="redirect('/patients')">
            <img
              src="../../assets/user-violet.png"
            />
            <p>Patients</p>
          </div>
        <RouterLink to="/notification">
          <div class="onglet">
            <img
              src="../../assets/notif-blanc.png"
            />
            <p>Notifications</p>
            <p id="nbre" v-if="nbre">{{ nbre }}</p>
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
        <!-- bind the data from api -->
        <div class="infos">
          <p>{{ current }}</p>
          <p id="second">{{ admin }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="patients">
          <div class="searchContainer">
            <div class="left">
              <form @submit.prevent="makeSearch" >
                <div class="search">
                  <input type="text" placeholder="Rechercher" style="width:300px" v-model="search_text"/>
                  <button style="border:none; background-color:transparent" type="submit"><img  src="../../assets/Vector.png" /></button>
                </div>
              </form>
              <div class="filter" style="visibility: hidden;">
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
            <div v-if="patient.length == 0" class="emptyPatients">
              <img
                src="https://s3-alpha-sig.figma.com/img/db21/01a5/9a5562e5fc71abadf7617ab01ad4898f?Expires=1701648000&Signature=qxCm6otV2tPTXlLQ9g55JKfKz~bvCi98DA8VM6l8AjlMpV-aFkxpk4NSpaVslDbfk51uzEWiEcdEFc9zCKn9x4fEN1kXmDv1QFW1-NMVJhdJiGrQh3fr9yscru~212VJ9RUUl50jvzEhYV~WMgpTUnHVr83Cpy2JJNuFYyLz8WvzeQYRtG-j4pQJWU07cHBXHYXQ1ilXzjJ1e511jpwpcPKwHfEqieB90VLRXflv484TxwXNeOr0q-lQ-NphAvEg7-S~ik7yYSrIl-stqGeNO83iqgZ8RLjOEb88iSnJoMFbul92TK-uFzO-v4nUZLDCgAhF-a3~ntPB8jK4qyfwyA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              />
              <div class="texte">
                <p>
                  Aucun patient vu <br />Veillez enregistrer un
                  <RouterLink to="/new-patient"> <span>nouveau patient</span></RouterLink
                  ><br />ou <b style="cursor:pointer" @click="refresh">actualiser la page</b> .
                </p>
              </div>
            </div>

            <div v-else class="listePatient">
              <table v-if="mks === false">
                <tr>
                  <td>Nom et Prénoms</td>
                  <td>Contact</td>
                  <td>Fiches client</td>
                  <td>Date de livraison</td>
                  <td>Date de renouvellement</td>
                  <td v-if="current === 'Administrateur'">Enrégistré par</td>
                  <td>Action</td>
                </tr>
                <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                <tr v-if="current === 'Administrateur'" id="liste" v-for="elm in patient.reverse()" :key="elm.id" :class="[elm.color % 2 == 1 ? 'violet' : 'yellow']">
                  <td>{{ elm.last_name.toUpperCase()}} {{ elm.first_name }} </td>
                  <td>{{ elm.phone_number ? elm.phone_number : 'Aucun contact trouvé' }}</td>
                  <td>
                    <div class="action">
                      <p style="margin-bottom: 10px; cursor:pointer" @click="modify(elm.id, '/donnee-patient')">Données du client</p>
                      <!-- <RouterLink to=""></RouterLink> -->
                      <p style="cursor:pointer" @click="modify(elm.id, '/fiche-paiement')">Fiche de paiement</p>
                      <!-- <RouterLink to=""></RouterLink> -->
                    </div>
                  </td>
                  <td>{{ elm.date_save }}</td>
                  <td>{{ (parseInt(elm.date_save.split(' ')[0].split('-')[0]) + 2) + '-' + elm.date_save.split(' ')[0].split('-')[1] + '-' + elm.date_save.split(' ')[0].split('-')[2] + '-' + elm.date_save.split(' ')[1] }} </td>
                  <td>{{ elm.user.name === "admin" ? "ADMINISTRATEUR" : elm.user.name }}</td>
                  <td style="color: rgb(172, 2, 2); cursor:pointer" @click="supp(elm.id)">Supprimer</td>
                </tr>
                <tr v-else id="liste" v-for="elmt in pat.reverse()" :key="elmt.id" :class="[elmt.color % 2 == 1 ? 'violet' : 'yellow']">
                  <td>{{ elmt.last_name.toUpperCase()}} {{ elmt.first_name }} </td>
                  <td>{{ elmt.phone_number ? elmt.phone_number : 'Aucun contact trouvé' }}</td>
                  <td>
                    <div class="action">
                      <p style="margin-bottom: 10px; cursor:pointer" @click="modify(elmt.id, '/donnee-patient')">Données du client</p>
                      <p style="cursor:pointer" @click="modify(elmt.id, '/fiche-paiement')">Fiche de paiement</p>
                    </div>
                  </td>
                  <td>{{ elmt.date_save }}</td>
                  <td>{{ (parseInt(elmt.date_save.split(' ')[0].split('-')[0]) + 2) + '-' + elmt.date_save.split(' ')[0].split('-')[1] + '-' + elmt.date_save.split(' ')[0].split('-')[2] + '-' + elmt.date_save.split(' ')[1] }} </td>
                  <td style="color: rgb(172, 2, 2); cursor:pointer" @click="supp(elmt.id)">Supprimer</td>
                </tr>
              </table>


              <table v-else>
                <tr>
                  <td>Nom et Prénoms</td>
                  <td>Contact</td>
                  <td>Fiches client</td>
                  <td>Date de livraison</td>
                  <td>Date de renouvellement</td>
                  <td>Action</td>
                </tr>
                <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->

                <tr id="liste" v-for="elmt in searchList" :key="elmt.id" :class="[elmt.color % 2 == 1 ? 'violet' : 'yellow']">
                  <td>{{ elmt.last_name.toUpperCase()}} {{ elmt.first_name }} </td>
                  <td>{{ elmt.phone_number}}</td>
                  <td>
                    <div class="action">
                      <p style="margin-bottom: 10px; cursor:pointer" @click="modify(elmt.id, '/donnee-patient')">Données du client</p>
                      <p style="cursor:pointer" @click="modify(elmt.id, '/fiche-paiement')">Fiche de paiement</p>
                    </div>
                  </td>
                  <td>{{ elmt.date_save }}</td>
                  <td>{{ (parseInt(elmt.date_save.split(' ')[0].split('-')[0]) + 2) + '-' + elmt.date_save.split(' ')[0].split('-')[1] + '-' + elmt.date_save.split(' ')[0].split('-')[2] + '-' + elmt.date_save.split(' ')[1] }} </td>
                  <td style="color: rgb(172, 2, 2); cursor:pointer" @click="supp(elmt.id)">Supprimer</td>
                </tr>
              </table>

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
      mail: 'employe@email.com',
      admin: localStorage.getItem('admin_mail'),
      pat: [], 
      patient:[],
      current: sessionStorage.getItem('user'),
      nbre:0,
      mks: false,
      search_text:"",
      searchList:[]
    }
  },
  mounted() {
    const url = new URL('https://laravel.lazonebleue.com/api/notifications')
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    fetch(url, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        this.nbre = body.body
        if (body.body > 0) {
          if (body.body === 1) {
            let utterance = new SpeechSynthesisUtterance(`Une notification entrante!`);
            utterance.lang = 'fr';
            speechSynthesis.speak(utterance);
            sessionStorage.setItem('nbre', body.body)
          } else{
          let utterance = new SpeechSynthesisUtterance(`${body.body} notification entrante!`);
          utterance.lang = 'fr';
          speechSynthesis.speak(utterance);
          sessionStorage.setItem('nbre', body.body)
        }
        }
        
      })
  
    const url2 = new URL(
    "https://laravel.lazonebleue.com/api/get_all_patients"
      );
      fetch(url2, {
          method: "GET",
          headers,
      }).then(response => response.json())
      .then(body => {
        this.patient = body.body
      })

      const url3 = new URL(
          `https://laravel.lazonebleue.com/api/get_total_patients_by_employee?employee_id=${sessionStorage.getItem('user_id')}`
      );
      fetch(url3, {
          method: "GET",
          headers,
      }).then(response => response.json())
      .then(body => {
        this.pat = body.body
      })   
    },
  methods: {
    modify(idx, route) {
      fetch('https://laravel.lazonebleue.com/api/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => response.json())
        .then((body) => {
          body.body.forEach((data) => {
            if (data.id === idx) {
              localStorage.setItem('patient_id', idx)
              sessionStorage.setItem('user_id_patient', data.user_id)
              window.location.href = route
            }
          })
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })
    },
    redirect(route){
      window.location.href = route
    },
    refresh(){
      window.location.reload()
    },
    supp(id){
      const url = new URL(
          `https://laravel.lazonebleue.com/api/patients/${id}`
      );

      const headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      };

      fetch(url, {
          method: "DELETE",
          headers,
      }).then(response => response.json())
      .then(body => {
        body
        window.location.reload()
      })
    },
    makeSearch(){
      if (this.search_text === "") {
        this.mks = false
      } else {
        this.searchList = []
        this.mks = true
        const url2 = new URL(
        "https://laravel.lazonebleue.com/api/get_all_patients"
          );
          const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
          fetch(url2, {
              method: "GET",
              headers,
          }).then(response => response.json())
          .then(body => {
            body.body.forEach(patient => {
              if ((patient.last_name + patient.first_name).toUpperCase().includes(this.search_text.toUpperCase())) {
                this.searchList.push(patient)
              }
            });
            // console.log(this.searchList)
        })
      }
    }
  }
}
</script>

<style scoped>
table {
  margin: auto;
  border: 1px solid #d9d9d978;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  margin-bottom: 30px;
}
table tr:nth-child(odd) {
  background-color: #fcf4ff;
}
#liste td {
  font-size: 12px;
}
td {
  font-size: 13px;
  padding: 10px;
}
.listePatient {
  padding-bottom: 10px;
  margin-bottom: 25px;
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
  width: 90%;
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
