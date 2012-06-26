/*
 *  Giant Dropdown jQuery Plugin
 *  
 *  Copyright 2011, D. Patrick Caldwell
 *  Autopilot Consulting, LLC
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 */
"use strict";

(function($) {
  function refreshUl($ul) {
    $.each($ul.find("li"), function() {
      var $li = $(this);
      var option = $li.data("option");

      if (option == null)
        return;

      if (option.selected)
        $li.addClass("selected");

      else
        $li.removeClass("selected");
    });
  }

  function scrollToFirstSelected($ul) {
    var $first = $ul.find("li.selected:first");
    
    if ($first.length > 0) {
      var initialPosition = $first.offset().top - $ul.offset().top;
      $ul.scrollTop(initialPosition);
    }
  }

  var methods = {
    init: function() {
      return this.each(function() {
        // not a dropdown
        if (this.tagName !== "SELECT")
          return;

        var $dropdown = $(this);

        // already giant-ified
        if ($dropdown.data("giantDropdown") != null)
          return;
          
        var $ul = $("<ul />");
        $ul.addClass("giantdropdown");
        
        $ul.addClass($dropdown.attr("class"));
        $ul.attr("style", $dropdown.attr("style"));
        
        if ($dropdown.attr("multiple"))
          $ul.addClass("multiple");

        $dropdown.hide();
        $dropdown.after($ul);

        $dropdown.data("giantDropdown", $ul);

        $.each($dropdown.find('option, optgroup'), function() {
          var option = this;
          var $option = $(option);

          var $li = $("<li />");
          $li.addClass(option.tagName.toLowerCase());
          
          $li.addClass($option.attr("class"));
          $li.attr("style", $option.attr("style"));
          
          if (option.tagName === "OPTGROUP")
            $li.text(option.label);

          else if (option.tagName === "OPTION") {
            $li.text(option.text);
            $li.data("option", option);

            $li.click(function() {
              if ($dropdown[0].disabled)
                return;

              option.selected = !option.selected;
              refreshUl($ul);
            });
          }

          $ul.append($li);
        });

        refreshUl($ul);
        scrollToFirstSelected($ul);
      });
    },

    scrollToFirstSelected: function() {
      return this.each(function() {
        scrollToFirstSelected($(this));
      });
    }
  }

  $.fn.giantDropdown = function(method) {
    if (!method || typeof (method) === "object")
      return methods.init.apply(this);

    else
      return methods[method].apply(this);
  };
})(jQuery);
