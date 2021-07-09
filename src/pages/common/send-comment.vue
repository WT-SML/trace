<template>
  <div class="d-flex">
    <div class="me-3 flex-shrink-0">
      <img
        class="avatar rounded-circle"
        width="32"
        height="32"
        src="https://user-gold-cdn.xitu.io/2019/5/13/16aaf0c779bb98ac?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
        alt="avatar"
      />
    </div>
    <div class="flex-grow-1">
      <textarea class="form-control input" rows="3"></textarea>
      <div class="d-flex">
        <span>
          <i class="fa "></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sendComment",
};
</script>

<style lang="scss" scoped>
.input{
  font-size: 14px;
  line-height: normal;
}
</style>
