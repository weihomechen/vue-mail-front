<template>
    <div class="weekly-using-container">
        <span class="weekly-using-container-title">最近使用情况</span>
        <line-chart :listData='listData' ></line-chart>
    </div>
</template>
<script>
    import LineChart from 'components/Charts/line';
    export default {
      name: 'weekly-using',
      components: { LineChart },
      props: {
        listData: {
          type: Array,
          default: [],
          require: true
        }
      },
      data() {
        return {}
      }
    }
</script>
<style>
    .weekly-using-container {
        width: 100%;
        border-bottom: 1px solid #ccc;
    }
    .weekly-using-container-title {
        color: #7F8C8D;
        font-size: 16px;
        display: inline-block;
        margin-top: 10px;
    }
</style>
