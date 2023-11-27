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
          <div class="onglet" id="active">
            <img
              src="../../assets/dash-violet.png"
            />
            <p>Dashboard</p>
          </div>
        </RouterLink>

        <RouterLink to="/patients">
          <div class="onglet">
            <img
              src="../../assets/user-blanc.png"
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
        <div class="infos">
          <p>{{ current }}</p>
          <p id="second">{{ email }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="empContainer">
          <div class="line">
            <p id="gest">Gestion des empoyés</p>
            <RouterLink to="/add"><p id="link">Ajouter un employé</p></RouterLink>
          </div>
          <p id="tous">Tous les employés:</p>
          <div class="liste">
            <div v-if="employes.length == 0" class="emploteCard">
              <p id="aucun">Aucun employé (Veillez ajouter un employé)</p>
            </div>
            <div v-else class="cardList">
              <!-- eslint-disable-next-line vue/require-v-for-key -->
              <div v-for="emp in employes" :key="emp.id" class="emploteCard">
                <p id="nom" style="width:130px">{{ emp.name }}</p>
                <p id="stat" style="text-align:left; width:100px">{{ emp.email }}</p>
                <p id="stat" style="cursor:pointer" @click="modify(emp.id, '/stats')">Statistique</p>
                <p id="stat" style="cursor:pointer" @click="modify(emp.id, '/update')">Modifier</p>
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
      email: localStorage.getItem('admin_mail'),
      employes: [],
      current: sessionStorage.getItem('user'),
      nbre:parseInt(sessionStorage.getItem('nbre'))

    }
  },
  mounted(){
    this.load()
  },
  methods:{
  load() {
      fetch('http://visionette.sc1cjlx6136.universe.wf/api/get_all_employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => response.json())
        .then(body => {
          this.employes = body.body
          console.log(this.employes)
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })
    },
    modify(idx, route){

      fetch('http://visionette.sc1cjlx6136.universe.wf/api/get_all_employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => response.json())
        .then(body => {
          body.body.forEach(data => {
            if (data.id === idx) {
              localStorage.setItem('employe_id', idx)
              localStorage.removeItem('employe_nom')
              localStorage.removeItem('employe_prenom')
              localStorage.removeItem('employe_email')
              if (data.name.split(' ')[1]) {
                localStorage.setItem('employe_nom', data.name.split(' ')[0])
                localStorage.setItem('employe_prenom', data.name.split(' ')[1])
                localStorage.setItem('employe_email', data.email)
              } else{
                localStorage.setItem('employe_nom', data.name.split(' ')[0])
                localStorage.setItem('employe_prenom', " ")
                localStorage.setItem('employe_email', data.email)
              }
              window.location.href = route
            }
          });
        })
        .catch((error) => {
          console.error('Fetch error:', error)
        })

    }
  }
    
}
</script>

<style scoped>
.empContainer {
  margin: auto;
  width: 75%;
  margin-top: 40px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}
#aucun,
#nom {
  color: #000000;
  font-size: 13px;
}
#stat {
  color: #6a069a;
  font-size: 13px;
}
.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
}
#gest {
  color: #6a069a;
  font-size: 16px;
  background-color: #fcf4ff;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid;
}
#tous {
  margin-top: 22px;
  color: #00000080;
  font-size: 14px;
  padding-bottom: 22px;
  border-bottom: 1px solid #00000040;
}
#link {
  background-color: #6a069a;
  color: #fff;
  font-size: 14px;
  padding: 10px;
  border-radius: 3px;
}
.emploteCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #00000040;
  padding: 15px;
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
