<template>
  <div>
    <span>{{ value }}</span>
    <span v-if="copyBtnDisabled">
      <el-button type="text" class="copy-value" :data-clipboard-text="value" @click="copyValue">
        <i class="fal fa-copy"></i>
      </el-button>
    </span>
    <span v-else class="copied-style">Copied!</span>
  </div>
</template>

<script>
import Clipboard from "clipboard";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      copyBtnDisabled: true,
    };
  },
  methods: {
    copyValue() {
      let clipboard = new Clipboard(".copy-value");
      clipboard.on("success", function(e) {
        e.clearSelection();
      });
      this.copyBtnDisabled = false;
    },
  },
};
</script>

<style scoped>
.copy-value {
  color: rgba(0, 120, 250, 1);
  padding: 0 10px;
}

.copied-style {
  margin-left: 10px;
  color: rgba(105, 135, 167, 1);
  font-size: 14px;
}
</style>
