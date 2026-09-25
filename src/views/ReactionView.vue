<script setup>
import {onBeforeUnmount,ref} from 'vue'
const state=ref('idle'),message=ref('Presiona iniciar y espera la señal'),time=ref(0)
const best=ref(Number(localStorage.getItem('jueguitos:reaction'))||0)
let timer=null,startAt=0
function start(){clearTimeout(timer);time.value=0;state.value='waiting';message.value='Espera… todavía no toques';timer=setTimeout(()=>{state.value='ready';message.value='¡AHORA!';startAt=performance.now()},1400+Math.random()*2800)}
function tap(){if(state.value==='waiting'){clearTimeout(timer);state.value='early';message.value='¡Muy pronto! 😅'}else if(state.value==='ready'){time.value=Math.round(performance.now()-startAt);state.value='done';message.value=time.value+' ms';if(!best.value||time.value<best.value){best.value=time.value;localStorage.setItem('jueguitos:reaction',time.value)}}}
onBeforeUnmount(()=>clearTimeout(timer))
</script>
<template><section class="game wrap"><RouterLink to="/" class="back">← Volver</RouterLink><span class="eyebrow">Velocidad</span><h1>Prueba de reflejos</h1><p>Cuando el panel cambie a verde, tócalo tan rápido como puedas.</p>
<div class="stats"><div><small>Último tiempo</small><b>{{time?time+' ms':'—'}}</b></div><div><small>Mejor tiempo</small><b>{{best?best+' ms':'—'}}</b></div></div>
<button class="reaction" :class="state" @click="tap"><span>{{state==='ready'?'⚡':state==='early'?'😅':'🎯'}}</span><strong>{{message}}</strong></button>
<button class="btn primary" @click="start">{{state==='done'||state==='early'?'Intentar otra vez':'Iniciar prueba'}}</button>
</section></template>