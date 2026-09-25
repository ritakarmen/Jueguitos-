<script setup>
import {computed,ref} from 'vue'
const icons=['🐶','🐱','🦊','🐼','🐸','🐯','🦄','🐙']
const cards=ref([]),open=ref([]),matched=ref([]),moves=ref(0),lock=ref(false)
const best=ref(Number(localStorage.getItem('jueguitos:memory'))||0)
const won=computed(()=>matched.value.length===icons.length)
function reset(){cards.value=[...icons,...icons].sort(()=>Math.random()-.5).map((icon,i)=>({id:i+'-'+Math.random(),icon}));open.value=[];matched.value=[];moves.value=0;lock.value=false}
function visible(c){return open.value.includes(c.id)||matched.value.includes(c.icon)}
function flip(c){if(lock.value||visible(c))return;open.value.push(c.id);if(open.value.length===2){moves.value++;lock.value=true;const s=cards.value.filter(x=>open.value.includes(x.id));if(s[0].icon===s[1].icon){matched.value.push(s[0].icon);open.value=[];lock.value=false;if(matched.value.length===icons.length&&(!best.value||moves.value<best.value)){best.value=moves.value;localStorage.setItem('jueguitos:memory',moves.value)}}else setTimeout(()=>{open.value=[];lock.value=false},650)}}
reset()
</script>
<template><section class="game wrap"><RouterLink to="/" class="back">← Volver</RouterLink><span class="eyebrow">Memoria</span><h1>Memorama</h1><p>Encuentra las 8 parejas con la menor cantidad de movimientos.</p>
<div class="stats"><div><small>Movimientos</small><b>{{moves}}</b></div><div><small>Mejor marca</small><b>{{best||'—'}}</b></div><button class="btn" @click="reset">Reiniciar</button></div>
<div class="memory"><button v-for="c in cards" :key="c.id" :class="{show:visible(c)}" @click="flip(c)"><span>?</span><strong>{{c.icon}}</strong></button></div>
<div v-if="won" class="result">🏆 ¡Completado en {{moves}} movimientos! <button class="btn primary" @click="reset">Otra vez</button></div>
</section></template>