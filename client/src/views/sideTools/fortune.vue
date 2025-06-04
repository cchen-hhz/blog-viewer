<script setup>

import { onMounted, ref } from 'vue';

const bestDoing = [
    {
        name: '写代码',
        content: '一遍就跑通',
    },
    {
        name: '做题',
        content: '一遍就AC',
    },
    {
        name: '水群',
        content: '受到群友的青睐'
    },
    {
        name: '写作业',
        content: '发现什么都会',
    }
];
const worstDoing = [
    {
        name: '改WA的题目',
        content: '然后变成 TLE',
    },
    {
        name: '打音游',
        content: '记录一个没爆掉',
    },
    {
        name: '学习',
        content: '发现什么都不会',
    },
    {
        name: '水群',
        content: '被要求当猫娘',
    },
    {
        name: '卖弱',
        content: '会被做成表情包',
    }
];

const fortuneList = [
    {
        name: '大吉',
        good_len: 2,
        bad_len: 0,
        color: '#e53935',
    },
    {
        name: '中吉',
        good_len: 2,
        bad_len: 1,
        color: '#e53935', 
    },
    {
        name: '中凶',
        good_len: 1,
        bad_len: 2,
        color: '#222',
    },
    {
        name: '大凶',
        good_len: 0,
        bad_len: 2,
        color: '#222',
    },
];

const randInt = (max) => {
    return Math.floor(Math.random() * max);
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const search_count = (list, len) => {
    const index = shuffle(range(0, list.length - 1)).splice(0, len);
    const result = index.map((i) => list[i]);
    return result;
}
const fortune = ref();
const fortuneColor = ref('#222');
const things_good = ref([]);
const things_bad = ref([]);

const make_fortune = () => {
    const choice = fortuneList[randInt(fortuneList.length)]; 
    fortune.value = choice.name;
    fortuneColor.value = choice.color;
    things_good.value = search_count(bestDoing, choice.good_len);
    things_bad.value = search_count(worstDoing, choice.bad_len);
};

onMounted(() => {
    make_fortune();
});

</script>

<template>
  <div class="main-index">
    <h1>今日运势</h1>
    <hr>
    <div class="fortune">
      <h1 :style="{color: fortuneColor}">{{ fortune }}</h1>
      <div class="fortune-table">
        <div class="fortune-col">
          <h3>吉事</h3>
          <div v-if="things_good.length > 0">
            <div v-for="item in things_good" :key="item.name" class="fortune-item fortune-good">
              <div class="fortune-title">{{ item.name }}</div>
              <div class="fortune-content">{{ item.content }}</div>
            </div>
          </div>
          <div v-else :style="{color: fortuneColor}" class="fortune-empty">诸事不宜</div>
        </div>
        <div class="fortune-col">
          <h3>凶事</h3>
          <div v-if="things_bad.length > 0">
            <div v-for="item in things_bad" :key="item.name" class="fortune-item fortune-bad">
              <div class="fortune-title">{{ item.name }}</div>
              <div class="fortune-content">{{ item.content }}</div>
            </div>
          </div>
          <div v-else :style="{color: fortuneColor}" class="fortune-empty">诸事皆宜</div>
        </div>
      </div>
      <div style="text-align:center; margin-top: 24px;">
        <button class="fortune-refresh" @click="make_fortune">换一个！</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-index {
    text-align: center;
    background-color: #fff3e0;
    border: 1px solid #ff9800;
    border-radius: 18px;
    box-shadow: 0 4px 18px 0 rgba(255,152,0,0.10);
    padding: 10px 32px 28px 32px;
    margin: 0 auto;
    max-width: 600px;
}

.fortune h1 {
    font-size: 42px;
    font-weight: bold;
}

.fortune-table {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 24px;
}
.fortune-col {
  flex: 1;
  min-width: 180px;
  background: #fff8ed;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
  padding: 18px 24px;
}
.fortune-col h3 {
  text-align: center;
  color: #ff9800;
  margin-bottom: 12px;
}
.fortune-empty {
  text-align: center;
  font-size: 1.1em;
  margin-top: 12px;
}
.fortune-col ul {
  padding-left: 18px;
  list-style: none;
}
.fortune-col li {
  margin-bottom: 8px;
  color: #444;
}
.fortune-refresh {
  padding: 8px 24px;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.2s;
}
.fortune-refresh:hover {
  background: #ffa733;
}
.fortune-item {
  margin-bottom: 18px;
}
.fortune-title {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 4px;
}
.fortune-good .fortune-title {
  color: #e53935;
}
.fortune-bad .fortune-title {
  color: #222;
}
.fortune-content {
  font-size: 1.08em;
  color: #555;
  margin-left: 2px;
}
</style>