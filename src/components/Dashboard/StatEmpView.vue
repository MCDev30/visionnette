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
          <!-- bind the data from api -->
          <div class="infos">
            <p v-if="current_user === 'admin'" >Administrateur</p>
            <p v-else>Employé(e)</p>
            <p id="second">{{ email }}</p>
          </div>
        </div>
  
        <div class="bottomPanel">
          <div class="space"></div>
            

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
          <div class="cardSlide">
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
          <div class="user">
            <p style="padding:20px; font-weight:bold">Informations de l'employé </p>
            <div style="background-color:#fff; padding:25px; border-radius:10px">
                <div style="padding-bottom:20px">
                    <p>{{ username }} {{ user_surname }}</p>
                </div>
                <div>
                    <p>{{ usermail }}</p>
                </div>
            </div>
            </div>
            <div v-if="len !== 0" id="table">
          <div  style="text-align: center; padding:15px; font-weight:bold">Les patients enregitrés par cet employé</div>
          <table>
            <tr>
                <td>Nom prénoms</td>
                <td>Contact</td>
                <td>Livraison</td>
                <td>Renouvellement</td>
            </tr>
            <tr id="liste" v-for="elmt in pat" :key="elmt.id" :class="[elmt.color % 2 == 1 ? 'violet' : 'yellow']">
                  <td>{{ elmt.first_name }} {{ elmt.last_name.toUpperCase() }}</td>
                  <td>{{ elmt.phone_number ? elmt.phone_number : 'Aucun contact trouvé' }}</td>
                  <td>{{ elmt.sells[0] ? elmt.sells[0].date_livraison : "Paiement non effectué"}}</td>
                  <td>{{elmt.sells[0] ? parseInt(elmt.sells[0].date_livraison.split('-')[0])  + 2 + '-' + elmt.sells[0].date_livraison.split('-')[1] + '-' + elmt.sells[0].date_livraison.split('-')[2] : "Paiement non effectué"}} </td>
            </tr>

          </table></div>
        </div>
      </aside>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        email: localStorage.getItem('admin_mail'),
        current_user:'',
        nbre:0,
        emp_id: localStorage.getItem('employe_id'),
        total:0,
        len: 0,
        percent:0,
        username: localStorage.getItem('employe_nom'),
        user_surname: localStorage.getItem('employe_prenom'),
        usermail: localStorage.getItem('employe_email'),
        pat:[]

      }
    },
    methods: {
        load(){
        const url3 = new URL(
          `https://laravel.lazonebleue.com/api/get_total_patients_by_employee?employee_id=${this.emp_id}`
      );
      const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

      fetch(url3, {
          method: "GET",
          headers,
      }).then(response => response.json())
      .then(body => {
        this.len = body.body.length 
        this.pat = body.body 
        body.body.forEach(elm=> {
            this.total += parseInt(elm.sells[0].montant)
        });
      })  

      const url2 = new URL(
    "https://laravel.lazonebleue.com/api/get_all_patients"
      );
      fetch(url2, {
          method: "GET",
          headers,
      }).then(response => response.json())
      .then(body => {
        this.percent = (this.len/body.body.length)*100

      })
        }
    },
    mounted() {
        this.load()
      const url = new URL('https://laravel.lazonebleue.com/api/user')
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
        // console.log(body)
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
  
      const url2 = new URL('https://laravel.lazonebleue.com/api/notifications')
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
  table{
    margin:auto
  }
  #table{
    background-color: #fff;
    padding: 20px;
  }
  #liste td{
    font-size: 12px;
  }
  .user{
    display: flex;
    justify-content: center;
    align-items: center;
    padding:20px;
    flex-wrap: wrap;
  }
  table tr:nth-child(odd) {
  background-color: #fcf4ff;
}
td{
  padding: 10px;
}
table tr:nth-child(even) {
  background-color: #fff9f1;
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
  