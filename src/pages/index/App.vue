<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  color: #333;
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  text-decoration: none; /*去除下划线*/
  color: #333;
}
ul,
ol {
  list-style-type: none; /*清除样式（li前点·）*/
}
em,
i {
  font-style: normal; /*清除文字样式*/
}
input,
button,
textarea {
  border: none; /*去除外边框（点击前）*/
  outline: none; /*去除外边框（点击后）*/
}

</style>
