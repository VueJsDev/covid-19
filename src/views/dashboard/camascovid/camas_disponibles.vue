<template>

    <div class="col-xl-4">
        <div class="m-portlet">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            Camas Disponibles
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">
                <div class="m-section">
                    <span class="m-section__sub">
                        <center>
                            <h5>Total de camas de la provincia</h5>
                        </center>
                    </span>
                    <div class="m-section__content">
                        <center>
                            <div class="circleBlue">
                                <h1>{{ GET_TOTALS.totalCamas }}</h1>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-portlet">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            Cantidad de camas por efectores de salud
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">

                <!--begin::Section-->
                <div class="m-section">
                    <div class="m-input-icon m-input-icon--right">
                        <input v-model="filterEfector" type="text" class="form-control m-input" placeholder="buscar efector..">
                        <span class="m-input-icon__icon m-input-icon__icon--right">
                            <span>
                                <i class="la la-search"></i>
                            </span>
                        </span>
                    </div> <br>
                    <div class="m-section__content table-wrapper-efectores">
                        <table class="table table-striped m-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Establecimientos</th>
                                    <th>
                                        <center>
                                            Cantidad
                                        </center>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(camasEstablecimiento, index) in efectores" :key="camasEstablecimiento.establecimiento">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ camasEstablecimiento.efector }}</td>
                                    <td>
                                        <center>
                                            {{ camasEstablecimiento.total }}
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--end::Section-->
                <div class="m-separator m-separator--dashed"></div>
            </div>
        </div>

        <!--end::Portlet-->
    </div>

</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex';

export default {
    data () {
        return {
            filterEfector: '',
        }
    },

    created () {
        this.getDatos();
        
        var self = this;
        setInterval(function(){
            self.getDatos();
        }, 60 * 5000);
      

    },
    
    methods: {
        ...mapActions('totals', ['FETCH_TOTALS']),
        ...mapActions('lists', [
			'FETCH_CAMAS_ESTABLECIMIENTOS', 
		]),
        getDatos() {
			this.FETCH_TOTALS()
			this.FETCH_CAMAS_ESTABLECIMIENTOS()
		},
    },

    computed: {
            ...mapGetters('totals', ['GET_TOTALS']),
            ...mapGetters('lists', {
                camasPorEstablecimiento: 'GET_CAMAS_ESTABLECIMIENTOS',
            }),
            efectores () {
                return this.filterEfector
                    ? this.camasPorEstablecimiento.filter(item => item.efector.toLowerCase().includes(this.filterEfector.toLowerCase()))
                    : this.camasPorEstablecimiento
            },
        },
}
</script>

<style  scoped>
.circleYellow
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #ffe285;

    }
.circleGreen
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #9df3a4

    }

	.circlePurple
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #decff7

    }

.circleBlue
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #bad6ff

    }

.table-wrapper
{
    height: 250px;
    overflow: auto;
}

.table-wrapper-efectores
{
    height: 830px;
    overflow: auto;
}
.middle { margin-bottom:2px; }	
</style>