jQuery(document).ready(function(){
	var i=0;
	jQuery('.dropdown.d-none.d-lg-block').hover(function(){
		if(i==0){
			jQuery(this).find('.dropdown-menu').addClass('show');
			i=1;
		}else{
			jQuery(this).find('.dropdown-menu').removeClass('show');
			i=0;
		}
	});

	var j=0;
	jQuery('.list-unstyled.topnav-menu.topnav-menu-left.m-0 li.dropdown.d-none.d-lg-block').each(function(){
	var thisl=jQuery('.list-unstyled.topnav-menu.topnav-menu-left.m-0 li').length;
	var thisw=jQuery('.list-unstyled.topnav-menu.topnav-menu-left.m-0 li').width();
	jQuery(this).find('a.nav-link.dropdown-toggle.waves-effect.waves-light').click(function(){
		var data=jQuery(this).parent().find('.dropdown-menu').html();
		if(data){
			jQuery('#fullwidth-menu').html(data);
		}else{
			jQuery('#fullwidth-menu').html('');
		}
		//j=jQuery(this).parent().index();
		//j=j+1;
		jQuery('.dropdown.d-none.d-lg-block').removeClass('border-activate');
		jQuery('.dropdown.d-none.d-lg-block').each(function(){
			jQuery(this).find('a').removeClass('border-activate');

		});
		//jQuery('.dropdown-menu').removeClass('activtetab');
		//jQuery('.dropdown.d-none.d-lg-block').removeClass('activepos');
		jQuery(this).addClass('border-activate');
		//jQuery('.dropdown-menu-activate').removeAttr('style');
		//jQuery(this).parent().find('.dropdown-menu-activate').addClass('activtetab');
	});
	jQuery(this).find('.dropdown-menu a').click(function(){

		//j=jQuery(this).parent().index();
		//j=j+1;
		jQuery('.dropdown.d-none.d-lg-block a').removeClass('border-activate');
		jQuery('.dropdown-menu a').removeClass('hovercolor');
		jQuery('.dropdown.d-none.d-lg-block').each(function(){
			jQuery(this).find('a').removeClass('border-activate');

		});
		jQuery('.dropdown.d-none.d-lg-block').removeClass('border-activate');
		//jQuery('.dropdown-menu').removeClass('activtetab');
		//jQuery('.dropdown.d-none.d-lg-block').removeClass('activepos');
		jQuery(this).parent().parent().addClass('border-activate');
		//jQuery('.dropdown-menu-activate').removeAttr('style');
		jQuery(this).addClass('hovercolor');
		//jQuery(this).parent().find('.dropdown-menu-activate').addClass('activtetab');
		var data=jQuery(this).parent().parent().find('.dropdown-menu').html();
		if(data){
			jQuery('#fullwidth-menu').html(data);
		}else{
			jQuery('#fullwidth-menu').html('');
		}
	});});
});
