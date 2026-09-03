/* =====================================================================
   CareIQ Care Console — single-file prototype (no build, no dependencies)
   All data lives in DATA below. Replace it with live API responses.
   ===================================================================== */
(function () {
  "use strict";

  /* ------------------------------ Data ------------------------------ */
  var DATA = {
    agent: {
      name: "Layla Haddad", id: "AG-4821", role: "Senior Care Advisor",
      team: "Tier 2 · Shopping Companion ", shift: "09:00 – 18:00 GST",
      status: "Available", initials: "LH"
    },
    announcement: {
      from: "Supervisor · Omar Farouk",
      text: "New article uploaded on SHARE ENBD credit card",
      time: "Just now"
    },
    todayStats: [
      { label: "Calls answered",  value: 34, target: 40, delta: "+12%", trend: "up",   icon: "phone" },
      { label: "Chats handled",   value: 52, target: 55, delta: "+8%",  trend: "up",   icon: "chat" },
      { label: "Emails resolved", value: 27, target: 30, delta: "-4%",  trend: "down", icon: "mail" },
      { label: "Avg handle time", value: "4:12", target: "4:30", delta: "-18s", trend: "up", icon: "clock", pct: 88 }
    ],
    scorecard: [
      { label: "CSAT", value: "4.6", delta: "0.2", icon: "spark" },
      { label: "FCR", value: "82%", delta: "6%", icon: "user" },
      { label: "Quality (QA)", value: "91%", delta: "5%", icon: "shield" },
      { label: "Schedule adherence", value: "96%", delta: "2%", icon: "user" }
    ],
    queue: [
      { channel: "Calls",  waiting: 7,  longest: "2:14",   sla: 88 },
      { channel: "Chats",  waiting: 12, longest: "1:02",   sla: 94 },
      { channel: "Emails", waiting: 41, longest: "3h 20m", sla: 72 },
      { channel: "Social", waiting: 3,  longest: "18m",    sla: 90 }
    ],
    openTickets: [
      { id: "TCK-88214", customer: "Fatima Al Nuaimi", subject: "Points not credited for Mall of the Emirates spend", channel: "Call",  priority: "High",   sla: "Due in 45m", status: "In progress" },
      { id: "TCK-88190", customer: "Rahul Menon",      subject: "Duplicate charge on SHARE Pay wallet",              channel: "Chat",  priority: "Urgent", sla: "Due in 12m", status: "Awaiting agent" },
      { id: "TCK-88177", customer: "Sara Khalil",      subject: "Tier downgrade dispute — VIP renewal",              channel: "Email", priority: "Medium", sla: "Due in 1h",  status: "Pending customer" },
      { id: "TCK-88165", customer: "Omar Hassan",      subject: "Refund not received",                                channel: "Call",  priority: "Low",    sla: "Due in 3h",  status: "In progress" },
      { id: "TCK-88152", customer: "Nour El Din",     subject: "App login issue on new device",                      channel: "Chat",  priority: "Low",    sla: "Due in 4h",  status: "In progress" }
    ],
    followUps: [
      { id: "TCK-87920", customer: "Noor Abdullah",    due: "Today · 15:30",    reason: "Confirm refund landed in wallet" },
      { id: "TCK-87844", customer: "James Fitzgerald", due: "Today · 17:00",    reason: "Callback after warehouse check" },
      { id: "TCK-87710", customer: "Mariam Yousef",    due: "Tomorrow · 10:00", reason: "Tier benefits walkthrough" }
    ],
    tasks: [
      { title: "Complete refund approval for TCK-88190", due: "Today",    type: "Approval", done: false },
      { title: "Log call disposition — 6 pending",       due: "Today",    type: "Admin",    done: false },
      { title: "Peer review 2 QA transcripts",           due: "Tomorrow", type: "Quality",  done: false },
      { title: "Acknowledge new loyalty policy note",    due: "Wed",      type: "Policy",   done: true }
    ],
    learning: [
      { title: "UAE PDPL Refresher Training",        duration: "", progress: 75, due: "Due 15 May 2025", badge: "Assigned" },
      { title: "SHARE Pay Updates – Apr 2025",       duration: "", progress: 60, due: "Due 20 May 2025", badge: "Assigned" },
      { title: "Handling Difficult Conversations",   duration: "", progress: 40, due: "Due 25 May 2025", badge: "Assigned" }
    ],
    assigned: [
      { id: "TCK-88230", customer: "Hessa Al Kaabi", subject: "Missing points for Carrefour purchase", priority: "High", sla: "Due in 30m" },
      { id: "TCK-88221", customer: "Ahmed Khan",     subject: "SHARE Pay refund status",              priority: "Medium", sla: "Due in 1h" },
      { id: "TCK-88209", customer: "Lama Youssef",  subject: "Card replacement request",              priority: "Low", sla: "Due in 2h" }
    ],
    agentInsights: [
      { tone: "good", text: "Your FCR is up 6 points week-on-week — the new refund macro is working." },
      { tone: "warn", text: "3 emails in your queue are within 30 minutes of SLA breach." },
      { tone: "info", text: "Coaching session with Nadia at 16:00 — bring TCK-88150 as a case study." }
    ],
    shortcuts: [
      { label: "Knowledge base", icon: "mail" },
      { label: "Customer 360", icon: "grid" },
      { label: "My Playbooks", icon: "book" },
      { label: "Create ticket", icon: "note" },
      { label: "Reports", icon: "up" },
      { label: "System status", icon: "shield" }
    ],

    customer: {
      name: "Fatima Al Nuaimi", initials: "FA", id: "CUST-2049371", tier: "VIP",
      since: "Member since 2019", phone: "+971 50 123 4412", email: "fatima.alnuaimi@gmail.com",
      language: "Arabic / English", city: "Dubai, UAE", segment: "High value · Family shopper",
      churnRisk: "Low", ltv: "AED 124,500", preferredChannel: "WhatsApp", consent: "Yes"
    },
    loyalty: {
      points: 42850, toNext: 7150, nextTier: "VIP Elite", progress: 86,
      expiring: "3,200 pts expire 30 Sep", vouchers: 4, cashback: "AED 320",
      brands: ["Carrefour", "VOX Cinemas", "Magic Planet", "THAT Concept Store"]
    },
    live: { channel: "Chat", startedSecondsAgo: 254, queueWait: "0:38", intent: "Loyalty points not credited" },

    /* Ongoing chat — rendered inline on the page */
    chat: {
      id: "CHT-40218",
      channel: "WhatsApp",
      messages: [
        { from: "sys", text: "Chat assigned to you from the Loyalty queue \u00b7 waited 0:38", time: "11:38" },
        { from: "in",  text: "Hi, I shopped at Mall of the Emirates on 3 August and spent AED 1,240 but no points have shown up in my account.", time: "11:39", score: 38, emotion: "Frustrated" },
        { from: "out", text: "Good morning Fatima, thank you for reaching out. Let me pull up that purchase for you now.", time: "11:39", read: true },
        { from: "in",  text: "Thank you. It's the second time this has happened this week.", time: "11:40", score: 30, emotion: "Annoyed" },
        { from: "out", text: "I can see the AED 1,240 spend, and you're right \u2014 the points haven't landed. I'm checking why with our loyalty team.", time: "11:41", read: true },
        { from: "in",  text: "How long will it take? I wanted to use them this weekend.", time: "11:42", score: 46, emotion: "Impatient" }
      ],
      quickReplies: [
        "One moment while I check",
        "Points will post within 24 hours",
        "Applying a goodwill credit",
        "Anything else I can help with?"
      ],
      /* Customer replies, each carrying the sentiment the analyser reads from it */
      autoReplies: [
        { text: "That works for me, thank you.", score: 62, emotion: "Reassured" },
        { text: "Perfect \u2014 I appreciate you sorting it out so quickly.", score: 78, emotion: "Pleased" },
        { text: "Great, I'll keep an eye on my account.", score: 74, emotion: "Satisfied" },
        { text: "Thanks, that's all I needed today.", score: 82, emotion: "Happy" }
      ]
    },

    /* Ongoing voice call \u2014 transcript streams in turn by turn */
    call: {
      id: "CAL-77912",
      from: "+971 50 \u2022\u2022\u2022 4412",
      dtmf: "Loyalty \u203a Points query",
      turns: [
        { from: "sys", text: "Call connected \u00b7 routed from Loyalty IVR \u00b7 waited 0:38", time: "11:38" },
        { from: "in",  text: "Hello, I'm calling because I shopped at Mall of the Emirates on the third of August, I spent one thousand two hundred and forty dirhams, and the points never appeared.", time: "11:38", score: 38, emotion: "Frustrated" },
        { from: "out", text: "Good morning Fatima, thank you for calling. I'm sorry to hear that \u2014 let me pull up that purchase right now.", time: "11:39" },
        { from: "in",  text: "Please do. This is the second time this has happened to me this week.", time: "11:39", score: 30, emotion: "Annoyed" },
        { from: "out", text: "I can see the twelve forty spend on your account, and you're right, the points haven't posted. I'm checking why with our loyalty team now.", time: "11:40" },
        { from: "in",  text: "How long is that going to take? I was hoping to use them this weekend.", time: "11:41", score: 46, emotion: "Impatient" }
      ],
      /* streamed in live, one turn at a time, while the call view is open */
      queue: [
        { from: "out", text: "I completely understand \u2014 let me get you a firm answer rather than an estimate.", time: "11:42" },
        { from: "in",  text: "Okay, thank you. I appreciate that.", time: "11:42", score: 55, emotion: "Calmer" },
        { from: "out", text: "I've found it. There was a sync failure between the till and our loyalty system on the third.", time: "11:43" },
        { from: "in",  text: "Ah, so it wasn't something I did wrong.", time: "11:43", score: 64, emotion: "Reassured" },
        { from: "out", text: "Not at all. I'm raising the correction now \u2014 two thousand four hundred and eighty points, within twenty-four hours.", time: "11:44" },
        { from: "in",  text: "That's wonderful, that's well before the weekend. Thank you so much.", time: "11:45", score: 81, emotion: "Pleased" }
      ],
      quickActions: ["Verify identity", "Confirm the spend", "Commit to 24 hours", "Offer goodwill credit"]
    },

    /* Live sentiment signals detected in the conversation so far */
    signals: [
      { label: "Repeat issue", detail: "\u201csecond time this week\u201d", tone: "warn" },
      { label: "Time pressure", detail: "\u201cwanted to use them this weekend\u201d", tone: "warn" },
      { label: "Polite tone", detail: "customer thanked you twice", tone: "good" },
      { label: "No churn language", detail: "no cancel or complaint intent", tone: "good" }
    ],

    /* Suggested phrasing switches with the live sentiment band */
    playbook: {
      negative: {
        headline: "De-escalate first, then commit to a fix",
        say: [
          "I'm really sorry \u2014 having this happen twice in one week isn't the experience you should get as a VIP member.",
          "You're right to chase this. I'm treating it as a priority correction rather than a standard request.",
          "Let me give you a firm timeline right now so you're not left waiting again."
        ]
      },
      neutral: {
        headline: "Give a clear timeline and a concrete next step",
        say: [
          "I can see the AED 1,240 spend from 3 August at Mall of the Emirates, and you're right, the points haven't landed.",
          "I've raised this with our loyalty team as a priority correction. You'll see 2,480 points within 24 hours, and I'll text you the moment it clears.",
          "Because you're a VIP member, I'm also adding a 500-point goodwill credit for the inconvenience."
        ]
      },
      positive: {
        headline: "Confirm, add value, then close warmly",
        say: [
          "Wonderful \u2014 the correction is now logged, and your 2,480 points plus the 500 goodwill credit are on their way.",
          "You'll have them well before the weekend, so your plans are safe.",
          "Is there anything else I can take care of for you while we're connected?"
        ]
      }
    },

    interactionKpis: [
      { label: "AHT (rolling)",  value: "4:12", note: "Team 4:38",     tone: "good" },
      { label: "FCR",            value: "82%",  note: "+6 pts WoW",    tone: "good" },
      { label: "CSAT",           value: "4.6",  note: "Last 30 days",  tone: "good" },
      { label: "Sentiment",      value: "Neutral → Positive", note: "Improving", tone: "good" },
      { label: "Transfers",      value: "0",    note: "This contact",  tone: "" },
      { label: "Repeat contact", value: "2nd",  note: "In 7 days",     tone: "warn" }
    ],
    cases: [
      { id: "TCK-88214", subject: "Points not credited — MOE spend AED 1,240", opened: "Today 09:42", priority: "High",   status: "In progress", sla: "Due in 45m" },
      { id: "TCK-88033", subject: "VOX voucher redemption failure",            opened: "05 Aug",      priority: "Medium", status: "Pending ops", sla: "Due in 2d" }
    ],
    previous: [
      { date: "05 Aug · 14:20", channel: "chat",  agent: "Karim S.", topic: "Voucher redemption failure", outcome: "Escalated to ops", sentiment: "Negative" },
      { date: "28 Jul · 10:05", channel: "phone", agent: "Layla H.", topic: "Tier benefits explanation",  outcome: "Resolved",         sentiment: "Positive" },
      { date: "12 Jul · 19:44", channel: "mail",  agent: "Auto-bot", topic: "Statement request",          outcome: "Resolved",         sentiment: "Neutral" },
      { date: "02 Jul · 12:10", channel: "phone", agent: "Mona A.",  topic: "Address update",             outcome: "Resolved",         sentiment: "Positive" }
    ],
    sentimentTrend: [42, 38, 45, 40, 52, 58, 61, 57, 66, 72, 70, 78],
    aiInsights: [
      { tone: "warn", text: "Second contact in 7 days on a points issue — resolve fully today to protect FCR." },
      { tone: "info", text: "Spend at Carrefour dropped 34% this month; loyalty engagement is the retention lever." },
      { tone: "good", text: "Customer responds best to short, direct confirmations with a clear timeline." }
    ],
    qaChecks: [
      { label: "Verified identity (2 factors)",        done: true },
      { label: "Acknowledged the issue in own words",  done: true },
      { label: "Set an explicit resolution timeline",  done: false },
      { label: "Offered goodwill within tier policy",  done: false },
      { label: "Confirmed preferred contact channel",  done: false }
    ],
    say: [
      "Thank you for holding, Fatima — I can see the AED 1,240 spend from 3 August at Mall of the Emirates, and you're right, the points haven't landed.",
      "I've raised this with our loyalty team as a priority correction. You'll see 2,480 points in your account within 24 hours, and I'll text you the moment it clears.",
      "Because you're a VIP member, I'm also adding a 500-point goodwill credit for the inconvenience."
    ],
    doThis: [
      { action: "Raise loyalty points correction — 2,480 pts", system: "Loyalty Engine", risk: "low",    done: false },
      { action: "Apply VIP goodwill credit — 500 pts",         system: "Loyalty Engine", risk: "low",    done: false },
      { action: "Link case to open ops ticket TCK-88033",      system: "CRM",            risk: "low",    done: false },
      { action: "Schedule SMS confirmation for +24h",          system: "Comms Hub",      risk: "medium", done: false }
    ],
    quickActions: [
      { label: "Issue refund", icon: "wallet" }, { label: "Send voucher", icon: "gift" },
      { label: "Reset password", icon: "key" },  { label: "Update contact", icon: "user" },
      { label: "Book callback", icon: "clock" }, { label: "Escalate to Tier 3", icon: "up" },
      { label: "Send statement", icon: "mail" }, { label: "Add note", icon: "note" }
    ],
    knowledge: [
      "Loyalty points posting SLA — 24h correction path",
      "VIP goodwill credit limits by tier",
      "POS ↔ loyalty sync failures: known issue 3 Aug"
    ],
    summary: {
      headline: "VIP member reported 2,480 missing loyalty points from a Mall of the Emirates purchase on 3 August.",
      bullets: [
        "Identity verified via registered mobile and date of birth.",
        "Root cause: batch sync failure between POS and the loyalty engine on 3 Aug.",
        "Correction raised; 2,480 points to post within 24 hours.",
        "500-point VIP goodwill credit applied.",
        "SMS confirmation scheduled for +24h; customer accepted."
      ],
      disposition: "Loyalty · Points not credited · Resolved with correction"
    },
    wrapCodes: [
      "LOY-01 · Points not credited — correction raised",
      "LOY-02 · Points redemption / voucher issue",
      "LOY-03 · Tier status or qualification query",
      "PAY-01 · SHARE Pay wallet — duplicate charge",
      "PAY-02 · Refund status",
      "CRD-01 · SHARE ENBD credit card — application or statement",
      "APP-01 · App login / OTP issue",
      "GEN-01 · General enquiry — no action needed",
      "ESC-01 · Escalated to Tier 3"
    ]
  };

  /* ------------------------------ State ------------------------------ */
  var S = {
    screen: "dashboard",
    tab: "open",
    notifOpen: false,
    notifRead: false,
    wrapOpen: false,
    customer360Open: false,
    tasks: DATA.tasks.map(function (t) { return { done: t.done }; }),
    qa: DATA.qaChecks.map(function (c) { return { done: c.done }; }),
    doDone: DATA.doThis.map(function () { return false; }),
    seconds: DATA.live.startedSecondsAgo,
    running: true,
    saved: false,
    /* one thread per live channel; the active one follows the screen */
    thread: {
      call: DATA.call.turns.slice(),
      chat: DATA.chat.messages.slice()
    },
    callIdx: 0,
    typing: false,
    autoIdx: 0,
    alert: null
  };

  /* which live conversation the workspace is showing */
  function mode() { return S.screen === "call" ? "call" : "chat"; }
  function thread() { return S.thread[mode()]; }

  /* ---------------------- Live sentiment analysis ----------------------
     Scores every inbound message 0-100 and keeps a running read of the
     conversation, weighted towards the most recent turns.               */
  var SENTIMENT = {
    scores: function () {
      return thread().filter(function (m) { return m.from === "in" && m.score != null; })
                     .map(function (m) { return m.score; });
    },
    current: function () {
      var s = SENTIMENT.scores();
      if (!s.length) return 50;
      var w = 0, tot = 0;
      s.slice(-4).forEach(function (v, i) { var k = i + 1; w += v * k; tot += k; });
      return Math.round(w / tot);
    },
    start: function () { var s = SENTIMENT.scores(); return s.length ? s[0] : 50; },
    delta: function () { return SENTIMENT.current() - SENTIMENT.start(); },
    band: function (v) {
      v = v == null ? SENTIMENT.current() : v;
      return v < 40 ? "negative" : v < 60 ? "neutral" : "positive";
    },
    label: function (v) {
      v = v == null ? SENTIMENT.current() : v;
      return v < 25 ? "Very negative" : v < 40 ? "Negative" : v < 60 ? "Neutral"
           : v < 80 ? "Positive" : "Very positive";
    },
    emotion: function () {
      var t = thread();
      for (var i = t.length - 1; i >= 0; i--) {
        if (t[i].from === "in" && t[i].emotion) return t[i].emotion;
      }
      return "Neutral";
    },
    /* the sparkline plots every inbound turn, so the line moves live */
    trend: function () {
      var s = SENTIMENT.scores();
      return s.length > 1 ? s : [50].concat(s);
    }
  };

  /* ------------------------------ Helpers ------------------------------ */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var PATHS = {
    phone: '<path d="M5 3h4l2 5-2.5 1.5a12 12 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/>',
    chat:  '<path d="M21 12a8 8 0 01-8 8H7l-4 3V12a8 8 0 018-8h2a8 8 0 018 8z"/>',
    mail:  '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 7l9 6 9-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    wallet:'<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M16 12.5h3M3 9h13"/>',
    gift:  '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 12h18M12 8v12M12 8s-1-4-4-4a2.5 2.5 0 000 5M12 8s1-4 4-4a2.5 2.5 0 010 5"/>',
    key:   '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3.5M15.5 12v2.5"/>',
    user:  '<circle cx="12" cy="8.5" r="3.7"/><path d="M4.5 20a7.5 7.5 0 0115 0"/>',
    up:    '<path d="M12 20V5M6 11l6-6 6 6"/>',
    note:  '<path d="M6 3h12v18l-6-3.5L6 21z"/>',
    spark: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    bell:  '<path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2.2 2.2 0 004 0"/>',
    grid:  '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
    book:  '<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z"/><path d="M4 18.5V5.5"/>',
    flag:  '<path d="M6 21V4M6 4h11l-2 4 2 4H6"/>',
    play:  '<path d="M8 5.5l11 6.5-11 6.5z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    mic:   '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'
  };

  function ic(name, size) {
    size = size || 16;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (PATHS[name] || "") + "</svg>";
  }

  function meter(value, max, tone) {
    var pct = Math.max(0, Math.min(100, (value / (max || 100)) * 100));
    return '<span class="meter"><i class="' + (tone || "pink") + '" style="width:' + pct.toFixed(1) + '%"></i></span>';
  }

  function pill(text, tone) { return '<span class="pill' + (tone ? " pill--" + tone : "") + '">' + esc(text) + "</span>"; }
  function btn(text, variant, icon, attrs) {
    return '<button type="button" class="btn btn--' + variant + '" ' + (attrs || "") + ">" +
      (icon ? ic(icon, 15) : "") + "<span>" + esc(text) + "</span></button>";
  }
  function card(opts) {
    return '<section class="card' + (opts.accent ? " card--accent" : "") + '">' +
      (opts.title || opts.actions
        ? '<header class="card__head"><div><h3 class="card__title">' + (opts.title || "") + "</h3>" +
          (opts.sub ? '<p class="card__sub">' + opts.sub + "</p>" : "") + "</div>" +
          (opts.actions ? '<div class="card__actions">' + opts.actions + "</div>" : "") + "</header>"
        : "") +
      '<div class="card__body' + (opts.flush ? " card__body--flush" : "") + '">' + opts.body + "</div></section>";
  }
  function avatar(initials, size, tone) {
    return '<span class="avatar avatar--' + (tone || "pink") + '" style="width:' + size + "px;height:" + size +
      "px;font-size:" + (size * 0.36).toFixed(1) + 'px">' + esc(initials) + "</span>";
  }
  function mmss(t) {
    return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
  }
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("is-on");
    clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("is-on"); }, 1800);
  }

  /* ------------------------------ Top bar ------------------------------ */
  function topbar() {
    return '<header class="topbar">' +
      '<div class="topbar__brand">' +
        '<span class="topbar__word">CareIQ</span>' +
        '<span class="topbar__pill">CARE CONSOLE</span>' +
      "</div>" +
      '<nav class="topbar__nav">' +
        '<button class="navbtn' + (S.screen === "dashboard" ? " is-on" : "") + '" data-go="dashboard">' +
          ic("grid", 15) + " Agent dashboard</button>" +
        '<button class="navbtn' + (S.screen === "call" ? " is-on" : "") + '" data-go="call">' +
          ic("phone", 15) + " Customer · call view</button>" +
        '<button class="navbtn' + (S.screen === "chat" ? " is-on" : "") + '" data-go="chat">' +
          ic("chat", 15) + " Customer · chat view</button>" +
      "</nav>" +
      '<div class="topbar__end">' +
        '<label class="search">' + ic("search", 15) +
          '<input placeholder="Search customers, tickets, articles" /></label>' +
        '<span class="notifwrap">' +
          '<button class="iconbtn" aria-label="Notifications" data-notif="toggle">' + ic("bell", 17) +
          (S.notifRead ? "" : '<span class="iconbtn__dot"></span>') + "</button>" +
          (S.notifOpen
            ? '<div class="notif"><div class="notif__head"><h4>Announcements</h4>' +
              '<button class="notif__close" data-notif="close" aria-label="Close">×</button></div>' +
              '<div class="notif__item"><span class="notif__icon">' + ic("book", 14) + "</span><span>" +
              '<span class="notif__from">' + esc(DATA.announcement.from) + "</span>" +
              '<span class="notif__text">' + esc(DATA.announcement.text) + "</span>" +
              '<span class="notif__time">' + esc(DATA.announcement.time) + "</span></span></div></div>"
            : "") +
        "</span>" +
        avatar(DATA.agent.initials, 34) +
        '<button class="btn btn--ghost signout" data-signout="true">Sign out</button>' +
      "</div></header>";
  }

  /* ------------------------------ Screen 1 ------------------------------ */
  function dashboard() {
    var kpis = '<div class="section-title dash-today"><span>Today</span></div><div class="grid grid--4">' +
      DATA.todayStats.map(function (s) {
        var pct = s.pct != null ? s.pct : (s.value / s.target) * 100;
        return '<div class="kpi"><div class="kpi__top"><span class="kpi__icon">' + ic(s.icon, 17) + "</span>" +
          '<span class="kpi__value">' + esc(s.value) + "</span>" +
          '<span class="kpi__label">' + esc(s.label) + "</span>" +
          '<span class="kpi__delta ' + s.trend + '">' + esc(s.delta) + "</span></div>" +
          '<div class="kpi__foot">' + meter(pct, 100, "pink") +
          '<span class="kpi__target">Target ' + esc(s.target) + "</span></div></div>";
      }).join("") + "</div>";

    var workCard = '<section class="card dash-panel"><header class="dash-panel__head"><h3>YOUR WORK</h3><button class="link">View all</button></header>' +
      '<div class="dash-panel__body"><table class="dash-table"><tbody>' + DATA.openTickets.map(function (t) {
        var tone = t.priority === "Urgent" ? "danger" : t.priority === "High" ? "danger" : t.priority === "Medium" ? "warn" : "good";
        var dest = t.channel === "Call" ? "call" : "chat";
        return '<tr data-go="' + dest + '"><td class="mono">' + esc(t.id) + '</td><td>' + esc(t.customer) + '</td><td class="dash-subject">' + esc(t.subject) +
          '</td><td><span class="mini-badge mini-badge--' + tone + '">' + esc(t.priority) + '</span></td><td class="dash-sla">' + esc(t.sla) + '</td></tr>';
      }).join("") + '</tbody></table></div><footer class="dash-panel__foot"><span>' + DATA.openTickets.length + ' open items</span><button class="link">View all</button></footer></section>';

    var assignedCard = '<section class="card dash-panel"><header class="dash-panel__head"><h3>ASSIGNED TO YOU</h3><button class="link">View all</button></header>' +
      '<div class="dash-panel__body"><table class="dash-table"><tbody>' + DATA.assigned.map(function (x) {
        var tone = x.priority === "High" ? "danger" : x.priority === "Medium" ? "warn" : "good";
        return '<tr><td class="mono">' + esc(x.id) + '</td><td>' + esc(x.customer) + '</td><td class="dash-subject">' + esc(x.subject) +
          '</td><td><span class="mini-badge mini-badge--' + tone + '">' + esc(x.priority) + '</span></td><td class="dash-sla">' + esc(x.sla) + '</td></tr>';
      }).join("") + '</tbody></table></div></section>';

    var learningCard = '<section class="card dash-panel dash-learning"><header class="dash-panel__head"><h3>LEARNING ASSIGNED TO YOU</h3><button class="link">View all</button></header>' +
      '<div class="learning-list">' + DATA.learning.map(function (m) {
        return '<div class="learning-row"><span class="learning-icon">' + ic("book", 15) + '</span><b>' + esc(m.title) + '</b><span class="learning-due">' + esc(m.due) +
          '</span><span class="learning-meter">' + meter(m.progress, 100, "pink") + '</span><strong>' + m.progress + '%</strong></div>';
      }).join("") + '</div></section>';

    var scoreCard = '<section class="card dash-panel dash-score"><header class="dash-panel__head"><h3>YOUR SCORECARD</h3><span class="score-period">This month⌄</span></header>' +
      '<div class="score-grid">' + DATA.scorecard.map(function (s) {
        return '<div class="score-stat"><span class="score-icon">' + ic(s.icon, 16) + '</span><span><small>' + esc(s.label) + '</small><b>' + esc(s.value) +
          '</b><em>▲ ' + esc(s.delta) + '</em></span></div>';
      }).join("") + '</div></section>';

    var shortcutCard = '<section class="card dash-panel dash-shortcuts"><header class="dash-panel__head"><h3>SHORTCUTS</h3></header>' +
      '<div class="shortcut-grid">' + DATA.shortcuts.map(function (s) {
        return '<button data-toast="' + esc(s.label) + '"><span>' + ic(s.icon, 17) + '</span><b>' + esc(s.label) + '</b></button>';
      }).join("") + '</div></section>';

    return '<div class="page dashboard-v2">' + kpis +
      '<div class="dash-row dash-row--top"><div>' + workCard + '</div><div>' + assignedCard + '</div></div>' +
      '<div class="dash-row dash-row--bottom"><div>' + learningCard + '</div><div class="dash-right-stack">' + scoreCard + shortcutCard + '</div></div>' +
      '</div>';
  }

  /* ------------------------------ Screen 2 ------------------------------ */
  function spark(points) {
    var w = 220, h = 48, max = Math.max.apply(null, points), min = Math.min.apply(null, points);
    var d = points.map(function (p, i) {
      var x = (i / (points.length - 1)) * w;
      var y = h - ((p - min) / Math.max(1, max - min)) * (h - 6) - 3;
      return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
    return '<svg class="spark" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + d + " L" + w + "," + h + " L0," + h + ' Z" fill="rgba(239,132,239,.18)"></path>' +
      '<path d="' + d + '" fill="none" stroke="#EF84EF" stroke-width="2"></path></svg>';
  }

  function wrapModal() {
      var isCall = mode() === "call";
      return '<div class="modal" data-wrap="close">' +
        '<div class="modal__box" data-stop="1">' +
          '<div class="modal__head"><div><h3>' + (isCall ? "Call" : "Chat") + " wrap-up</h3>" +
            "<p>" + esc(DATA.customer.name) + " \u00b7 duration " + mmss(S.seconds) + "</p></div>" +
            '<button class="modal__close" data-wrap="close" aria-label="Close">\u00d7</button></div>' +
          '<div class="modal__body">' +
            '<div class="field"><label>AI summary</label>' +
              '<p class="summary__head">' + esc(DATA.summary.headline) + "</p>" +
              '<ul class="bullets">' + DATA.summary.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul></div>" +
            '<div class="modal__grid">' +
              '<div class="field"><label>Wrap up code</label><select id="wrapCode">' +
                '<option value="">Select a wrap up code</option>' +
                DATA.wrapCodes.map(function (w) { return "<option>" + esc(w) + "</option>"; }).join("") +
              "</select></div>" +
              '<div class="field"><label>Disposition</label><select>' +
                "<option>Resolved</option><option>Resolved with correction</option>" +
                "<option>Pending back office</option><option>Escalated</option>" +
                "<option>Customer to call back</option></select></div>" +
              '<div class="field"><label>Follow-up required</label><select>' +
                "<option>No follow-up</option><option>Callback in 24 hours</option>" +
                "<option>SMS confirmation</option><option>Email summary</option></select></div>" +
              '<div class="field"><label>Sentiment at close</label><select>' +
                "<option>Positive</option><option>Neutral</option><option>Negative</option></select></div>" +
            "</div>" +
            '<div class="field"><label>Agent notes</label>' +
              '<textarea placeholder="Add anything the summary missed"></textarea></div>' +
          "</div>" +
          '<div class="modal__foot">' + btn("Cancel", "quiet", "", 'data-wrap="close"') +
            btn("Create case", "primary", "check", 'data-wrap="save"') + "</div>" +
        "</div></div>";
    }

  function customer360Html() {
    var c = DATA.customer, l = DATA.loyalty;

    var loyaltyCard = card({
      title: "Loyalty", sub: l.nextTier + " in " + l.toNext.toLocaleString() + " points",
      body: '<div class="loyal"><div><span class="loyal__value">' + l.points.toLocaleString() +
        '</span><span class="loyal__unit">points</span></div>' +
        '<div class="loyal__progress">' + meter(l.progress, 100, "pink") +
        '<div class="loyal__progressmeta"><span>' + esc(c.tier) + "</span><span>" + l.progress + "% to " + esc(l.nextTier) + "</span></div></div></div>" +
        '<div class="grid grid--3"><div class="tile"><b>Vouchers</b><strong>' + l.vouchers + "</strong></div>" +
        '<div class="tile"><b>Cashback</b><strong>' + esc(l.cashback) + "</strong></div>" +
        '<div class="tile warn"><b>Expiring</b><strong>3,200</strong></div></div>' +
        '<p class="hint">' + ic("flag", 13) + esc(l.expiring) + "</p>" +
        '<div class="chips">' + l.brands.map(function (b) { return pill(b, "muted"); }).join("") + "</div>"
    });

    var demoCard = card({
      title: "Demographics &amp; profile",
      body: '<dl class="dl">' +
        [["Segment", c.segment], ["Language", c.language], ["Location", c.city],
         ["Preferred channel", c.preferredChannel], ["Member since", "2019"], ["Consent", c.consent]]
        .map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>"
    });

    var qaActionsCard = card({
      title: "Quick actions", sub: "One-click, logged to CRM",
      body: '<div class="qa">' + DATA.quickActions.map(function (q) {
        return '<button data-toast="' + esc(q.label) + ' — logged to CRM"><i>' + ic(q.icon, 16) + "</i><span>" + esc(q.label) + "</span></button>";
      }).join("") + "</div>"
    });

    var casesCard = card({
      title: "Current cases", sub: "Open with this customer", flush: true,
      body: '<table class="table"><thead><tr><th>Case</th><th>Subject</th><th>Opened</th><th>Priority</th>' +
        "<th>SLA</th><th>Status</th></tr></thead><tbody>" + DATA.cases.map(function (x) {
          return '<tr><td class="mono">' + esc(x.id) + '</td><td class="subject">' + esc(x.subject) + "</td>" +
            '<td class="muted">' + esc(x.opened) + "</td><td>" + pill(x.priority, x.priority === "High" ? "pink" : "muted") + "</td>" +
            '<td class="sla">' + esc(x.sla) + '</td><td class="muted">' + esc(x.status) + "</td></tr>";
        }).join("") + "</tbody></table>"
    });

    var prevCard = card({
      title: "Previous interactions", sub: "Last 90 days", flush: true,
      body: '<ul class="timeline">' + DATA.previous.map(function (p) {
        var tone = p.sentiment === "Positive" ? "lime" : p.sentiment === "Negative" ? "danger" : "muted";
        var label = p.channel === "phone" ? "Call" : p.channel === "chat" ? "Chat" : "Email";
        return "<li><i class=\"" + p.channel + '\">' + ic(p.channel, 14) + '</i><span class="timeline__body"><b>' +
          esc(p.topic) + "</b><span>" + esc(p.date) + " · " + label + " · " + esc(p.agent) + " · " + esc(p.outcome) +
          "</span></span>" + pill(p.sentiment, tone) + "</li>";
      }).join("") + "</ul>"
    });

    var insightCard = card({
      title: "AI insight", sub: "Reading the whole relationship, not just this contact",
      body: '<ul class="insights">' + DATA.aiInsights.map(function (n) {
        return '<li class="insight insight--' + n.tone + '"><span class="insight__icon">' + ic("spark", 14) +
          "</span><p>" + esc(n.text) + "</p></li>";
      }).join("") + "</ul>"
    });

    return '<aside class="customer360-drawer" aria-label="Customer 360">' +
      '<header class="customer360-drawer__head"><div><span>Customer 360</span><h2>' + esc(c.name) +
      '</h2><p>Interaction remains active while you review customer context.</p></div>' +
      '<button class="customer360-drawer__close" data-360="close" aria-label="Close Customer 360">×</button></header>' +
      '<div class="customer360-drawer__body">' + loyaltyCard + demoCard + casesCard + prevCard + insightCard + qaActionsCard + '</div>' +
      '</aside>';
  }

  function setCustomer360(open) {
    S.customer360Open = !!open;
    var existing = document.querySelector(".customer360-drawer");
    if (existing && typeof existing.remove === "function") existing.remove();
    if (!S.customer360Open) return;

    var page = document.querySelector(".interaction-view");
    if (page && typeof page.insertAdjacentHTML === "function") {
      page.insertAdjacentHTML("beforeend", customer360Html());
      return;
    }

    /* Browserless smoke-test fallback. In the browser this path is not used,
       so opening Customer 360 never re-renders or clears a draft reply. */
    render();
  }

  function profile() {
    var c = DATA.customer;
    var isCall = mode() === "call";

    var livebar = '<div class="livebar">' +
      '<button class="livebar__back" data-go="dashboard">' + ic("arrow", 15) + "<span>Dashboard</span></button>" +
      '<span class="livebar__sep"></span>' +
      (isCall
        ? '<span class="livebar__chan">' + ic("phone", 14) + " Voice · live</span>"
        : '<span class="livebar__chan">' + ic("chat", 14) + " " + esc(DATA.chat.channel) + " · ongoing</span>") +
      '<span class="timer"><span class="timer__dot"></span><span class="timer__value" id="timer">' + mmss(S.seconds) + "</span>" +
        '<button class="timer__btn" id="timerBtn" aria-label="Pause or resume">' + ic(S.running ? "pause" : "play", 13) + "</button></span>" +
      '<span class="livebar__meta">Queue wait ' + esc(DATA.live.queueWait) + "</span>" +
      '<span class="livebar__meta">Intent: <b>' + esc(DATA.live.intent) + "</b></span>" +
      (isCall
        ? '<span class="livebar__rec">' + ic("mic", 13) + " Recording</span>"
        : '<span class="livebar__rec">' + ic("shield", 13) + " Transcript saving</span>") +
      '<span class="livebar__spacer"></span>' +
      (isCall ? btn("Hold", "quiet", "pause", 'data-toast="Customer placed on hold"') : "") +
      btn("Transfer", "quiet", "up", 'data-toast="Transfer panel opened"') +
      btn("End & wrap", "primary", "check", 'data-wrap="open"') + "</div>";

    /* One customer-profile component for voice and digital interactions. */
    var chead = '<div class="chead chead--call"><div class="chead__id">' + avatar(c.initials, 68, isCall ? "pink" : "indigo") + '<div class="chead__main">' +
      '<div class="chead__namerow"><h1 class="chead__name">' + esc(c.name) + '</h1><span class="vip-badge">VIP</span>' + pill(c.churnRisk + " churn risk", "lime") + '</div>' +
      '<div class="chead__facts chead__facts--call"><span>' + ic("phone", 13) + esc(c.phone) + '</span>' +
      '<span>' + ic("mail", 13) + esc(c.email) + '</span><span>Member ID: ' + esc(c.id) + '</span>' +
      '<span class="wa">' + ic("chat", 13) + 'Preferred channel: ' + esc(c.preferredChannel) + '</span>' +
      '<span>' + ic("mail", 13) + 'Marketing opt-in: ' + esc(c.consent) + '</span>' +
      '<span>' + ic("gift", 13) + 'Customer lifetime value: ' + esc(c.ltv) + '</span></div></div></div>' +
      '<button class="btn btn--ghost view360" data-360="open">View in 360</button></div>';

    var interactionMetrics = [
      DATA.interactionKpis[0], DATA.interactionKpis[1], DATA.interactionKpis[2],
      DATA.interactionKpis[4], DATA.interactionKpis[5],
      { label: "Customer lifetime value", value: c.ltv, note: "Total lifetime value", tone: "" }
    ];
    var strip = '<div class="kpistrip kpistrip--call">' + interactionMetrics.map(function (k) {
      return '<div class="' + k.tone + '"><b>' + esc(k.label) + "</b><strong>" + esc(k.value) + "</strong><span>" + esc(k.note) + "</span></div>";
    }).join("") + "</div>";

    var callCol = '<section class="card chatpane callpane">' +
      '<header class="chatpane__head">' + avatar(DATA.customer.initials, 38, "pink") +
        '<span class="chatpane__who"><b>' + esc(DATA.customer.name) + "</b>" +
          '<span><i class="chatpane__live"></i>Live call · ' + esc(DATA.call.from) +
          ' · <span class="mono">' + esc(DATA.call.id) + "</span></span></span>" +
        '<span class="chatpane__chip">' + ic("clock", 12) + '<span id="chatTimer">' + mmss(S.seconds) + "</span></span>" +
        btn("Mute", "quiet", "mic", 'data-toast="Microphone muted"') +
        btn("Keypad", "quiet", "grid", 'data-toast="Keypad opened"') +
      "</header>" +
      '<div class="tstrip"><span class="tstrip__live">' + ic("mic", 12) +
        " Transcribing live</span><span>IVR path: " + esc(DATA.call.dtmf) + "</span></div>" +
      '<ul class="chatpane__log tlog" id="callLog"></ul>' +
      '<div class="chatpane__quick">' + DATA.call.quickActions.map(function (q) {
        return '<button data-toast="' + esc(q) + ' — noted on the call">' + esc(q) + "</button>";
      }).join("") + "</div>" +
      '<div class="chatpane__foot"><span>' + ic("shield", 12) +
        " Recording · sentiment scored on every customer turn</span>" +
        "<span>Suggestions update as the mood shifts</span></div>" +
      "</section>";

    /* Genesys owns the interaction controls; CareIQ owns the surrounding intelligence.
       The duplicated Transfer / End & Wrap controls from the older chat card are removed. */
    var chatCol = '<section class="card chatpane chatpane--interaction">' +
      '<header class="chatpane__head chatpane__head--simple"><span class="chatpane__workspace-title">Live chat</span>' +
        '<span class="chatpane__channel">' + ic("chat", 12) + esc(DATA.chat.channel) + '</span>' +
        '<span class="chatpane__conversation mono">' + esc(DATA.chat.id) + '</span></header>' +
      '<ul class="chatpane__log" id="chatLog"></ul>' +
      '<div class="chatpane__quick">' + DATA.chat.quickReplies.map(function (q) {
        return '<button data-quick="' + esc(q) + '">' + esc(q) + "</button>";
      }).join("") + "</div>" +
      '<div class="chatpane__compose">' +
        '<textarea id="chatInput" rows="1" placeholder="Type a reply — Enter to send, Shift+Enter for a new line"></textarea>' +
        '<button class="chatpane__send" id="chatSend" aria-label="Send message">' + ic("arrow", 18) + "</button>" +
      "</div>" +
      '<div class="chatpane__foot"><span>' + ic("shield", 12) +
        " Transcript saving · sentiment scored live</span><span>Suggestions update as the mood shifts</span></div>" +
      "</section>";

    var interactionAssistCol = '<section class="careiq-assist"><div class="careiq-assist__title">' + ic("spark", 14) + '<b>CareIQ Assist</b></div>' +
      '<section class="assist-section"><header><span>' + ic("chat", 14) + '<b>Say This</b></span><span>⌃</span></header><p class="assist-mini" id="saySub">Tuned to ' + SENTIMENT.label().toLowerCase() + ' sentiment</p><div id="sayPanel">' + sayHtml() + '</div></section>' +
      '<section class="assist-section"><header><span>' + ic("note", 14) + '<b>Do This</b></span><span>⌃</span></header><div id="doPanel">' + doHtml() + '</div></section>' +
      '<section class="assist-section"><header><span>' + ic("shield", 14) + '<b>SOP Guidance</b></span><span>⌃</span></header><p class="assist-mini" id="qaSub">Live SOP compliance score ' + Math.round((S.qa.filter(function (x) { return x.done; }).length / S.qa.length) * 100) + '%</p><div id="qaPanel">' + qaHtml() + '</div></section>' +
      '<section class="assist-section"><header><span>' + ic("book", 14) + '<b>Knowledge</b></span><span>⌃</span></header><ul class="kb assist-kb">' + DATA.knowledge.map(function (k) { return '<li data-toast="Opening article">' + ic("book", 12) + '<span>' + esc(k) + '</span></li>'; }).join("") + '</ul></section></section>';

    var startLabel = SENTIMENT.label(SENTIMENT.start());
    var currentLabel = SENTIMENT.label();
    var sentimentDelta = SENTIMENT.delta();
    var trendLabel = sentimentDelta > 2 ? "Improving" : sentimentDelta < -2 ? "Declining" : "Stable";
    var interactionSignals = '<div class="call-signals interaction-signals">' +
      '<div><span class="signal-icon signal-icon--sent">☺</span><span><b>Sentiment</b><strong>' + esc(startLabel) + ' → ' + esc(currentLabel) + '</strong><small>' + esc(trendLabel) + '</small></span></div>' +
      '<div><span class="signal-icon">' + ic("phone", 16) + '</span><span><b>Repeat caller</b><strong>2nd contact in 7 days</strong></span></div>' +
      '<div><span class="signal-icon signal-icon--wa">' + ic("chat", 16) + '</span><span><b>Preferred channel</b><strong>' + esc(c.preferredChannel) + '</strong></span></div>' +
      '<div><span class="signal-icon signal-icon--purchase">' + ic("wallet", 16) + '</span><span><b>Recent transaction</b><strong>Mall of the Emirates · AED 1,240</strong></span></div>' +
      '</div>';

    var centreCol = isCall ? callCol : chatCol;
    var workspace = '<div class="call-workspace interaction-workspace"><div class="call-main interaction-main">' + interactionSignals + centreCol + '</div><div class="call-assist interaction-assist">' + interactionAssistCol + '</div></div>';

    return '<div class="page call-view interaction-view' + (isCall ? ' voice-view' : ' chat-view') + '">' + livebar + chead + strip + workspace +
      (S.customer360Open ? customer360Html() : "") +
      (S.wrapOpen ? wrapModal() : "") + "</div>";
  }

  /* --------------------- Live conversation workspace --------------------- */

  function nowTime() {
    var d = new Date();
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  /* ---- chat thread (bubbles) ---- */
  function messagesHtml() {
    var html = thread().map(function (m) {
      if (m.from === "sys") {
        return '<li class="msg msg--sys"><span class="msg__bub">' + esc(m.text) + "</span></li>";
      }
      var who = m.from === "out" ? "You" : DATA.customer.name.split(" ")[0];
      var tag = "";
      if (m.from === "in" && m.score != null) {
        tag = '<span class="msg__score ' + SENTIMENT.band(m.score) + '" title="Sentiment read for this message">' +
          esc(m.emotion || SENTIMENT.label(m.score)) + " \u00b7 " + m.score + "</span>";
      }
      return '<li class="msg msg--' + m.from + '"><span class="msg__bub">' + esc(m.text) + "</span>" +
        '<span class="msg__meta">' + esc(who) + " \u00b7 " + esc(m.time) +
        (m.from === "out" && m.read ? "<i>" + ic("check", 11) + "</i>" : "") + tag + "</span></li>";
    }).join("");
    if (S.typing) { html += '<li class="typing"><i></i><i></i><i></i></li>'; }
    return html;
  }

  /* ---- call thread (speaker-labelled transcript) ---- */
  function transcriptHtml() {
    var html = thread().map(function (m) {
      if (m.from === "sys") {
        return '<li class="tline tline--sys"><span>' + esc(m.text) + "</span></li>";
      }
      var who = m.from === "out" ? "Agent" : DATA.customer.name.split(" ")[0];
      var tag = "";
      if (m.from === "in" && m.score != null) {
        tag = '<span class="msg__score ' + SENTIMENT.band(m.score) + '">' +
          esc(m.emotion || SENTIMENT.label(m.score)) + " \u00b7 " + m.score + "</span>";
      }
      return '<li class="tline tline--' + m.from + '">' +
        '<span class="tline__who">' + esc(who) + '<i>' + esc(m.time) + "</i></span>" +
        '<span class="tline__text">' + esc(m.text) + tag + "</span></li>";
    }).join("");
    if (S.typing) {
      html += '<li class="tline tline--live"><span class="tline__who">' +
        esc(DATA.customer.name.split(" ")[0]) + "</span>" +
        '<span class="tline__text"><span class="typing"><i></i><i></i><i></i></span></span></li>';
    }
    return html;
  }

  function paintMessages() {
    var log = document.getElementById(mode() === "call" ? "callLog" : "chatLog");
    if (!log) return;
    log.innerHTML = mode() === "call" ? transcriptHtml() : messagesHtml();
    log.scrollTop = log.scrollHeight;
  }

  /* ---- live sentiment column ---- */
  function gauge(value) {
    var band = SENTIMENT.band(value);
    var r = 52, cx = 60, cy = 60, circ = 2 * Math.PI * r;
    var off = circ * (1 - value / 100);
    return '<svg class="gauge" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="gauge__track"></circle>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="gauge__fill gauge__fill--' + band + '" ' +
      'stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle>' +
      "</svg>";
  }

  function sentimentPanelHtml() {
    var v = SENTIMENT.current(), d = SENTIMENT.delta(), band = SENTIMENT.band(v);
    var arrow = d > 0 ? "\u2191" : d < 0 ? "\u2193" : "\u2192";
    var trend = SENTIMENT.trend();

    var alertHtml = "";
    if (S.alert) {
      alertHtml = '<div class="salert salert--' + S.alert.tone + '">' + ic("spark", 14) +
        "<span>" + esc(S.alert.text) + "</span></div>";
    }

    return '<div class="sgauge">' + gauge(v) +
        '<div class="sgauge__mid"><b>' + v + '</b><span>of 100</span></div></div>' +
      '<div class="sread"><span class="sread__label ' + band + '">' + SENTIMENT.label(v) + "</span>" +
        '<span class="sread__delta ' + (d >= 0 ? "up" : "down") + '">' + arrow + " " + Math.abs(d) +
        " pts since the chat opened</span></div>" +
      alertHtml +
      '<div class="sline">' + spark(trend) +
        '<div class="sline__scale"><span>Opened</span><span>Now</span></div></div>' +
      '<div class="sfacts">' +
        '<div><b>Detected emotion</b><span>' + esc(SENTIMENT.emotion()) + "</span></div>" +
        '<div><b>Customer turns</b><span>' + SENTIMENT.scores().length + "</span></div>" +
        '<div><b>Opened at</b><span>' + SENTIMENT.start() + "</span></div>" +
        '<div><b>Peak</b><span>' + Math.max.apply(null, SENTIMENT.trend()) + "</span></div>" +
      "</div>";
  }

  function signalsHtml() {
    return '<ul class="signals">' + DATA.signals.map(function (g) {
      return '<li class="signal signal--' + g.tone + '"><b>' + esc(g.label) + "</b><span>" + esc(g.detail) + "</span></li>";
    }).join("") + "</ul>";
  }

  /* ---- assist rail, driven by the live sentiment band ---- */
  function sayHtml() {
    var play = DATA.playbook[SENTIMENT.band()];
    var isCall = mode() === "call";
    return '<p class="assist__lede">' + ic("spark", 13) + "<span>" + esc(play.headline) + "</span></p>" +
      '<ul class="say' + (isCall ? ' say--call' : '') + '">' + play.say.map(function (s, i) {
        return "<li><p>" + esc(s) + "</p>" +
          (isCall ? "" : '<button data-insert="' + i + '" style="right:60px">Insert</button><button data-send="' + i + '">Send</button>') + "</li>";
      }).join("") + "</ul>";
  }

  function doHtml() {
    var items = mode() === "call" ? [
      { action: "Add 500 goodwill points", system: "Resolved eligibility", risk: "low" },
      { action: "Log correction for missing points", system: "Loyalty points", risk: "low" },
      { action: "Send confirmation to customer", system: "WhatsApp template", risk: "low" }
    ] : DATA.doThis;
    return '<ul class="do">' + items.map(function (d, i) {
      var done = S.doDone[i];
      return "<li" + (done ? ' class="is-done"' : "") + "><span><b>" + esc(d.action) + "</b><span>" +
        esc(d.system) + " · " + esc(d.risk) + ' risk</span></span><button data-do="' + i + '">' +
        (done ? ic("check", 13) + " Done" : "Run") + "</button></li>";
    }).join("") + "</ul>";
  }

  function qaHtml() {
    var done = S.qa.filter(function (x) { return x.done; }).length;
    var score = Math.round((done / S.qa.length) * 100);
    return '<div class="qascore">' + meter(score, 100, score > 70 ? "lime" : "amber") + "<b>" + score + "%</b></div>" +
      '<ul class="qalist">' + DATA.qaChecks.map(function (x, i) {
        var d = S.qa[i].done;
        return "<li" + (d ? ' class="is-done"' : "") + '><button class="check' + (d ? " is-on" : "") +
          '" data-qa="' + i + '" aria-label="Toggle check">' + ic("check", 12) + "</button><span>" + esc(x.label) + "</span></li>";
      }).join("") + "</ul>";
  }

  /* repaint just the assist + sentiment regions, so typing is never lost */
  function paintAssist() {
    var els = {
      sentimentPanel: sentimentPanelHtml,
      sayPanel: sayHtml,
      doPanel: doHtml,
      qaPanel: qaHtml
    };
    Object.keys(els).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = els[id]();
    });
    var sub = document.getElementById("saySub");
    if (sub) sub.textContent = "Tuned to " + SENTIMENT.label().toLowerCase() + " sentiment";
    var qaSub = document.getElementById("qaSub");
    if (qaSub) {
      var d = S.qa.filter(function (x) { return x.done; }).length;
      qaSub.textContent = "Live SOP compliance score " + Math.round((d / S.qa.length) * 100) + "%";
    }
  }

  function paintAll() { paintMessages(); paintAssist(); }

  /* ---- composing and sending ---- */
  function pushToInput(text) {
    var box = document.getElementById("chatInput");
    if (!box) return;
    box.value = text;
    box.focus();
    box.style.height = "auto";
    box.style.height = Math.min(110, box.scrollHeight) + "px";
  }

  function sendChat(preset) {
    var box = document.getElementById("chatInput");
    if (!box) return;
    var text = (preset != null ? preset : box.value).trim();
    if (!text) return;

    S.thread.chat.push({ from: "out", text: text, time: nowTime(), read: false });
    if (preset == null) { box.value = ""; box.style.height = ""; }
    S.alert = null;
    paintAll();

    setTimeout(function () {
      var last = S.thread.chat[S.thread.chat.length - 1];
      if (last && last.from === "out") { last.read = true; paintMessages(); }
    }, 900);

    setTimeout(function () {
      S.typing = true; paintMessages();
      setTimeout(function () {
        S.typing = false;
        var r = DATA.chat.autoReplies[S.autoIdx % DATA.chat.autoReplies.length];
        S.autoIdx += 1;
        var before = SENTIMENT.current();
        S.thread.chat.push({ from: "in", text: r.text, time: nowTime(), score: r.score, emotion: r.emotion });
        var after = SENTIMENT.current();
        if (after - before >= 6) {
          S.alert = { tone: "good", text: "Sentiment climbing \u2014 that reply landed well. Good moment to confirm and close." };
        } else if (after < 40) {
          S.alert = { tone: "warn", text: "Sentiment still negative \u2014 acknowledge the repeat issue before offering a fix." };
        }
        paintAll();
      }, 1700);
    }, 1400);
  }

  /* ------------------------------ Render ------------------------------ */
  function render() {
    document.getElementById("app").innerHTML =
      '<div class="shell">' + topbar() +
      '<main class="main">' + (S.screen === "dashboard" ? dashboard() : profile()) + "</main>" +
      '<footer class="foot"><span>CARE Console \u2014 front-end prototype. All data is sample data.</span></footer></div>';

    if (S.screen !== "dashboard") {
      if (S.screen === "chat") bindChat();
      paintMessages();
    }
  }

  /* wire the composer after every full render of the profile screen */
  function bindChat() {
    var send = document.getElementById("chatSend");
    var box = document.getElementById("chatInput");
    if (!send || !box) return;
    send.addEventListener("click", function () { sendChat(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
    });
    box.addEventListener("input", function () {
      box.style.height = "auto";
      box.style.height = Math.min(110, box.scrollHeight) + "px";
    });
  }

  /* ------------------------------ Events ------------------------------ */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go],[data-tab],[data-task],[data-qa],[data-do],[data-insert],[data-send]," +
      "[data-quick],[data-save],[data-toast],[data-notif],[data-wrap],[data-360],[data-signout],#timerBtn");

    if ((!t || !t.hasAttribute("data-notif")) && S.notifOpen && !e.target.closest(".notif")) {
      S.notifOpen = false; render();
    }
    if (!t) return;

    if (t.hasAttribute("data-signout")) {
      if (window.CAREIQ_APP && typeof window.CAREIQ_APP.logout === "function") {
        window.CAREIQ_APP.logout();
      } else if (window.CAREIQ_PLATFORM && typeof window.CAREIQ_PLATFORM.signOut === "function") {
        window.CAREIQ_PLATFORM.signOut();
      }
      return;
    }

    if (t.hasAttribute("data-360")) {
      setCustomer360(t.getAttribute("data-360") === "open");
      return;
    }

    if (t.hasAttribute("data-wrap")) {
      var w = t.getAttribute("data-wrap");
      if (w === "open") { S.wrapOpen = true; render(); return; }
      if (w === "save") {
        var codeEl = document.getElementById("wrapCode");
        var code = codeEl && codeEl.value ? codeEl.value.split(" · ")[0] : "";
        S.wrapOpen = false; S.saved = true; render();
        toast(code ? "Contact wrapped and saved — " + code : "Contact wrapped and saved to CRM");
        return;
      }
      if (e.target.closest(".modal__box") && !t.classList.contains("modal__close") && t.tagName !== "BUTTON") return;
      S.wrapOpen = false; render(); return;
    }

    if (t.hasAttribute("data-notif")) {
      if (t.getAttribute("data-notif") === "close") { S.notifOpen = false; }
      else { S.notifOpen = !S.notifOpen; if (S.notifOpen) S.notifRead = true; }
      render(); return;
    }

    if (t.id === "timerBtn") { S.running = !S.running; render(); return; }
    if (t.hasAttribute("data-go")) {
      var dest = t.getAttribute("data-go");
      if (dest !== S.screen) { S.alert = null; S.typing = false; }
      S.customer360Open = false;
      S.screen = dest; window.scrollTo(0, 0); render(); return;
    }
    if (t.hasAttribute("data-tab"))  { S.tab = t.getAttribute("data-tab"); render(); return; }
    if (t.hasAttribute("data-task")) { var i = +t.getAttribute("data-task"); S.tasks[i].done = !S.tasks[i].done; render(); return; }

    /* QA and Do repaint only their panel, so a half-typed reply survives */
    if (t.hasAttribute("data-qa")) { var j = +t.getAttribute("data-qa"); S.qa[j].done = !S.qa[j].done; paintAssist(); return; }
    if (t.hasAttribute("data-do")) {
      var k = +t.getAttribute("data-do");
      S.doDone[k] = !S.doDone[k];
      if (S.doDone[k]) toast(DATA.doThis[k].system + ": action completed");
      paintAssist(); return;
    }

    if (t.hasAttribute("data-insert")) {
      pushToInput(DATA.playbook[SENTIMENT.band()].say[+t.getAttribute("data-insert")]);
      toast("Added to the composer");
      return;
    }
    if (t.hasAttribute("data-send")) {
      sendChat(DATA.playbook[SENTIMENT.band()].say[+t.getAttribute("data-send")]);
      toast("Sent to " + DATA.customer.name.split(" ")[0]);
      return;
    }
    if (t.hasAttribute("data-quick")) { sendChat(t.getAttribute("data-quick")); return; }
    if (t.hasAttribute("data-save")) { S.saved = true; toast("Summary saved to CRM"); render(); return; }
    if (t.hasAttribute("data-toast")) { toast(t.getAttribute("data-toast")); return; }
  });

  /* chat duration timer — ticks independently of re-renders */
  setInterval(function () {
    if (!S.running) return;
    S.seconds += 1;
    var el = document.getElementById("timer");
    if (el) el.textContent = mmss(S.seconds);
    var wt = document.getElementById("chatTimer");
    if (wt) wt.textContent = mmss(S.seconds);
  }, 1000);

  /* The call transcript streams in turn by turn while the call view is open,
     so sentiment, coaching and suggestions all move on their own. */
  setInterval(function () {
    if (S.screen !== "call" || !S.running) return;
    if (S.callIdx >= DATA.call.queue.length) return;

    var next = DATA.call.queue[S.callIdx];

    /* show the customer "speaking" briefly before their line lands */
    if (next.from === "in" && !S.typing) {
      S.typing = true; paintMessages();
      setTimeout(function () {
        if (S.screen !== "call") { S.typing = false; return; }
        S.typing = false;
        var before = SENTIMENT.current();
        S.thread.call.push(next); S.callIdx += 1;
        var after = SENTIMENT.current();
        if (after - before >= 6) {
          S.alert = { tone: "good", text: "Sentiment climbing \u2014 the customer is responding well. Confirm the fix and close." };
        } else if (after < 40) {
          S.alert = { tone: "warn", text: "Sentiment still negative \u2014 acknowledge the repeat issue before offering a fix." };
        }
        paintAll();
      }, 1600);
      return;
    }

    S.thread.call.push(next); S.callIdx += 1;
    paintAll();
  }, 6000);

  /* On the chat view, the customer chases if the agent goes quiet */
  setTimeout(function () {
    if (S.screen !== "chat") return;
    S.typing = true; paintMessages();
    setTimeout(function () {
      S.typing = false;
      S.thread.chat.push({ from: "in", text: "Are you still there? I'd really like this sorted today.",
        time: nowTime(), score: 34, emotion: "Anxious" });
      S.alert = { tone: "warn", text: "Customer chased after 40s of silence \u2014 acknowledge the wait, then give a firm timeline." };
      paintAll();
    }, 2200);
  }, 9000);

  render();
})();
