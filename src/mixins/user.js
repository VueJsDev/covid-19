var mixUser = {
    methods: {
        maintenance(data) {
            this.CHANGE_MAINTENANCE(data)
            if (data.maintenance) {
                localStorage.setItem('maintenance', true)
                this.logout(true)
            } else {
                localStorage.setItem('maintenance', false)
            }
        },
        logout() {
            this.removeLocalStorage()
            this.$router.push({ name: 'Login'})
        },
        removeLocalStorage() {
            localStorage.removeItem('permissions')
            localStorage.removeItem('user')
            localStorage.removeItem('userid')
            localStorage.removeItem('name')
            localStorage.removeItem('profile')
            localStorage.removeItem('reloaded');
        }
    }
}

export { mixUser };