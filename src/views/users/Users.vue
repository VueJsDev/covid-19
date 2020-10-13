<template>
	<div>
		<div class="m-grid__item m-grid__item--fluid m-wrapper">
			<div class="m-subheader ">
				<div class="d-flex align-items-center">
					<div class="mr-auto">
						<h3 class="m-subheader__title m-subheader__title--separator">Listado de Usuarios</h3>
						<ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
							<li class="m-nav__item m-nav__item--home">
								<a href="#" class="m-nav__link m-nav__link--icon">
									<i class="m-nav__link-icon la la-home"></i>
								</a>
							</li>
							<li class="m-nav__separator">-</li>
							<li class="m-nav__item">
								<a href="" class="m-nav__link">
									<span class="m-nav__link-text">Inicio</span>
								</a>
							</li>
							<li class="m-nav__separator">-</li>
							<li class="m-nav__item">
								<a href="" class="m-nav__link">
									<span class="m-nav__link-text">Usuarios</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="m-content">
				<div v-if="showAlertMaintenance" class="alert alert-danger alert-dismissible fade show" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					</button>
					<strong>¡ATENCIÓN!</strong> Actualmente el sistema está en mantenimiento.
				</div>
				<div class="m-portlet m-portlet--mobile">
					<div class="m-portlet__head">
						<div class="m-portlet__head-caption">
							<div class="m-portlet__head-title">
								<h3 class="m-portlet__head-text">
									Usuarios
								</h3>
							</div>
						</div>
						<div class="m-portlet__head-tools">
							<ul class="m-portlet__nav">
								<li class="m-portlet__nav-item">
									<a @click="newUser" class="btn btn-brand m-btn m-btn--icon">
										<span>
											<i style="color: #fff" class="la la-plus"></i>
											<span style="color: #fff">Nuevo</span>
										</span>
									</a>
								</li>
								<li v-if="isDeveloper" class="m-portlet__nav-item">
									<a @click="showModalMaintenance" class="btn btn-danger m-btn m-btn--icon">
										<span>
											<i style="color: #fff" class="la la-wrench"></i>
											<span style="color: #fff">Mantenimiento</span>
										</span>
									</a>
								</li>
								
							</ul>
						</div>
					</div>
					<div class="m-portlet__body">

						<!--begin: Datatable -->
						<table class="table table-striped- table-bordered table-hover table-checkable" id="tableUsers">
							<thead>
								<tr>
									<th><center>Apellido</center></th>
									<th><center>Nombre</center></th>
									<th><center>Usuario</center></th>
									<th><center>Perfil</center></th>
									<th><center>Módulos</center></th>
									<th><center>Activo</center></th>
									<th><center>Acciones</center></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="user in GET_USERS" :key="user._id">
									<td>{{ user.lastname }}</td>
									<td>{{ user.name }}</td>
									<td>{{ user.user }}</td>
									<td>{{ user.profile }}</td>
									<td v-if="user.modules.length == 0"><span class="m-badge m-badge--metal m-badge--wide">Sin permisos</span></td>
									<td v-else>
										<span style="margin-right: 5px" v-for="permission in user.modules" :key="permission.code" class="m-badge m-badge--brand m-badge--wide">
											{{ permission.name }}
										</span>
									</td>
									<td>
										<center>
											<span class="m-switch m-switch--icon">
												<label>
													<input v-if="user.active" @change="changeActive(user._id, !user.active)"  checked="checked" type="checkbox" >
													<input v-else @change="changeActive(user._id, !user.active)" type="checkbox" >
													<span></span>
												</label>
											</span>
										</center>
									</td>
									<td nowrap>
										<center>
											<a @click="editUser(user._id, user.name, user.lastname, user.user, user.profile)" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Editar">
												<i class="la la-edit"></i>
											</a>
											<button v-if="user.user == GET_USER_AUTH || user.user == 'wgerez'" @click="showModalDeleteUser(user._id, user.name, user.lastname)" disabled="disabled"  class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Editar">
												<i class="la la-trash"></i>
											</button>
											<button v-else @click="showModalDeleteUser(user._id, user.name, user.lastname)" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Editar">
												<i class="la la-trash"></i>
											</button>

											<a @click="viewPermissions(user._id, user.modules)"  class="m-portlet__nav-link btn m-btn m-btn--hover-info m-btn--icon m-btn--icon-only m-btn--pill" title="Permisos">
												<i class="la la-key"></i>
											</a>
										</center>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!--Scroll /-->
		<!-- MODAL NEW USER -->
		<div class="modal fade" id="modalNewUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Nuevo usuario</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form class="m-form m-form--fit m-form--label-align-right m-form--group-seperator-dashed">
							<div class="m-portlet__body">
								<div class="form-group m-form__group row">
									<div class="col-lg-6">
										<label>Nombre:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="user.name" type="text" class="form-control m-input" placeholder="ingrese el nombre">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-user"></i>
												</span>
											</span>
										</div>
									</div>
									<div class="col-lg-6">
										<label class="">Apellido:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="user.lastname" type="text" class="form-control m-input" placeholder="ingrese el apellido">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-user"></i>
												</span>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group m-form__group row">
									<div class="col-lg-6">
										<label>Usuario:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="user.user" type="text" class="form-control m-input" placeholder="ej: jperez">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-user"></i>
												</span>
											</span>
										</div>
									</div>
									<div class="col-lg-6">
										<label class="">Contraseña:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="user.password" type="password" class="form-control m-input" placeholder="password">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-key"></i>
												</span>
											</span>
										</div>
										<span class="m-form__help">mínimo, 6 cracteres</span>
									</div>
								</div>
								<div class="form-group m-form__group row">
									<div class="col-lg-12">
										<label for="exampleSelect1">Selecciones un perfil</label>
										<select v-model="user.profile" class="form-control m-input" id="rol">
											<option value="Administrador">Administrador</option>
											<option value="Usuario">Usuario</option>
											<option value="Desarrollador">Desarrollador</option>
										</select>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="la la-times"></i> Cancelar</button>
						<button @click="saveNewUser()" type="button" class="btn btn-primary"><i class="la la-save"></i> Guardar</button>
					</div>
				</div>
			</div>
		</div>
		<!-- END MODAL NEW USER -->


		<!-- MODAL EDIT USER -->
		<div class="modal fade" id="modalEditUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Editar usuario</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form class="m-form m-form--fit m-form--label-align-right m-form--group-seperator-dashed">
							<div class="m-portlet__body">
								<div class="form-group m-form__group row">
									<div class="col-lg-6">
										<label>Nombre:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="userUpdate.name" type="text" class="form-control m-input" placeholder="ingrese el nombre">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-user"></i>
												</span>
											</span>
										</div>
									</div>
									<div class="col-lg-6">
										<label class="">Apellido:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="userUpdate.lastname" type="text" class="form-control m-input" placeholder="ingrese el apellido">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-user"></i>
												</span>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group m-form__group row">
									<div class="col-lg-6">
										<label>Usuario:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="userUpdate.user" type="text" class="form-control m-input" placeholder="ej: driquelme">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-user"></i>
												</span>
											</span>
										</div>
									</div>
									<div class="col-lg-6">
										<label class="">Contraseña:</label>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="userUpdate.password" type="text" class="form-control m-input" placeholder="no cargar para mantener la anterior..">
											<span class="m-input-icon__icon m-input-icon__icon--right">
												<span>
													<i class="la la-key"></i>
												</span>
											</span>
										</div>
										<span class="m-form__help">mínimo, 6 cracteres</span>
									</div>
								</div>
								<div class="form-group m-form__group row">
									<div class="col-lg-12">
										<label for="exampleSelect1">Selecciones un perfil</label>
										<select v-model="userUpdate.profile" class="form-control m-input" id="rol">
											<option value="Administrador">Administrador</option>
											<option value="Usuario">Usuario</option>
											<option value="Desarrollador">Desarrollador</option>
										</select>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="la la-times"></i> Cancelar</button>
						<button @click="updateUser()" type="button" class="btn btn-primary"><i class="la la-save"></i> Guardar</button>
					</div>
				</div>
			</div>
		</div>
		<!-- END MODAL EDIT USER -->

		<!-- MODAL DELETE USER -->
		<div class="modal fade" id="modalDeleteUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Eliminar usuario</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>Estás seguro de eliminar a <b id="nameAndLastNameTxt"></b></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="la la-times"></i> Cancelar</button>
						<button @click="deleteUser()" type="button" class="btn btn-danger"><i class="la la-trash"></i> Eliminar</button>
					</div>
				</div>
			</div>
		</div>
		<!-- END MODAL DELETE USER --> 
		
		<!-- MODAL MAINTENANCE USER -->
		<div class="modal fade" id="modalEnMantenimiento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Sistema</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<h5>Modo mantenimiento del sistema</h5>
						<p class="text-danger">
							Al activarlo, se cerrarán todas las sessiones abiertas y no podrán ingresar hasta desactivar está opción. <b>¡TENER CUIDADO!</b>
						</p>
						<div class="row">
							<label class="col-2 col-form-label">Activar:</label>
							<div class="col-3">
								<span class="m-switch m-switch--outline m-switch--icon m-switch--danger">
									<label>
										<input v-model="mmaintenance" type="checkbox" checked="checked" name="">
										<span></span>
									</label>
								</span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="la la-times"></i> Cancelar</button>
						<button @click="maintenance()" type="button" class="btn btn-danger"><i class="la la-save"></i> Guardar</button>
					</div>
				</div>
			</div>
		</div>
		<!-- END MODAL MAINTENANCE USER --> 
		

		<!-- MODAL PERMISSIONS USER -->
		<div class="modal fade" id="modalPermissionsUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Permisos</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="form-group m-form__group row">
							<label class="col-form-label col-lg-3 col-sm-12">Permisos</label>
							<div class="col-lg-9 col-md-9 col-sm-12">
								<multiselect 
									v-model="valuePermissions" 
									tag-placeholder="Agregar un permiso" 
									placeholder="Buscar o agregar permiso" 
									label="name" 
									track-by="code"
									:show-labels="false" 
									:options="optionsPermissions" 
									:multiple="true" 
									:taggable="true"
									@select="selectTag" 
									@tag="addTagPermissions">
								</multiselect>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="la la-times"></i> Cancelar</button>
						<button @click="savePermissions()" type="button" class="btn btn-danger"><i class="la la-trash"></i> Guardar</button>
					</div>
				</div>
			</div>
		</div>
		<!-- END MODAL PERMISSIONS USER -->
		
	</div>	
