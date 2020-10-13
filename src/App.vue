<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex';
import { mixUser }  from '../src/mixins/user';
export default {
	name: 'App',
	mixins: [ mixUser ],
	sockets: {
			connect: function () {
				console.log('socket connected')
			},
			maintenance_close: function (data) {
				this.maintenance(data)
			}
		},
		methods: {
			...mapActions('users', ['CHANGE_MAINTENANCE']),
		},
}
</script>
