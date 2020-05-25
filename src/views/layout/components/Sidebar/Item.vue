<template>
  <span slot="title">
    <span style="display: inline-block;width: 20px;" :class="icon" />
    <span style="margin-left: 8px">{{ title }}</span>
  </span>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
  /* render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<span class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }*/
}
</script>
