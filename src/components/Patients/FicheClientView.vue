<template>
  <div class="container" v-bind:class="{ contain }">
    <section class="section">
      <div class="logo">
        <img
          class="logoOptique"
          src="src/assets/logo.png"
          alt="Visionette Optique"
          width="168"
        />
      </div>
      <div class="menu">
        <RouterLink to="/dashboard">
          <div class="onglet">
            <img
              src="src/assets/dash-blanc.png"
            />
            <p>Dashboard</p>
          </div>
        </RouterLink>

        <RouterLink to="/patients">
          <div class="onglet" id="active">
            <img
              src="src/assets/user-violet.png"
            />
            <p>Patients</p>
          </div>
        </RouterLink>

        <RouterLink to="/notification">
          <div class="onglet">
            <img
              src="src/assets/notif-blanc.png"
            />
            <p>Notifications</p>
            <p id="nbre" v-if="nbre !== 0">{{ nbre }}</p>
          </div>
        </RouterLink>

        <RouterLink to="/disconnect">
          <div class="onglet">
            <img
              src="src/assets/logout-blanc.png"
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
            src="src/assets/image.png"
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
            <div class="left" style="visibility: hidden;">
              <div class="search">
                <input type="text" placeholder="Rechercher"/>
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
            <div class="details">
              <p id="ti">Fiche du client</p>
              <form @submit.prevent="update_client">
                <div class="contenus">
                  <div class="information">
                    <div class="personnel">
                      <p>Cliquez sur les données pour les modifier</p>
                      <h4>informations personnelles</h4>
                      <input type="text" placeholder="Nom:" v-model="last_name" />
                      <input type="text" placeholder="Prénoms:" v-model="first_name" />
                      <input type="text" placeholder="Email:" v-model="email" />
                      <input type="text" placeholder="Numéro:" v-model="phone_number" />
                    </div>
                    <div class="paiement">
                      <h4>Information paiement</h4>
                      <input type="numeric" placeholder="Montant:" v-model="montant" />
                      <input type="numeric" placeholder="Accompte" v-model="acompte" />
                      <input type="numeric" placeholder="Solde(restant):" v-model="solde" />
                      <input type="submit" id="enr" value="Valider les informations" />
                    </div>
                  </div>

                  <div class="prescription">
                    <h4>Prescription</h4>
                    <table id="table">
                      <tr>
                        <td>Monture</td>
                        <td>Référence</td>
                        <!-- <td>Taille</td> -->
                        <td>Couleur</td>
                        <td>Prix</td>
                      </tr>
                      <tr>
                        <td><input type="text" placeholder="none" v-model="frame" /></td>
                        <td>
                          <input type="text" placeholder="none" v-model="reference" />
                        </td>
                        <!-- <td><input type="text" placeholder="none" v-model="taille"/></td> -->
                        <td><input type="text" placeholder="none" v-model="color" /></td>
                        <td><input type="text" placeholder="none" v-model="price" /></td>
                      </tr>
                    </table>
                    <table>
                      <tr>
                        <td>Correction</td>
                        <td>Traitement</td>
                        <td>Type de verres</td>
                        <!-- <td>Montant</td> -->
                      </tr>
                      <tr>
                        <td>
                          <div class="corr_gauche">
                            <div><p>Oeil gauche</p></div>
                            <div>
                              <input
                                type="text"
                                placeholder="VL"
                                v-model="left_eye_vl_correction"
                              /><br />
                              <input
                                type="text"
                                placeholder="VP"
                                v-model="left_eye_vp_correction"
                              />
                            </div>
                          </div>
                          <div class="corr_gauche">
                            <div><p>Oeil droit</p></div>
                            <div>
                              <input
                                type="text"
                                placeholder="VL"
                                v-model="right_eye_vl_correction"
                              /><br />
                              <input
                                type="text"
                                placeholder="VP"
                                v-model="right_eye_vp_correction"
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <input id="large" type="text" placeholder="none" v-model="traitement" />
                        </td>
                        <td>
                          <input id="large" type="text" placeholder="none" v-model="verre_type" />
                        </td>
                        <!-- <td>
                          <input id="large" type="text" placeholder="none" v-model="montant"/>
                        </td> -->
                      </tr>
                    </table>
                    <div class="livraison">
                      <h4>Date de livraison</h4>
                      <input type="date" id="date" v-model="date_livraison" />
                    </div>
                  </div>
                </div>
              </form>
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
      nbre:parseInt(sessionStorage.getItem('nbre')),
      admin: localStorage.getItem('admin_mail'),
      patient_id: parseInt(localStorage.getItem('patient_id')),
      current: sessionStorage.getItem('user'),
      user_id: sessionStorage.getItem('user_id'),
      isPaid:'',
      color:"",
      email:"",
      first_name:"",
      frame:"",
      last_name:"",
      left_eye_vl_correction:"",
      left_eye_vp_correction:"",
      phone_number:"",
      price:"",
      reference:"",
      right_eye_vl_correction:"",
      right_eye_vp_correction:"",
      acompte: "",
      date_livraison: "",
      montant: "",
      solde: "",
      verre_type: "",
      pid:"",
      pass:""
    }
  },
  mounted() {
    this.client_sheet()
  },
  methods: {
    client_sheet() {
      const header = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      fetch('http://visionette.sc1cjlx6136.universe.wf/api/patients', {
        method: 'GET',
        headers: header
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.success) {
            body.body.forEach((data) => {
              if (data.id === this.patient_id) {
                // console.log(data)
                localStorage.setItem('id_paiement', data.id)
                this.color=data.color,
                this.email=data.email,
                this.first_name=data.first_name,
                this.frame=data.frame,
                this.last_name=data.last_name.toUpperCase(),
                this.left_eye_vl_correction=data.left_eye_vl_correction,
                this.left_eye_vp_correction=data.left_eye_vp_correction,
                this.phone_number=data.phone_number,
                this.price=data.price,
                this.reference = data.reference,
                this.right_eye_vl_correction=data.right_eye_vl_correction,
                this.right_eye_vp_correction=data.right_eye_vp_correction
              }
            })
          } else {
            console.error('Failed', body)
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })
      const url = new URL('http://visionette.sc1cjlx6136.universe.wf/api/sells')
      fetch(url, {
        method: 'GET',
        headers: header
      }).then((response) => response.json())
      .then(body => {
        if (body.success) {
            body.body.forEach((data) => {
              if (data.patient_id === this.patient_id) {
                console.log(data.id)
                this.pid = data.id
                this.isPaid = true
                this.acompte= data.acompte,
                this.date_livraison= data.date_livraison,
                this.montant= data.montant,
                this.solde= data.solde,
                this.verre_type= data.verre_type
              }
            })
          } else {
            console.error('Failed', body)
          }
      })
      .catch((error) => {
          console.error('Fetch error:', error)
      })
    },
    update_client(){
      if (this.isPaid) {
        const new_data_patient = {
          user_id:sessionStorage.getItem('user_id_patient'),
          patient_id: parseInt(localStorage.getItem('patient_id')),
          color:this.color,
          email:this.email,
          first_name:this.first_name,
          frame:this.frame,
          last_name:this.last_name,
          left_eye_vl_correction:this.left_eye_vl_correction,
          left_eye_vp_correction:this.left_eye_vp_correction,
          phone_number:this.phone_number,
          price:this.price,
          reference:this.reference,
          right_eye_vl_correction:this.right_eye_vl_correction,
          right_eye_vp_correction:this.right_eye_vp_correction
        }
        const new_data_paiement = {
          patient_id: this.pid,
          verre_type: this.verre_type,
          montant: this.montant,
          acompte: this.acompte,
          solde: this.solde,
          date_livraison: this.date_livraison
        }
        const url1 = new URL(
            `http://visionette.sc1cjlx6136.universe.wf/api/patients/${new_data_patient.patient_id}`
        );
        const url2 = new URL(
            `http://visionette.sc1cjlx6136.universe.wf/api/sells/${this.pid}`
        );
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        this.pass = 0
        fetch(url1, {
            method: "PUT",
            headers,
            body: JSON.stringify(new_data_patient),
        }).then(response => response.json())
          .then(body => {
            if (body.success) {
              this.pass = this.pass + 1
            }
        })
        fetch(url2, {
            method: "PUT",
            headers,
            body: JSON.stringify(new_data_paiement),
        }).then(response => response.json())
        .then(body => {
          if (body.success & this.pass > 0) {
              window.location.href = '/patients'
          }
        })
      } else {
        alert("Veuillez remplir au préalble la fiche de paiement")
        window.location.href = '/fiche-paiement'
      }


    },
    redirect(route){
      window.location.href = route
    }
  }
}
</script>

