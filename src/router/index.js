import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Desde aca se cargan todos los informes y formularios

import CamasCovid from '../views/dashboard/camascovid/camascovid.vue';
import TestCovid from '../views/dashboard/testCovid19/testcovid.vue';
import Users from '../views/users/Users.vue';
import NoPermission from '../views/404.vue';
import Login from '../views/Login.vue'
import Covid19 from '../views/dashboard/covid-19/covid19.vue'
import Informes from '../views/dashboard/informes/informes.vue'
import Ingresos from '../views/dashboard/ingresoProvincia/ingresoprovincia.vue'
import Pacientes from '../views/dashboard/paciente/patient.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: Home,
    name: "Home",
    meta: {
      breadcrumb: "Home Page",
    },
    children: [
      {
        path: "/pacientes",
        component: Pacientes,
        name: "Paciente",
      },
      {
        path: "/camas",
        component: CamasCovid,
        name: "Camas Covid 19",
      },
      {
        path: "/testcovid",
        component: TestCovid,
        name: "Test Covid 19",
      },
      {
        path: "/upac",
        component: Covid19,
        name: "UPAC Informes Covid 19",
      },
      {
        path: "/ingresos",
        component: Ingresos,
        name: "Ingresos a la Provincia",
      },
      {
        path: "/informes",
        name: "Informes",
        component: Informes,
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
      },
      {
        path: "/404",
        name: "NoPermission",
        component: NoPermission,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