</template>

<script>
  import { mapActions, mapState, mapGetters} from 'vuex';
  import multiselect from 'vue-multiselect'

  import { mixUser }  from '../../mixins/user';

  export default {
	name: 'Users',
	data: () => ({
		user: {
			name: '',
			lastname: '',
			user: '',
			modules: [
				{ name: 'CAMAS COVID19', code: 'camascovid19' },
				{ name: 'INGRESOS', code: 'ingresos' },
				{ name: 'TEST COVID19', code: 'testcovid19' },
				{ name: 'ENCABEZADO', code: 'encabezado' },
				{ name: 'UPAC', code: 'upac' }
			],
			password: '',
			profile: '',
		},
		valuePermissions: [],
		optionsPermissions: [
				{ name: 'CAMAS COVID19', code: 'camascovid19' },
				{ name: 'INGRESOS', code: 'ingresos' },
				{ name: 'TEST COVID19', code: 'testcovid19' },
				{ name: 'ENCABEZADO', code: 'encabezado' },
				{ name: 'UPAC', code: 'upac' }
		],
		userUpdate: {
			id: '',
			name: '',
			lastname: '',
			user: '',
			password: '',
			active: '',
			profile: '',
		},
		idUserToDelete: '',
		idUserToPermissions: '',
		mmaintenance: false,
		showAlertMaintenance: false
	}),
    components: {
		multiselect
	},
	beforeCreate () {
		if (!localStorage.getItem('user')) {
			this.$router.push({ path: '/login' })
		}
	},
	mounted () {
		if (localStorage.getItem('reloaded')) {
			localStorage.removeItem('reloaded');
		} else {
			localStorage.setItem('reloaded', '1');
			location.reload();
		}
	},
	mounted () {
		this.fetchUsers()
	},
	methods: {
		...mapActions('users', ['FETCH_USERS', 'NEW_USER', 'DELETE_USER', 'UPDATE_USER', 'UPDATE_ACTIVE_USER', 'SAVE_PERMISSIONS']),
		maintenance(){
			this.showAlertMaintenance = (this.mmaintenance) ? true : false
			this.$socket.emit('maintenance', {maintenance: this.mmaintenance})
			$('#modalEnMantenimiento').modal('hide')
		},
		showModalMaintenance(){
			$('#modalEnMantenimiento').modal('show')
		},
		viewPermissions(userId, modules){
			this.idUserToPermissions = userId
			this.valuePermissions = modules
			$('#modalPermissionsUser').modal('show')
		},
		savePermissions(userId){
			let data = {
				id: this.idUserToPermissions,
				permissions: this.valuePermissions 
			}
			this.SAVE_PERMISSIONS(data).then(res => {
				$('#tableUsers').DataTable().destroy();
				this.fetchUsers();
				$('#modalPermissionsUser').modal('hide');
			})
		},
		selectTag(){
			let code = _.find(this.valuePermissions, ['code', 'todos'])
			console.log(code);			
		},
		addTagPermissions(newTag) {
			const tag = {
				name: newTag,
				code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
			}
			this.optionsPermissions.push(tag)
			this.valuePermissions.push(tag)
		},
		changeActive(userId, active){
			this.userUpdate.active = active
			let data = {
				id: userId,
				active: this.userUpdate.active
			}
			this.UPDATE_ACTIVE_USER(data)
		},
		saveNewUser(){
			$('#modalNewUser').modal('hide');
			$('#tableUsers').DataTable().destroy();
			this.NEW_USER(this.user).then(res => {
				this.fetchUsers()
				this.cleanUser()
			})
		},
		cleanUser(){
			this.user.name = ''
			this.user.lastname = ''
			this.user.user = ''
			this.user.password = ''
			this.user.profile = ''
		},
		fetchUsers(){
			this.FETCH_USERS().then(res=>{
				this.$nextTick(() => { 
					$("#tableUsers").DataTable({
    					"retrieve": true,
						columnDefs: [
							{ orderable: true, className: 'reorder', targets: [0, 1, 2, 3, 4] },
							{ orderable: false, targets: '_all' }
						]
					}) 
				})
			})
		},
		newUser(){
			$('#modalNewUser').modal('show');
		},
		updateUser(){
			$('#tableUsers').DataTable().destroy();
			this.UPDATE_USER(this.userUpdate).then(res => {
				this.fetchUsers()
				$('#modalEditUser').modal('hide');
			})
		},
		editUser(id, name, lastname, user, profile){
			this.userUpdate.id = id
			this.userUpdate.name = name
			this.userUpdate.lastname = lastname
			this.userUpdate.user = user
			this.userUpdate.profile = profile
			$('#modalEditUser').modal('show');
		},
		showModalDeleteUser(id, name, lastname){
			$('#nameAndLastNameTxt').text(`${name}, ${lastname}`)
			this.idUserToDelete = id
			$('#modalDeleteUser').modal('show');
		},
		deleteUser(){
			$('#modalDeleteUser').modal('hide');
			$('#tableUsers').DataTable().destroy();
			this.DELETE_USER(this.idUserToDelete).then(res => {
				this.fetchUsers()
			})
		}
	},
	created () {
		this.sockets.subscribe('maintenance', (data) => {
			console.log("Subscripto a maintenance..closed")
		});
	},
	computed: {
		...mapGetters('users', ['GET_USERS', 'GET_USER_AUTH']),
		isDeveloper(){
			if (localStorage.getItem('profile') == "Desarrollador") {
				return true;
			} else {
				return false;
			}
		}
	}
  }
</script>
<style  scoped>

</style>
