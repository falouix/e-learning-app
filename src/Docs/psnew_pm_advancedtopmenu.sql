TRUNCATE psnew_pm_advancedtopmenu ;INSERT INTO psnew_pm_advancedtopmenu (`id_menu`, `id_cms`, `id_category`, `id_supplier`, `id_manufacturer`, `id_shop`, `position`, `have_icon`, `image_type`, `txt_color_menu_tab`, `txt_color_menu_tab_hover`, `fnd_color_menu_tab`, `fnd_color_menu_tab_over`, `border_size_tab`, `border_color_tab`, `width_submenu`, `minheight_submenu`, `position_submenu`, `fnd_color_submenu`, `border_color_submenu`, `border_size_submenu`, `privacy`, `active`, `target`, `type`)( SELECT * FROM ps_pm_advancedtopmenu );