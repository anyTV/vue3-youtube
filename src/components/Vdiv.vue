<template>
    <div :style="wrapperStyle"></div>
</template>

<script lang="ts">
export default {
    props: ['wrapperStyle'],
    mounted() {
        this.$emit('load', { target: this.$el });
    }
}
</script>