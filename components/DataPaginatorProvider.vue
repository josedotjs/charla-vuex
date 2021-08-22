<script>
import { generateExcelFromJSON } from '@/utils/excel'
import serialize from 'serialize-javascript'

export default {
  props: {
    api: {
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
        console.log('change options')
        this.fetchData()
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        // console.log('fetch data', this.api, this.url, this.options)
        const response = await this[this.api].get(
          `${this.url}?${serialize(this.options, { isJSON: true })}`
        )
        const { docs, ...paginationData } = response.data
        this.items = docs
        this.paginationData = paginationData
      } catch (e) {
        console.error(e)
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
        const response = await this[this.api].get(
          `${this.url}?${this.$serialize(newOptions)}`
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
      scopedSlots: this.$scopedSlots,
    })
  },
}
</script>
