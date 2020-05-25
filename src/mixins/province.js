export default {
  data() {
    return {
      provinces: []
    }
  },
  methods: {
    initProvince() {
      if (this.provinces.length === 0) {
        this.$api.dict.items(this.dictName).then(res => {
          this.myOptions = res.data
          this.myValue = this.value
        })
      }
    }
  }
}
