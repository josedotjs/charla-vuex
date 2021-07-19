<script>
import { generateExcelFromJSON } from '@/utils/excel'

export default {
  props: {
    apiName: {
      type: String,
      default: '$apiMongoose',
    },
    url: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      items: [],
      paginationData: {
        totalDocs: 0,
      },
      loading: false,
      serverError: '',
      generatingExcel: false,
    }
  },
  watch: {
    options: {
      handler(newVal) {
        this.fetchData()
      },
      deep: true,
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        console.log('fetch data', this.options)
        const response = await this[this.apiName].get(
          `${this.url}?${this.$serialize(this.options)}`
        )
        const { docs, ...paginationData } = response.data
        this.items = docs
        this.paginationData = paginationData
      } catch (e) {
        this.$toasted.show(
          'Se produjo un error al intentar recuperar los datos'
        )
        this.serverError =
          e.response?.message ||
          'Se produjo un error al intentar recuperar los datos'
      } finally {
        this.loading = false
      }
    },
    async generateExcel() {
      try {
        this.generatingExcel = true
        const newOptions = {
          ...this.options,
          pagination: false,
        }
        const response = await this[this.apiName].get(
          `/products/query?${this.$serialize(newOptions)}`
        )
        console.log('generarReporte', response.data.docs)
        generateExcelFromJSON(response.data.docs)
      } catch (error) {
        console.error(error)
      } finally {
        this.generatingExcel = false
      }
    },
  },
  render() {
    return this.$scopedSlots.default({
      items: this.items,
      paginationData: this.paginationData,
      loading: this.loading,
      serverError: this.serverError,
      generatingExcel: this.generatingExcel,
      generateExcel: this.generateExcel,
    })
  },
}
</script>
