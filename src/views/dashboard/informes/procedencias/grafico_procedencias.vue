<template>
    <div class="m-portlet">
        <div class="m-portlet__body">
            <div class="row">
                <div class="col-md-9">
                    <h5>Informe según la procedencia de los pacientes</h5>
                </div>
                <div class="col-md-3">
                    <select v-model="selectOpcion" class="form-control" id="listadoCboIngresos">
                        <option value="">Todos</option>
                        <option value="">Sexo</option>
                    </select>
                </div>
            </div>
            <div class="m-separator m-separator--dashed"></div><br>
            <div class="row">
                <div class="col-md-9">
                    <h5>Cantidad de ingresos: 256</h5>
                </div>
            </div><br>
            <div>
                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>

<script>

    import apexchart from 'vue-apexcharts'

    export default {
        data() {
            return {
                selectOpcion: 0,
                series: [
                    {
                        name: 'PRODUCT A',
                        data: [44, 55, 41, 67, 22, 43]
                    }
                ],
                chartOptions: {
                    chart: {
                    type: 'bar',
                    height: '100%',
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                    },
                    responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                        }
                    }
                    }],
                    plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                    },
                    xaxis: {
                    type: 'datetime',
                    categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                        '01/05/2011 GMT', '01/06/2011 GMT'
                    ],
                    },
                    legend: {
                    position: 'right',
                    offsetY: 40
                    },
                    fill: {
                    opacity: 1
                    }
                },
            }
        },

        components: {
            apexchart
        }
    }
</script>