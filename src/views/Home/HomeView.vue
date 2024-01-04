<template>
  <div class="container" v-bind:class="{ contain }">
    <section class="section">
      <div class="logo">
        <img class="logoOptique" src="../../assets/logo.png" alt="Visionette Optique" width="168" />
      </div>
      <div class="menu">
        <RouterLink to="/dashboard">
          <div class="onglet" id="active">
            <img src="../../assets/dash-violet.png" />
            <p>Dashboard</p>
          </div>
        </RouterLink>

        <RouterLink to="/patients">
          <div class="onglet">
            <img src="../../assets/user-blanc.png" />
            <p>Patients</p>
          </div>
        </RouterLink>

        <RouterLink to="/notification">
          <div class="onglet">
            <img src="../../assets/notif-blanc.png" />
            <p>Notifications</p>
            <p id="nbre" v-if="nbre">{{ nbre }}</p>
          </div>
        </RouterLink>

        <RouterLink to="/disconnect">
          <div class="onglet">
            <img src="../../assets/logout-blanc.png" />
            <p>Se déconnecter</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <aside class="aside">
      <div class="topPanel">
        <div class="admin">
          <img src="../../assets/image.png" alt="" />
        </div>
        <!-- bind the data from api -->
        <div class="infos">
          <p v-if="current_user === 'admin'">Administrateur</p>
          <p v-else>Employé(e)</p>
          <p id="second">{{ email }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="space"></div>
        <div class="toast">
          <img @click="toggleChecked" src="../../assets/Union.png" />
          <p>
            Bienvenue {{ email }} !<br />Vous êtes connecté(e) en tant
            <span v-if="current_user === 'admin'">qu'administrateur.</span>
            <span v-else>qu'employé(e).</span>
          </p>
        </div>

        <div class="select_menu">
          <select class="choice" name="choice" style="visibility: hidden">
            <option value="first" selected>Mensuel</option>
            <option value="second">Hebdomadaire</option>
            <option value="third">Journalier</option>
            <option value="third">Annuel</option>
          </select>
          <!-- bind data here -->
          <div class="gestion" v-if="current_user === 'admin'">
            <RouterLink to="/employe"><p>Gérer les employés</p></RouterLink>
          </div>
        </div>
        <!-- bind data here from api -->
        <div v-if="current_user !== 'admin'" class="cardSlide">
          <div class="card">
            <div class="cardContainer">
              <p id="title">Ventes</p>
              <div class="discover">
                <p id="number">{{ total2 }} <span>FCFA</span></p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="cardContainer">
              <p id="title">Total de verres vendu</p>
              <div class="discover">
                <p id="number">{{ len2 }}</p>
                <p id="taux">
                  <img src="../../assets/av.png" alt="" />{{ len !== 0 ? percent2 : '0' }}%
                </p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="cardContainer">
              <p id="title">Taux de rétention</p>
              <div class="discover">
                <p id="number">{{ len2 + '/' + len2 }}</p>
                <p id="taux">
                  <img src="../../assets/av.png" alt="" />{{ len2 !== 0 ? '100%' : '0%' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="cardSlide">
          <div class="card">
            <div class="cardContainer">
              <p id="title">Ventes</p>
              <div class="discover">
                <p id="number">{{ total }} <span>FCFA</span></p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cardContainer">
              <p id="title">Total de verres vendu</p>
              <div class="discover">
                <p id="number">{{ len === NaN ? '0' : len }}</p>
                <p id="taux">
                  <img src="../../assets/av.png" alt="" />
                  {{ len !== 0 ? percent : '0' }}%
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cardContainer">
              <p id="title">Taux de rétention</p>
              <div class="discover">
                <p id="number">{{ len + '/' + len }}</p>
                <p id="taux">
                  <img src="../../assets/av.png" alt="" />{{ len !== 0 ? '100%' : '0%' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="statistique">
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <div class="topVendeur" v-if="current_user === 'admin'" style="overflow: scroll">
            <p id="title">Top vendeur</p>
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <div v-for="elm in pat" class="employe">
              <div class="discovery">
                <p id="number">{{ elm.name }}</p>
                <p id="taux">
                  <img v-if="elm.caractere === 'plus'" src="../../assets/av.png" alt="" />
                  <img v-else src="../../assets/ay.png" alt="" />
                  <span :class="[elm.caractere === 'plus' ? 'vio' : 'emp3']"
                    >{{ elm.percent }}%</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div v-if="current_user === 'admin'" class="graphique">
            <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
          </div>
          <div v-else class="graphique" style="width: 700px; height: 320px">
            <Bar
              style="width: 715px; height: 300px"
              id="my-chart-id"
              :options="chartOptions"
              :data="chartData"
            />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [
          'jan',
          'févr',
          'mars',
          'avril',
          'mai',
          'juin',
          'juil',
          'août',
          'sep',
          'octo',
          'nov',
          'déc'
        ],
        datasets: [
          {
            data: [30, 20, 12, 11, 27, 32, 4, 30, 20, 12, 11, 27],
            label: 'Nombre de patient par mois',
            backgroundColor: [
              'rgba(235, 85, 52)',
              'rgba(235, 162, 52)',
              'rgba(229, 235, 52)',
              'rgba(147, 235, 52)',
              'rgba(52, 235, 82)',
              'rgba(52, 235, 201)',
              'rgba(52, 186, 235)',
              'rgba(70, 52, 2352)',
              'rgba(140, 52, 235)',
              'rgba(204, 52, 235)',
              'rgba(52, 235, 82)',
              'rgba(235, 52, 174)'
            ]
          }
        ]
      },
      chartOptions: {
        responsive: true
      },
      email: localStorage.getItem('admin_mail'),
      current_user: '',
      nbre: 0,
      total: 0,
      len: 0,
      percent: 0,
      emp_id: sessionStorage.getItem('user_id') ? sessionStorage.getItem('user_id') : 0,
      len2: 0,
      percent2: 0,
      total2: 0,
      pat: [],
      pat2: [],
      bog: [],
      idArray: []
    }
  },
  methods: {
    toggleChecked() {
      document.querySelector('.toast').style.display = 'none'
      localStorage.setItem('isChecked', true)
    }
  },
  mounted() {
    const url = new URL('https://laravel.lazonebleue.com/api/user')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    fetch(url, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.profil_id === 1) {
          this.emp_id = body.id
          this.current_user = 'admin'
          sessionStorage.setItem('user', 'Administrateur')
          sessionStorage.setItem('user_id', body.id)
          // console.log(body.id)
        } else {
          this.emp_id = body.id
          this.current_user = 'employe'
          sessionStorage.setItem('user', 'Employé(e)')
          sessionStorage.setItem('user_id', body.id)
        }
      })

    if (localStorage.getItem('isChecked') === 'true') {
      document.querySelector('.toast').style.display = 'none'
    } else {
      document.querySelector('.toast').style.display = 'block'
    }

    const url3 = new URL('https://laravel.lazonebleue.com/api/notifications')
    fetch(url3, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        this.nbre = parseInt(body.body)
        sessionStorage.setItem('nbre', body.body)
        if (body.body > 0) {
          if (body.body === 1) {
            let utterance = new SpeechSynthesisUtterance(`Une notification entrante!`)
            utterance.lang = 'fr'
            speechSynthesis.speak(utterance)
            sessionStorage.setItem('nbre', body.body)
          } else {
            let utterance = new SpeechSynthesisUtterance(`${body.body} notifications entrantes!`)
            utterance.lang = 'fr'
            speechSynthesis.speak(utterance)
            sessionStorage.setItem('nbre', body.body)
          }
        }
      })

    const url4 = new URL(
      `https://laravel.lazonebleue.com/api/get_total_patients_by_employee?employee_id=${this.emp_id}`
    )
    fetch(url4, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        // console.log(body.body)
        // console.log(this.emp_id)
        this.len2 = body.body.length
        this.percent2 = ((this.len2 * 100) / body.body.length).toFixed(2)
        body.body.forEach((elm) => {
          this.total2 += parseInt(elm.sells[0].montant)
        })
      })

    const url2 = new URL('https://laravel.lazonebleue.com/api/get_all_patients')
    fetch(url2, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        // console.log(body.body)
        const bigBody = body.body
        this.len = body.body.length
        // console.log(this.len)
        this.percent = (this.len / body.body.length) * 100
        this.percent2 = (this.len2 / body.body.length) * 100
        body.body.forEach((elm) => {
          this.total += parseInt(elm.sells[0].montant * 1)
        })
        bigBody.forEach((elm) => {
          console.log(elm.user_id)
          const urll = new URL(
            `https://laravel.lazonebleue.com/api/get_total_patients_by_employee?employee_id=${elm.user_id}`
          )
          fetch(urll, {
            method: 'GET',
            headers
          })
            .then((response) => response.json())
            .then((body) => {
              if (body.success) {
                if (body.body) {
                  console.log(body.body)
                  this.big = body.body
                  if (body.body[0].user.profil_id !== 1) {
                    for (let index = 0; index < body.body.length - 1; index++) {
                      this.idArray.push(body.body[0].user.id)
                      // this.idArray = Array.from(new Set(this.idArray))
                      console.log(this.idArray)
                    }
                  }
                }
              } else {
                console.log('Erreur')
              }
            })
        })
      })

    const urlx = new URL('https://laravel.lazonebleue.com/api/get_all_users')
    fetch(urlx, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        // console.log(body.body)
        for (let index = 0; index < this.idArray.length; index++) {
          for (let j = 0; j < body.body.length; j++) {
            if (this.idArray[index] === body.body[j].id) {
              // console.log(big)
              this.pat[index] = {
                id: body.body[j].id,
                name: body.body[j].name,
                percent: (this.big.length / this.len).toFixed(2) * 100,
                caractere: this.big.length / this.len > 0.2 ? 'plus' : 'minus'
              }
            }
          }
        }
        console.log(this.pat)
      })
    
  }
}
</script>

<style scoped>
.unvisible {
  display: none;
}
.see {
  display: block;
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
#reverse {
  transform: rotate(-180deg);
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
.emp3 {
  background-color: #fff9f1;
  color: #fff9f1;
}
.emp3 {
  color: #f5981f;
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
  display: block;
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
