<template lang="html">

</template>


<script type="text/javascript" src="Game/matter.js"></script>
<script type="text/javascript" src="Game/bullet.js"></script>
<script type="text/javascript" src="Game/player.js"></script>
<script type="text/javascript" src="Game/main.js"></script>

<script>
import matter from '@/components/Game/matter.js'
import bullet from '@/components/Game/bullet.js'
import player from '@/components/Game/player.js'
import game from '@/components/Game/main.js'
export default {
  name: 'game',
  components: {
      matter,
      bullet,
      player,
      game,
  }
}
</script>

<style lang="css">
body{
  padding:0px;
  padding-bottom:0px;
  margin:0px;
  margin-bottom:0px;
}
</style>