<style scoped>
.details {
  border: 1px solid #adacaca7;
  border-radius: 10px;
  overflow: hidden;
}
.prescription {
  margin: 20px;
  border-left: 1px solid #adacac;
  padding-left: 20px;
}
.livraison {
  display: flex;
  justify-content: baseline;
  align-items: center;
}
#date {
  margin: 20px;
  width: 150px;
}
#enr {
  border-radius: 5px;
  border: none;
  background-color: #6a069a;
  color: #fff;
  height: 50px;
}
.prescription input {
  border: none;
  outline: none;
  background-color: #fff9f1;
  width: 80px;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
}
.corr_gauche {
  display: flex;
  justify-content: center;
  align-items: center;
}
#large {
  height: 70px;
  margin: 10px;
}
.corr_gauche p {
  transform: rotate(-90deg);
  width: 100px;
  margin-left: -20px;
  font-size: 14px;
  margin-top: 20px;
  color: #6a069a;
  background-color: #fcf4ff;
  border-bottom: 1px solid #6a069a;
  text-transform: uppercase;
  padding: 3px;
  font-weight: 100;
}
#table input {
  margin: 4px;
}
table {
  text-align: center;
  padding: 20px;
  margin-left: -20px;
}
.details ::placeholder {
  color: #000000a0;
}
.information {
  padding: 20px;
  margin: 30px;
  margin-top: -10px;
}
.information h4 {
  margin-top: 20px;
  margin-bottom: 20px;
}
table {
  color: #989797;
  font-size: 14px;
}
.information input {
  width: 100%;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid #adacac;
  margin-top: 10px;
}
.contenus {
  display: flex;
  justify-content: center;
  /* flex-wrap: wrap; */
}

.personnel p {
  font-size: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.details h4 {
  color: #6a069a;
  background-color: #fcf4ff;
  border-bottom: 1px solid #6a069a;
  width: max-content;
  text-transform: uppercase;
  padding: 1px;
  font-weight: 100;
}
#ti {
  height: 40px;
  width: 100%;
  background-color: #6a069a;
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-weight: bold;
}
.correction {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#in {
  width: 130px;
  height: 10px;
}
.correction p {
  margin-top: -55px;
  font-size: 11px;
}
#cc {
  font-size: 12px;
  margin-top: -45px;
  margin-bottom: -16px;
}

.listePatient {
  padding-bottom: 10px;
  margin-bottom: 25px;
}
#oeil {
  color: #6a069a;
  margin-top: -30px;
  margin-bottom: 4px;
  font-size: 12px;
}
.liens {
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
  width: 95%;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
  padding-left: 30px;
  padding-bottom: 1px;
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
.vue {
  margin-bottom: 50px;
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
.vue {
  padding-bottom: 10px;
  width: 95%;
  padding: 10px;
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
