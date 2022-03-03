!(function (EasyLiteApp, $) {
    "use strict";
    EasyLiteApp.Package.name = "EasyLite";
    EasyLiteApp.Package.version = "1.0.0";

    var $win = $(window), $body = $('body'), $doc = $(document),

    //class names
    _body_theme  = 'nio-theme',
    _menu        = 'nk-menu',
    _mobile_nav  = 'mobile-menu',
    _header      = 'nk-header',
    _header_menu = 'nk-header-menu',
    _sidebar     = 'nk-sidebar',
    _sidebar_mob = 'nk-sidebar-mobile',
    _app_sidebar = 'nk-apps-sidebar',
    //breakpoints
    _break       = EasyLiteApp.Break;

    function extend(obj, ext) {
        Object.keys(ext).forEach(function(key) { obj[key] = ext[key]; });
        return obj;
    }
    // ClassInit @v1.0
    EasyLiteApp.ClassBody = function() {
        EasyLiteApp.AddInBody(_sidebar);
        EasyLiteApp.AddInBody(_app_sidebar);
    };

    // ClassInit @v1.0
    EasyLiteApp.ClassNavMenu = function() {
        EasyLiteApp.BreakClass('.'+_header_menu, _break.lg, { timeOut: 0 } );
        EasyLiteApp.BreakClass('.'+_sidebar, _break.lg, {timeOut: 0, classAdd: _sidebar_mob} );
        $win.on('resize', function() {
            EasyLiteApp.BreakClass('.'+_header_menu, _break.lg);
            EasyLiteApp.BreakClass('.'+_sidebar, _break.lg, {classAdd: _sidebar_mob} );
        });
    };

    // Code Prettify @v1.0
    EasyLiteApp.Prettify = function(){
        window.prettyPrint && prettyPrint();
    };

    // Copied @v1.0
    EasyLiteApp.Copied = function() {
        var clip   = '.clipboard-init', target = '.clipboard-text',
            sclass = 'clipboard-success', eclass = 'clipboard-error';

        // Feedback
        function feedback (el, state) {
            var $elm = $(el), $elp = $elm.parent(), copy = {text: 'Copy', done: 'Copied', fail: 'Failed'},
                data = {text: $elm.data('clip-text'), done: $elm.data('clip-success'), fail: $elm.data('clip-error')};

                copy.text = (data.text) ? data.text : copy.text;
                copy.done = (data.done) ? data.done : copy.done;
                copy.fail = (data.fail) ? data.fail : copy.fail;

            var copytext = (state==='success') ? copy.done : copy.fail,
                addclass = (state==='success') ? sclass : eclass;

            $elp.addClass(addclass).find(target).html(copytext);

            setTimeout(function(){
                $elp.removeClass(sclass + ' ' + eclass).find(target).html(copy.text).blur();
                $elp.find('input').blur();
            }, 2000);
        }

        // Init ClipboardJS
        if(ClipboardJS.isSupported()){
            var clipboard = new ClipboardJS(clip);
            clipboard.on('success', function(e) {
                feedback(e.trigger, 'success');
                e.clearSelection();
            }).on('error', function(e) {
                feedback(e.trigger, 'error');
            });
        } else {
            $(clip).css('display','none');
        };
    };

    // CurrentLink Detect @v1.0
    EasyLiteApp.CurrentLink = function(){
        var _link = '.nk-menu-link, .menu-link, .nav-link',
            _currentURL = window.location.href,
            fileName = _currentURL.substring(0, (_currentURL.indexOf("?") == -1) ? _currentURL.length : _currentURL.indexOf("?"));
        $(_link).each(function() {
            var self = $(this), _self_link = self.attr('path');
            if (_self_link && fileName.match(_self_link)) {
              self.closest("li").addClass('active current-page').parents().closest("li").addClass("active current-page");
              self.closest("li").children('.nk-menu-sub').css('display','block');
              self.parents().closest("li").children('.nk-menu-sub').css('display','block');
            } else {
              self.closest("li").removeClass('active current-page').parents().closest("li:not(.current-page)").removeClass("active");
            }
        });
    };

    // PasswordSwitch @v1.0
    EasyLiteApp.PassSwitch = function(){
        EasyLiteApp.Passcode('.passcode-switch');
    };

    // Toastr Message @v1.0
    EasyLiteApp.Toast = function (msg, ttype, opt) {
        var ttype   = (ttype) ? ttype : 'info', msi = '',
            ticon   = (ttype==='info') ? 'ni ni-info-fill' : ((ttype==='success') ? 'ni ni-check-circle-fill' : ((ttype==='error') ? 'ni ni-cross-circle-fill' : ((ttype==='warning') ? 'ni ni-alert-fill' : '') ) ),
            def     = {position:'bottom-right', ui: '', icon: 'auto', clear: false}, attr = (opt) ? extend(def, opt) : def;

            attr.position = (attr.position) ? 'toast-'+attr.position : 'toast-bottom-right';
            attr.icon = (attr.icon==='auto') ? ticon : ((attr.icon) ? attr.icon : '' );
            attr.ui = (attr.ui) ? ' '+ attr.ui : '';

            msi  = (attr.icon!=='') ? '<span class="toastr-icon"><em class="icon '+ attr.icon +'"></em></span>' : '',
            msg = (msg!=='') ? msi + '<div class="toastr-text">'+ msg + '</div>' : '';

        if(msg!=="") {
            if(attr.clear===true) { toastr.clear(); }
            var option = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": attr.position + attr.ui,
                    "closeHtml": '<span class="btn-trigger">Close</span>',
                    "preventDuplicates": true,
                    "showDuration": "1500",
                    "hideDuration": "1500",
                    "timeOut": "2000",
                    "toastClass": "toastr",
                    "extendedTimeOut": "3000"
                };
            toastr.options = extend(option, attr);
            toastr[ttype](msg);
        }
    };

    // Toggle Screen @v1.0
    EasyLiteApp.TGL.screen = function (elm){
        if($(elm).exists()) {
            $(elm).each(function(){
                var ssize = $(this).data('toggle-screen');
                if(ssize){ $(this).addClass('toggle-screen-' + ssize ); }
            });
        }
    };

    // Toggle Content @v1.0
    EasyLiteApp.TGL.content = function (elm, opt){
        var toggle = (elm) ? elm : '.toggle', $toggle = $(toggle), $contentD = $('[data-content]'),
            toggleBreak = true, toggleCurrent = false, def = { active: 'active', content: 'content-active', break: toggleBreak}, attr = (opt) ? extend(def, opt) : def;

        EasyLiteApp.TGL.screen($contentD);

        $toggle.on('click', function(e){
            toggleCurrent = this;
            EasyLiteApp.Toggle.trigger($(this).data('target'), attr);
            e.preventDefault();
        });

        $doc.on('mouseup', function(e){
            if (toggleCurrent) {
                var $toggleCurrent = $(toggleCurrent), $s2c = $('.select2-container'), $dpd = $('.datepicker-dropdown'), $tpc = $('.ui-timepicker-container');
                if (!$toggleCurrent.is(e.target) && $toggleCurrent.has(e.target).length===0 && !$contentD.is(e.target) && $contentD.has(e.target).length===0
                    && !$s2c.is(e.target) && $s2c.has(e.target).length===0 && !$dpd.is(e.target) && $dpd.has(e.target).length===0
                    && !$tpc.is(e.target) && $tpc.has(e.target).length===0) {
                    EasyLiteApp.Toggle.removed($toggleCurrent.data('target'), attr);
                    toggleCurrent = false;
                }
            }
        });

        $win.on('resize', function(){
            $contentD.each(function(){
                var content = $(this).data('content'), ssize = $(this).data('toggle-screen'), toggleBreak = _break[ssize];
                if(EasyLiteApp.Win.width > toggleBreak){
                    EasyLiteApp.Toggle.removed(content, attr);
                }
            });
        });
    };

    // ToggleExpand @v1.0
    EasyLiteApp.TGL.expand = function(elm, opt){
        var toggle = (elm) ? elm : '.expand', def = {toggle: true}, attr = (opt) ? extend(def, opt) : def;

        $(toggle).on('click', function(e){
            EasyLiteApp.Toggle.trigger($(this).data('target'), attr);
            e.preventDefault();
        });
    };

    // Dropdown Menu @v1.0
    EasyLiteApp.TGL.ddmenu = function(elm, opt){
        var imenu = (elm) ? elm : '.nk-menu-toggle',
            def = { active: 'active', self: 'nk-menu-toggle', child: 'nk-menu-sub'},
            attr = (opt) ? extend(def, opt) : def;

        $(imenu).on('click', function(e){
            if ((EasyLiteApp.Win.width < _break.lg) || ($(this).parents().hasClass(_sidebar))) {
                EasyLiteApp.Toggle.dropMenu($(this), attr);
            }
            e.preventDefault();
        });
    };

    // Show Menu @v1.0
    EasyLiteApp.TGL.showmenu = function(elm, opt){
        let toggle = (elm) ? elm : '.nk-nav-toggle', $toggle = $(toggle), $contentD = $('[data-content]'),
            toggleBreak = $contentD.hasClass(_header_menu) ? _break.lg : _break.xl,
            toggleOlay = _sidebar + '-overlay', toggleClose = {profile: true, menu: false},
            def = { active: 'toggle-active', content: _sidebar + '-active', body: 'nav-shown', overlay: toggleOlay, break: toggleBreak, close: toggleClose },
            attr = (opt) ? extend(def, opt) : def;

        $toggle.on('click', function(e){
          let eventTarget = $(e.target).closest('.nk-menu-trigger');
          if (eventTarget.hasClass('active')) {
            eventTarget.removeClass('active');
            EasyLiteApp.Toggle.removed($(this).data('target'), attr);
          } else {
            eventTarget.addClass('active');
            EasyLiteApp.Toggle.trigger($(this).data('target'), attr);
          }
          e.preventDefault();
        });

        $doc.on('mouseup', function(e){
            if (!$toggle.is(e.target) && $toggle.has(e.target).length===0 && !$contentD.is(e.target) && $contentD.has(e.target).length===0 && EasyLiteApp.Win.width < toggleBreak) {
                EasyLiteApp.Toggle.removed($toggle.data('target'), attr);
            }
        });

        $win.on('resize', function(){
            if(EasyLiteApp.Win.width < _break.xl || EasyLiteApp.Win.width < toggleBreak ){
                EasyLiteApp.Toggle.removed($toggle.data('target'), attr);
            }
        });
    };

    // Animate FormSearch @v1.0
    EasyLiteApp.Ani.formSearch= function(elm, opt){
        var def = {active: 'active', timeout: 400, target: '[data-search]'}, attr = (opt) ? extend(def, opt) : def;
        var $elem = $(elm), $target = $(attr.target);

        if($elem.exists()) {
            $elem.on('click', function(e){
                e.preventDefault();
                var $self = $(this), the_target = $self.data('target'),
                    $self_st = $('[data-search=' + the_target + ']'),
                    $self_tg = $('[data-target=' + the_target + ']');

                if(!$self_st.hasClass(attr.active)){
                    $self_tg.add($self_st).addClass(attr.active);
                    $self_st.find('input').focus();
                } else{
                    $self_tg.add($self_st).removeClass(attr.active);
                    setTimeout(function(){
                        $self_st.find('input').val('');
                    }, attr.timeout);
                }
            });

            $doc.on({
                keyup: function(e) {
                    if (e.key === "Escape") {
                        $elem.add($target).removeClass(attr.active);
                    }
                },
                mouseup: function(e){
                    if (!$target.find('input').val() && !$target.is(e.target) && $target.has(e.target).length===0 && !$elem.is(e.target) && $elem.has(e.target).length===0) {
                        $elem.add($target).removeClass(attr.active);
                    }
                }
            });
        }
    };

    // Animate FormElement @v1.0
    EasyLiteApp.Ani.formElm = function(elm, opt){
        var def = {focus: 'focused'}, attr = (opt) ? extend(def, opt) : def;

        if($(elm).exists()) {
            $(elm).each(function(){
                var $self = $(this);

                if($self.val()){
                    $self.parent().addClass(attr.focus);
                }
                $self.on({
                    focus: function(){
                        $self.parent().addClass(attr.focus);
                    },
                    blur: function(){
                        if(!$self.val()){ $self.parent().removeClass(attr.focus); }
                    }
                });
            });
        }
    };

    // Form Validate @v1.0
    EasyLiteApp.Validate = function(elm, opt) {
        if ($(elm).exists()) {
            $(elm).each(function(){
                var def = {errorElement: "span"}, attr = (opt) ? extend(def, opt) : def;
                $(this).validate(attr);
            });
        }
    };

    EasyLiteApp.Validate.init = function() {
        EasyLiteApp.Validate('.form-validate',
        {
            errorElement: "span",
            errorClass: "invalid",
            errorPlacement: function(error, element) {
                error.appendTo( element.parent() );
              }
        });
    }

    // Dropzone @v1.0
    EasyLiteApp.Dropzone = function(elm, opt) {
        if ($(elm).exists()) {
            $(elm).each(function(){
                var def = {autoDiscover: false},
                    attr = (opt) ? extend(def, opt) : def;
                $(this).addClass('dropzone').dropzone(attr);
            });
        }
    };

    // Dropzone Init @v1.0
    EasyLiteApp.Dropzone.init = function() {
        EasyLiteApp.Dropzone('.upload-zone', {url: "/images"} );
    };

    // Wizard @v1.0
    EasyLiteApp.Wizard = function(){

        var $wizard = $(".nk-wizard").show();
        $wizard.steps({
            headerTag: ".nk-wizard-head",
            bodyTag: ".nk-wizard-content",
            labels: {
                finish: "Submit",
                next: "Next",
                previous: "Prev",
                loading: "Loading ..."
            },
            onStepChanging: function (event, currentIndex, newIndex)
            {
                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex)
                {
                    return true;
                }
                // Needed in some cases if the user went back (clean up)
                if (currentIndex < newIndex)
                {
                    // To remove error styles
                    $wizard.find(".body:eq(" + newIndex + ") label.error").remove();
                    $wizard.find(".body:eq(" + newIndex + ") .error").removeClass("error");
                }
                $wizard.validate().settings.ignore = ":disabled,:hidden";
                return $wizard.valid();
            },
            onFinishing: function (event, currentIndex)
            {
                $wizard.validate().settings.ignore = ":disabled";
                return $wizard.valid();
            },
            onFinished: function (event, currentIndex){window.location.href = "#";}

        }).validate({
            errorElement: "span",
            errorClass: "invalid",
            errorPlacement: function(error, element) {
                error.appendTo( element.parent() );
            }
        });
    }

    // DataTable @1.1
    EasyLiteApp.DataTable = function(elm, opt) {
        if ($(elm).exists()) {
            $(elm).each(function(){
                var auto_responsive = $(this).data('auto-responsive');
                var dom_normal = '<"row justify-between g-2"<"col-7 col-sm-6 text-left"f><"col-5 col-sm-6 text-right"<"datatable-filter"l>>><"datatable-wrap my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>';
                var dom_separate = '<"row justify-between g-2"<"col-7 col-sm-6 text-left"f><"col-5 col-sm-6 text-right"<"datatable-filter"l>>><"my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>';
                var dom = $(this).hasClass('is-separate') ? dom_separate : dom_normal;
                var def = {
                        responsive: true,
                        autoWidth: false,
                        dom: dom,
                        language: {
                            search : "",
                            searchPlaceholder: "Type in to Search",
                            lengthMenu: "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
                            info: "_START_ -_END_ of _TOTAL_",
                            infoEmpty: "No records found",
                            infoFiltered: "( Total _MAX_  )",
                            paginate: {
                                "first":      "First",
                                "last":       "Last",
                                "next":       "Next",
                                "previous":   "Prev"
                            },
                        }
                    },
                    attr = (opt) ? extend(def, opt) : def;
                    attr =(auto_responsive === false) ?  extend(attr, {responsive: false}) : attr;

                $(this).DataTable(attr);
            });
        }
    };

    // DataTable Init @v1.0
    EasyLiteApp.DataTable.init = function () {
        EasyLiteApp.DataTable('.datatable-init', {
            responsive: {
                details: true
            }
        });
        $.fn.DataTable.ext.pager.numbers_length = 7;
    }


    // BootStrap Extended
    EasyLiteApp.BS.ddfix = function(elm, exc) {
        var dd = (elm) ? elm : '.dropdown-menu',
            ex = (exc) ? exc : 'a:not(.clickable), button:not(.clickable), a:not(.clickable) *, button:not(.clickable) *';

        $(dd).on('click', function (e) {
            if(!$(e.target).is(ex)){
                e.stopPropagation();
                return;
            }
        });
        if(EasyLiteApp.State.isRTL){
            var $dMenu = $('.dropdown-menu');
            $dMenu.each(function(){
                var $self = $(this);
                if($self.hasClass('dropdown-menu-right') && !$self.hasClass('dropdown-menu-center')){
                    $self.prev('[data-toggle="dropdown"]').dropdown({
                        popperConfig: {
                            placement: 'bottom-start'
                        }
                    });
                }else if(!$self.hasClass('dropdown-menu-right') && !$self.hasClass('dropdown-menu-center')){
                    $self.prev('[data-toggle="dropdown"]').dropdown({
                        popperConfig: {
                            placement: 'bottom-end'
                        }
                    });
                }
            });
        }
    }

    // BootStrap Specific Tab Open
    EasyLiteApp.BS.tabfix = function(elm) {
        var tab = (elm) ? elm : '[data-toggle="modal"]';
        $(tab).on('click', function(){
            var _this = $(this), target = _this.data('target'), target_href = _this.attr('href'),
                tg_tab = _this.data('tab-target');

            var modal = (target) ? $body.find(target) : $body.find(target_href);
            if (tg_tab && tg_tab !=='#' && modal) {
                modal.find('[href="'+tg_tab+'"]').tab('show');
            } else if(modal) {
                var tabdef = modal.find('.nk-nav.nav-tabs');
                var link = $(tabdef[0]).find('[data-toggle="tab"]');
                $(link[0]).tab('show');
            }
        });
    }

    // Knob @v1.0
    EasyLiteApp.Knob = function(elm, opt) {
        if($(elm).exists() && typeof($.fn.knob) === 'function') {
            var def = {min: 0}, attr = (opt) ? extend(def, opt) : def;
            $(elm).each(function(){ $(this).knob(attr); });
        }
    };
    // Knob Init @v1.0
    EasyLiteApp.Knob.init = function() {
        var knob = {
                default: {readOnly: true, lineCap: "round"},
                half: { angleOffset: -90, angleArc: 180, readOnly: true, lineCap: "round"}
            };

        EasyLiteApp.Knob('.knob', knob.default);
        EasyLiteApp.Knob('.knob-half', knob.half);
    };

    // Range @v1.0.1
    EasyLiteApp.Range = function(elm, opt) {
        if($(elm).exists() && typeof(noUiSlider) !== 'undefined') {
            $(elm).each(function(){
                var $self = $(this), self_id = $self.attr('id');
                var target = document.getElementById(self_id);
                var def = {
                        start: [25],
                        connect: 'lower',
                        direction: EasyLiteApp.State.isRTL ? "rtl" : "ltr",
                        range: {
                            'min': 0,
                            'max': 100
                        }
                    },
                    attr = (opt) ? extend(def, opt) : def;

                noUiSlider.create(target, attr);
            });
        }
    };

    // Range Init @v1.0
    EasyLiteApp.Range.init = function() {
        EasyLiteApp.Range('.form-range-slider');
    };

    EasyLiteApp.Select2.init = function() {
        //EasyLiteApp.Select2('.select');
        EasyLiteApp.Select2('.form-select');
    };

    // Slick Slider @v1.0.1
    EasyLiteApp.Slick = function(elm, opt) {
      var def = {
              'prevArrow':'<div class="slick-arrow-prev"><a href="javascript:void(0);" class="slick-prev"><em class="icon ni ni-chevron-left"></em></a></div>',
              'nextArrow':'<div class="slick-arrow-next"><a href="javascript:void(0);" class="slick-next"><em class="icon ni ni-chevron-right"></em></a></div>',
              rtl: EasyLiteApp.State.isRTL
          },
      attr = (opt) ? extend(def, opt) : def;
      let elems = $(elm);
      if(elems.exists() && typeof($.fn.slick) === 'function') {
        for (let i = 0;i < elems.length;++i) {
          let elem = elems[i];
          try {
            $(elem).slick(attr)
          } catch(err) {}
        }
      }
    };

    // Slick Init @v1.0
    EasyLiteApp.Slider.init = function() {
        EasyLiteApp.Slick('.slider-init');
    };

    // Extra @v1.1
    EasyLiteApp.OtherInit = function() {
        //EasyLiteApp.ClassBody();
        EasyLiteApp.PassSwitch();
        EasyLiteApp.CurrentLink();
        EasyLiteApp.LinkOff('.is-disable');
        EasyLiteApp.ClassNavMenu();
        //v1.5
        EasyLiteApp.SetHW('[data-height]', 'height');
        EasyLiteApp.SetHW('[data-width]', 'width');
    };

    // Animate Init @v1.0
    EasyLiteApp.Ani.init = function() {
        EasyLiteApp.Ani.formElm('.form-control-outlined');
        EasyLiteApp.Ani.formSearch('.toggle-search');
    };

    // BootstrapExtend Init @v1.0
    EasyLiteApp.BS.init = function() {
        EasyLiteApp.BS.menutip('a.nk-menu-link');
        EasyLiteApp.BS.tooltip('.nk-tooltip');
        EasyLiteApp.BS.tooltip('.btn-tooltip', {placement: 'top'});
        EasyLiteApp.BS.tooltip('[data-toggle="tooltip"]');
        EasyLiteApp.BS.tooltip('.tipinfo,.nk-menu-tooltip', {placement: 'right'});
        EasyLiteApp.BS.popover('[data-toggle="popover"]');
        EasyLiteApp.BS.progress('[data-progress]');
        EasyLiteApp.BS.fileinput('.custom-file-input');
        EasyLiteApp.BS.modalfix();
        EasyLiteApp.BS.ddfix();
        EasyLiteApp.BS.tabfix();
    }

    // Picker Init @v1.0
    EasyLiteApp.Picker.init = function() {
        EasyLiteApp.Picker.date('.date-picker');
        EasyLiteApp.Picker.dob('.date-picker-alt');
        EasyLiteApp.Picker.time('.time-picker');
    };

    // Addons @v1
    EasyLiteApp.Addons.Init = function() {
        EasyLiteApp.Knob.init();
        EasyLiteApp.Range.init();
        //EasyLiteApp.Select2.init();
        EasyLiteApp.Dropzone.init();
        EasyLiteApp.Slider.init();
        EasyLiteApp.DataTable.init();
    };

    // Toggler @v1
    EasyLiteApp.TGL.init = function() {
        EasyLiteApp.TGL.content('.toggle');
        EasyLiteApp.TGL.expand('.toggle-expand');
        EasyLiteApp.TGL.expand('.toggle-opt', {toggle: false});
        EasyLiteApp.TGL.showmenu('.nk-nav-toggle');
        EasyLiteApp.TGL.ddmenu('.'+ _menu + '-toggle', {self: _menu + '-toggle', child: _menu + '-sub' });
    };

    EasyLiteApp.BS.modalOnInit = function() {
        $('.modal').on('shown.bs.modal', function () {
            // EasyLiteApp.Select2.init();
            EasyLiteApp.Validate.init();
        });
    };

    // Initial by default
    /////////////////////////////
    EasyLiteApp.init = function(){
        EasyLiteApp.OtherInit();
        EasyLiteApp.Prettify();
        EasyLiteApp.ColorBG();
        EasyLiteApp.ColorTXT();
        EasyLiteApp.Copied();
        EasyLiteApp.Ani.init();
        EasyLiteApp.TGL.init();
        EasyLiteApp.BS.init();
        EasyLiteApp.Validate.init();
        EasyLiteApp.Picker.init();
        EasyLiteApp.Addons.Init();
        EasyLiteApp.Wizard();
    }

    EasyLiteApp.init();

	return EasyLiteApp;
})(EasyLiteApp, jQuery);
