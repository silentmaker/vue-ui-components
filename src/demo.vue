<template>
  <main id="app">
    <section class="sidebar">
      <select v-model="current">
        <option value="">跳转到...</option>
        <option :value="name" :key="name" v-for="name in componentNames">{{ name }}</option>
      </select>
    </section>
    <section class="content">
      <section class="showcase" :key="name" v-for="name in componentNames">
        <div class="showcase-title">&lt;{{ components[name].name }} /&gt;</div>
        <component :is="components[name]"></component>
      </section>
    </section>
  </main>
</template>

<script>
import components from './components';
import dummy from './dummy';

export default {
  name: 'demo',
  data() {
    const names = Object.keys(components).sort();

    return {
      dummy,
      components,
      componentNames: names,
      current: '',
    };
  },
};
</script>

<style lang="less">
@import './styles/demo.less';
</style>
