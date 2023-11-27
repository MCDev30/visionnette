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

        <RouterLink to="/patients">
          <div class="onglet" id="active">
            <img
              src="../../assets/user-violet.png"
            />
            <p>Patients</p>
          </div>
        </RouterLink>

        <RouterLink to="/notification">
          <div class="onglet">
            <img
              src="../../assets/notif-blanc.png"
            />
            <p>Notifications</p>
            <p id="nbre" v-if="nbre !== 0">{{ nbre }}</p>
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
          <p id="second">{{ email }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="addCard">
          <div class="color">
            <p>Fiche de paiement</p>
          </div>
          <!-- remplacer les values des inputs avec les données de l'api -->
          <div class="contenu" v-if="!isSeen">
            <p style="font-size:12px; color:#6A069A; text-align:center">Remplir les données du patient</p>
            <p style="color:#6A069A; background-color:#FCF4FF; border-bottom:1px solid #6A069A; margin-top:-10px; width: fit-content; margin:auto; padding:2px; margin-bottom:15px">INFORMATION PAIEMENT</p>
            <form @submit.prevent="paiement">
              <input type="text" placeholder="Type de verre:" v-model="type"/>
              <input type="numeric" placeholder="Montant:" v-model="montant"/>
              <input type="numeric" placeholder="Accompte:" v-model="accompte"/>
              <input type="numeric" placeholder="Solde(Restant):" v-model="solde"/>
              <input type="date" v-model="date"/>
              <button id="submit" type="submit">
                <p style="cursor:pointer" id="tex">Enrégistrer</p>
              </button>
            </form>
          </div>
          <div class="contenu" v-else style="padding:10px; padding-bottom:30px">
            <p style="font-size:12px; color:#6A069A; text-align:center">Ce patient a déjà effectué le paiement nécessaire</p>
              <button id="submit" type="button" style="margin:0; margin-right:10px; width:130px" @click="redirect('/patients')">
                <p style="cursor:pointer; font-size:12px; " id="tex">Retour</p>
              </button>
              <button id="submit" type="button" style="margin:0; margin-left:45px; width:130px" @click="redirect('/donnee-patient')">
                <p style="cursor:pointer; font-size:12px" id="tex"  >Fiche-patient</p>
              </button>
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
      current: sessionStorage.getItem('user'),
      email: localStorage.getItem('admin_mail'),
      type:'',
      montant:'',
      accompte:'',
      solde:'',
      date:'',
      isSeen:false,
      nbre:parseInt(sessionStorage.getItem('nbre'))

    }
  },
  mounted(){
    const url = new URL(
        "http://visionette.sc1cjlx6136.universe.wf/api/sells"
    );
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    fetch(url, {
        method: "GET",
        headers,
    }).then(response => response.json())
    .then(body => {
      console.log(body.body)
      body.body.forEach(elm => {
        if (elm.patient_id === parseInt(localStorage.getItem('patient_id'))) {
          this.isSeen = true
          console.log(elm.id)
        }
      });
    })
  },
  methods: {
    paiement() {
      const data = {
        patient_id: parseInt(localStorage.getItem('patient_id')),
        verre_type:this.type,
        montant:this.montant,
        acompte:this.accompte,
        solde: this.solde,
        date_livraison: this.date
      }
      fetch('http://visionette.sc1cjlx6136.universe.wf/api/sells', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(body => {
          console.log(body)
          console.log(data)
          if (body.success) {
            window.location.href = "/patients"
          } else{
            console.log('Paiement échoué')
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })
    },
    redirect(route){
      window.location.href = route
    }
  }
}

</script>

<style scoped>
.contenu p {
  padding: 25px;
  font-size: 15px;
  margin-bottom: 17px;
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
  margin-top: 80px;
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
