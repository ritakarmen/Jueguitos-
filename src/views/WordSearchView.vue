<script setup>
import { computed, ref } from 'vue'

const size = 10
const words = ['MEMORIA', 'PANTALLA', 'TECLADO', 'JUEGOS', 'CODIGO', 'RETO', 'VUE', 'PIXEL']
const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]
const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
const board = ref([])
const selected = ref([])
const foundWords = ref([])
const foundCells = ref([])
const selectedKeys = computed(() => new Set(selected.value.map(cell => `${cell.row}-${cell.col}`)))
const completed = computed(() => foundWords.value.length === words.length)

function createBoard() {
  const cells = Array.from({ length: size }, () => Array(size).fill(''))

  for (const word of [...words].sort((a, b) => b.length - a.length)) {
    let placed = false
    for (let attempt = 0; attempt < 500 && !placed; attempt++) {
      const [rowStep, colStep] = directions[Math.floor(Math.random() * directions.length)]
      const startRow = Math.floor(Math.random() * size)
      const startCol = Math.floor(Math.random() * size)
      const endRow = startRow + rowStep * (word.length - 1)
      const endCol = startCol + colStep * (word.length - 1)

      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue

      const fits = [...word].every((letter, index) => {
        const row = startRow + rowStep * index
        const col = startCol + colStep * index
        return !cells[row][col] || cells[row][col] === letter
      })
      if (!fits) continue

      for (let index = 0; index < word.length; index++) {
        cells[startRow + rowStep * index][startCol + colStep * index] = word[index]
      }
      placed = true
    }
  }

  board.value = cells.map((row, rowIndex) => row.map((letter, colIndex) => ({
    row: rowIndex,
    col: colIndex,
    letter: letter || alphabet[Math.floor(Math.random() * alphabet.length)]
  })))
  selected.value = []
  foundWords.value = []
  foundCells.value = []
}

function chooseCell(cell) {
  if (foundCells.value.includes(`${cell.row}-${cell.col}`)) return
  if (!selected.value.length) {
    selected.value = [cell]
    return
  }

  const first = selected.value[0]
  const rowDistance = cell.row - first.row
  const colDistance = cell.col - first.col
  const steps = Math.max(Math.abs(rowDistance), Math.abs(colDistance))
  if (!steps) {
    selected.value = []
    return
  }

  const rowStep = rowDistance / steps
  const colStep = colDistance / steps
  if (!Number.isInteger(rowStep) || !Number.isInteger(colStep)) {
    selected.value = [cell]
    return
  }

  const selection = Array.from({ length: steps + 1 }, (_, index) =>
    board.value[first.row + rowStep * index][first.col + colStep * index]
  )
  const sequence = selection.map(item => item.letter).join('')
  const word = words.find(item => item === sequence || item === [...sequence].reverse().join(''))

  if (word && !foundWords.value.includes(word)) {
    foundWords.value.push(word)
    foundCells.value.push(...selection.map(item => `${item.row}-${item.col}`))
    selected.value = []
  } else {
    selected.value = [cell]
  }
}

createBoard()
</script>

<template>
  <section class="game wrap word-search">
    <RouterLink to="/" class="back">← Volver</RouterLink>
    <span class="eyebrow">Vista aguda</span>
    <h1>Pupiletras</h1>
    <p>Encuentra las {{ words.length }} palabras escondidas en la cuadrícula. Toca la primera y la última letra.</p>

    <div class="stats">
      <div><small>Encontradas</small><b>{{ foundWords.length }} / {{ words.length }}</b></div>
      <button class="btn" @click="createBoard">Nueva partida</button>
    </div>

    <div class="word-search-layout">
      <div class="word-grid" aria-label="Cuadrícula de letras">
        <button
          v-for="cell in board.flat()"
          :key="`${cell.row}-${cell.col}`"
          :class="{ selected: selectedKeys.has(`${cell.row}-${cell.col}`), found: foundCells.includes(`${cell.row}-${cell.col}`) }"
          :aria-label="`Fila ${cell.row + 1}, columna ${cell.col + 1}: ${cell.letter}`"
          @click="chooseCell(cell)"
        >{{ cell.letter }}</button>
      </div>

      <aside class="word-search-list">
        <h2>Palabras</h2>
        <ul>
          <li v-for="word in words" :key="word" :class="{ solved: foundWords.includes(word) }">
            <span>{{ word }}</span><b v-if="foundWords.includes(word)" aria-label="Encontrada">✓</b>
          </li>
        </ul>
      </aside>
    </div>

    <div v-if="completed" class="result">🏆 ¡Encontraste todas las palabras! <button class="btn primary" @click="createBoard">Jugar otra vez</button></div>
  </section>
</template>

<style scoped>
.word-search-layout{width:min(780px,100%);margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) 170px;gap:22px;align-items:start}
.word-grid{width:100%;aspect-ratio:1;display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px;padding:8px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.035)}
.word-grid button{min-width:0;padding:0;border:1px solid transparent;border-radius:7px;background:#12182f;color:#e8eaff;font-weight:800;font-size:clamp(12px,2.4vw,18px);cursor:pointer;transition:background .15s,border-color .15s}
.word-grid button:hover{border-color:rgba(124,92,255,.65)}
.word-grid button.selected{background:#6549d8;color:#fff}
.word-grid button.found{background:#087e70;color:#fff}
.word-grid button:focus-visible{outline:2px solid #ff78b9;outline-offset:1px}
.word-search-list{padding:10px 0;text-align:left}
.word-search-list h2{margin:0 0 12px;font:700 20px "Space Grotesk",sans-serif}
.word-search-list ul{display:grid;gap:8px;margin:0;padding:0;list-style:none}
.word-search-list li{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1px solid var(--line);border-radius:9px;color:#d8dcf3;font-size:13px;font-weight:700}
.word-search-list li.solved{color:#71dfc7;text-decoration:line-through;border-color:rgba(25,199,163,.3)}
.word-search-list li b{color:#71dfc7}
@media(max-width:620px){.word-search-layout{grid-template-columns:1fr;gap:14px}.word-search-list{padding:0}.word-search-list h2{margin-bottom:8px}.word-search-list ul{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.word-search-list li{padding:7px 9px}}
</style>