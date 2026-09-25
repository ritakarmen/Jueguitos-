<script setup>
import {computed,ref} from 'vue'
const qs=[
{q:'¿Qué directiva de Vue renderiza una lista?',o:['v-show','v-for','v-model','v-bind'],a:1},
{q:'¿Qué API de Vue 3 agrupa lógica reutilizable?',o:['Options API','DOM API','Composition API','Fetch API'],a:2},
{q:'¿Qué unidad CSS es relativa al tamaño raíz?',o:['px','vh','rem','%'],a:2},
{q:'¿Qué método guarda datos sencillos en el navegador?',o:['session.fetch()','localStorage.setItem()','window.store()','cache.push()'],a:1},
{q:'¿Qué herramienta usa este proyecto?',o:['Webpack','Vite','Parcel','Gulp'],a:1}
]
const i=ref(0),selected=ref(null),score=ref(0),done=ref(false)
const best=ref(Number(localStorage.getItem('jueguitos:quiz'))||0)
const q=computed(()=>qs[i.value])
function choose(x){if(selected.value!==null)return;selected.value=x;if(x===q.value.a)score.value++}
function next(){if(selected.value===null)return;if(i.value===qs.length-1){done.value=true;if(score.value>best.value){best.value=score.value;localStorage.setItem('jueguitos:quiz',score.value)}}else{i.value++;selected.value=null}}
function restart(){i.value=0;selected.value=null;score.value=0;done.value=false}
</script>
<template><section class="game wrap"><RouterLink to="/" class="back">← Volver</RouterLink><span class="eyebrow">Conocimiento</span><h1>Quiz express</h1><p>Cinco preguntas rápidas de frontend y Vue.js.</p>
<div class="quiz"><template v-if="!done"><div class="quiztop"><span>Pregunta {{i+1}}/{{qs.length}}</span><span>Mejor {{best}}/{{qs.length}}</span></div><h2>{{q.q}}</h2>
<button v-for="(o,x) in q.o" :key="o" class="option" :class="{correct:selected!==null&&x===q.a,wrong:selected===x&&x!==q.a}" @click="choose(x)"><b>{{String.fromCharCode(65+x)}}</b>{{o}}</button>
<button class="btn primary next" :disabled="selected===null" @click="next">{{i===qs.length-1?'Ver resultado':'Siguiente'}}</button></template>
<div v-else class="quizresult"><strong>{{score}}/{{qs.length}}</strong><h2>{{score>=4?'¡Excelente!':score>=3?'¡Buen resultado!':'Sigue practicando'}}</h2><button class="btn primary" @click="restart">Intentar de nuevo</button></div>
</div></section></template>