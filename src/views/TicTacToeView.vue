<script setup>
import {computed,ref} from 'vue'
const board=ref(Array(9).fill('')),turn=ref('X'),score=ref({X:0,O:0})
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const winner=computed(()=>{for(const [a,b,c] of wins)if(board.value[a]&&board.value[a]===board.value[b]&&board.value[a]===board.value[c])return board.value[a];return board.value.every(Boolean)?'draw':null})
function play(i){if(board.value[i]||winner.value)return;board.value[i]=turn.value;const w=winner.value;if(w==='X'||w==='O')score.value[w]++;else if(!w)turn.value=turn.value==='X'?'O':'X'}
function reset(){board.value=Array(9).fill('');turn.value='X'}
</script>
<template><section class="game wrap"><RouterLink to="/" class="back">← Volver</RouterLink><span class="eyebrow">Estrategia</span><h1>Tres en raya</h1><p>Dos jugadores en el mismo dispositivo.</p>
<div class="score"><b>X: {{score.X}}</b><span>{{winner?'Ronda terminada':'Turno de '+turn}}</span><b>O: {{score.O}}</b></div>
<div class="tic"><button v-for="(c,i) in board" :key="i" @click="play(i)" :class="c">{{c}}</button></div>
<div v-if="winner" class="result">{{winner==='draw'?'🤝 Empate':'🎉 ¡Ganó '+winner+'!'}} <button class="btn primary" @click="reset">Nueva ronda</button></div>
</section></template>