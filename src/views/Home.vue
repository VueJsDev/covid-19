<template>
  <div class="">
		<div class="m-grid m-grid--hor m-grid--root m-page">
			<Header />
			<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
				<button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
					<i class="la la-close"></i>
				</button>
				<div id="m_aside_left" class="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
          			<Navigation />
				</div>
				<div class="m-grid__item m-grid__item--fluid m-wrapper">
					<div class="m-content">
						<router-view />
					</div>
				</div>
			</div>
      		<Footer />
		</div>
		<Scroll />
  </div>  
</template>

<script>

  import Header from './layouts/Header';
  import Navigation from './layouts/Navigation';
  import Footer from './layouts/Footer';
  import Scroll from './layouts/Scroll';

  export default {
    name: 'Home',
    components: {
      Header,
      Navigation,
      Footer,
	  Scroll
    }
  }
</script>
<style  scoped>
</style>
