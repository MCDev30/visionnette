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
          <div class="onglet" id="active">
            <img
              src="https://s3-alpha-sig.figma.com/img/636d/4027/18bd5b0f364d6009faafbb095b394b18?Expires=1701648000&Signature=TzZkRSiQgZuHF8S6~QIIMZeN-c5agFfXSxj9HEq0Jyos-d2DYRHVPgsrXB2zSqk4F8L63KY2JT069UgObw95NzteMCoJa7OzwgivFI9pAWlpzNe7gsvby79ujnMGok9EmEMwVMew3xJWXtyP2MNnL9Gmx6nDVWvClQw4hqxrg4z0g2NWaJuqdcHZ4Bga4NJtnqPBqcp-1nIYstkAs4TzyE55rW~jRhhxJA5K9laRtyUq8-ZrxSnrCobFe7SMk5KI2B5~rsDXJkEMI5JZLIKdkG3B3Qeg3n6ydtIMEAP-JLehDZ4nuIUcgJWaU6~8SEMz6M5XYIW3InJ2aCXQBJ8KDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            />
            <p>Dashboard</p>
          </div>
        </RouterLink>

        <RouterLink to="/patients">
          <div class="onglet">
            <img
              src="https://s3-alpha-sig.figma.com/img/87fd/9db3/8867116e9b0e74fed0a27d57e9992ea0?Expires=1701648000&Signature=knMTZSVu2Mmy-0pB1pqdxZxsrU-NQlHUKLbavy2S8E0p92uwLRG-~gZOjXHCAVw4Fo3myPfU4xzux-hLd3is8BEKoFVlCnMy3fB4-KP5CpSHofzsMPtuwH9wKDMm0slCXwkiNR5M8feMcrtppLiGyoCG-HZlbRZRPeDON9mfNRvgjQUV9acZUw~26rld6KPg3A4lkL~fj1lFGhZmPMVMopWOvwS-nfV2bAKsii1ud1VNTmiH-1Jxik3TVRSioBLD1eS1WTGhciWvUVkGPxDcPXDjGWqorflbasiym-6l79jFGWx9O-RNRT~Web5kTG5VmpQ6tHcgXKn4P9pJCk8NTA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
          <p v-if="current_user === 'admin'" >Administrateur</p>
          <p v-else>Employé(e)</p>
          <p id="second">{{ email }}</p>
        </div>
      </div>

      <div class="bottomPanel">
        <div class="space"></div>
        <div class="toast">
          <img @click="toggleChecked" src="../../assets/Union.png" />
          <p>Bienvenue {{ email }} !<br />Vous êtes connecté(e) en tant <span v-if="current_user === 'admin'" >qu'administrateur.</span>
          <span v-else>qu'employé(e).</span></p>
        </div>

        <div class="select_menu" >
          <select class="choice" name="choice" style="visibility:hidden">
            <option value="first" selected>Mensuel</option>
            <option value="second">Hebdomadaire</option>
            <option value="third">Journalier</option>
            <option value="third">Annuel</option>
          </select>
          <!-- bind data here -->
          <div class="gestion" v-if="current_user === 'admin' ">
            <RouterLink to="/employe"><p>Gérer les employés</p></RouterLink>
          </div>
        </div>
        <!-- bind data here from api -->
        <div v-if="current_user === 'Administrateur'" class="cardSlide">
          <div class="card">
            <div class="cardContainer">
              <p id="title" >Ventes</p>
              <div class="discover">
                <p id="number">100,000 <span>FCFA</span></p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cardContainer">
              <p id="title">Total de verres vendu</p>
              <div class="discover">
                <p id="number">500</p>
                <p id="taux">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/cc78/b2c2/0adf3f319348197045a276c8df8b22e1?Expires=1701648000&Signature=n2Vi2i3WMOh6C1JD3AHLb-EOX7wjKBP22FHug8sn40rPw2MAIgnvy8ckw5Jd2zoGAZ4r5zZCHU2CVdEahah27xxxYm90Q~Emk51PPq4jZ10TelmDBAnjDxAQyj0VVcmVgN0rSgP6AHrdeyD3sEFoKMp~ujjfusozIUFbl4e~BMSkMi~1XtjMAXsDBRpFbLEgXIvMyJwctZKzLka9GS8wZ5X9ibyXhr3yGKDvFODumRsnmRPljKCepiB6VtSlXmPvkuaQUwW~D5qeYuO07mpZA-3U5cJL2Y4pdHCMJm004ag~6EJ1usge8NLqaAp5DIQPp3shQhCvaiPC6vDqhDjiHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />20%
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cardContainer">
              <p id="title">Taux de rétention</p>
              <div class="discover">
                <p id="number">12/12</p>
                <p id="taux">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/cc78/b2c2/0adf3f319348197045a276c8df8b22e1?Expires=1701648000&Signature=n2Vi2i3WMOh6C1JD3AHLb-EOX7wjKBP22FHug8sn40rPw2MAIgnvy8ckw5Jd2zoGAZ4r5zZCHU2CVdEahah27xxxYm90Q~Emk51PPq4jZ10TelmDBAnjDxAQyj0VVcmVgN0rSgP6AHrdeyD3sEFoKMp~ujjfusozIUFbl4e~BMSkMi~1XtjMAXsDBRpFbLEgXIvMyJwctZKzLka9GS8wZ5X9ibyXhr3yGKDvFODumRsnmRPljKCepiB6VtSlXmPvkuaQUwW~D5qeYuO07mpZA-3U5cJL2Y4pdHCMJm004ag~6EJ1usge8NLqaAp5DIQPp3shQhCvaiPC6vDqhDjiHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />100%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="cardSlide">
            <div class="card">
              <div class="cardContainer">
                <p id="title" >Ventes</p>
                <div class="discover">
                  <p id="number">{{ total }} <span>FCFA</span></p>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="cardContainer">
                <p id="title">Total de verres vendu</p>
                <div class="discover">
                  <p id="number">{{ len }}</p>
                  <p id="taux">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cc78/b2c2/0adf3f319348197045a276c8df8b22e1?Expires=1701648000&Signature=n2Vi2i3WMOh6C1JD3AHLb-EOX7wjKBP22FHug8sn40rPw2MAIgnvy8ckw5Jd2zoGAZ4r5zZCHU2CVdEahah27xxxYm90Q~Emk51PPq4jZ10TelmDBAnjDxAQyj0VVcmVgN0rSgP6AHrdeyD3sEFoKMp~ujjfusozIUFbl4e~BMSkMi~1XtjMAXsDBRpFbLEgXIvMyJwctZKzLka9GS8wZ5X9ibyXhr3yGKDvFODumRsnmRPljKCepiB6VtSlXmPvkuaQUwW~D5qeYuO07mpZA-3U5cJL2Y4pdHCMJm004ag~6EJ1usge8NLqaAp5DIQPp3shQhCvaiPC6vDqhDjiHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                      alt=""
                    />
                    {{ percent }}%
                  </p>
                </div>
              </div>
            </div>
  
            <div class="card">
              <div class="cardContainer">
                <p id="title">Taux de rétention</p>
                <div class="discover">
                  <p id="number">{{ len + '/'+ len }}</p>
                  <p id="taux">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/cc78/b2c2/0adf3f319348197045a276c8df8b22e1?Expires=1701648000&Signature=n2Vi2i3WMOh6C1JD3AHLb-EOX7wjKBP22FHug8sn40rPw2MAIgnvy8ckw5Jd2zoGAZ4r5zZCHU2CVdEahah27xxxYm90Q~Emk51PPq4jZ10TelmDBAnjDxAQyj0VVcmVgN0rSgP6AHrdeyD3sEFoKMp~ujjfusozIUFbl4e~BMSkMi~1XtjMAXsDBRpFbLEgXIvMyJwctZKzLka9GS8wZ5X9ibyXhr3yGKDvFODumRsnmRPljKCepiB6VtSlXmPvkuaQUwW~D5qeYuO07mpZA-3U5cJL2Y4pdHCMJm004ag~6EJ1usge8NLqaAp5DIQPp3shQhCvaiPC6vDqhDjiHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                      alt=""
                    />{{ len !== 0 ? '100%' : '0%' }}
                  </p>
                </div>
              </div>
            </div>
          </div>


        <div class="statistique">
          <div class="topVendeur" v-if="current_user === 'admin'">
            <p id="title">Top vendeurs</p>
            <div class="employe">
              <div class="discovery">
                <p id="number">Empoyé 1</p>
                <p id="taux">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/cc78/b2c2/0adf3f319348197045a276c8df8b22e1?Expires=1701648000&Signature=n2Vi2i3WMOh6C1JD3AHLb-EOX7wjKBP22FHug8sn40rPw2MAIgnvy8ckw5Jd2zoGAZ4r5zZCHU2CVdEahah27xxxYm90Q~Emk51PPq4jZ10TelmDBAnjDxAQyj0VVcmVgN0rSgP6AHrdeyD3sEFoKMp~ujjfusozIUFbl4e~BMSkMi~1XtjMAXsDBRpFbLEgXIvMyJwctZKzLka9GS8wZ5X9ibyXhr3yGKDvFODumRsnmRPljKCepiB6VtSlXmPvkuaQUwW~D5qeYuO07mpZA-3U5cJL2Y4pdHCMJm004ag~6EJ1usge8NLqaAp5DIQPp3shQhCvaiPC6vDqhDjiHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />20%
                </p>
              </div>
              <div class="discovery">
                <p id="number">Empoyé 2</p>
                <p id="taux">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/cc78/b2c2/0adf3f319348197045a276c8df8b22e1?Expires=1701648000&Signature=n2Vi2i3WMOh6C1JD3AHLb-EOX7wjKBP22FHug8sn40rPw2MAIgnvy8ckw5Jd2zoGAZ4r5zZCHU2CVdEahah27xxxYm90Q~Emk51PPq4jZ10TelmDBAnjDxAQyj0VVcmVgN0rSgP6AHrdeyD3sEFoKMp~ujjfusozIUFbl4e~BMSkMi~1XtjMAXsDBRpFbLEgXIvMyJwctZKzLka9GS8wZ5X9ibyXhr3yGKDvFODumRsnmRPljKCepiB6VtSlXmPvkuaQUwW~D5qeYuO07mpZA-3U5cJL2Y4pdHCMJm004ag~6EJ1usge8NLqaAp5DIQPp3shQhCvaiPC6vDqhDjiHA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />20%
                </p>
              </div>
              <div class="discovery" id="emp3">
                <p id="number">Empoyé 3</p>
                <p id="taux" class="yellow">
                  <img
                    id="reverse"
                    src="https://s3-alpha-sig.figma.com/img/9acb/7ed1/f035b77027648091a1f9ae3c69808f0e?Expires=1701648000&Signature=XXwo7FVmZocoqI6EFvGae5AE1Y2HrDRp3Gg7xosGKDsCN5-7857V7shKXL5K3uswZv5PAKLmqfhoqgFOwJPXKYeTkXLSjC3575fYpBo8XtPviJag1Rt9cIE6TYBFVdT9gYMOR1TrZ6JKYYy9qlEr4UiOXYkbTma9HZIWq-KF5lfQoFlVSkrf6yA12Dvp80uxByp5RNktM69aU0T-osSdOkdO158lf1V1dHF8vUCJe5Snxfhj-n5FaAiC3CRRmSXXOuJheWaFFgjh7gYakGWvVHQDWW-nyCb~GU3JANKjzMbwdWROiYhpSlXii4YgeLGbiuPih8vmsREMghgVVo6lkA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />-2%
                </p>
              </div>
            </div>
          </div>
          <div v-if="current_user === 'admin'" class="graphique">
            <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
          </div>
          <div v-else class="graphique" style="width:700px; height:320px">
            <Bar style="width:715px; height:300px" id="my-chart-id" :options="chartOptions" :data="chartData" />
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
      current_user:'',
      nbre:0,
      total:0,
      len: 0,
      percent:0,
    }
  },
  methods: {
    toggleChecked() {
      document.querySelector('.toast').style.display = 'none'
      localStorage.setItem('isChecked', true)
    }
  },
  mounted() {
    const url = new URL('http://visionette.sc1cjlx6136.universe.wf/api/user')

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    fetch(url, {
      method: 'GET',
      headers
    }).then((response) => response.json())
    .then(body => {
      if (body.profil_id === 1) {
        this.current_user = 'admin'
        sessionStorage.setItem('user', 'Administrateur')
        sessionStorage.setItem('user_id', body.id)
        // console.log(body.id)
      } else{
        this.current_user = 'employe'
        sessionStorage.setItem('user', 'Employé(e)')
        sessionStorage.setItem('user_id', body.id)
      }
    })
    // console.log(localStorage.getItem('isChecked'))
    if (localStorage.getItem('isChecked') === 'true') {
      document.querySelector('.toast').style.display = 'none'
    } else {
      document.querySelector('.toast').style.display = 'block'
    }

    const url2 = new URL('http://visionette.sc1cjlx6136.universe.wf/api/notifications')
    fetch(url2, {
      method: 'GET',
      headers
    })
      .then((response) => response.json())
      .then((body) => {
        // console.log(body)
        this.nbre = parseInt(body.body)
        sessionStorage.setItem('nbre', body.body)
        if (body.body > 0) {
          if (body.body === 1) {
            let utterance = new SpeechSynthesisUtterance(`Une notification entrante!`);
            utterance.lang = 'fr';
            speechSynthesis.speak(utterance);
            sessionStorage.setItem('nbre', body.body)
          } else{
          let utterance = new SpeechSynthesisUtterance(`${body.body} notifications entrantes!`);
          utterance.lang = 'fr';
          speechSynthesis.speak(utterance);
          sessionStorage.setItem('nbre', body.body)
        }
        }
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
