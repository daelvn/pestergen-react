$(document).ready(function () {
  // Make content area responsive during preload
  var $content_container = $("#content_container");
  var $anim_container = $("#animation_container");
  var $_preload_div_ = $("#_preload_div_");
  var w = $anim_container.width(),
    h = $anim_container.height();
  var iw = $content_container.width(),
    ih = $content_container.height();
  var pw = $_preload_div_.width(),
    ih = $_preload_div_.height();
  var pRatio = window.devicePixelRatio || 1,
    xRatio = iw / w,
    yRatio = ih / h,
    sRatio = 1,
    psRatio = 1;
  if ($.browser.mobile === true) {
    $anim_container.width(w * xRatio + "px");
    $anim_container.height(h * xRatio + "px");
  } else {
    $_preload_div_.css("left", (iw - pw) / 2 + "px");
  }
});
