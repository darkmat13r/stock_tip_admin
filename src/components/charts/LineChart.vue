<script>
    import { Line, mixins } from 'vue-chartjs'

    export default {
        extends: Line,
        name: 'LineChart',
        mixins: [],
        props: ['options'],
        mounted () {
            // this.chartData is created in the mixin.
            // If you want to pass options please create a local options object
            this.renderChart(this.chartData, {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            display :false
                        },
                        gridLines :{
                            display : false
                        }
                    }],
                    xAxes:[{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines :{
                            display : false
                        }
                    }]

                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                    colors: ["#F7931A"],
                },
                legend: {
                    display: true,
                    position : 'top'
                }
            })
        }
    }
</script>