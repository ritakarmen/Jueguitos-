<template>
<div class="app">
<header class="topbar">
<RouterLink class="brand" to="/"><span>🎮</span><div><b>Jueguitos</b><small>Vue.js Arcade</small></div></RouterLink>
<nav><RouterLink to="/">Inicio</RouterLink><a href="https://github.com/ritakarmen/Jueguitos-" target="_blank">GitHub</a></nav>
</header>
<main><RouterView/></main>
<footer>Vue 3 · Vite · Vue Router · Responsive · LocalStorage</footer>
</div>
</template>