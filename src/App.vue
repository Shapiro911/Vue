<template>
  <v-app>
    <v-main>
      <div id="app">
        <PaymentList />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PaymentList from "./components/PaymentList.vue";

export default {
  name: "App",
  components: {
    PaymentList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.paymentListButton {
  background-color: rgb(35, 175, 161);
  color: white;
  text-transform: uppercase;
  padding: 10px 50px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: auto;
}
</style>
