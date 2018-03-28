<template>
  <div id="app">
<<<<<<< HEAD
    <img src="./assets/rootstock.png">
=======

>>>>>>> esteban
    <router-view/>
    <div class="footer">
  <p><a href="https://www.koibanx.com/"> Powered by <img src="./assets/kbx.jpg"></a></p>
</div>
  </div>
</template>

<script>
export default {
  name: 'RootStockWall'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: grey;
    color: white;
    text-align: right;
    
    opacity: 0.75 }
.footer img{
  height: 30px;
}
.footer a{
  text-decoration: none;
  color: white;
  font-weight: bold
}
</style>
