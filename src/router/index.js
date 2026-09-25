import { createRouter,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemoryView from '../views/MemoryView.vue'
import TicTacToeView from '../views/TicTacToeView.vue'
import QuizView from '../views/QuizView.vue'
import ReactionView from '../views/ReactionView.vue'
export default createRouter({history:createWebHashHistory(),routes:[
{path:'/',component:HomeView},{path:'/memoria',component:MemoryView},{path:'/tres-en-raya',component:TicTacToeView},{path:'/quiz',component:QuizView},{path:'/reflejos',component:ReactionView}
],scrollBehavior:()=>({top:0})})