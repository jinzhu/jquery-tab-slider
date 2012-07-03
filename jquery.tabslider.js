/**
 * jQuery Tab Slider
 *
 * @license The MIT License
 * @link https://github.com/jinzhu/jquery-tab-slider
 * @author Jinzhu / wosmvp@gmail.com / 2012 ~ Now
 *
 * $(".tab_slideshow").tabSlider();
 *
 */

(function($){
	$.fn.tabSlider = function(args) {
    var interval = null;
    var defaults = {
      switchers: $(this).find("[tabslider-ref]"),
      tabs: $(this).find("[tabslider-name]"),
      autoplay: true,
      current: 0,
      timeout: 3000,
      changeCallback: function(switcher, tab) {
        opts.switchers.removeClass("current");
        opts.tabs.removeClass("current");
        $(switcher).addClass("current");
        $(tab).addClass("current");
      }
    };
    var opts = $.extend(true, defaults, args);

    function showIndex(index) {
      opts.tabs.each(function() {
        $(this).hide();
      });

      var current_tab = opts.tabs[index];
      $(current_tab).show();

      var refName = $(current_tab).attr("tabslider-name");
      var index = opts.switchers.index(opts.switchers.filter("[tabslider-ref='" + refName + "']"));
      var current_switcher = opts.switchers[index];
      opts.changeCallback(current_switcher, current_tab);
    }
    showIndex(opts.current);

    function next() {
      opts.current += 1;
      if (opts.current >= opts.tabs.length) { opts.current = 0; }
      showIndex(opts.current);
    }

    function autoPlay() {
      if (opts.autoplay && interval == null) {
        interval = setInterval(next, opts.timeout);
      }
    }

    function showMatchedAndStop() {
      var refName = $(this).attr("tabslider-ref");
      var index = opts.tabs.index(opts.tabs.filter("[tabslider-name='" + refName + "']"))

      if (index != -1) {
        showIndex(index);
      }

      clearInterval(interval);
      interval = null;
    }

    opts.switchers.click(showMatchedAndStop)
    opts.switchers.hover(showMatchedAndStop, autoPlay)
    opts.tabs.hover(showMatchedAndStop, autoPlay)
    autoPlay();
  }
})(jQuery)
