(this["webpackJsonpfuse-react-app"] =
  this["webpackJsonpfuse-react-app"] || []).push([
  [142],
  {
    4086: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(43),
        r = a(4),
        o = a(128),
        i = a(1670),
        c = a(1647),
        l = a(1634),
        s = a(293),
        d = a(10),
        b = a(141),
        m = a.n(b),
        u = a(0),
        p = a.n(u),
        g = a(3913),
        E = a(2475),
        f = a.n(E),
        h = (a(2574), a(2575), a(18)),
        v = a(5),
        O = a(83),
        y = a(84),
        j = a(152),
        w = a(153),
        x = a(830),
        D = a(1668),
        k = a(9),
        A = a(1653),
        N = a(244),
        P = a(2576),
        I = a.n(P),
        C = a(2027),
        L = a(541),
        T = {
          month: { title: "Month", icon: "view_module" },
          week: { title: "Week", icon: "view_week" },
          work_week: { title: "Work week", icon: "view_array" },
          day: { title: "Day", icon: "view_day" },
          agenda: { title: "Agenda", icon: "view_agenda" },
        },
        S = (function (e) {
          Object(j.a)(a, e);
          var t = Object(w.a)(a);
          function a() {
            return Object(O.a)(this, a), t.apply(this, arguments);
          }
          return (
            Object(y.a)(a, [
              {
                key: "viewButtons",
                value: function () {
                  var e = this,
                    t = this.props.views,
                    a = this.props.view;
                  return t.length > 1
                    ? t.map(function (t) {
                        return p.a.createElement(
                          A.a,
                          { title: T[t].title, key: t },
                          p.a.createElement(
                            "div",
                            null,
                            p.a.createElement(
                              o.a,
                              { animation: "transition.expandIn", delay: 500 },
                              p.a.createElement(
                                x.a,
                                {
                                  "aria-label": t,
                                  onClick: function () {
                                    return e.props.onView(t);
                                  },
                                  disabled: a === t,
                                },
                                p.a.createElement(c.a, null, T[t].icon)
                              )
                            )
                          )
                        );
                      })
                    : null;
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    t = e.classes,
                    a = e.mainThemeDark,
                    n = e.label,
                    r = e.date;
                  return p.a.createElement(
                    D.a,
                    { theme: a },
                    p.a.createElement(
                      "div",
                      {
                        className: Object(d.a)(
                          t.root,
                          "flex h-200 min-h-200 relative",
                          m()(r).format("MMM")
                        ),
                      },
                      p.a.createElement(
                        "div",
                        {
                          className:
                            "flex flex-1 flex-col p-12 justify-between z-10 container",
                        },
                        p.a.createElement(
                          "div",
                          {
                            className:
                              "flex flex-col items-center justify-between sm:flex-row",
                          },
                          p.a.createElement(
                            "div",
                            { className: "flex items-center my-16 sm:mb-0" },
                            p.a.createElement(
                              o.a,
                              { animation: "transition.expandIn", delay: 300 },
                              p.a.createElement(
                                c.a,
                                { className: "text-32 mx-12" },
                                "today"
                              )
                            ),
                            p.a.createElement(
                              o.a,
                              {
                                animation: "transition.slideLeftIn",
                                delay: 300,
                              },
                              p.a.createElement(
                                N.a,
                                { variant: "h6" },
                                "Calendar"
                              )
                            )
                          ),
                          p.a.createElement(
                            "div",
                            { className: "flex items-center" },
                            p.a.createElement(
                              A.a,
                              { title: "Today" },
                              p.a.createElement(
                                "div",
                                null,
                                p.a.createElement(
                                  o.a,
                                  {
                                    animation: "transition.expandIn",
                                    delay: 500,
                                  },
                                  p.a.createElement(
                                    x.a,
                                    {
                                      "aria-label": "today",
                                      onClick: this.navigate.bind(
                                        null,
                                        C.navigate.TODAY
                                      ),
                                    },
                                    p.a.createElement(c.a, null, "today")
                                  )
                                )
                              )
                            ),
                            this.viewButtons()
                          )
                        ),
                        p.a.createElement(
                          o.a,
                          { delay: 500 },
                          p.a.createElement(
                            "div",
                            { className: "flex items-center justify-center" },
                            p.a.createElement(
                              A.a,
                              { title: "Previous" },
                              p.a.createElement(
                                x.a,
                                {
                                  "aria-label": "Previous",
                                  onClick: this.navigate.bind(
                                    null,
                                    C.navigate.PREVIOUS
                                  ),
                                },
                                p.a.createElement(
                                  c.a,
                                  null,
                                  "ltr" === a.direction
                                    ? "chevron_left"
                                    : "chevron_right"
                                )
                              )
                            ),
                            p.a.createElement(N.a, { variant: "h6" }, n),
                            p.a.createElement(
                              A.a,
                              { title: "Next" },
                              p.a.createElement(
                                x.a,
                                {
                                  "aria-label": "Next",
                                  onClick: this.navigate.bind(
                                    null,
                                    C.navigate.NEXT
                                  ),
                                },
                                p.a.createElement(
                                  c.a,
                                  null,
                                  "ltr" === a.direction
                                    ? "chevron_right"
                                    : "chevron_left"
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  );
                },
              },
            ]),
            a
          );
        })(I.a);
      var M = Object(L.a)(function (e) {
          return { mainThemeDark: e.fuse.settings.mainThemeDark };
        })(
          Object(k.a)(
            function (e) {
              return {
                root: {
                  backgroundImage:
                    'url("../../assets/images/backgrounds/header-bg.png")',
                  backgroundColor: "#FAFAFA",
                  color: "#FFFFFF",
                  backgroundSize: "cover",
                  backgroundPosition: "0 50%",
                  backgroundRepeat: "no-repeat",
                  "&:before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    background: "rgba(0, 0, 0, 0.45)",
                  },
                  "&.Jan": {
                    backgroundImage:
                      "url('/assets/images/calendar/winter.jpg')",
                    backgroundPosition: "0 85%",
                  },
                  "&.Feb": {
                    backgroundImage:
                      "url('/assets/images/calendar/winter.jpg')",
                    backgroundPosition: "0 85%",
                  },
                  "&.Mar": {
                    backgroundImage:
                      "url('/assets/images/calendar/spring.jpg')",
                    backgroundPosition: "0 40%",
                  },
                  "&.Apr": {
                    backgroundImage:
                      "url('/assets/images/calendar/spring.jpg')",
                    backgroundPosition: "0 40%",
                  },
                  "&.May": {
                    backgroundImage:
                      "url('/assets/images/calendar/spring.jpg')",
                    backgroundPosition: "0 40%",
                  },
                  "&.Jun": {
                    backgroundImage:
                      "url('/assets/images/calendar/summer.jpg')",
                    backgroundPosition: "0 80%",
                  },
                  "&.Jul": {
                    backgroundImage:
                      "url('/assets/images/calendar/summer.jpg')",
                    backgroundPosition: "0 80%",
                  },
                  "&.Aug": {
                    backgroundImage:
                      "url('/assets/images/calendar/summer.jpg')",
                    backgroundPosition: "0 80%",
                  },
                  "&.Sep": {
                    backgroundImage:
                      "url('/assets/images/calendar/autumn.jpg')",
                    backgroundPosition: "0 40%",
                  },
                  "&.Oct": {
                    backgroundImage:
                      "url('/assets/images/calendar/autumn.jpg')",
                    backgroundPosition: "0 40%",
                  },
                  "&.Nov": {
                    backgroundImage:
                      "url('/assets/images/calendar/autumn.jpg')",
                    backgroundPosition: "0 40%",
                  },
                  "&.Dec": {
                    backgroundImage:
                      "url('/assets/images/calendar/winter.jpg')",
                    backgroundPosition: "0 85%",
                  },
                },
              };
            },
            { withTheme: !0 }
          )(S)
        ),
        V = a(154),
        R = a(302),
        Y = a(1669),
        z = a(1652),
        F = a(1664),
        W = a(1811),
        G = a(1797),
        _ = a(1651),
        B = a(1667),
        J = a(1657),
        U = a(1654),
        H = a(2577),
        q = a(58),
        X = a.n(q),
        K = "[CALENDAR APP] GET EVENTS";
      function Q() {
        var e = X.a.get("/api/calendar-app/events");
        return function (t) {
          return e.then(function (e) {
            return t({ type: K, payload: e.data });
          });
        };
      }
      function Z(e) {
        return { type: "[CALENDAR APP] OPEN NEW EVENT DIALOG", data: e };
      }
      function $(e) {
        return function (t, a) {
          return X.a
            .post("/api/calendar-app/update-event", { event: e })
            .then(function (e) {
              return Promise.all([
                t({ type: "[CALENDAR APP] UPDATE EVENT" }),
              ]).then(function () {
                return t(Q());
              });
            });
        };
      }
      var ee = {
        id: R.a.generateGUID(),
        title: "",
        allDay: !0,
        start: m()(new Date(), "MM/DD/YYYY"),
        end: m()(new Date(), "MM/DD/YYYY"),
        desc: "",
      };
      var te = function (e) {
          var t = Object(v.b)(),
            a = Object(v.c)(function (e) {
              return e.calendarApp.events.eventDialog;
            }),
            n = Object(V.c)(ee),
            o = n.form,
            i = n.handleChange,
            l = n.setForm,
            s = n.setInForm,
            d = m()(o.start, "MM/DD/YYYY"),
            b = m()(o.end, "MM/DD/YYYY"),
            g = Object(u.useCallback)(
              function () {
                "edit" === a.type && a.data && l(Object(r.a)({}, a.data)),
                  "new" === a.type &&
                    l(
                      Object(r.a)(
                        Object(r.a)(Object(r.a)({}, ee), a.data),
                        {},
                        { id: R.a.generateGUID() }
                      )
                    );
              },
              [a.data, a.type, l]
            );
          function E() {
            return "edit" === a.type
              ? t({ type: "[CALENDAR APP] CLOSE EDIT EVENT DIALOG" })
              : t({ type: "[CALENDAR APP] CLOSE NEW EVENT DIALOG" });
          }
          function f() {
            return o.title.length > 0;
          }
          return (
            Object(u.useEffect)(
              function () {
                a.props.open && g();
              },
              [a.props.open, g]
            ),
            p.a.createElement(
              F.a,
              Object.assign({}, a.props, {
                onClose: E,
                fullWidth: !0,
                maxWidth: "xs",
                component: "form",
              }),
              p.a.createElement(
                Y.a,
                { position: "static" },
                p.a.createElement(
                  U.a,
                  { className: "flex w-full" },
                  p.a.createElement(
                    N.a,
                    { variant: "subtitle1", color: "inherit" },
                    "new" === a.type ? "New Event" : "Edit Event"
                  )
                )
              ),
              p.a.createElement(
                "form",
                {
                  noValidate: !0,
                  onSubmit: function (e) {
                    var n;
                    e.preventDefault(),
                      "new" === a.type
                        ? t(
                            ((n = o),
                            function (e, t) {
                              return X.a
                                .post("/api/calendar-app/add-event", {
                                  newEvent: n,
                                })
                                .then(function (t) {
                                  return Promise.all([
                                    e({ type: "[CALENDAR APP] ADD EVENT" }),
                                  ]).then(function () {
                                    return e(Q());
                                  });
                                });
                            })
                          )
                        : t($(o)),
                      E();
                  },
                },
                p.a.createElement(
                  G.a,
                  { classes: { root: "p-16 pb-0 sm:p-24 sm:pb-0" } },
                  p.a.createElement(J.a, {
                    id: "title",
                    label: "Title",
                    className: "mt-8 mb-16",
                    InputLabelProps: { shrink: !0 },
                    name: "title",
                    value: o.title,
                    onChange: i,
                    variant: "outlined",
                    autoFocus: !0,
                    required: !0,
                    fullWidth: !0,
                  }),
                  p.a.createElement(_.a, {
                    className: "mt-8 mb-16",
                    label: "All Day",
                    control: p.a.createElement(B.a, {
                      checked: o.allDay,
                      id: "allDay",
                      name: "allDay",
                      onChange: i,
                    }),
                  }),
                  p.a.createElement(H.a, {
                    label: "Start",
                    inputVariant: "outlined",
                    value: d,
                    onChange: function (e) {
                      return s("start", e);
                    },
                    className: "mt-8 mb-16 w-full",
                    maxDate: b,
                  }),
                  p.a.createElement(H.a, {
                    label: "End",
                    inputVariant: "outlined",
                    value: b,
                    onChange: function (e) {
                      return s("end", e);
                    },
                    className: "mt-8 mb-16 w-full",
                    minDate: d,
                  }),
                  p.a.createElement(J.a, {
                    className: "mt-8 mb-16",
                    id: "desc",
                    label: "Description",
                    type: "text",
                    name: "desc",
                    value: o.desc,
                    onChange: i,
                    multiline: !0,
                    rows: 5,
                    variant: "outlined",
                    fullWidth: !0,
                  })
                ),
                "new" === a.type
                  ? p.a.createElement(
                      W.a,
                      { className: "justify-between px-8 sm:px-16" },
                      p.a.createElement(
                        z.a,
                        {
                          variant: "contained",
                          color: "primary",
                          type: "submit",
                          disabled: !f(),
                        },
                        "Add"
                      )
                    )
                  : p.a.createElement(
                      W.a,
                      { className: "justify-between px-8 sm:px-16" },
                      p.a.createElement(
                        z.a,
                        {
                          variant: "contained",
                          color: "primary",
                          type: "submit",
                          disabled: !f(),
                        },
                        "Save"
                      ),
                      p.a.createElement(
                        x.a,
                        {
                          onClick: function () {
                            var e;
                            t(
                              ((e = o.id),
                              function (t, a) {
                                return X.a
                                  .post("/api/calendar-app/remove-event", {
                                    eventId: e,
                                  })
                                  .then(function (e) {
                                    return Promise.all([
                                      t({
                                        type: "[CALENDAR APP] REMOVE EVENT",
                                      }),
                                    ]).then(function () {
                                      return t(Q());
                                    });
                                  });
                              })
                            ),
                              E();
                          },
                        },
                        p.a.createElement(c.a, null, "delete")
                      )
                    )
              )
            )
          );
        },
        ae = a(70),
        ne = {
          entities: [],
          eventDialog: { type: "new", props: { open: !1 }, data: null },
        },
        re = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : ne,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case K:
              var a = t.payload.map(function (e) {
                return Object(r.a)(
                  Object(r.a)({}, e),
                  {},
                  { start: new Date(e.start), end: new Date(e.end) }
                );
              });
              return Object(r.a)(Object(r.a)({}, e), {}, { entities: a });
            case "[CALENDAR APP] OPEN NEW EVENT DIALOG":
              return Object(r.a)(
                Object(r.a)({}, e),
                {},
                {
                  eventDialog: {
                    type: "new",
                    props: { open: !0 },
                    data: Object(r.a)({}, t.data),
                  },
                }
              );
            case "[CALENDAR APP] CLOSE NEW EVENT DIALOG":
              return Object(r.a)(
                Object(r.a)({}, e),
                {},
                {
                  eventDialog: { type: "new", props: { open: !1 }, data: null },
                }
              );
            case "[CALENDAR APP] OPEN EDIT EVENT DIALOG":
              return Object(r.a)(
                Object(r.a)({}, e),
                {},
                {
                  eventDialog: {
                    type: "edit",
                    props: { open: !0 },
                    data: Object(r.a)(
                      Object(r.a)({}, t.data),
                      {},
                      {
                        start: new Date(t.data.start),
                        end: new Date(t.data.end),
                      }
                    ),
                  },
                }
              );
            case "[CALENDAR APP] CLOSE EDIT EVENT DIALOG":
              return Object(r.a)(
                Object(r.a)({}, e),
                {},
                {
                  eventDialog: {
                    type: "edit",
                    props: { open: !1 },
                    data: null,
                  },
                }
              );
            default:
              return e;
          }
        },
        oe = Object(ae.d)({ events: re }),
        ie = Object(g.c)(m.a),
        ce = f()(g.a),
        le = Object.keys(g.b).map(function (e) {
          return g.b[e];
        }),
        se = Object(l.a)(function (e) {
          return {
            root: {
              "& .rbc-header": {
                padding: "12px 6px",
                fontWeight: 600,
                fontSize: 14,
              },
              "& .rbc-label": { padding: "8px 6px" },
              "& .rbc-today": { backgroundColor: "transparent" },
              "& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today":
                {
                  borderBottom: "2px solid ".concat(
                    e.palette.secondary.main,
                    "!important"
                  ),
                },
              "& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view": Object(
                r.a
              )(
                Object(n.a)({ padding: 24 }, e.breakpoints.down("sm"), {
                  padding: 16,
                }),
                e.mixins.border(0)
              ),
              "& .rbc-agenda-view table": Object(r.a)(
                Object(r.a)({}, e.mixins.border(1)),
                {},
                {
                  "& thead > tr > th": Object(r.a)(
                    {},
                    e.mixins.borderBottom(0)
                  ),
                  "& tbody > tr > td": {
                    padding: "12px 6px",
                    "& + td": Object(r.a)({}, e.mixins.borderLeft(1)),
                  },
                }
              ),
              "& .rbc-time-view": {
                "& .rbc-time-header": Object(r.a)({}, e.mixins.border(1)),
                "& .rbc-time-content": Object(r.a)(
                  { flex: "0 1 auto" },
                  e.mixins.border(1)
                ),
              },
              "& .rbc-month-view": {
                "& > .rbc-row": Object(r.a)({}, e.mixins.border(1)),
                "& .rbc-month-row": Object(r.a)(
                  Object(r.a)({}, e.mixins.border(1)),
                  {},
                  { borderWidth: "0 1px 1px 1px!important", minHeight: 128 }
                ),
                "& .rbc-header + .rbc-header": Object(r.a)(
                  {},
                  e.mixins.borderLeft(1)
                ),
                "& .rbc-header": Object(r.a)({}, e.mixins.borderBottom(0)),
                "& .rbc-day-bg + .rbc-day-bg": Object(r.a)(
                  {},
                  e.mixins.borderLeft(1)
                ),
              },
              "& .rbc-day-slot .rbc-time-slot": Object(r.a)(
                Object(r.a)({}, e.mixins.borderTop(1)),
                {},
                { opacity: 0.5 }
              ),
              "& .rbc-time-header > .rbc-row > * + *": Object(r.a)(
                {},
                e.mixins.borderLeft(1)
              ),
              "& .rbc-time-content > * + * > *": Object(r.a)(
                {},
                e.mixins.borderLeft(1)
              ),
              "& .rbc-day-bg + .rbc-day-bg": Object(r.a)(
                {},
                e.mixins.borderLeft(1)
              ),
              "& .rbc-time-header > .rbc-row:first-child": Object(r.a)(
                {},
                e.mixins.borderBottom(1)
              ),
              "& .rbc-timeslot-group": Object(r.a)(
                { minHeight: 64 },
                e.mixins.borderBottom(1)
              ),
              "& .rbc-date-cell": {
                padding: 8,
                fontSize: 16,
                fontWeight: 400,
                opacity: 0.5,
                "& > a": { color: "inherit" },
              },
              "& .rbc-event": {
                borderRadius: 4,
                padding: "4px 8px",
                backgroundColor: e.palette.primary.dark,
                color: e.palette.primary.contrastText,
                boxShadow: e.shadows[0],
                transitionProperty: "box-shadow",
                transitionDuration: e.transitions.duration.short,
                transitionTimingFunction: e.transitions.easing.easeInOut,
                position: "relative",
                "&:hover": { boxShadow: e.shadows[2] },
              },
              "& .rbc-row-segment": { padding: "0 4px 4px 4px" },
              "& .rbc-off-range-bg": {
                backgroundColor:
                  "light" === e.palette.type
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(0,0,0,0.16)",
              },
              "& .rbc-show-more": {
                color: e.palette.secondary.main,
                background: "transparent",
              },
              "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event": {
                position: "static",
              },
              "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child":
                { left: 0, top: 0, bottom: 0, height: "auto" },
              "& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child":
                { right: 0, top: 0, bottom: 0, height: "auto" },
            },
            addButton: {
              position: "absolute",
              right: 12,
              top: 172,
              zIndex: 99,
            },
          };
        });
      t.default = Object(s.a)("calendarApp", oe)(function (e) {
        var t = Object(v.b)(),
          a = Object(v.c)(function (e) {
            return e.calendarApp.events.entities;
          }),
          n = se(e),
          l = Object(u.useRef)(null);
        return (
          Object(u.useEffect)(
            function () {
              t(Q());
            },
            [t]
          ),
          p.a.createElement(
            "div",
            {
              className: Object(d.a)(
                n.root,
                "flex flex-col flex-auto relative"
              ),
            },
            p.a.createElement("div", { ref: l }),
            p.a.createElement(ce, {
              className: "flex flex-1 container",
              selectable: !0,
              localizer: ie,
              events: a,
              onEventDrop: function (e) {
                var a = e.event,
                  n = e.start,
                  o = e.end;
                t($(Object(r.a)(Object(r.a)({}, a), {}, { start: n, end: o })));
              },
              resizable: !0,
              onEventResize: function (e) {
                var a = e.event,
                  n = e.start,
                  o = e.end;
                delete a.type,
                  t(
                    $(Object(r.a)(Object(r.a)({}, a), {}, { start: n, end: o }))
                  );
              },
              defaultView: g.b.MONTH,
              defaultDate: new Date(2018, 3, 1),
              startAccessor: "start",
              endAccessor: "end",
              views: le,
              step: 60,
              showMultiDayTimes: !0,
              components: {
                toolbar: function (e) {
                  return l.current
                    ? h.createPortal(p.a.createElement(M, e), l.current)
                    : null;
                },
              },
              onSelectEvent: function (e) {
                t({ type: "[CALENDAR APP] OPEN EDIT EVENT DIALOG", data: e });
              },
              onSelectSlot: function (e) {
                return t(
                  Z({
                    start: e.start.toLocaleString(),
                    end: e.end.toLocaleString(),
                  })
                );
              },
            }),
            p.a.createElement(
              o.a,
              { animation: "transition.expandIn", delay: 500 },
              p.a.createElement(
                i.a,
                {
                  color: "secondary",
                  "aria-label": "add",
                  className: n.addButton,
                  onClick: function () {
                    return t(Z({ start: new Date(), end: new Date() }));
                  },
                },
                p.a.createElement(c.a, null, "add")
              )
            ),
            p.a.createElement(te, null)
          )
        );
      });
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
        Element.prototype.closest ||
          (Element.prototype.closest = function (e) {
            var t = void 0;
            do {
              if (t.matches(e)) return t;
              t = t.parentElement || t.parentNode;
            } while (null !== t && 1 === t.nodeType);
            return null;
          });
    },
  },
]);
