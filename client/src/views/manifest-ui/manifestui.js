function vizFlashContentWrapper() {
  var e = "1" == getUrlParameterByName("fl");
  if (DetectFlashVer(9, 0, 0) || e) AC_FL_RunContent.apply(null, arguments);
  else {
    var a = AC_GetArgs(arguments, ".swf", "movie", null, null),
      t =
        '** To see this content as originally intended, view on a <nobr>Flash-enabled</nobr> device. (<a href="/' +
        window.location.pathname.replace(/^\/+/g, "") +
        '?fl=1">Show me anyway</a>)',
      o = "type-hs-bottom pad-y-0";
    if (a.params.youtubeid)
      document.write('<iframe class="ar-inner" src="https://www.youtube.com/embed/' + a.params.youtubeid + '" frameborder="0" allowfullscreen></iframe>');
    else if (a.params.altimgsrc) {
      var n = '<img src="' + a.params.altimgsrc + '" class="mar-x-auto disp-bl">';
      a.params.altimghref && (n = '<a href="' + a.params.altimghref + '">' + n + "</a>"), document.write(n);
    } else
      a.params.staticfb
        ? (window.location = window.location + "/1")
        : ((t = "Adobe Flash Player is required to display this content.<br><br>Please view on a <nobr>Flash-enabled</nobr> device."),
          (o = "type-sm pad-y-xl pad-y-xxl--md"),
          $("#o_flash-container").hide());
    setTimeout(function () {
      $("#o_no-flash").html(t).addClass(o), $("#o_no-flash, #o_no-flash-next").fadeIn();
    }, 500);
  }
}
function getUrlParameterByName(e) {
  e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var a = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
  return null === a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "));
}
function setCookie(e, a, t) {
  var o = new Date();
  o.setDate(o.getDate() + t), (document.cookie = e + "=" + encodeURIComponent(a) + ";path=/" + (null == t ? "" : ";expires=" + o.toGMTString()));
}
function getCookie(e) {
  var a,
    t,
    o = document.cookie;
  return 0 < o.length && -1 != (a = o.indexOf(e + "="))
    ? ((a = a + e.length + 1), -1 == (t = o.indexOf(";", a)) && (t = o.length), decodeURIComponent(o.substring(a, t)))
    : "";
}
function deleteCookie(e) {
  setCookie(e, "", -1);
}
function areCookiesEnabled() {
  var e = !1;
  return setCookie("_test_", "Hello"), "" != getCookie("_test_") && ((e = !0), deleteCookie("_test_")), e;
}
function newsletterSignup() {
  var e = 0,
    a = 0,
    t = $("#newsletter-email-feedback"),
    o = $("#newsletter-birthday-feedback"),
    n = $("#newsletter_date_day").val(),
    i = $("#newsletter_date_month").val(),
    l = $("#newsletter_date_year").val(),
    r = $("#newsletter_email").val();
  $("#newsletter_anime").is(":checked") && (a = 1),
    $("#newsletter_manga").is(":checked") && (e = 1),
    validate.email(r, t) & validate.age([i, n, l], o) &&
      $.ajax({
        type: "POST",
        url: "/newsletter/signup",
        data: { source: "homestuck.com", email: r, anime: a, manga: e, DOB: i + "/" + n + "/" + l },
        dataType: "json",
        success: function () {
          Modals.close(),
            Modals.toggle("#modal-thanks"),
            Tracking.sendEvent({ category: "Newsletter Sign-up", action: "Completes Sign-up Process", label: "title" }),
            $("#modal-thanks h2").html("Thank you for subscribing!"),
            $("#modal-thanks #thanks-left label").html(
              '<a class="flex-width-1 btn-primary pad-x-sm pad-x-md--sm" href="javascript:Modals.toggle(\'#modal-thanks\')">Close</a>'
            );
        },
        error: function (e, a, t) {
          alert(e.statusText), alert(JSON.stringify(t));
        },
      });
}
$(document).ready(function () {
  $(document).on("click", ".o_chat-log-btn", function () {
    var e = $(this),
      a = e.parents(".o_chat-container"),
      t = $(".o_chat-log", a);
    t.hasClass("disp-n")
      ? (e.html(e.html().replace("Show", "Hide")), e.removeClass("active"), t.removeClass("disp-n"))
      : (e.html(e.html().replace("Hide", "Show")), e.removeClass("active"), t.addClass("disp-n"));
  }),
    $(".o_chat-log-btn").hover(
      function () {
        $(this).addClass("active");
      },
      function () {
        $(this).removeClass("active");
      }
    );
}),
  (function (e) {
    (jQuery.browser = jQuery.browser || {}).mobile =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|android|playbook|silk|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        e
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        e.substr(0, 4)
      );
  })(navigator.userAgent || navigator.vendor || window.opera),
  (function (e, t) {
    t(function () {
      var e = t("[data-gamenav-open]"),
        a = t("[data-gamenav-close]");
      e.on("click", function (e) {
        e.preventDefault(), Gamenav.open();
      }),
        a.on("click", function (e) {
          e.preventDefault(), Gamenav.reset();
        });
    });
  })(0, jQuery),
  (Gamenav = {
    open: function () {
      var e = $("#gamenav-container"),
        a = $("#game_overlay"),
        t = $(".curtain"),
        o = $(".curtain-wrapper");
      e.attr("data-gamenav-state", "open"),
        a.attr("data-game-overlay-state", "on"),
        t.length && (t.removeClass("on").addClass("off"), o.addClass("off")),
        Modals.setBackgroundScroll(!1),
        a.on("click", function () {
          Gamenav.reset();
        });
    },
    reset: function () {
      var e = $("#gamenav-container"),
        a = $("#game_overlay"),
        t = $(".curtain"),
        o = $(".curtain-wrapper"),
        n = $(window).scrollTop();
      e.attr("data-gamenav-state", "closed"),
        a.attr("data-game-overlay-state", "off").off(),
        Modals.setBackgroundScroll(!0),
        t.length && (t.removeClass("off").addClass("on"), o.removeClass("off"), n < 1 && window.scrollTo(0, t.height() + 50));
    },
    saveGame: function (e, a) {
      var t = e,
        o = a;
      if (!t || !o) {
        var n = window.location.pathname.replace(/^\/+/g, "").split("/");
        (t = n[0]), (o = n[1] || "1");
      }
      setCookie("s-cookie", t, 365), setCookie("p-cookie", o, 365);
    },
    autoSaveGame: function () {
      setCookie("autosave-cookie", "on", 365), Gamenav.saveGame();
    },
    loadGame: function () {
      var e = getCookie("s-cookie");
      if (e && "" != e) {
        var a = +getCookie("p-cookie") || 1;
        window.location.href = "/" + e + "/" + a;
      } else window.alert("You did not save your game!");
    },
    deleteGame: function () {
      deleteCookie("autosave-cookie"), deleteCookie("s-cookie"), deleteCookie("p-cookie");
    },
    checkAutosave: function () {
      if (
        ($("#o_start-over").on("click", function () {
          var e = "on" == getCookie("autosave-cookie");
          return Gamenav.deleteGame(), e && setCookie("autosave-cookie", "on", 365), !0;
        }),
        "on" == getCookie("autosave-cookie"))
      ) {
        var e = getCookie("s-cookie");
        if (e && "" != e) {
          var a = window.location.pathname.replace(/^\/+/g, "").split("/"),
            t = a[0],
            o = a[1] || "1",
            n = +getCookie("p-cookie") || 1;
          t == e && "1" == o && "1" != n ? (window.location.href = "/" + e + "/" + n) : Gamenav.saveGame();
        } else Gamenav.saveGame();
      }
    },
  }),
  $(document).ready(function () {
    $(".o_external-link").on("click", function (e) {
      e.preventDefault();
      var a = $(this).attr("href");
      setTimeout(function () {
        document.location = a;
      }, 750),
        Tracking.sendEvent({ category: "Read Homestuck Button", action: "Click", label: "Homestuck Landing Page", newpage: a });
    });
    var e = getUrlParameterByName("xpw");
    e && "" != e ? ($("#pwd-blank").hide(), $("#pwd-wrong").show()) : ($("#pwd-wrong").hide(), $("#pwd-blank").show());
  }),
  (function (e, t) {
    t(function () {
      Modals.reset();
    }),
      t(document).on("keyup", function (e) {
        if (27 == e.keyCode) {
          var a = t(".modal[data-modal-state='on']");
          a.length && Modals.doCloseAction(a);
        }
      });
  })(0, jQuery),
  (Modals = {
    context: null,
    isConfirmationDialog: function () {
      return "on" == $("#modal-thanks").attr("data-modal-state");
    },
    reset: function () {
      var e = $("[data-modal-btn]");
      e.off("click"),
        e.on("click", function (e) {
          e.preventDefault(), Tracking.checkEvent(this), Modals.toggle($(this).attr("href"));
        });
    },
    resetState: function () {
      $(".modal input:not(:button,:radio,:checkbox,[name='utf8'],[name='authenticity_token'])").val(""),
        $(".modal input:radio:checked").prop("checked", !1),
        $(".modal input:checkbox:checked").prop("checked", !1),
        $(".modal option:selected").prop("selected", !1),
        $(".modal .feedback").addClass("disp-n").html(""),
        $("#modal-thanks h2").html(""),
        $("#modal-thanks label").html(""),
        $("#modal-thanks #thanks-small-note").html(""),
        $("#modal-login h2").text(Modals.context && Modals.context.loginMsg ? Modals.context.loginMsg : "Log in to VIZ"),
        $("#modal-signup h2").text(Modals.context && Modals.context.signupMsg ? Modals.context.signupMsg : "Sign up for a new VIZ account"),
        $("[data-modal-state]").attr("data-modal-state", "off");
    },
    close: function () {
      $("#nav-container").attr("data-nav-state", "closed"),
        $("#overlay").attr("data-overlay-state", "off").off(),
        $("input", ".modal[data-modal-state='on']").blur(),
        Modals.setBackgroundScroll(!0),
        (Modals.context = null),
        Modals.resetState();
    },
    toggle: function (e) {
      var a = $(e),
        t = a.attr("data-modal-state"),
        o = $("#overlay");
      "on" == t
        ? Modals.close()
        : ($("#nav-container").attr("data-nav-state", "off"),
          o.attr("data-overlay-state", "off").off(),
          Modals.resetState(),
          Modals.setBackgroundScroll(!0),
          a.attr("data-modal-state", "on"),
          o.attr("data-overlay-state", "on"),
          a.css({ top: $(window).scrollTop() + $(window).height() / 2 + "px" }),
          a.scrollTop(0),
          o.on("click", function () {
            Modals.doCloseAction(a);
          }),
          Modals.setBackgroundScroll(!1),
          $("form:not(.filter) :input:visible:enabled:first", a).focus());
    },
    setBackgroundScroll: function (e) {
      var a,
        t = $(window),
        o = $("html"),
        n = o.hasClass("no-scroll");
      if (e) {
        if (!n) return;
        (a = o.css("top").slice(1, -2)), o.css("top", "").removeClass("no-scroll"), t.scrollTop(a), t.off("resize", Modals.resizeModal);
      } else (a = t.scrollTop()), o.addClass("no-scroll").css({ top: "-" + a + "px" }), t.on("resize", Modals.resizeModal);
    },
    resizeModal: function () {
      var e = $(".modal[data-modal-state='on']"),
        a = ($(window).height() - e.outerHeight()) / 2;
      e.offset({ top: a });
    },
    doCloseAction: function (e) {
      var a = $(".modal-close", e);
      a.length ? a.click() : Modals.close();
    },
  }),
  (function (e, t) {
    t(function () {
      var e = t("[data-nav-open]"),
        a = t("[data-nav-close]");
      e.on("click", function (e) {
        e.preventDefault(), Nav.open();
      }),
        a.on("click", function (e) {
          e.preventDefault(), Nav.reset();
        });
    });
  })(0, jQuery),
  (Nav = {
    open: function () {
      var e = $("#nav-container"),
        a = $("#overlay"),
        t = $(".curtain"),
        o = $(".curtain-wrapper");
      e.attr("data-nav-state", "open"),
        a.attr("data-overlay-state", "on"),
        t.length && (t.removeClass("on").addClass("off"), o.addClass("off")),
        window.scrollTo(0, 0),
        Modals.setBackgroundScroll(!1),
        a.on("click", function () {
          Nav.reset();
        });
    },
    reset: function () {
      var e = $("#nav-container"),
        a = $("#overlay"),
        t = $(".curtain"),
        o = $(".curtain-wrapper"),
        n = $(window).scrollTop();
      e.attr("data-nav-state", "closed"),
        a.attr("data-overlay-state", "off").off(),
        Modals.setBackgroundScroll(!0),
        t.length && (t.removeClass("off").addClass("on"), o.removeClass("off"), n < 1 && window.scrollTo(0, t.height() + 50));
    },
  }),
  $(document).ready(function () {
    $(document).on("click", "#newsletter_footer_signup", function () {
      $("#newsletter_email").val($("#newsletter_footer_email").val()), $("#newsletter_footer_email").val("");
    });
  }),
  $(document).ready(function () {
    function t(e) {
      var a = e.val(),
        t = e.children("input").val(),
        o = "empty search";
      void 0 !== t && "" != t ? (o = t) : void 0 !== a && "" != a && (o = a);
      var n = "Search Field";
      (n = e.parents("#curtain").length ? "Curtain Header " + n : e.parents("#search").length ? "Results Page " + n : "Header " + n),
        Tracking.sendEvent({ category: "Search", action: o, label: n });
      var i = e;
      "input" == e.prop("nodeName").toLowerCase() && (i = e.parent()),
        setTimeout(function () {
          i.submit();
        }, 100);
    }
    $("#site-search form").one("submit", function (e) {
      e.preventDefault();
      var a = e.target || e.srcElement;
      t($(a));
    });
  }),
  (function (e, n) {
    function i(e, a) {
      var t = e.offsetParent().width(),
        o = e.width(),
        n = e.position().left,
        i = e.position().top,
        l = a.width(),
        r = 0,
        s = 0;
      (s = i - a.height() - d), (r = n + o / 2 - l / 2) < c ? (r = c) : t < r && (r = t - c), a.css({ left: r + "px", top: s + "px" });
    }
    function l(e, a, t) {
      e.width();
      var o = e.position().left,
        n = a.position().left,
        i = 0;
      (i = Math.floor(o - n)), t.css({ left: i + "px" });
    }
    var c = 20,
      d = 50;
    n(function () {
      n("[data-tooltip]").hover(
        function (e) {
          var a = n(this),
            t = a.attr("title"),
            o = n('<div class="tooltip tooltip-above"></div>');
          ($arrow = n('<span class="tooltip-arrow"></span>')),
            e.preventDefault(),
            o.html(t).append($arrow).addClass("hide"),
            a.before(o),
            i(a, o),
            window.setTimeout(function () {
              l(a, o, $arrow), o.removeClass("hide").addClass("animate");
            }, 100),
            o.on("click", function () {
              o.remove();
            });
        },
        function () {
          n(".tooltip").remove();
        }
      );
    });
  })(0, jQuery),
  jQuery(document).on("click", ".o_event", function () {
    Tracking.checkEvent(this);
  }),
  (Tracking = {
    checkEvent: function (e) {
      Tracking.sendEvent($(e).data("event"));
    },
    sendEvent: function (e) {
      if (!e || "object" != typeof e) return !0;
      var a;
      e.category &&
        e.action &&
        ("pathname" == e.label
          ? (e.label = canonicalLocation().pathname)
          : e.label &&
            "title" == e.label &&
            ("VIZ |" != document.title.trim() && "" != document.title.trim()
              ? (e.label = document.title.replace("VIZ | ", ""))
              : (e.label = canonicalLocation().pathname)),
        (a = e));
      var t = { nonInteraction: a.noninteraction || !1 };
      return (
        a.newpage &&
          (t.hitCallback = function () {
            document.location = a.newpage;
          }),
        a && ga("send", "event", a.category, a.action, a.label || null, a.value || null, t),
        !0
      );
    },
    sendECommerceEvent: function (e) {
      return (
        !(!e.ID || !e.value) &&
        (ga("ecommerce:addTransaction", { id: e.ID, affiliation: e.store, revenue: e.value }),
        ga("ecommerce:addItem", { id: e.ID, name: e.name, sku: e.code, category: e.category, price: e.value, quantity: "1" }),
        ga("ecommerce:send"),
        fbq("track", "Purchase", { content_ids: [e.code], content_type: "Digital Manga", value: e.value, currency: "USD" }),
        !0)
      );
    },
    sendECommerceEventWithLineItems: function (e) {
      if (!e.ID || !e.value) return !1;
      var a,
        t = { content_ids: [], content_type: "Digital Manga", value: e.value, currency: "USD" };
      ga("ecommerce:addTransaction", { id: e.ID, affiliation: e.store, revenue: e.value });
      for (var o = 0; o < e.items.length; o++)
        (a = e.items[o]),
          t.content_ids.push(a.code),
          ga("ecommerce:addItem", { id: e.ID, name: a.name, sku: a.code, category: a.category, price: a.value, quantity: "1" });
      return ga("ecommerce:send"), fbq("track", "Purchase", t), !0;
    },
    appendCampaignParams: function (e, a, t, o) {
      if (!(e && a && t && o)) return e;
      var n = a ? $.trim(escape(a)) : null,
        i = t ? $.trim(escape(t)) : null,
        l = o ? $.trim(escape(o)) : null,
        r = (0 < e.indexOf("?") ? "&utm_source=" : "?utm_source=") + n + "&utm_medium=" + i + "&utm_campaign=" + l;
      return e + r;
    },
  });
