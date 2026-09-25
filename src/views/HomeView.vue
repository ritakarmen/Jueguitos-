<script setup>
const games=[
{to:'/memoria',icon:'🧠',title:'Memorama',text:'Encuentra todas las parejas usando la menor cantidad de movimientos.'},
{to:'/tres-en-raya',icon:'⭕',title:'Tres en raya',text:'El clásico X vs O para dos jugadores en el mismo dispositivo.'},
{to:'/quiz',icon:'⚡',title:'Quiz express',text:'Pon a prueba tus conocimientos de frontend y Vue.js.'},
{to:'/reflejos',icon:'🎯',title:'Reflejos',text:'Espera la señal y toca lo más rápido posible.'}
]
</script>
<template>
<section class="hero wrap">
<div><span class="eyebrow">Proyecto de portafolio · Vue.js</span><h1>Una colección de <em>jueguitos</em> para cualquier pantalla.</h1><p>Minijuegos rápidos, responsive y construidos con Vue 3, Composition API, Vue Router y persistencia local.</p><a class="btn primary" href="#juegos">Ver juegos</a></div>
<div class="console">👾<strong>READY?</strong><span>🎮 ⭐ 🏆</span></div>
</section>
<section id="juegos" class="wrap section"><div class="heading"><div><span class="eyebrow">Elige tu reto</span><h2>4 juegos, una sola app</h2></div><p>Diseñada mobile-first para celular, tablet y desktop.</p></div>
<div class="grid"><RouterLink v-for="g in games" :key="g.title" :to="g.to" class="card"><span class="icon">{{g.icon}}</span><h3>{{g.title}}</h3><p>{{g.text}}</p><b>Jugar ahora →</b></RouterLink></div>
</section>
<section class="wrap stack"><span class="eyebrow">Stack técnico</span><h2>Vue 3 · Vite · Vue Router · Composition API · LocalStorage · CSS responsive</h2></section>
</template>