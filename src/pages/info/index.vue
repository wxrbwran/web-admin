<template>
  <div>
    <Tabs value="yixin">
      <TabPane label="翼心" name="yixin">
        <Content site="yixin" />
      </TabPane>
      <TabPane label="泽心" name="zexin">
        <Content site="zexin" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Content from './content.vue'

export default {
    name: 'info',
    components: { Content },
    data () {
        return {
        };
    },
    mounted () {
    },
    methods: {
    }
};
</script>

<style>
</style>
