import { createRouter, createWebHistory } from 'vue-router'
import ResetPasswordView from '../views/Register/ResetPasswordView.vue'
import LoginView from '../views/Login/LoginView.vue'
import HomeView from '../views/Home/HomeView.vue'
import EmployeView from '../components/Dashboard/EmployeView.vue'
import AddEmployeView from '../components/Dashboard/AddEmployeView.vue'
import ModifEmployeVue from '../components/Dashboard/ModifEmployeVue.vue'
import AddResponseView from '../components/Dashboard/AddResponseView.vue'
import DeconnexionView from '../components/Deconnexion/DeconnexionView.vue'
import NotificationView from '../components/Notifications/NotificationView.vue'
import NonLueView from '../components/Notifications/NonLueView.vue'
import PatientView from '../components/Patients/PatientView.vue'
import NouveauPatientView from '../components/Patients/NouveauPatienView.vue'
import Etape2View from '../components/Patients/Etape2View.vue'
import Etape3View from '../components/Patients/Etape3View.vue'
import Etape4View from '../components/Patients/Etape4View.vue'
import FichePaiementView from '../components/Patients/FichePaiementView.vue'
import FicheClientView from '../components/Patients/FicheClientView.vue'
import AllPatientDataView from '../components/Patients/AllPatientDataView.vue'
import StatEmpView from '../components/Dashboard/StatEmpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/password-reset/:token/:email',
      name: 'reset-password',
      component: ResetPasswordView,
      props: true,
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'home',
      component: HomeView,
      beforeRouteEnter: (to, from, next) => {
        const token = localStorage.getItem("token");
        if (!token) {
          next({ path: "/login" });
        } else {
          next();
        }
      },
    },
    {
      path: '/employe',
      name: 'employe',
      component: EmployeView
    },
    {
      path: '/stats',
      name: 'stat',
      component: StatEmpView
    },
    {
      path: '/add',
      name: 'add',
      component: AddEmployeView
    },
    {
      path: '/response',
      name: 'response',
      component: AddResponseView
    },
    {
      path: '/disconnect',
      name: 'deconnexion',
      component: DeconnexionView
    },
    {
      path: '/notification',
      name: 'notification',
      component: NotificationView
    },
    {
      path: '/non-lue',
      name: 'non_lue',
      component: NonLueView
    },
    {
      path: '/patients',
      name: 'patients',
      component: PatientView
    },
    {
      path: '/new-patient',
      name: 'new_patients',
      component: NouveauPatientView
    },
    {
      path: '/etape-2',
      name: 'etape2',
      component: Etape2View
    },
    {
      path: '/etape-3',
      name: 'etape3',
      component: Etape3View
    },
    {
      path: '/etape-4',
      name: 'etape4',
      component: Etape4View
    },
    {
      path: '/fiche-paiement',
      name: 'fiche_client',
      component: FichePaiementView
    },
    {
      path: '/donnee-patient',
      name: 'donnee_client',
      component: FicheClientView
    },
    {
      path: '/send',
      name: 'send',
      component: AllPatientDataView
    },
    {
      path: '/update',
      name: 'update',
      component: ModifEmployeVue
    }
  ]
})
export default router
