<template>
  <div class="record" :style="{ color: findColor() }">
    <p class="num">{{ recordNumber }}</p>
    <p class="tit">{{ recordTitle }}</p>
  </div>
</template>

<script>
export default {
  name: "Record",
  props: ["recordTitle", "recordNumber"],
  methods: {
    findColor: function() {
      switch (this.recordTitle) {
        case "done":
          return "#7DE2D1";
        case "remain":
          return "#FFCE7A";
        default:
          return "#1BA9F5";
      }
    }
  }
};
</script>

<style scoped>
.record {
  align-items: center;
}

.num {
  text-align: center;
  border: none;
  background: transparent;
  font-size: 2rem;
  font-weight: 900;
}

.tit {
  text-transform: uppercase;
}
</style>
