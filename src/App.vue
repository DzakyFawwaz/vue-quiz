<template>
  <router-view class="app-container" />
</template>
<script>
export default {
  components: {},
  head: {
    link: [
      {
        rel: "icon",
        href: require("./assets/mpa-logo.png"),
      },
    ],
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

@font-face {
  font-family: "PlayFair";
  src: url("./fonts/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf");
}
#app {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1,
h2 {
  font-family: "PlayFair" !important;
}

.app-container {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none;
}

.app-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}
</style>
