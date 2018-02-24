<template>
  <div class="wrap_switch_turn tag" :class="{on: state, off: (!state)}">
    {{val}}
  </div>
</template>

<script>
export default {
  data: ()=> ({
    value: ''
  }),
  props: {
    state: {
      type: Boolean,
      default: true
    },
    onVal: {
      type: String,
      default: 'on'
    },
    offVal: {
      type: String,
      default: 'off'
    }
  },
  computed: {
    val: function(){
      if(this.state){
        return this.onVal
      }else {
        return this.offVal
      }
    }
  }
}
</script>

<style scoped>
.wrap_switch_turn{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
  cursor: pointer;
}
.tag {
  min-width: 20px;
  padding: 3px 10px;
  border-radius: 15px;
  color: #fff;
}
.on {
  background: #29b6f6
}
.off {
  background: #e0e0e0;
}
</style>
