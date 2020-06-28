<template>
  <div class="records">
    <div class="records-wrapper" v-if="typeof getRoute === 'undefined'">
      <Record
        v-for="(value, key, index) in todoRecords"
        :key="index"
        :recordTitle="key"
        :recordNumber="value"
      />
    </div>

    <div class="records-wrapper" v-else>
      <Record
        v-for="(value, key, index) in taskRecords"
        :key="index"
        :recordTitle="key"
        :recordNumber="value"
      />
    </div>
  </div>
</template>

<script>
import Record from "./Record";
import { mapGetters } from "vuex";

export default {
  name: "AppFooter",
  components: { Record },
  computed: {
    ...mapGetters({
      todoRecords: "wsTodos/getTodoRecord",
      getTaskRecord: "wsTodos/getTaskRecord"
    }),
    getRoute: function() {
      return this.$route.params.id;
    },
    taskRecords: function() {
      return this.getTaskRecord(this.getRoute);
    }
  }
};
</script>

<style scoped>
.records {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 20%;
  text-align: center;
  z-index: 0;
}

.records-wrapper {
  max-width: 600px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  transform: translateY(50%);
}
</style>
