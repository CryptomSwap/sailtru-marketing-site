function rr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ip(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},so={duration:.5,overwrite:!1,delay:0},df,Tn,$t,Ei=1e8,Xt=1/Ei,Kc=Math.PI*2,S0=Kc/4,M0=0,rp=Math.sqrt,y0=Math.cos,b0=Math.sin,Sn=function(e){return typeof e=="string"},nn=function(e){return typeof e=="function"},pr=function(e){return typeof e=="number"},pf=function(e){return typeof e>"u"},Ki=function(e){return typeof e=="object"},Jn=function(e){return e!==!1},mf=function(){return typeof window<"u"},bo=function(e){return nn(e)||Sn(e)},sp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},In=Array.isArray,E0=/random\([^)]+\)/g,T0=/,\s*/g,ah=/(?:-?\.?\d|\.)+/gi,ap=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ys=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ql=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,op=/[+-]=-?[.\d]+/,w0=/[^,'"\[\]\s]+/gi,A0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Qt,zi,Zc,gf,pi={},wl={},lp,cp=function(e){return(wl=la(e,pi))&&ti},_f=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ao=function(e,t){return!t&&console.warn(e)},up=function(e,t){return e&&(pi[e]=t)&&wl&&(wl[e]=t)||pi},oo=function(){return 0},C0={suppressEvents:!0,isStart:!0,kill:!1},fl={suppressEvents:!0,kill:!1},R0={suppressEvents:!0},vf={},Lr=[],Jc={},fp,oi={},jl={},oh=30,hl=[],xf="",Sf=function(e){var t=e[0],n,i;if(Ki(t)||nn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=hl.length;i--&&!hl[i].targetTest(t););n=hl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Ip(e[i],n)))||e.splice(i,1);return e},rs=function(e){return e._gsap||Sf(Ti(e))[0]._gsap},hp=function(e,t,n){return(n=e[t])&&nn(n)?e[t]():pf(n)&&e.getAttribute&&e.getAttribute(t)||n},Qn=function(e,t){return(e=e.split(",")).forEach(t)||e},rn=function(e){return Math.round(e*1e5)/1e5||0},Zt=function(e){return Math.round(e*1e7)/1e7||0},Qs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},P0=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Al=function(){var e=Lr.length,t=Lr.slice(0),n,i;for(Jc={},Lr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Mf=function(e){return!!(e._initted||e._startAt||e.add)},dp=function(e,t,n,i){Lr.length&&!Tn&&Al(),e.render(t,n,!!(Tn&&t<0&&Mf(e))),Lr.length&&!Tn&&Al()},pp=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(w0).length<2?t:Sn(e)?e.trim():e},mp=function(e){return e},mi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},D0=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},la=function(e,t){for(var n in t)e[n]=t[n];return e},lh=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Ki(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Cl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Xa=function(e){var t=e.parent||Qt,n=e.keyframes?D0(In(e.keyframes)):mi;if(Jn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},L0=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},gp=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},Xl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Fr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ss=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},I0=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Qc=function(e,t,n,i){return e._startAt&&(Tn?e._startAt.revert(fl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},U0=function r(e){return!e||e._ts&&r(e.parent)},ch=function(e){return e._repeat?ca(e._tTime,e=e.duration()+e._rDelay)*e:0},ca=function(e,t){var n=Math.floor(e=Zt(e/t));return e&&n===e?n-1:n},Rl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Yl=function(e){return e._end=Zt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Xt)||0))},ql=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Zt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Yl(e),n._dirty||ss(n,e)),e},_p=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Rl(e.rawTime(),t),(!t._dur||So(0,t.totalDuration(),n)-t._tTime>Xt)&&t.render(n,!0)),ss(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Xt}},Hi=function(e,t,n,i){return t.parent&&Fr(t),t._start=Zt((pr(n)?n:n||e!==Qt?vi(e,n,t):e._time)+t._delay),t._end=Zt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),gp(e,t,"_first","_last",e._sort?"_start":0),jc(t)||(e._recent=t),i||_p(e,t),e._ts<0&&ql(e,e._tTime),e},vp=function(e,t){return(pi.ScrollTrigger||_f("scrollTrigger",t))&&pi.ScrollTrigger.create(t,e)},xp=function(e,t,n,i,s){if(bf(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Tn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&fp!==ci.frame)return Lr.push(e),e._lazy=[s,i],1},N0=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},jc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},F0=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&N0(e)&&!(!e._initted&&jc(e))||(e._ts<0||e._dp._ts<0)&&!jc(e))?0:1,o=e._rDelay,l=0,c,u,d;if(o&&e._repeat&&(l=So(0,e._tDur,t),u=ca(l,o),e._yoyo&&u&1&&(a=1-a),u!==ca(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Tn||i||e._zTime===Xt||!t&&e._zTime){if(!e._initted&&xp(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Xt:0),n||(n=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Qc(e,t,n,!0),e._onUpdate&&!n&&fi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&fi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Fr(e,1),!n&&!Tn&&(fi(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},O0=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},ua=function(e,t,n,i){var s=e._repeat,a=Zt(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:Zt(a*(s+1)+e._rDelay*s):a,o>0&&!i&&ql(e,e._tTime=e._tDur*o),e.parent&&Yl(e),n||ss(e.parent,e),e},uh=function(e){return e instanceof Zn?ss(e):ua(e,e._dur)},B0={_start:0,endTime:oo,totalDuration:oo},vi=function r(e,t,n){var i=e.labels,s=e._recent||B0,a=e.duration()>=Ei?s.endTime(!1):e._dur,o,l,c;return Sn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(In(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Ya=function(e,t,n){var i=pr(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Jn(l.vars.inherit)&&l.parent;a.immediateRender=Jn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new un(t[0],a,t[s+1])},Gr=function(e,t){return e||e===0?t(e):t},So=function(e,t,n){return n<e?e:n>t?t:n},Pn=function(e,t){return!Sn(e)||!(t=A0.exec(e))?"":t[1]},z0=function(e,t,n){return Gr(n,function(i){return So(e,t,i)})},eu=[].slice,Sp=function(e,t){return e&&Ki(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ki(e[0]))&&!e.nodeType&&e!==zi},k0=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Sn(i)&&!t||Sp(i,1)?(s=n).push.apply(s,Ti(i)):n.push(i)})||n},Ti=function(e,t,n){return $t&&!t&&$t.selector?$t.selector(e):Sn(e)&&!n&&(Zc||!fa())?eu.call((t||gf).querySelectorAll(e),0):In(e)?k0(e,n):Sp(e)?eu.call(e,0):e?[e]:[]},tu=function(e){return e=Ti(e)[0]||ao("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ti(t,n.querySelectorAll?n:n===e?ao("Invalid scope")||gf.createElement("div"):e)}},Mp=function(e){return e.sort(function(){return .5-Math.random()})},yp=function(e){if(nn(e))return e;var t=Ki(e)?e:{each:e},n=as(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,u=i,d=i;return Sn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(u=i[0],d=i[1]),function(f,h,g){var _=(g||t).length,m=a[_],p,S,b,x,y,E,w,v,T;if(!m){if(T=t.grid==="auto"?0:(t.grid||[1,Ei])[1],!T){for(w=-Ei;w<(w=g[T++].getBoundingClientRect().left)&&T<_;);T<_&&T--}for(m=a[_]=[],p=l?Math.min(T,_)*u-.5:i%T,S=T===Ei?0:l?_*d/T-.5:i/T|0,w=0,v=Ei,E=0;E<_;E++)b=E%T-p,x=S-(E/T|0),m[E]=y=c?Math.abs(c==="y"?x:b):rp(b*b+x*x),y>w&&(w=y),y<v&&(v=y);i==="random"&&Mp(m),m.max=w-v,m.min=v,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(T>_?_-1:c?c==="y"?_/T:T:Math.max(T,_/T))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=Pn(t.amount||t.each)||0,n=n&&_<0?j0(n):n}return _=(m[f]-m.min)/m.max||0,Zt(m.b+(n?n(_):_)*m.v)+m.u}},nu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Zt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(pr(n)?0:Pn(n))}},bp=function(e,t){var n=In(e),i,s;return!n&&Ki(e)&&(i=n=e.radius||Ei,e.values?(e=Ti(e.values),(s=!pr(e[0]))&&(i*=i)):e=nu(e.increment)),Gr(t,n?nn(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Ei,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-o,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-o),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:a,s||u===a||pr(a)?u:u+Pn(a)}:nu(e))},Ep=function(e,t,n,i){return Gr(In(e)?!t:n===!0?!!(n=0):!i,function(){return In(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},G0=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},H0=function(e,t){return function(n){return e(parseFloat(n))+(t||Pn(n))}},V0=function(e,t,n){return wp(e,t,0,1,n)},Tp=function(e,t,n){return Gr(n,function(i){return e[~~t(i)]})},W0=function r(e,t,n){var i=t-e;return In(e)?Tp(e,r(0,e.length),t):Gr(n,function(s){return(i+(s-e)%i)%i+e})},X0=function r(e,t,n){var i=t-e,s=i*2;return In(e)?Tp(e,r(0,e.length-1),t):Gr(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},lo=function(e){return e.replace(E0,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(T0);return Ep(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},wp=function(e,t,n,i,s){var a=t-e,o=i-n;return Gr(s,function(l){return n+((l-e)/a*o||0)})},Y0=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var a=Sn(e),o={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(In(e)&&!In(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(g){g*=d;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=la(In(e)?[]:{},e));if(!u){for(l in t)yf.call(o,e,l,"get",t[l]);s=function(g){return wf(g,o)||(a?e.p:e)}}}return Gr(n,s)},fh=function(e,t,n){var i=e.labels,s=Ei,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},fi=function(e,t,n){var i=e.vars,s=i[t],a=$t,o=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Lr.length&&Al(),o&&($t=o),u=l?s.apply(c,l):s.call(c),$t=a,u},Na=function(e){return Fr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Tn),e.progress()<1&&fi(e,"onInterrupt"),e},qs,Ap=[],Cp=function(e){if(e)if(e=!e.name&&e.default||e,mf()||e.headless){var t=e.name,n=nn(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:oo,render:wf,add:yf,kill:cg,modifier:lg,rawVars:0},a={targetTest:0,get:0,getSetter:Tf,aliases:{},register:0};if(fa(),e!==i){if(oi[t])return;mi(i,mi(Cl(e,s),a)),la(i.prototype,la(s,Cl(e,a))),oi[i.prop=t]=i,e.targetTest&&(hl.push(i),vf[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}up(t,i),e.register&&e.register(ti,i,jn)}else Ap.push(e)},Wt=255,Fa={aqua:[0,Wt,Wt],lime:[0,Wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Wt],navy:[0,0,128],white:[Wt,Wt,Wt],olive:[128,128,0],yellow:[Wt,Wt,0],orange:[Wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Wt,0,0],pink:[Wt,192,203],cyan:[0,Wt,Wt],transparent:[Wt,Wt,Wt,0]},ec=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Wt+.5|0},Rp=function(e,t,n){var i=e?pr(e)?[e>>16,e>>8&Wt,e&Wt]:0:Fa.black,s,a,o,l,c,u,d,f,h,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Fa[e])i=Fa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Wt,i&Wt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Wt,e&Wt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(ah),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=ec(l+1/3,s,a),i[1]=ec(l,s,a),i[2]=ec(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(ap),n&&i.length<4&&(i[3]=1),i}else i=e.match(ah)||Fa.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Wt,a=i[1]/Wt,o=i[2]/Wt,d=Math.max(s,a,o),f=Math.min(s,a,o),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(a-o)/h+(a<o?6:0):d===a?(o-s)/h+2:(s-a)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Pp=function(e){var t=[],n=[],i=-1;return e.split(Ir).forEach(function(s){var a=s.match(Ys)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},hh=function(e,t,n){var i="",s=(e+i).match(Ir),a=t?"hsla(":"rgba(",o=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=Rp(f,t,1))&&a+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Pp(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Ir,"1").split(Ys),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Ir),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},Ir=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Fa)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),q0=/hsl[a]?\(/,Dp=function(e){var t=e.join(" "),n;if(Ir.lastIndex=0,Ir.test(t))return n=q0.test(t),e[1]=hh(e[1],n),e[0]=hh(e[0],n,Pp(e[1])),!0},co,ci=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,u,d,f,h,g=function _(m){var p=r()-i,S=m===!0,b,x,y,E;if((p>e||p<0)&&(n+=p-t),i+=p,y=i-n,b=y-a,(b>0||S)&&(E=++d.frame,f=y-d.time*1e3,d.time=y=y/1e3,a+=b+(b>=s?4:s-b),x=1),S||(l=c(_)),x)for(h=0;h<o.length;h++)o[h](y,f,E,m)};return d={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){lp&&(!Zc&&mf()&&(zi=Zc=window,gf=zi.document||{},pi.gsap=ti,(zi.gsapVersions||(zi.gsapVersions=[])).push(ti.version),cp(wl||zi.GreenSockGlobals||!zi.gsap&&zi||{}),Ap.forEach(Cp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,a-d.time*1e3+1|0)},co=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),co=0,c=oo},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),a=d.time*1e3+s},add:function(m,p,S){var b=p?function(x,y,E,w){m(x,y,E,w),d.remove(b)}:m;return d.remove(m),o[S?"unshift":"push"](b),fa(),b},remove:function(m,p){~(p=o.indexOf(m))&&o.splice(p,1)&&h>=p&&h--},_listeners:o},d})(),fa=function(){return!co&&ci.wake()},At={},$0=/^[\d.\-M][\d.\-,\s]/,K0=/["']/g,Z0=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(K0,"").trim():+c,i=l.substr(o+1).trim();return t},J0=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},Q0=function(e){var t=(e+"").split("("),n=At[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Z0(t[1])]:J0(e).split(",").map(pp)):At._CE&&$0.test(e)?At._CE("",e):n},j0=function(e){return function(t){return 1-e(1-t)}},as=function(e,t){return e&&(nn(e)?e:At[e]||Q0(e))||t},vs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Qn(e,function(o){At[o]=pi[o]=s,At[a=o.toLowerCase()]=n;for(var l in s)At[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=At[o+"."+l]=s[l]}),s},Lp=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},tc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/Kc*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*b0((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:Lp(o);return s=Kc/s,l.config=function(c,u){return r(e,c,u)},l},nc=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Lp(n);return i.config=function(s){return r(e,s)},i};Qn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;vs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});At.Linear.easeNone=At.none=At.Linear.easeIn;vs("Elastic",tc("in"),tc("out"),tc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};vs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);vs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});vs("Circ",function(r){return-(rp(1-r*r)-1)});vs("Sine",function(r){return r===1?1:-y0(r*S0)+1});vs("Back",nc("in"),nc("out"),nc());At.SteppedEase=At.steps=pi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-Xt;return function(o){return((i*So(0,a,o)|0)+s)*n}}};so.ease=At["quad.out"];Qn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return xf+=r+","+r+"Params,"});var Ip=function(e,t){this.id=M0++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:hp,this.set=t?t.getSetter:Tf},uo=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ua(this,+t.duration,1,1),this.data=t.data,$t&&(this._ctx=$t,$t.data.push(this)),co||ci.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,ua(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(fa(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(ql(this,n),!s._dp||s.parent||_p(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Hi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Xt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),dp(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+ch(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+ch(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?ca(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Xt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Rl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Xt?0:this._rts,this.totalTime(So(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Yl(this),I0(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(fa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Xt&&(this._tTime-=Xt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Zt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Hi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Jn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Rl(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=R0);var i=Tn;return Tn=n,Mf(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Tn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,uh(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,uh(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(vi(this,n),Jn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Jn(i)),this._dur||(this._zTime=-Xt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Xt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Xt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Xt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=nn(n)?n:mp,l=function(){var u=i.then;i.then=null,s&&s(),nn(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){Na(this)},r})();mi(uo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Xt,_prom:0,_ps:!1,_rts:1});var Zn=(function(r){ip(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Jn(n.sortChildren),Qt&&Hi(n.parent||Qt,rr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&vp(rr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return Ya(0,arguments,this),this},t.from=function(i,s,a){return Ya(1,arguments,this),this},t.fromTo=function(i,s,a,o){return Ya(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,Xa(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new un(i,s,vi(this,a),1),this},t.call=function(i,s,a){return Hi(this,un.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new un(i,a,vi(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,u){return a.runBackwards=1,Xa(a).immediateRender=Jn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,u)},t.staggerFromTo=function(i,s,a,o,l,c,u,d){return o.startAt=a,Xa(o).immediateRender=Jn(o.immediateRender),this.staggerTo(i,s,o,l,c,u,d)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Zt(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,g,_,m,p,S,b,x,y,E,w;if(this!==Qt&&u>l&&i>=0&&(u=l),u!==this._tTime||a||d){if(o!==this._time&&c&&(u+=this._time-o,i+=this._time-o),f=u,x=this._start,b=this._ts,p=!b,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(f=Zt(u%m),u===l?(_=this._repeat,f=c):(y=Zt(u/m),_=~~y,_&&_===y&&(f=c,_--),f>c&&(f=c)),y=ca(this._tTime,m),!o&&this._tTime&&y!==_&&this._tTime-y*m-this._dur<=0&&(y=_),E&&_&1&&(f=c-f,w=1),_!==y&&!this._lock){var v=E&&y&1,T=v===(E&&_&1);if(_<y&&(v=!v),o=v?0:u%c?c:u,this._lock=1,this.render(o||(w?0:Zt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&fi(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,y=_),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,T&&(this._lock=2,o=v?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=O0(this,Zt(o),Zt(f)),S&&(u-=f-(f=S._start))),this._tTime=u,this._time=f,this._act=!!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&c&&!s&&!y&&(fi(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(h=this._first;h;){if(g=h._next,(h._act||f>=h._start)&&h._ts&&S!==h){if(h.parent!==this)return this.render(i,s,a);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,a),f!==this._time||!this._ts&&!p){S=0,g&&(u+=this._zTime=-Xt);break}}h=g}else{h=this._last;for(var A=i<0?i:f;h;){if(g=h._prev,(h._act||A<=h._end)&&h._ts&&S!==h){if(h.parent!==this)return this.render(i,s,a);if(h.render(h._ts>0?(A-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(A-h._start)*h._ts,s,a||Tn&&Mf(h)),f!==this._time||!this._ts&&!p){S=0,g&&(u+=this._zTime=A?-Xt:Xt);break}}h=g}}if(S&&!s&&(this.pause(),S.render(f>=o?0:-Xt)._zTime=f>=o?1:-1,this._ts))return this._start=x,Yl(this),this.render(i,s,a);this._onUpdate&&!s&&fi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(x===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Fr(this,1),!s&&!(i<0&&!o)&&(u||o||!l)&&(fi(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(pr(s)||(s=vi(this,s,i)),!(i instanceof uo)){if(In(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Sn(i))return this.addLabel(i,s);if(nn(i))i=un.delayedCall(0,i);else return this}return this!==i?Hi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Ei);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof un?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return Sn(i)?this.removeLabel(i):nn(i)?this.killTweensOf(i):(i.parent===this&&Xl(this,i),i===this._recent&&(this._recent=this._last),ss(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Zt(ci.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=vi(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=un.delayedCall(0,s||oo,a);return o.data="isPause",this._hasPause=1,Hi(this,o,vi(this,i))},t.removePause=function(i){var s=this._first;for(i=vi(this,i);s;)s._start===i&&s.data==="isPause"&&Fr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Ar!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=Ti(i),l=this._first,c=pr(s),u;l;)l instanceof un?P0(l._targets,o)&&(c?(!Ar||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=vi(a,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,g=un.to(a,mi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Xt,onStart:function(){if(a.pause(),!h){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==m&&ua(g,m,0,1).render(g._time,!0,!0),h=1}u&&u.apply(g,d||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,mi({startAt:{time:vi(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),fh(this,vi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),fh(this,vi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Xt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Zt(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return ss(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),ss(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=Ei,c,u,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Hi(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Zt(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;ua(a,a===Qt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Qt._ts&&(dp(Qt,Rl(i,Qt)),fp=ci.frame),ci.frame>=oh){oh+=di.autoSleep||120;var s=Qt._first;if((!s||!s._ts)&&di.autoSleep&&ci._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ci.sleep()}}},e})(uo);mi(Zn.prototype,{_lock:0,_hasPause:0,_forcing:0});var eg=function(e,t,n,i,s,a,o){var l=new jn(this._pt,e,t,0,1,zp,null,s),c=0,u=0,d,f,h,g,_,m,p,S;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=lo(i)),a&&(S=[n,i],a(S,e,t),n=S[0],i=S[1]),f=n.match(Ql)||[];d=Ql.exec(i);)g=d[0],_=i.substring(c,d.index),h?h=(h+1)%5:_.substr(-5)==="rgba("&&(h=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Qs(m,g)-m:parseFloat(g)-m,m:h&&h<4?Math.round:0},c=Ql.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(op.test(i)||p)&&(l.e=0),this._pt=l,l},yf=function(e,t,n,i,s,a,o,l,c,u){nn(i)&&(i=i(s||0,e,a));var d=e[t],f=n!=="get"?n:nn(d)?c?e[t.indexOf("set")||!nn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=nn(d)?c?sg:Op:Ef,g;if(Sn(i)&&(~i.indexOf("random(")&&(i=lo(i)),i.charAt(1)==="="&&(g=Qs(f,i)+(Pn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||iu)return!isNaN(f*i)&&i!==""?(g=new jn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?og:Bp,0,h),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!d&&!(t in e)&&_f(t,i),eg.call(this,e,t,f,i,h,l||di.stringFilter,c))},tg=function(e,t,n,i,s){if(nn(e)&&(e=qa(e,s,t,n,i)),!Ki(e)||e.style&&e.nodeType||In(e)||sp(e))return Sn(e)?qa(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=qa(e[o],s,t,n,i);return a},Up=function(e,t,n,i,s,a){var o,l,c,u;if(oi[e]&&(o=new oi[e]).init(s,o.rawVars?t[e]:tg(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new jn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==qs))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Ar,iu,bf=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,S=p&&p.data==="nested"?p.vars.targets:m,b=e._overwrite==="auto"&&!df,x=e.timeline,y=i.easeReverse||d,E,w,v,T,A,U,I,G,F,X,L,D,V;if(x&&(!f||!s)&&(s="none"),e._ease=as(s,so.ease),e._rEase=y&&(as(y)||e._ease),e._from=!x&&!!i.runBackwards,e._from&&(e.ratio=1),!x||f&&!i.stagger){if(G=m[0]?rs(m[0]).harness:0,D=G&&i[G.prop],E=Cl(i,vf),_&&(_._zTime<0&&_.progress(1),t<0&&u&&o&&!h?_.render(-1,!0):_.revert(u&&g?fl:C0),_._lazy=0),a){if(Fr(e._startAt=un.set(m,mi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Jn(l),startAt:null,delay:0,onUpdate:c&&function(){return fi(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Tn||!o&&!h)&&e._startAt.revert(fl),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(o=!1),v=mi({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Jn(l),immediateRender:o,stagger:0,parent:p},E),D&&(v[G.prop]=D),Fr(e._startAt=un.set(m,v)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Tn?e._startAt.revert(fl):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,Xt,Xt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Jn(l)||l&&!g,w=0;w<m.length;w++){if(A=m[w],I=A._gsap||Sf(m)[w]._gsap,e._ptLookup[w]=X={},Jc[I.id]&&Lr.length&&Al(),L=S===m?w:S.indexOf(A),G&&(F=new G).init(A,D||E,e,L,S)!==!1&&(e._pt=T=new jn(e._pt,A,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(W){X[W]=T}),F.priority&&(U=1)),!G||D)for(v in E)oi[v]&&(F=Up(v,E,e,L,A,S))?F.priority&&(U=1):X[v]=T=yf.call(e,A,v,"get",E[v],L,S,0,i.stringFilter);e._op&&e._op[w]&&e.kill(A,e._op[w]),b&&e._pt&&(Ar=e,Qt.killTweensOf(A,X,e.globalTime(t)),V=!e.parent,Ar=0),e._pt&&l&&(Jc[I.id]=1)}U&&kp(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!V,f&&t<=0&&x.render(Ei,!0,!0)},ng=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return iu=1,e.vars[t]="+=0",bf(e,o),iu=0,l?ao(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,d.e&&(d.e=rn(n)+Pn(d.e)),d.b&&(d.b=u.s+Pn(d.b))},ig=function(e,t){var n=e[0]?rs(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=la({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},rg=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(In(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},qa=function(e,t,n,i,s){return nn(e)?e.call(t,n,i,s):Sn(e)&&~e.indexOf("random(")?lo(e):e},Np=xf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Fp={};Qn(Np+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Fp[r]=1});var un=(function(r){ip(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:Xa(i))||this;var l=o.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=i.parent||Qt,S=(In(n)||sp(n)?pr(n[0]):"length"in i)?[n]:Ti(n),b,x,y,E,w,v,T,A;if(o._targets=S.length?Sf(S):ao("GSAP target "+n+" not found. https://gsap.com",!di.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=h,g||f||bo(c)||bo(u)){i=o.vars;var U=i.easeReverse||i.yoyoEase;if(b=o.timeline=new Zn({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:S}),b.kill(),b.parent=b._dp=rr(o),b._start=0,f||bo(c)||bo(u)){if(E=S.length,T=f&&yp(f),Ki(f))for(w in f)~Np.indexOf(w)&&(A||(A={}),A[w]=f[w]);for(x=0;x<E;x++)y=Cl(i,Fp),y.stagger=0,U&&(y.easeReverse=U),A&&la(y,A),v=S[x],y.duration=+qa(c,rr(o),x,v,S),y.delay=(+qa(u,rr(o),x,v,S)||0)-o._delay,!f&&E===1&&y.delay&&(o._delay=u=y.delay,o._start+=u,y.delay=0),b.to(v,y,T?T(x,v,S):0),b._ease=At.none;b.duration()?c=u=0:o.timeline=0}else if(g){Xa(mi(b.vars.defaults,{ease:"none"})),b._ease=as(g.ease||i.ease||"none");var I=0,G,F,X;if(In(g))g.forEach(function(L){return b.to(S,L,">")}),b.duration();else{y={};for(w in g)w==="ease"||w==="easeEach"||rg(w,g[w],y,g.easeEach);for(w in y)for(G=y[w].sort(function(L,D){return L.t-D.t}),I=0,x=0;x<G.length;x++)F=G[x],X={ease:F.e,duration:(F.t-(x?G[x-1].t:0))/100*c},X[w]=F.v,b.to(S,X,I),I+=X.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return h===!0&&!df&&(Ar=rr(o),Qt.killTweensOf(S),Ar=0),Hi(p,rr(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!g&&o._start===Zt(p._time)&&Jn(d)&&U0(rr(o))&&p.data!=="nested")&&(o._tTime=-Xt,o.render(Math.max(0,-u)||0)),m&&vp(rr(o),m),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Xt&&!u?l:i<Xt?0:i,f,h,g,_,m,p,S,b;if(!c)F0(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,b=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,a);if(f=Zt(d%_),d===l?(g=this._repeat,f=c):(m=Zt(d/_),g=~~m,g&&g===m?(f=c,g--):f>c&&(f=c)),p=this._yoyo&&g&1,p&&(f=c-f),m=ca(this._tTime,_),f===o&&!a&&this._initted&&g===m)return this._tTime=d,this;g!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=a=1,this.render(Zt(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(xp(this,u?i:f,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var x=f<o;if(x!==this._inv){var y=x?o:c-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=y?(x?-1:1)/y:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=S=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=S=this._ease(f/c);if(this._from&&(this.ratio=S=1-S),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!m&&(fi(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(S,h.d),h=h._next;b&&b.render(i<0?i:b._dur*b._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Qc(this,i,s,a),fi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&fi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&Qc(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Fr(this,1),!s&&!(u&&!o)&&(d||o||p)&&(fi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){co||ci.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||bf(this,c),u=this._ease(c/this._dur),ng(this,i,s,a,o,u,c,l)?this.resetTo(i,s,a,o,1):(ql(this,0),this.parent||gp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Na(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Tn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Ar&&Ar.vars.overwrite!==!0)._first||Na(this),this.parent&&a!==this.timeline.totalDuration()&&ua(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Ti(i):o,c=this._ptLookup,u=this._pt,d,f,h,g,_,m,p;if((!s||s==="all")&&L0(o,l))return s==="all"&&(this._pt=0),Na(this);for(d=this._op=this._op||[],s!=="all"&&(Sn(s)&&(_={},Qn(s,function(S){return _[S]=1}),s=_),s=ig(o,s)),p=o.length;p--;)if(~l.indexOf(o[p])){f=c[p],s==="all"?(d[p]=s,g=f,h={}):(h=d[p]=d[p]||{},g=s);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Xl(this,m,"_pt"),delete f[_]),h!=="all"&&(h[_]=1)}return this._initted&&!this._pt&&u&&Na(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Ya(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return Ya(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Qt.killTweensOf(i,s,a)},e})(uo);mi(un.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Qn("staggerTo,staggerFrom,staggerFromTo",function(r){un[r]=function(){var e=new Zn,t=eu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Ef=function(e,t,n){return e[t]=n},Op=function(e,t,n){return e[t](n)},sg=function(e,t,n,i){return e[t](i.fp,n)},ag=function(e,t,n){return e.setAttribute(t,n)},Tf=function(e,t){return nn(e[t])?Op:pf(e[t])&&e.setAttribute?ag:Ef},Bp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},og=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},zp=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},wf=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},lg=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},cg=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Xl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},ug=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},kp=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},jn=(function(){function r(t,n,i,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Bp,this.d=l||this,this.set=c||Ef,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=ug,this.m=n,this.mt=s,this.tween=i},r})();Qn(xf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return vf[r]=1});pi.TweenMax=pi.TweenLite=un;pi.TimelineLite=pi.TimelineMax=Zn;Qt=new Zn({sortChildren:!1,defaults:so,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});di.stringFilter=Dp;var os=[],dl={},fg=[],dh=0,hg=0,ic=function(e){return(dl[e]||fg).map(function(t){return t()})},ru=function(){var e=Date.now(),t=[];e-dh>2&&(ic("matchMediaInit"),os.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=zi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),ic("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),dh=e,ic("matchMedia"))},Gp=(function(){function r(t,n){this.selector=n&&tu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=hg++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){nn(n)&&(s=i,i=n,n=nn);var a=this,o=function(){var c=$t,u=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=tu(s)),$t=a,d=i.apply(a,arguments),nn(d)&&a._r.push(d),$t=c,a.selector=u,a.isReverted=!1,d};return a.last=o,n===nn?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=$t;$t=null,n(this),$t=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof un&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Zn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof un)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=os.length;a--;)os[a].id===this.id&&os.splice(a,1)},e.revert=function(n){this.kill(n||{})},r})(),dg=(function(){function r(t){this.contexts=[],this.scope=t,$t&&$t.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Ki(n)||(n={matches:n});var a=new Gp(0,s||this.scope),o=a.conditions={},l,c,u;$t&&!a.selector&&(a.selector=$t.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?u=1:(l=zi.matchMedia(n[c]),l&&(os.indexOf(a)<0&&os.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(ru):l.addEventListener("change",ru)));return u&&i(a,function(d){return a.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),Pl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Cp(i)})},timeline:function(e){return new Zn(e)},getTweensOf:function(e,t){return Qt.getTweensOf(e,t)},getProperty:function(e,t,n,i){Sn(e)&&(e=Ti(e)[0]);var s=rs(e||{}).get,a=n?mp:pp;return n==="native"&&(n=""),e&&(t?a((oi[t]&&oi[t].get||s)(e,t,n,i)):function(o,l,c){return a((oi[o]&&oi[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=Ti(e),e.length>1){var i=e.map(function(u){return ti.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var a=oi[t],o=rs(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var d=new a;qs._pt=0,d.init(e,n?u+n:u,qs,0,[e]),d.render(1,d),qs._pt&&wf(1,qs)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var i,s=ti.to(e,mi((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return Qt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=as(e.ease,so.ease)),lh(so,e||{})},config:function(e){return lh(di,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!oi[o]&&!pi[o]&&ao(t+" effect requires "+o+" plugin.")}),jl[t]=function(o,l,c){return n(Ti(o),mi(l||{},s),c)},a&&(Zn.prototype[t]=function(o,l,c){return this.add(jl[t](o,Ki(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){At[e]=as(t)},parseEase:function(e,t){return arguments.length?as(e,t):At},getById:function(e){return Qt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Zn(e),i,s;for(n.smoothChildTiming=Jn(e.smoothChildTiming),Qt.remove(n),n._dp=0,n._time=n._tTime=Qt._time,i=Qt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof un&&i.vars.onComplete===i._targets[0]))&&Hi(n,i,i._start-i._delay),i=s;return Hi(Qt,n,0),n},context:function(e,t){return e?new Gp(e,t):$t},matchMedia:function(e){return new dg(e)},matchMediaRefresh:function(){return os.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||ru()},addEventListener:function(e,t){var n=dl[e]||(dl[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=dl[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:W0,wrapYoyo:X0,distribute:yp,random:Ep,snap:bp,normalize:V0,getUnit:Pn,clamp:z0,splitColor:Rp,toArray:Ti,selector:tu,mapRange:wp,pipe:G0,unitize:H0,interpolate:Y0,shuffle:Mp},install:cp,effects:jl,ticker:ci,updateRoot:Zn.updateRoot,plugins:oi,globalTimeline:Qt,core:{PropTween:jn,globals:up,Tween:un,Timeline:Zn,Animation:uo,getCache:rs,_removeLinkedListItem:Xl,reverting:function(){return Tn},context:function(e){return e&&$t&&($t.data.push(e),e._ctx=$t),$t},suppressOverwrites:function(e){return df=e}}};Qn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Pl[r]=un[r]});ci.add(Zn.updateRoot);qs=Pl.to({},{duration:0});var pg=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},mg=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=pg(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},rc=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(Sn(s)&&(l={},Qn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}mg(o,s)}}}},ti=Pl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Tn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},rc("roundProps",nu),rc("modifiers"),rc("snap",bp))||Pl;un.version=Zn.version=ti.version="3.15.0";lp=1;mf()&&fa();At.Power0;At.Power1;At.Power2;At.Power3;At.Power4;At.Linear;At.Quad;At.Cubic;At.Quart;At.Quint;At.Strong;At.Elastic;At.Back;At.SteppedEase;At.Bounce;At.Sine;At.Expo;At.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ph,Cr,js,Af,es,mh,Cf,gg=function(){return typeof window<"u"},mr={},Jr=180/Math.PI,ea=Math.PI/180,Ms=Math.atan2,gh=1e8,Rf=/([A-Z])/g,_g=/(left|right|width|margin|padding|x)/i,vg=/[\s,\(]\S/,Wi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},su=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},xg=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Sg=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Mg=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},yg=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Hp=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Vp=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},bg=function(e,t,n){return e.style[t]=n},Eg=function(e,t,n){return e.style.setProperty(t,n)},Tg=function(e,t,n){return e._gsap[t]=n},wg=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Ag=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Cg=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},jt="transform",ei=jt+"Origin",Rg=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in mr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Wi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=sr(i,o)}):this.tfm[e]=a.x?a[e]:sr(i,e),e===ei&&(this.tfm.zOrigin=a.zOrigin);else return Wi.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(jt)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(ei,t,"")),e=jt}(s||t)&&this.props.push(e,t,s[e])},Wp=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Pg=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Rf,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Cf(),(!s||!s.isStart)&&!n[jt]&&(Wp(n),i.zOrigin&&n[ei]&&(n[ei]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Xp=function(e,t){var n={target:e,props:[],revert:Pg,save:Rg};return e._gsap||ti.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Yp,au=function(e,t){var n=Cr.createElementNS?Cr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Cr.createElement(e);return n&&n.style?n:Cr.createElement(e)},hi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Rf,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ha(t)||t,1)||""},_h="O,Moz,ms,Ms,Webkit".split(","),ha=function(e,t,n){var i=t||es,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(_h[a]+e in s););return a<0?null:(a===3?"ms":a>=0?_h[a]:"")+e},ou=function(){gg()&&window.document&&(ph=window,Cr=ph.document,js=Cr.documentElement,es=au("div")||{style:{}},au("div"),jt=ha(jt),ei=jt+"Origin",es.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Yp=!!ha("perspective"),Cf=ti.core.reverting,Af=1)},vh=function(e){var t=e.ownerSVGElement,n=au("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),js.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),js.removeChild(n),s},xh=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},qp=function(e){var t,n;try{t=e.getBBox()}catch{t=vh(e),n=1}return t&&(t.width||t.height)||n||(t=vh(e)),t&&!t.width&&!t.x&&!t.y?{x:+xh(e,["x","cx","x1"])||0,y:+xh(e,["y","cy","y1"])||0,width:0,height:0}:t},$p=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&qp(e))},Or=function(e,t){if(t){var n=e.style,i;t in mr&&t!==ei&&(t=jt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Rf,"-$1").toLowerCase())):n.removeAttribute(t)}},Rr=function(e,t,n,i,s,a){var o=new jn(e._pt,t,n,0,1,a?Vp:Hp);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Sh={deg:1,rad:1,turn:1},Dg={grid:1,flex:1},Br=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=es.style,l=_g.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",g,_,m,p;if(i===a||!s||Sh[i]||Sh[a])return s;if(a!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&$p(e),(h||a==="%")&&(mr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],rn(h?s/g*d:s/100*g);if(o[l?"width":"height"]=d+(f?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Cr||!_.appendChild)&&(_=Cr.body),m=_._gsap,m&&h&&m.width&&l&&m.time===ci.time&&!m.uncache)return rn(s/m.width*d);if(h&&(t==="height"||t==="width")){var S=e.style[t];e.style[t]=d+i,g=e[u],S?e.style[t]=S:Or(e,t)}else(h||a==="%")&&!Dg[hi(_,"display")]&&(o.position=hi(e,"position")),_===e&&(o.position="static"),_.appendChild(es),g=es[u],_.removeChild(es),o.position="absolute";return l&&h&&(m=rs(_),m.time=ci.time,m.width=_[u]),rn(f?g*s/d:g&&s?d/g*s:0)},sr=function(e,t,n,i){var s;return Af||ou(),t in Wi&&t!=="transform"&&(t=Wi[t],~t.indexOf(",")&&(t=t.split(",")[0])),mr[t]&&t!=="transform"?(s=ho(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Ll(hi(e,ei))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Dl[t]&&Dl[t](e,t,n)||hi(e,t)||hp(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Br(e,t,s,n)+n:s},Lg=function(e,t,n,i){if(!n||n==="none"){var s=ha(t,e,1),a=s&&hi(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=hi(e,"borderTopColor"))}var o=new jn(this._pt,e.style,t,0,1,zp),l=0,c=0,u,d,f,h,g,_,m,p,S,b,x,y;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=hi(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=hi(e,t)||i,_?e.style[t]=_:Or(e,t)),u=[n,i],Dp(u),n=u[0],i=u[1],f=n.match(Ys)||[],y=i.match(Ys)||[],y.length){for(;d=Ys.exec(i);)m=d[0],S=i.substring(l,d.index),g?g=(g+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(h=parseFloat(_)||0,x=_.substr((h+"").length),m.charAt(1)==="="&&(m=Qs(h,m)+x),p=parseFloat(m),b=m.substr((p+"").length),l=Ys.lastIndex-b.length,b||(b=b||di.units[t]||x,l===i.length&&(i+=b,o.e+=b)),x!==b&&(h=Br(e,t,_,b)||0),o._pt={_next:o._pt,p:S||c===1?S:",",s:h,c:p-h,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Vp:Hp;return op.test(i)&&(o.e=0),this._pt=o,o},Mh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Ig=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Mh[n]||n,t[1]=Mh[i]||i,t.join(" ")},Ug=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],mr[o]&&(l=1,o=o==="transformOrigin"?ei:jt),Or(n,o);l&&(Or(n,jt),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ho(n,1),a.uncache=1,Wp(i)))}},Dl={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new jn(e._pt,t,n,0,0,Ug);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},fo=[1,0,0,1,0,0],Kp={},Zp=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},yh=function(e){var t=hi(e,jt);return Zp(t)?fo:t.substr(7).match(ap).map(rn)},Pf=function(e,t){var n=e._gsap||rs(e),i=e.style,s=yh(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?fo:s):(s===fo&&!e.offsetParent&&e!==js&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,js.appendChild(e)),s=yh(e),l?i.display=l:Or(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):js.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},lu=function(e,t,n,i,s,a){var o=e._gsap,l=s||Pf(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,d=o.xOffset||0,f=o.yOffset||0,h=l[0],g=l[1],_=l[2],m=l[3],p=l[4],S=l[5],b=t.split(" "),x=parseFloat(b[0])||0,y=parseFloat(b[1])||0,E,w,v,T;n?l!==fo&&(w=h*m-g*_)&&(v=x*(m/w)+y*(-_/w)+(_*S-m*p)/w,T=x*(-g/w)+y*(h/w)-(h*S-g*p)/w,x=v,y=T):(E=qp(e),x=E.x+(~b[0].indexOf("%")?x/100*E.width:x),y=E.y+(~(b[1]||b[0]).indexOf("%")?y/100*E.height:y)),i||i!==!1&&o.smooth?(p=x-c,S=y-u,o.xOffset=d+(p*h+S*_)-p,o.yOffset=f+(p*g+S*m)-S):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=y,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[ei]="0px 0px",a&&(Rr(a,o,"xOrigin",c,x),Rr(a,o,"yOrigin",u,y),Rr(a,o,"xOffset",d,o.xOffset),Rr(a,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+y)},ho=function(e,t){var n=e._gsap||new Ip(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=hi(e,ei)||"0",u,d,f,h,g,_,m,p,S,b,x,y,E,w,v,T,A,U,I,G,F,X,L,D,V,W,R,Q,Se,Re,Ue,Me;return u=d=f=_=m=p=S=b=x=0,h=g=1,n.svg=!!(e.getCTM&&$p(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[jt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[jt]!=="none"?l[jt]:"")),i.scale=i.rotate=i.translate="none"),w=Pf(e,n.svg),n.svg&&(n.uncache?(V=e.getBBox(),c=n.xOrigin-V.x+"px "+(n.yOrigin-V.y)+"px",D=""):D=!t&&e.getAttribute("data-svg-origin"),lu(e,D||c,!!D||n.originIsAbsolute,n.smooth!==!1,w)),y=n.xOrigin||0,E=n.yOrigin||0,w!==fo&&(U=w[0],I=w[1],G=w[2],F=w[3],u=X=w[4],d=L=w[5],w.length===6?(h=Math.sqrt(U*U+I*I),g=Math.sqrt(F*F+G*G),_=U||I?Ms(I,U)*Jr:0,S=G||F?Ms(G,F)*Jr+_:0,S&&(g*=Math.abs(Math.cos(S*ea))),n.svg&&(u-=y-(y*U+E*G),d-=E-(y*I+E*F))):(Me=w[6],Re=w[7],R=w[8],Q=w[9],Se=w[10],Ue=w[11],u=w[12],d=w[13],f=w[14],v=Ms(Me,Se),m=v*Jr,v&&(T=Math.cos(-v),A=Math.sin(-v),D=X*T+R*A,V=L*T+Q*A,W=Me*T+Se*A,R=X*-A+R*T,Q=L*-A+Q*T,Se=Me*-A+Se*T,Ue=Re*-A+Ue*T,X=D,L=V,Me=W),v=Ms(-G,Se),p=v*Jr,v&&(T=Math.cos(-v),A=Math.sin(-v),D=U*T-R*A,V=I*T-Q*A,W=G*T-Se*A,Ue=F*A+Ue*T,U=D,I=V,G=W),v=Ms(I,U),_=v*Jr,v&&(T=Math.cos(v),A=Math.sin(v),D=U*T+I*A,V=X*T+L*A,I=I*T-U*A,L=L*T-X*A,U=D,X=V),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),h=rn(Math.sqrt(U*U+I*I+G*G)),g=rn(Math.sqrt(L*L+Me*Me)),v=Ms(X,L),S=Math.abs(v)>2e-4?v*Jr:0,x=Ue?1/(Ue<0?-Ue:Ue):0),n.svg&&(D=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Zp(hi(e,jt)),D&&e.setAttribute("transform",D))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(h*=-1,S+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,S+=S<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=rn(h),n.scaleY=rn(g),n.rotation=rn(_)+o,n.rotationX=rn(m)+o,n.rotationY=rn(p)+o,n.skewX=S+o,n.skewY=b+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[ei]=Ll(c)),n.xOffset=n.yOffset=0,n.force3D=di.force3D,n.renderTransform=n.svg?Fg:Yp?Jp:Ng,n.uncache=0,n},Ll=function(e){return(e=e.split(" "))[0]+" "+e[1]},sc=function(e,t,n){var i=Pn(t);return rn(parseFloat(t)+parseFloat(Br(e,"x",n+"px",i)))+i},Ng=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Jp(e,t)},Vr="0deg",Ma="0px",Wr=") ",Jp=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,S=n.target,b=n.zOrigin,x="",y=p==="auto"&&e&&e!==1||p===!0;if(b&&(d!==Vr||u!==Vr)){var E=parseFloat(u)*ea,w=Math.sin(E),v=Math.cos(E),T;E=parseFloat(d)*ea,T=Math.cos(E),a=sc(S,a,w*T*-b),o=sc(S,o,-Math.sin(E)*-b),l=sc(S,l,v*T*-b+b)}m!==Ma&&(x+="perspective("+m+Wr),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(y||a!==Ma||o!==Ma||l!==Ma)&&(x+=l!==Ma||y?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Wr),c!==Vr&&(x+="rotate("+c+Wr),u!==Vr&&(x+="rotateY("+u+Wr),d!==Vr&&(x+="rotateX("+d+Wr),(f!==Vr||h!==Vr)&&(x+="skew("+f+", "+h+Wr),(g!==1||_!==1)&&(x+="scale("+g+", "+_+Wr),S.style[jt]=x||"translate(0, 0)"},Fg=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,S=n.forceCSS,b=parseFloat(a),x=parseFloat(o),y,E,w,v,T;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ea,c*=ea,y=Math.cos(l)*d,E=Math.sin(l)*d,w=Math.sin(l-c)*-f,v=Math.cos(l-c)*f,c&&(u*=ea,T=Math.tan(c-u),T=Math.sqrt(1+T*T),w*=T,v*=T,u&&(T=Math.tan(u),T=Math.sqrt(1+T*T),y*=T,E*=T)),y=rn(y),E=rn(E),w=rn(w),v=rn(v)):(y=d,v=f,E=w=0),(b&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(b=Br(h,"x",a,"px"),x=Br(h,"y",o,"px")),(g||_||m||p)&&(b=rn(b+g-(g*y+_*w)+m),x=rn(x+_-(g*E+_*v)+p)),(i||s)&&(T=h.getBBox(),b=rn(b+i/100*T.width),x=rn(x+s/100*T.height)),T="matrix("+y+","+E+","+w+","+v+","+b+","+x+")",h.setAttribute("transform",T),S&&(h.style[jt]=T)},Og=function(e,t,n,i,s){var a=360,o=Sn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Jr:1),c=l-i,u=i+c+"deg",d,f;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*gh)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*gh)%a-~~(c/a)*a)),e._pt=f=new jn(e._pt,t,n,i,c,xg),f.e=u,f.u="deg",e._props.push(n),f},bh=function(e,t){for(var n in t)e[n]=t[n];return e},Bg=function(e,t,n){var i=bh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,d,f,h,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[jt]=t,o=ho(n,1),Or(n,jt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[jt],a[jt]=t,o=ho(n,1),a[jt]=c);for(l in mr)c=i[l],u=o[l],c!==u&&s.indexOf(l)<0&&(h=Pn(c),g=Pn(u),d=h!==g?Br(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new jn(e._pt,o,l,d,f-d,su),e._pt.u=g||0,e._props.push(l));bh(o,i)};Qn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Dl[e>1?"border"+r:r]=function(o,l,c,u,d){var f,h;if(arguments.length<4)return f=a.map(function(g){return sr(o,g,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},a.forEach(function(g,_){return h[g]=f[_]=f[_]||f[(_-1)/2|0]}),o.init(l,h,d)}});var Qp={name:"css",register:ou,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,d,f,h,g,_,m,p,S,b,x,y,E,w,v,T;Af||ou(),this.styles=this.styles||Xp(e),v=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(oi[_]&&Up(_,t,n,i,e,s)))){if(h=typeof u,g=Dl[_],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=lo(u)),g)g(this,e,_,u,n)&&(w=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",Ir.lastIndex=0,Ir.test(c)||(m=Pn(c),p=Pn(u),p?m!==p&&(c=Br(e,_,c,p)+p):m&&(u+=m)),this.add(o,"setProperty",c,u,i,s,0,0,_),a.push(_),v.push(_,0,o[_]);else if(h!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],Sn(c)&&~c.indexOf("random(")&&(c=lo(c)),Pn(c+"")||c==="auto"||(c+=di.units[_]||Pn(sr(e,_))||""),(c+"").charAt(1)==="="&&(c=sr(e,_))):c=sr(e,_),f=parseFloat(c),S=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),S&&(u=u.substr(2)),d=parseFloat(u),_ in Wi&&(_==="autoAlpha"&&(f===1&&sr(e,"visibility")==="hidden"&&d&&(f=0),v.push("visibility",0,o.visibility),Rr(this,o,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=Wi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),b=_ in mr,b){if(this.styles.save(_),T=u,h==="string"&&u.substring(0,6)==="var(--"){if(u=hi(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var A=e.style.perspective;e.style.perspective=u,u=hi(e,"perspective"),A?e.style.perspective=A:Or(e,"perspective")}d=parseFloat(u)}if(x||(y=e._gsap,y.renderTransform&&!t.parseTransform||ho(e,t.parseTransform),E=t.smoothOrigin!==!1&&y.smooth,x=this._pt=new jn(this._pt,o,jt,0,1,y.renderTransform,y,0,-1),x.dep=1),_==="scale")this._pt=new jn(this._pt,y,"scaleY",y.scaleY,(S?Qs(y.scaleY,S+d):d)-y.scaleY||0,su),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){v.push(ei,0,o[ei]),u=Ig(u),y.svg?lu(e,u,0,E,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==y.zOrigin&&Rr(this,y,"zOrigin",y.zOrigin,p),Rr(this,o,_,Ll(c),Ll(u)));continue}else if(_==="svgOrigin"){lu(e,u,1,E,0,this);continue}else if(_ in Kp){Og(this,y,_,f,S?Qs(f,S+u):u);continue}else if(_==="smoothOrigin"){Rr(this,y,"smooth",y.smooth,u);continue}else if(_==="force3D"){y[_]=u;continue}else if(_==="transform"){Bg(this,u,e);continue}}else _ in o||(_=ha(_)||_);if(b||(d||d===0)&&(f||f===0)&&!vg.test(u)&&_ in o)m=(c+"").substr((f+"").length),d||(d=0),p=Pn(u)||(_ in di.units?di.units[_]:m),m!==p&&(f=Br(e,_,c,p)),this._pt=new jn(this._pt,b?y:o,_,f,(S?Qs(f,S+d):d)-f,!b&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?yg:su),this._pt.u=p||0,b&&T!==u?(this._pt.b=c,this._pt.e=T,this._pt.r=Mg):m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=Sg);else if(_ in o)Lg.call(this,e,_,c,S?S+u:u);else if(_ in e)this.add(e,_,c||e[_],S?S+u:u,i,s);else if(_!=="parseTransform"){_f(_,u);continue}b||(_ in o?v.push(_,0,o[_]):typeof e[_]=="function"?v.push(_,2,e[_]()):v.push(_,1,c||e[_])),a.push(_)}}w&&kp(this)},render:function(e,t){if(t.tween._time||!Cf())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:sr,aliases:Wi,getSetter:function(e,t,n){var i=Wi[t];return i&&i.indexOf(",")<0&&(t=i),t in mr&&t!==ei&&(e._gsap.x||sr(e,"x"))?n&&mh===n?t==="scale"?wg:Tg:(mh=n||{})&&(t==="scale"?Ag:Cg):e.style&&!pf(e.style[t])?bg:~t.indexOf("-")?Eg:Tf(e,t)},core:{_removeProperty:Or,_getMatrix:Pf}};ti.utils.checkPrefix=ha;ti.core.getStyleSaver=Xp;(function(r,e,t,n){var i=Qn(r+","+e+","+t,function(s){mr[s]=1});Qn(e,function(s){di.units[s]="deg",Kp[s]=1}),Wi[i[13]]=r+","+e,Qn(n,function(s){var a=s.split(":");Wi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Qn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){di.units[r]="px"});ti.registerPlugin(Qp);var Oa=ti.registerPlugin(Qp)||ti;Oa.core.Tween;function zg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function kg(r,e,t){return e&&zg(r.prototype,e),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var bn,pl,ui,Pr,Dr,ta,jp,Qr,na,em,cr,Di,tm,nm=function(){return bn||typeof window<"u"&&(bn=window.gsap)&&bn.registerPlugin&&bn},im=1,$s=[],St=[],qi=[],$a=Date.now,cu=function(e,t){return t},Gg=function(){var e=na.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,St),i.push.apply(i,qi),St=n,qi=i,cu=function(a,o){return t[a](o)}},Ur=function(e,t){return~qi.indexOf(e)&&qi[qi.indexOf(e)+1][t]},Ka=function(e){return!!~em.indexOf(e)},zn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},On=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Eo="scrollLeft",To="scrollTop",uu=function(){return cr&&cr.isPressed||St.cache++},Il=function(e,t){var n=function i(s){if(s||s===0){im&&(ui.history.scrollRestoration="manual");var a=cr&&cr.isPressed;s=i.v=Math.round(s)||(cr&&cr.iOS?1:0),e(s),i.cacheID=St.cache,a&&cu("ss",s)}else(t||St.cache!==i.cacheID||cu("ref"))&&(i.cacheID=St.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Xn={s:Eo,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Il(function(r){return arguments.length?ui.scrollTo(r,dn.sc()):ui.pageXOffset||Pr[Eo]||Dr[Eo]||ta[Eo]||0})},dn={s:To,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Xn,sc:Il(function(r){return arguments.length?ui.scrollTo(Xn.sc(),r):ui.pageYOffset||Pr[To]||Dr[To]||ta[To]||0})},$n=function(e,t){return(t&&t._ctx&&t._ctx.selector||bn.utils.toArray)(e)[0]||(typeof e=="string"&&bn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Hg=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},zr=function(e,t){var n=t.s,i=t.sc;Ka(e)&&(e=Pr.scrollingElement||Dr);var s=St.indexOf(e),a=i===dn.sc?1:2;!~s&&(s=St.push(e)-1),St[s+a]||zn(e,"scroll",uu);var o=St[s+a],l=o||(St[s+a]=Il(Ur(e,n),!0)||(Ka(e)?i:Il(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=bn.getProperty(e,"scrollBehavior")==="smooth"),l},fu=function(e,t,n){var i=e,s=e,a=$a(),o=a,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=$a();_||m-a>l?(s=i,i=g,o=a,a=m):n?i+=g:i=s+(g-s)/(m-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},f=function(g){var _=o,m=s,p=$a();return(g||g===0)&&g!==i&&u(g),a===o||p-o>c?0:(i+(n?m:-m))/((n?p:a)-_)*1e3};return{update:u,reset:d,getVelocity:f}},ya=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Eh=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},rm=function(){na=bn.core.globals().ScrollTrigger,na&&na.core&&Gg()},sm=function(e){return bn=e||nm(),!pl&&bn&&typeof document<"u"&&document.body&&(ui=window,Pr=document,Dr=Pr.documentElement,ta=Pr.body,em=[ui,Pr,Dr,ta],bn.utils.clamp,tm=bn.core.context||function(){},Qr="onpointerenter"in ta?"pointer":"mouse",jp=sn.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Di=sn.eventTypes=("ontouchstart"in Dr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Dr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return im=0},500),pl=1),na||rm(),pl};Xn.op=dn;St.cache=0;var sn=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){pl||sm(bn)||console.warn("Please gsap.registerPlugin(Observer)"),na||rm();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,S=n.onDrag,b=n.onPress,x=n.onRelease,y=n.onRight,E=n.onLeft,w=n.onUp,v=n.onDown,T=n.onChangeX,A=n.onChangeY,U=n.onChange,I=n.onToggleX,G=n.onToggleY,F=n.onHover,X=n.onHoverEnd,L=n.onMove,D=n.ignoreCheck,V=n.isNormalizer,W=n.onGestureStart,R=n.onGestureEnd,Q=n.onWheel,Se=n.onEnable,Re=n.onDisable,Ue=n.onClick,Me=n.scrollSpeed,Ve=n.capture,J=n.allowClicks,ae=n.lockAxis,Ee=n.onLockAxis;this.target=o=$n(o)||Dr,this.vars=n,h&&(h=bn.utils.toArray(h)),i=i||1e-9,s=s||0,g=g||1,Me=Me||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(ta).lineHeight)||22);var Ye,xe,Be,We,Fe,$e,ot,q=this,it=0,Lt=0,Ot=n.passive||!u&&n.passive!==!1,Ke=zr(o,Xn),bt=zr(o,dn),z=Ke(),Nt=bt(),Xe=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Di[0]==="pointerdown",P=Ka(o),M=o.ownerDocument||Pr,O=[0,0,0],Y=[0,0,0],ne=0,ve=function(){return ne=$a()},_e=function(de,ze){return(q.event=de)&&h&&Hg(de.target,h)||ze&&Xe&&de.pointerType!=="touch"||D&&D(de,ze)},oe=function(){q._vx.reset(),q._vy.reset(),xe.pause(),d&&d(q)},le=function(){var de=q.deltaX=Eh(O),ze=q.deltaY=Eh(Y),pe=Math.abs(de)>=i,He=Math.abs(ze)>=i;U&&(pe||He)&&U(q,de,ze,O,Y),pe&&(y&&q.deltaX>0&&y(q),E&&q.deltaX<0&&E(q),T&&T(q),I&&q.deltaX<0!=it<0&&I(q),it=q.deltaX,O[0]=O[1]=O[2]=0),He&&(v&&q.deltaY>0&&v(q),w&&q.deltaY<0&&w(q),A&&A(q),G&&q.deltaY<0!=Lt<0&&G(q),Lt=q.deltaY,Y[0]=Y[1]=Y[2]=0),(We||Be)&&(L&&L(q),Be&&(m&&Be===1&&m(q),S&&S(q),Be=0),We=!1),$e&&!($e=!1)&&Ee&&Ee(q),Fe&&(Q(q),Fe=!1),Ye=0},k=function(de,ze,pe){O[pe]+=de,Y[pe]+=ze,q._vx.update(de),q._vy.update(ze),c?Ye||(Ye=requestAnimationFrame(le)):le()},se=function(de,ze){ae&&!ot&&(q.axis=ot=Math.abs(de)>Math.abs(ze)?"x":"y",$e=!0),ot!=="y"&&(O[2]+=de,q._vx.update(de,!0)),ot!=="x"&&(Y[2]+=ze,q._vy.update(ze,!0)),c?Ye||(Ye=requestAnimationFrame(le)):le()},ee=function(de){if(!_e(de,1)){de=ya(de,u);var ze=de.clientX,pe=de.clientY,He=ze-q.x,Le=pe-q.y,Je=q.isDragging;q.x=ze,q.y=pe,(Je||(He||Le)&&(Math.abs(q.startX-ze)>=s||Math.abs(q.startY-pe)>=s))&&(Be||(Be=Je?2:1),Je||(q.isDragging=!0),se(He,Le))}},fe=q.onPress=function(ge){_e(ge,1)||ge&&ge.button||(q.axis=ot=null,xe.pause(),q.isPressed=!0,ge=ya(ge),it=Lt=0,q.startX=q.x=ge.clientX,q.startY=q.y=ge.clientY,q._vx.reset(),q._vy.reset(),zn(V?o:M,Di[1],ee,Ot,!0),q.deltaX=q.deltaY=0,b&&b(q))},ue=q.onRelease=function(ge){if(!_e(ge,1)){On(V?o:M,Di[1],ee,!0);var de=!isNaN(q.y-q.startY),ze=q.isDragging,pe=ze&&(Math.abs(q.x-q.startX)>3||Math.abs(q.y-q.startY)>3),He=ya(ge);!pe&&de&&(q._vx.reset(),q._vy.reset(),u&&J&&bn.delayedCall(.08,function(){if($a()-ne>300&&!ge.defaultPrevented){if(ge.target.click)ge.target.click();else if(M.createEvent){var Le=M.createEvent("MouseEvents");Le.initMouseEvent("click",!0,!0,ui,1,He.screenX,He.screenY,He.clientX,He.clientY,!1,!1,!1,!1,0,null),ge.target.dispatchEvent(Le)}}})),q.isDragging=q.isGesturing=q.isPressed=!1,d&&ze&&!V&&xe.restart(!0),Be&&le(),p&&ze&&p(q),x&&x(q,pe)}},Ce=function(de){return de.touches&&de.touches.length>1&&(q.isGesturing=!0)&&W(de,q.isDragging)},Pe=function(){return(q.isGesturing=!1)||R(q)},N=function(de){if(!_e(de)){var ze=Ke(),pe=bt();k((ze-z)*Me,(pe-Nt)*Me,1),z=ze,Nt=pe,d&&xe.restart(!0)}},me=function(de){if(!_e(de)){de=ya(de,u),Q&&(Fe=!0);var ze=(de.deltaMode===1?l:de.deltaMode===2?ui.innerHeight:1)*g;k(de.deltaX*ze,de.deltaY*ze,0),d&&!V&&xe.restart(!0)}},re=function(de){if(!_e(de)){var ze=de.clientX,pe=de.clientY,He=ze-q.x,Le=pe-q.y;q.x=ze,q.y=pe,We=!0,d&&xe.restart(!0),(He||Le)&&se(He,Le)}},ye=function(de){q.event=de,F(q)},Te=function(de){q.event=de,X(q)},ce=function(de){return _e(de)||ya(de,u)&&Ue(q)};xe=q._dc=bn.delayedCall(f||.25,oe).pause(),q.deltaX=q.deltaY=0,q._vx=fu(0,50,!0),q._vy=fu(0,50,!0),q.scrollX=Ke,q.scrollY=bt,q.isDragging=q.isGesturing=q.isPressed=!1,tm(this),q.enable=function(ge){return q.isEnabled||(zn(P?M:o,"scroll",uu),a.indexOf("scroll")>=0&&zn(P?M:o,"scroll",N,Ot,Ve),a.indexOf("wheel")>=0&&zn(o,"wheel",me,Ot,Ve),(a.indexOf("touch")>=0&&jp||a.indexOf("pointer")>=0)&&(zn(o,Di[0],fe,Ot,Ve),zn(M,Di[2],ue),zn(M,Di[3],ue),J&&zn(o,"click",ve,!0,!0),Ue&&zn(o,"click",ce),W&&zn(M,"gesturestart",Ce),R&&zn(M,"gestureend",Pe),F&&zn(o,Qr+"enter",ye),X&&zn(o,Qr+"leave",Te),L&&zn(o,Qr+"move",re)),q.isEnabled=!0,q.isDragging=q.isGesturing=q.isPressed=We=Be=!1,q._vx.reset(),q._vy.reset(),z=Ke(),Nt=bt(),ge&&ge.type&&fe(ge),Se&&Se(q)),q},q.disable=function(){q.isEnabled&&($s.filter(function(ge){return ge!==q&&Ka(ge.target)}).length||On(P?M:o,"scroll",uu),q.isPressed&&(q._vx.reset(),q._vy.reset(),On(V?o:M,Di[1],ee,!0)),On(P?M:o,"scroll",N,Ve),On(o,"wheel",me,Ve),On(o,Di[0],fe,Ve),On(M,Di[2],ue),On(M,Di[3],ue),On(o,"click",ve,!0),On(o,"click",ce),On(M,"gesturestart",Ce),On(M,"gestureend",Pe),On(o,Qr+"enter",ye),On(o,Qr+"leave",Te),On(o,Qr+"move",re),q.isEnabled=q.isPressed=q.isDragging=!1,Re&&Re(q))},q.kill=q.revert=function(){q.disable();var ge=$s.indexOf(q);ge>=0&&$s.splice(ge,1),cr===q&&(cr=0)},$s.push(q),V&&Ka(o)&&(cr=q),q.enable(_)},kg(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();sn.version="3.15.0";sn.create=function(r){return new sn(r)};sn.register=sm;sn.getAll=function(){return $s.slice()};sn.getById=function(r){return $s.filter(function(e){return e.vars.id===r})[0]};nm()&&bn.registerPlugin(sn);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ge,Vs,xt,Bt,li,Ft,Df,Ul,po,Za,Ba,wo,Cn,$l,hu,Vn,Th,wh,Ws,am,ac,om,Hn,du,lm,cm,Er,pu,Lf,ia,If,Ja,mu,oc,Ao=1,Rn=Date.now,lc=Rn(),wi=0,za=0,Ah=function(e,t,n){var i=ai(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Ch=function(e,t){return t&&(!ai(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Vg=function r(){return za&&requestAnimationFrame(r)},Rh=function(){return $l=1},Ph=function(){return $l=0},ki=function(e){return e},ka=function(e){return Math.round(e*1e5)/1e5||0},um=function(){return typeof window<"u"},fm=function(){return Ge||um()&&(Ge=window.gsap)&&Ge.registerPlugin&&Ge},hs=function(e){return!!~Df.indexOf(e)},hm=function(e){return(e==="Height"?If:xt["inner"+e])||li["client"+e]||Ft["client"+e]},dm=function(e){return Ur(e,"getBoundingClientRect")||(hs(e)?function(){return xl.width=xt.innerWidth,xl.height=If,xl}:function(){return lr(e)})},Wg=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=Ur(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?hm(s):e["client"+s])||0}},Xg=function(e,t){return!t||~qi.indexOf(e)?dm(e):function(){return xl}},Xi=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=Ur(e,n))?a()-dm(e)()[s]:hs(e)?(li[n]||Ft[n])-hm(i):e[n]-e["offset"+i])},Co=function(e,t){for(var n=0;n<Ws.length;n+=3)(!t||~t.indexOf(Ws[n+1]))&&e(Ws[n],Ws[n+1],Ws[n+2])},ai=function(e){return typeof e=="string"},Dn=function(e){return typeof e=="function"},Ga=function(e){return typeof e=="number"},jr=function(e){return typeof e=="object"},ba=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},ys=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},bs=Math.abs,pm="left",mm="top",Uf="right",Nf="bottom",ls="width",cs="height",Qa="Right",ja="Left",eo="Top",to="Bottom",cn="padding",xi="margin",da="Width",Ff="Height",fn="px",Si=function(e){return xt.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Yg=function(e){var t=Si(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Dh=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},lr=function(e,t){var n=t&&Si(e)[hu]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ge.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Nl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},gm=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},qg=function(e){return function(t){return Ge.utils.snap(gm(e),t)}},Of=function(e){var t=Ge.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},$g=function(e){return function(t,n){return Of(gm(e))(t,n.direction)}},Ro=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},vn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},_n=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Po=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Lh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Do={toggleActions:"play",anticipatePin:0},Fl={top:0,left:0,center:.5,bottom:1,right:1},ml=function(e,t){if(ai(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Fl?Fl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Lo=function(e,t,n,i,s,a,o,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,g=Bt.createElement("div"),_=hs(n)||Ur(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?Ft:n.tagName==="IFRAME"?n.contentDocument.body:n,S=e.indexOf("start")!==-1,b=S?c:u,x="border-color:"+b+";font-size:"+d+";color:"+b+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(x+=(i===dn?Uf:Nf)+":"+(a+parseFloat(f))+"px;"),o&&(x+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=S,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=x,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],gl(g,0,i,S),g},gl=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+da]=1,s["border"+o+da]=0,s[n.p]=t+"px",Ge.set(e,s)},_t=[],gu={},mo,Ih=function(){return Rn()-wi>34&&(mo||(mo=requestAnimationFrame(fr)))},Es=function(){(!Hn||!Hn.isPressed||Hn.startX>Ft.clientWidth)&&(St.cache++,Hn?mo||(mo=requestAnimationFrame(fr)):fr(),wi||ps("scrollStart"),wi=Rn())},cc=function(){cm=xt.innerWidth,lm=xt.innerHeight},Ha=function(e){St.cache++,(e===!0||!Cn&&!om&&!Bt.fullscreenElement&&!Bt.webkitFullscreenElement&&(!du||cm!==xt.innerWidth||Math.abs(xt.innerHeight-lm)>xt.innerHeight*.25))&&Ul.restart(!0)},ds={},Kg=[],_m=function r(){return _n(ut,"scrollEnd",r)||ts(!0)},ps=function(e){return ds[e]&&ds[e].map(function(t){return t()})||Kg},si=[],vm=function(e){for(var t=0;t<si.length;t+=5)(!e||si[t+4]&&si[t+4].query===e)&&(si[t].style.cssText=si[t+1],si[t].getBBox&&si[t].setAttribute("transform",si[t+2]||""),si[t+3].uncache=1)},xm=function(){return St.forEach(function(e){return Dn(e)&&++e.cacheID&&(e.rec=e())})},Bf=function(e,t){var n;for(Vn=0;Vn<_t.length;Vn++)n=_t[Vn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Ja=!0,t&&vm(t),t||ps("revert")},Sm=function(e,t){St.cache++,(t||!Wn)&&St.forEach(function(n){return Dn(n)&&n.cacheID++&&(n.rec=0)}),ai(e)&&(xt.history.scrollRestoration=Lf=e)},Wn,us=0,Uh,Zg=function(){if(Uh!==us){var e=Uh=us;requestAnimationFrame(function(){return e===us&&ts(!0)})}},Mm=function(){Ft.appendChild(ia),If=!Hn&&ia.offsetHeight||xt.innerHeight,Ft.removeChild(ia)},Nh=function(e){return po(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},ts=function(e,t){if(li=Bt.documentElement,Ft=Bt.body,Df=[xt,Bt,li,Ft],wi&&!e&&!Ja){vn(ut,"scrollEnd",_m);return}Mm(),Wn=ut.isRefreshing=!0,Ja||xm();var n=ps("refreshInit");am&&ut.sort(),t||Bf(),St.forEach(function(i){Dn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),_t.slice(0).forEach(function(i){return i.refresh()}),Ja=!1,_t.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),mu=1,Nh(!0),_t.forEach(function(i){var s=Xi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),Nh(!1),mu=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),St.forEach(function(i){Dn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Sm(Lf,1),Ul.pause(),us++,Wn=2,fr(2),_t.forEach(function(i){return Dn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Wn=ut.isRefreshing=!1,ps("refresh")},_u=0,_l=1,no,fr=function(e){if(e===2||!Wn&&!Ja){ut.isUpdating=!0,no&&no.update(0);var t=_t.length,n=Rn(),i=n-lc>=50,s=t&&_t[0].scroll();if(_l=_u>s?-1:1,Wn||(_u=s),i&&(wi&&!$l&&n-wi>200&&(wi=0,ps("scrollEnd")),Ba=lc,lc=n),_l<0){for(Vn=t;Vn-- >0;)_t[Vn]&&_t[Vn].update(0,i);_l=1}else for(Vn=0;Vn<t;Vn++)_t[Vn]&&_t[Vn].update(0,i);ut.isUpdating=!1}mo=0},vu=[pm,mm,Nf,Uf,xi+to,xi+Qa,xi+eo,xi+ja,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],vl=vu.concat([ls,cs,"boxSizing","max"+da,"max"+Ff,"position",xi,cn,cn+eo,cn+Qa,cn+to,cn+ja]),Jg=function(e,t,n){ra(n);var i=e._gsap;if(i.spacerIsNative)ra(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},uc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=vu.length,a=t.style,o=e.style,l;s--;)l=vu[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[Nf]=o[Uf]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[ls]=Nl(e,Xn)+fn,a[cs]=Nl(e,dn)+fn,a[cn]=o[xi]=o[mm]=o[pm]="0",ra(i),o[ls]=o["max"+da]=n[ls],o[cs]=o["max"+Ff]=n[cs],o[cn]=n[cn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Qg=/([A-Z])/g,ra=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||Ge.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(Qg,"-$1").toLowerCase())}},Io=function(e){for(var t=vl.length,n=e.style,i=[],s=0;s<t;s++)i.push(vl[s],n[vl[s]]);return i.t=e,i},jg=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},xl={left:0,top:0},Fh=function(e,t,n,i,s,a,o,l,c,u,d,f,h,g){Dn(e)&&(e=e(l)),ai(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?ml("0"+e.substr(3),n):0));var _=h?h.time():0,m,p,S;if(h&&h.seek(0),isNaN(e)||(e=+e),Ga(e))h&&(e=Ge.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),o&&gl(o,n,i,!0);else{Dn(t)&&(t=t(l));var b=(e||"0").split(" "),x,y,E,w;S=$n(t,l)||Ft,x=lr(S)||{},(!x||!x.left&&!x.top)&&Si(S).display==="none"&&(w=S.style.display,S.style.display="block",x=lr(S),w?S.style.display=w:S.style.removeProperty("display")),y=ml(b[0],x[i.d]),E=ml(b[1]||"0",n),e=x[i.p]-c[i.p]-u+y+s-E,o&&gl(o,E,i,n-E<20||o._isStart&&E>20),n-=n-E}if(g&&(l[g]=e||-.001,e<0&&(e=0)),a){var v=e+n,T=a._isStart;m="scroll"+i.d2,gl(a,v,i,T&&v>20||!T&&(d?Math.max(Ft[m],li[m]):a.parentNode[m])<=v+1),d&&(c=lr(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+fn))}return h&&S&&(m=lr(S),h.seek(f),p=lr(S),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(_),h?e:Math.round(e)},e_=/(webkit|moz|length|cssText|inset)/i,Oh=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===Ft){e._stOrig=s.cssText,o=Si(e);for(a in o)!+a&&!e_.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ge.core.getCache(e).uncache=1,t.appendChild(e)}},ym=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},Uo=function(e,t,n){var i={};i[t.p]="+="+n,Ge.set(e,i)},Bh=function(e,t){var n=zr(e,t),i="_scroll"+t.p2,s=function a(o,l,c,u,d){var f=a.tween,h=l.onComplete,g={};c=c||n();var _=ym(n,c,function(){f.kill(),a.tween=0});return d=u&&d||0,u=u||o-c,f&&f.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){St.cache++,a.tween&&fr()},l.onComplete=function(){a.tween=0,h&&h.call(f)},f=a.tween=Ge.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},vn(e,"wheel",n.wheelHandler),ut.isTouch&&vn(e,"touchmove",n.wheelHandler),s},ut=(function(){function r(t,n){Vs||r.register(Ge)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),pu(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!za){this.update=this.refresh=this.kill=ki;return}n=Dh(ai(n)||Ga(n)||n.nodeType?{trigger:n}:n,Do);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,S=s.onSnapComplete,b=s.once,x=s.snap,y=s.pinReparent,E=s.pinSpacer,w=s.containerAnimation,v=s.fastScrollEnd,T=s.preventOverlaps,A=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Xn:dn,U=!d&&d!==0,I=$n(n.scroller||xt),G=Ge.core.getCache(I),F=hs(I),X=("pinType"in n?n.pinType:Ur(I,"pinType")||F&&"fixed")==="fixed",L=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],D=U&&n.toggleActions.split(" "),V="markers"in n?n.markers:Do.markers,W=F?0:parseFloat(Si(I)["border"+A.p2+da])||0,R=this,Q=n.onRefreshInit&&function(){return n.onRefreshInit(R)},Se=Wg(I,F,A),Re=Xg(I,F),Ue=0,Me=0,Ve=0,J=zr(I,A),ae,Ee,Ye,xe,Be,We,Fe,$e,ot,q,it,Lt,Ot,Ke,bt,z,Nt,Xe,P,M,O,Y,ne,ve,_e,oe,le,k,se,ee,fe,ue,Ce,Pe,N,me,re,ye,Te;if(R._startClamp=R._endClamp=!1,R._dir=A,m*=45,R.scroller=I,R.scroll=w?w.time.bind(w):J,xe=J(),R.vars=n,i=i||n.animation,"refreshPriority"in n&&(am=1,n.refreshPriority===-9999&&(no=R)),G.tweenScroll=G.tweenScroll||{top:Bh(I,dn),left:Bh(I,Xn)},R.tweenTo=ae=G.tweenScroll[A.p],R.scrubDuration=function(pe){Ce=Ga(pe)&&pe,Ce?ue?ue.duration(pe):ue=Ge.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Ce,paused:!0,onComplete:function(){return p&&p(R)}}):(ue&&ue.progress(1).kill(),ue=0)},i&&(i.vars.lazy=!1,i._initted&&!R.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),R.animation=i.pause(),i.scrollTrigger=R,R.scrubDuration(d),ee=0,l||(l=i.vars.id)),x&&((!jr(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in Ft.style&&Ge.set(F?[Ft,li]:I,{scrollBehavior:"auto"}),St.forEach(function(pe){return Dn(pe)&&pe.target===(F?Bt.scrollingElement||li:I)&&(pe.smooth=!1)}),Ye=Dn(x.snapTo)?x.snapTo:x.snapTo==="labels"?qg(i):x.snapTo==="labelsDirectional"?$g(i):x.directional!==!1?function(pe,He){return Of(x.snapTo)(pe,Rn()-Me<500?0:He.direction)}:Ge.utils.snap(x.snapTo),Pe=x.duration||{min:.1,max:2},Pe=jr(Pe)?Za(Pe.min,Pe.max):Za(Pe,Pe),N=Ge.delayedCall(x.delay||Ce/2||.1,function(){var pe=J(),He=Rn()-Me<500,Le=ae.tween;if((He||Math.abs(R.getVelocity())<10)&&!Le&&!$l&&Ue!==pe){var Je=(pe-We)/Ke,Ut=i&&!U?i.totalProgress():Je,Ze=He?0:(Ut-fe)/(Rn()-Ba)*1e3||0,ht=Ge.utils.clamp(-Je,1-Je,bs(Ze/2)*Ze/.185),qt=Je+(x.inertia===!1?0:ht),Ct,et,rt=x,Ht=rt.onStart,ke=rt.onInterrupt,mt=rt.onComplete;if(Ct=Ye(qt,R),Ga(Ct)||(Ct=qt),et=Math.max(0,Math.round(We+Ct*Ke)),pe<=Fe&&pe>=We&&et!==pe){if(Le&&!Le._initted&&Le.data<=bs(et-pe))return;x.inertia===!1&&(ht=Ct-Je),ae(et,{duration:Pe(bs(Math.max(bs(qt-Ut),bs(Ct-Ut))*.185/Ze/.05||0)),ease:x.ease||"power3",data:bs(et-pe),onInterrupt:function(){return N.restart(!0)&&ke&&ys(R,ke)},onComplete:function(){R.update(),Ue=J(),i&&!U&&(ue?ue.resetTo("totalProgress",Ct,i._tTime/i._tDur):i.progress(Ct)),ee=fe=i&&!U?i.totalProgress():R.progress,S&&S(R),mt&&ys(R,mt)}},pe,ht*Ke,et-pe-ht*Ke),Ht&&ys(R,Ht,ae.tween)}}else R.isActive&&Ue!==pe&&N.restart(!0)}).pause()),l&&(gu[l]=R),f=R.trigger=$n(f||h!==!0&&h),Te=f&&f._gsap&&f._gsap.stRevert,Te&&(Te=Te(R)),h=h===!0?f:$n(h),ai(o)&&(o={targets:f,className:o}),h&&(g===!1||g===xi||(g=!g&&h.parentNode&&h.parentNode.style&&Si(h.parentNode).display==="flex"?!1:cn),R.pin=h,Ee=Ge.core.getCache(h),Ee.spacer?bt=Ee.pinState:(E&&(E=$n(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),Ee.spacerIsNative=!!E,E&&(Ee.spacerState=Io(E))),Ee.spacer=Xe=E||Bt.createElement("div"),Xe.classList.add("pin-spacer"),l&&Xe.classList.add("pin-spacer-"+l),Ee.pinState=bt=Io(h)),n.force3D!==!1&&Ge.set(h,{force3D:!0}),R.spacer=Xe=Ee.spacer,se=Si(h),ve=se[g+A.os2],M=Ge.getProperty(h),O=Ge.quickSetter(h,A.a,fn),uc(h,Xe,se),Nt=Io(h)),V){Lt=jr(V)?Dh(V,Lh):Lh,q=Lo("scroller-start",l,I,A,Lt,0),it=Lo("scroller-end",l,I,A,Lt,0,q),P=q["offset"+A.op.d2];var ce=$n(Ur(I,"content")||I);$e=this.markerStart=Lo("start",l,ce,A,Lt,P,0,w),ot=this.markerEnd=Lo("end",l,ce,A,Lt,P,0,w),w&&(ye=Ge.quickSetter([$e,ot],A.a,fn)),!X&&!(qi.length&&Ur(I,"fixedMarkers")===!0)&&(Yg(F?Ft:I),Ge.set([q,it],{force3D:!0}),oe=Ge.quickSetter(q,A.a,fn),k=Ge.quickSetter(it,A.a,fn))}if(w){var ge=w.vars.onUpdate,de=w.vars.onUpdateParams;w.eventCallback("onUpdate",function(){R.update(0,0,1),ge&&ge.apply(w,de||[])})}if(R.previous=function(){return _t[_t.indexOf(R)-1]},R.next=function(){return _t[_t.indexOf(R)+1]},R.revert=function(pe,He){if(!He)return R.kill(!0);var Le=pe!==!1||!R.enabled,Je=Cn;Le!==R.isReverted&&(Le&&(me=Math.max(J(),R.scroll.rec||0),Ve=R.progress,re=i&&i.progress()),$e&&[$e,ot,q,it].forEach(function(Ut){return Ut.style.display=Le?"none":"block"}),Le&&(Cn=R,R.update(Le)),h&&(!y||!R.isActive)&&(Le?Jg(h,Xe,bt):uc(h,Xe,Si(h),_e)),Le||R.update(Le),Cn=Je,R.isReverted=Le)},R.refresh=function(pe,He,Le,Je){if(!((Cn||!R.enabled)&&!He)){if(h&&pe&&wi){vn(r,"scrollEnd",_m);return}!Wn&&Q&&Q(R),Cn=R,ae.tween&&!Le&&(ae.tween.kill(),ae.tween=0),ue&&ue.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(we){return we.vars.immediateRender&&we.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var Ut=Se(),Ze=Re(),ht=w?w.duration():Xi(I,A),qt=Ke<=.01||!Ke,Ct=0,et=Je||0,rt=jr(Le)?Le.end:n.end,Ht=n.endTrigger||f,ke=jr(Le)?Le.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),mt=R.pinnedContainer=n.pinnedContainer&&$n(n.pinnedContainer,R),qe=f&&Math.max(0,_t.indexOf(R))||0,Rt=qe,Pt,ft,en,ni,Kt,Vt,Mn,Qi,C,B,j,Z,$;for(V&&jr(Le)&&(Z=Ge.getProperty(q,A.p),$=Ge.getProperty(it,A.p));Rt-- >0;)Vt=_t[Rt],Vt.end||Vt.refresh(0,1)||(Cn=R),Mn=Vt.pin,Mn&&(Mn===f||Mn===h||Mn===mt)&&!Vt.isReverted&&(B||(B=[]),B.unshift(Vt),Vt.revert(!0,!0)),Vt!==_t[Rt]&&(qe--,Rt--);for(Dn(ke)&&(ke=ke(R)),ke=Ah(ke,"start",R),We=Fh(ke,f,Ut,A,J(),$e,q,R,Ze,W,X,ht,w,R._startClamp&&"_startClamp")||(h?-.001:0),Dn(rt)&&(rt=rt(R)),ai(rt)&&!rt.indexOf("+=")&&(~rt.indexOf(" ")?rt=(ai(ke)?ke.split(" ")[0]:"")+rt:(Ct=ml(rt.substr(2),Ut),rt=ai(ke)?ke:(w?Ge.utils.mapRange(0,w.duration(),w.scrollTrigger.start,w.scrollTrigger.end,We):We)+Ct,Ht=f)),rt=Ah(rt,"end",R),Fe=Math.max(We,Fh(rt||(Ht?"100% 0":ht),Ht,Ut,A,J()+Ct,ot,it,R,Ze,W,X,ht,w,R._endClamp&&"_endClamp"))||-.001,Ct=0,Rt=qe;Rt--;)Vt=_t[Rt]||{},Mn=Vt.pin,Mn&&Vt.start-Vt._pinPush<=We&&!w&&Vt.end>0&&(Pt=Vt.end-(R._startClamp?Math.max(0,Vt.start):Vt.start),(Mn===f&&Vt.start-Vt._pinPush<We||Mn===mt)&&isNaN(ke)&&(Ct+=Pt*(1-Vt.progress)),Mn===h&&(et+=Pt));if(We+=Ct,Fe+=Ct,R._startClamp&&(R._startClamp+=Ct),R._endClamp&&!Wn&&(R._endClamp=Fe||-.001,Fe=Math.min(Fe,Xi(I,A))),Ke=Fe-We||(We-=.01)&&.001,qt&&(Ve=Ge.utils.clamp(0,1,Ge.utils.normalize(We,Fe,me))),R._pinPush=et,$e&&Ct&&(Pt={},Pt[A.a]="+="+Ct,mt&&(Pt[A.p]="-="+J()),Ge.set([$e,ot],Pt)),h&&!(mu&&R.end>=Xi(I,A)))Pt=Si(h),ni=A===dn,en=J(),Y=parseFloat(M(A.a))+et,!ht&&Fe>1&&(j=(F?Bt.scrollingElement||li:I).style,j={style:j,value:j["overflow"+A.a.toUpperCase()]},F&&Si(Ft)["overflow"+A.a.toUpperCase()]!=="scroll"&&(j.style["overflow"+A.a.toUpperCase()]="scroll")),uc(h,Xe,Pt),Nt=Io(h),ft=lr(h,!0),Qi=X&&zr(I,ni?Xn:dn)(),g?(_e=[g+A.os2,Ke+et+fn],_e.t=Xe,Rt=g===cn?Nl(h,A)+Ke+et:0,Rt&&(_e.push(A.d,Rt+fn),Xe.style.flexBasis!=="auto"&&(Xe.style.flexBasis=Rt+fn)),ra(_e),mt&&_t.forEach(function(we){we.pin===mt&&we.vars.pinSpacing!==!1&&(we._subPinOffset=!0)}),X&&J(me)):(Rt=Nl(h,A),Rt&&Xe.style.flexBasis!=="auto"&&(Xe.style.flexBasis=Rt+fn)),X&&(Kt={top:ft.top+(ni?en-We:Qi)+fn,left:ft.left+(ni?Qi:en-We)+fn,boxSizing:"border-box",position:"fixed"},Kt[ls]=Kt["max"+da]=Math.ceil(ft.width)+fn,Kt[cs]=Kt["max"+Ff]=Math.ceil(ft.height)+fn,Kt[xi]=Kt[xi+eo]=Kt[xi+Qa]=Kt[xi+to]=Kt[xi+ja]="0",Kt[cn]=Pt[cn],Kt[cn+eo]=Pt[cn+eo],Kt[cn+Qa]=Pt[cn+Qa],Kt[cn+to]=Pt[cn+to],Kt[cn+ja]=Pt[cn+ja],z=jg(bt,Kt,y),Wn&&J(0)),i?(C=i._initted,ac(1),i.render(i.duration(),!0,!0),ne=M(A.a)-Y+Ke+et,le=Math.abs(Ke-ne)>1,X&&le&&z.splice(z.length-2,2),i.render(0,!0,!0),C||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),ac(0)):ne=Ke,j&&(j.value?j.style["overflow"+A.a.toUpperCase()]=j.value:j.style.removeProperty("overflow-"+A.a));else if(f&&J()&&!w)for(ft=f.parentNode;ft&&ft!==Ft;)ft._pinOffset&&(We-=ft._pinOffset,Fe-=ft._pinOffset),ft=ft.parentNode;B&&B.forEach(function(we){return we.revert(!1,!0)}),R.start=We,R.end=Fe,xe=Be=Wn?me:J(),!w&&!Wn&&(xe<me&&J(me),R.scroll.rec=0),R.revert(!1,!0),Me=Rn(),N&&(Ue=-1,N.restart(!0)),Cn=0,i&&U&&(i._initted||re)&&i.progress()!==re&&i.progress(re||0,!0).render(i.time(),!0,!0),(qt||Ve!==R.progress||w||_||i&&!i._initted)&&(i&&!U&&(i._initted||Ve||i.vars.immediateRender!==!1)&&i.totalProgress(w&&We<-.001&&!Ve?Ge.utils.normalize(We,Fe,0):Ve,!0),R.progress=qt||(xe-We)/Ke===Ve?0:Ve),h&&g&&(Xe._pinOffset=Math.round(R.progress*ne)),ue&&ue.invalidate(),isNaN(Z)||(Z-=Ge.getProperty(q,A.p),$-=Ge.getProperty(it,A.p),Uo(q,A,Z),Uo($e,A,Z-(Je||0)),Uo(it,A,$),Uo(ot,A,$-(Je||0))),qt&&!Wn&&R.update(),u&&!Wn&&!Ot&&(Ot=!0,u(R),Ot=!1)}},R.getVelocity=function(){return(J()-Be)/(Rn()-Ba)*1e3||0},R.endAnimation=function(){ba(R.callbackAnimation),i&&(ue?ue.progress(1):i.paused()?U||ba(i,R.direction<0,1):ba(i,i.reversed()))},R.labelToScroll=function(pe){return i&&i.labels&&(We||R.refresh()||We)+i.labels[pe]/i.duration()*Ke||0},R.getTrailing=function(pe){var He=_t.indexOf(R),Le=R.direction>0?_t.slice(0,He).reverse():_t.slice(He+1);return(ai(pe)?Le.filter(function(Je){return Je.vars.preventOverlaps===pe}):Le).filter(function(Je){return R.direction>0?Je.end<=We:Je.start>=Fe})},R.update=function(pe,He,Le){if(!(w&&!Le&&!pe)){var Je=Wn===!0?me:R.scroll(),Ut=pe?0:(Je-We)/Ke,Ze=Ut<0?0:Ut>1?1:Ut||0,ht=R.progress,qt,Ct,et,rt,Ht,ke,mt,qe;if(He&&(Be=xe,xe=w?J():Je,x&&(fe=ee,ee=i&&!U?i.totalProgress():Ze)),m&&h&&!Cn&&!Ao&&wi&&(!Ze&&We<Je+(Je-Be)/(Rn()-Ba)*m?Ze=1e-4:Ze===1&&Fe>Je+(Je-Be)/(Rn()-Ba)*m&&(Ze=.9999)),Ze!==ht&&R.enabled){if(qt=R.isActive=!!Ze&&Ze<1,Ct=!!ht&&ht<1,ke=qt!==Ct,Ht=ke||!!Ze!=!!ht,R.direction=Ze>ht?1:-1,R.progress=Ze,Ht&&!Cn&&(et=Ze&&!ht?0:Ze===1?1:ht===1?2:3,U&&(rt=!ke&&D[et+1]!=="none"&&D[et+1]||D[et],qe=i&&(rt==="complete"||rt==="reset"||rt in i))),T&&(ke||qe)&&(qe||d||!i)&&(Dn(T)?T(R):R.getTrailing(T).forEach(function(en){return en.endAnimation()})),U||(ue&&!Cn&&!Ao?(ue._dp._time-ue._start!==ue._time&&ue.render(ue._dp._time-ue._start),ue.resetTo?ue.resetTo("totalProgress",Ze,i._tTime/i._tDur):(ue.vars.totalProgress=Ze,ue.invalidate().restart())):i&&i.totalProgress(Ze,!!(Cn&&(Me||pe)))),h){if(pe&&g&&(Xe.style[g+A.os2]=ve),!X)O(ka(Y+ne*Ze));else if(Ht){if(mt=!pe&&Ze>ht&&Fe+1>Je&&Je+1>=Xi(I,A),y)if(!pe&&(qt||mt)){var Rt=lr(h,!0),Pt=Je-We;Oh(h,Ft,Rt.top+(A===dn?Pt:0)+fn,Rt.left+(A===dn?0:Pt)+fn)}else Oh(h,Xe);ra(qt||mt?z:Nt),le&&Ze<1&&qt||O(Y+(Ze===1&&!mt?ne:0))}}x&&!ae.tween&&!Cn&&!Ao&&N.restart(!0),o&&(ke||b&&Ze&&(Ze<1||!oc))&&po(o.targets).forEach(function(en){return en.classList[qt||b?"add":"remove"](o.className)}),a&&!U&&!pe&&a(R),Ht&&!Cn?(U&&(qe&&(rt==="complete"?i.pause().totalProgress(1):rt==="reset"?i.restart(!0).pause():rt==="restart"?i.restart(!0):i[rt]()),a&&a(R)),(ke||!oc)&&(c&&ke&&ys(R,c),L[et]&&ys(R,L[et]),b&&(Ze===1?R.kill(!1,1):L[et]=0),ke||(et=Ze===1?1:3,L[et]&&ys(R,L[et]))),v&&!qt&&Math.abs(R.getVelocity())>(Ga(v)?v:2500)&&(ba(R.callbackAnimation),ue?ue.progress(1):ba(i,rt==="reverse"?1:!Ze,1))):U&&a&&!Cn&&a(R)}if(k){var ft=w?Je/w.duration()*(w._caScrollDist||0):Je;oe(ft+(q._isFlipped?1:0)),k(ft)}ye&&ye(-Je/w.duration()*(w._caScrollDist||0))}},R.enable=function(pe,He){R.enabled||(R.enabled=!0,vn(I,"resize",Ha),F||vn(I,"scroll",Es),Q&&vn(r,"refreshInit",Q),pe!==!1&&(R.progress=Ve=0,xe=Be=Ue=J()),He!==!1&&R.refresh())},R.getTween=function(pe){return pe&&ae?ae.tween:ue},R.setPositions=function(pe,He,Le,Je){if(w){var Ut=w.scrollTrigger,Ze=w.duration(),ht=Ut.end-Ut.start;pe=Ut.start+ht*pe/Ze,He=Ut.start+ht*He/Ze}R.refresh(!1,!1,{start:Ch(pe,Le&&!!R._startClamp),end:Ch(He,Le&&!!R._endClamp)},Je),R.update()},R.adjustPinSpacing=function(pe){if(_e&&pe){var He=_e.indexOf(A.d)+1;_e[He]=parseFloat(_e[He])+pe+fn,_e[1]=parseFloat(_e[1])+pe+fn,ra(_e)}},R.disable=function(pe,He){if(pe!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,He||ue&&ue.pause(),me=0,Ee&&(Ee.uncache=1),Q&&_n(r,"refreshInit",Q),N&&(N.pause(),ae.tween&&ae.tween.kill()&&(ae.tween=0)),!F)){for(var Le=_t.length;Le--;)if(_t[Le].scroller===I&&_t[Le]!==R)return;_n(I,"resize",Ha),F||_n(I,"scroll",Es)}},R.kill=function(pe,He){R.disable(pe,He),ue&&!He&&ue.kill(),l&&delete gu[l];var Le=_t.indexOf(R);Le>=0&&_t.splice(Le,1),Le===Vn&&_l>0&&Vn--,Le=0,_t.forEach(function(Je){return Je.scroller===R.scroller&&(Le=1)}),Le||Wn||(R.scroll.rec=0),i&&(i.scrollTrigger=null,pe&&i.revert({kill:!1}),He||i.kill()),$e&&[$e,ot,q,it].forEach(function(Je){return Je.parentNode&&Je.parentNode.removeChild(Je)}),no===R&&(no=0),h&&(Ee&&(Ee.uncache=1),Le=0,_t.forEach(function(Je){return Je.pin===h&&Le++}),Le||(Ee.spacer=0)),n.onKill&&n.onKill(R)},_t.push(R),R.enable(!1,!1),Te&&Te(R),i&&i.add&&!Ke){var ze=R.update;R.update=function(){R.update=ze,St.cache++,We||Fe||R.refresh()},Ge.delayedCall(.01,R.update),Ke=.01,We=Fe=0}else R.refresh();h&&Zg()},r.register=function(n){return Vs||(Ge=n||fm(),um()&&window.document&&r.enable(),Vs=za),Vs},r.defaults=function(n){if(n)for(var i in n)Do[i]=n[i];return Do},r.disable=function(n,i){za=0,_t.forEach(function(a){return a[i?"kill":"disable"](n)}),_n(xt,"wheel",Es),_n(Bt,"scroll",Es),clearInterval(wo),_n(Bt,"touchcancel",ki),_n(Ft,"touchstart",ki),Ro(_n,Bt,"pointerdown,touchstart,mousedown",Rh),Ro(_n,Bt,"pointerup,touchend,mouseup",Ph),Ul.kill(),Co(_n);for(var s=0;s<St.length;s+=3)Po(_n,St[s],St[s+1]),Po(_n,St[s],St[s+2])},r.enable=function(){if(xt=window,Bt=document,li=Bt.documentElement,Ft=Bt.body,Ge){if(po=Ge.utils.toArray,Za=Ge.utils.clamp,pu=Ge.core.context||ki,ac=Ge.core.suppressOverwrites||ki,Lf=xt.history.scrollRestoration||"auto",_u=xt.pageYOffset||0,Ge.core.globals("ScrollTrigger",r),Ft){za=1,ia=document.createElement("div"),ia.style.height="100vh",ia.style.position="absolute",Mm(),Vg(),sn.register(Ge),r.isTouch=sn.isTouch,Er=sn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),du=sn.isTouch===1,vn(xt,"wheel",Es),Df=[xt,Bt,li,Ft],Ge.matchMedia?(r.matchMedia=function(u){var d=Ge.matchMedia(),f;for(f in u)d.add(f,u[f]);return d},Ge.addEventListener("matchMediaInit",function(){xm(),Bf()}),Ge.addEventListener("matchMediaRevert",function(){return vm()}),Ge.addEventListener("matchMedia",function(){ts(0,1),ps("matchMedia")}),Ge.matchMedia().add("(orientation: portrait)",function(){return cc(),cc})):console.warn("Requires GSAP 3.11.0 or later"),cc(),vn(Bt,"scroll",Es);var n=Ft.hasAttribute("style"),i=Ft.style,s=i.borderTopStyle,a=Ge.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=lr(Ft),dn.m=Math.round(o.top+dn.sc())||0,Xn.m=Math.round(o.left+Xn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Ft.setAttribute("style",""),Ft.removeAttribute("style")),wo=setInterval(Ih,250),Ge.delayedCall(.5,function(){return Ao=0}),vn(Bt,"touchcancel",ki),vn(Ft,"touchstart",ki),Ro(vn,Bt,"pointerdown,touchstart,mousedown",Rh),Ro(vn,Bt,"pointerup,touchend,mouseup",Ph),hu=Ge.utils.checkPrefix("transform"),vl.push(hu),Vs=Rn(),Ul=Ge.delayedCall(.2,ts).pause(),Ws=[Bt,"visibilitychange",function(){var u=xt.innerWidth,d=xt.innerHeight;Bt.hidden?(Th=u,wh=d):(Th!==u||wh!==d)&&Ha()},Bt,"DOMContentLoaded",ts,xt,"load",ts,xt,"resize",Ha],Co(vn),_t.forEach(function(u){return u.enable(0,1)}),l=0;l<St.length;l+=3)Po(_n,St[l],St[l+1]),Po(_n,St[l],St[l+2])}else if(Bt){var c=function u(){r.enable(),Bt.removeEventListener("DOMContentLoaded",u)};Bt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(oc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(wo)||(wo=i)&&setInterval(Ih,i),"ignoreMobileResize"in n&&(du=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Co(_n)||Co(vn,n.autoRefreshEvents||"none"),om=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=$n(n),a=St.indexOf(s),o=hs(s);~a&&St.splice(a,o?6:2),i&&(o?qi.unshift(xt,i,Ft,i,li,i):qi.unshift(s,i))},r.clearMatchMedia=function(n){_t.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(ai(n)?$n(n):n).getBoundingClientRect(),o=a[s?ls:cs]*i||0;return s?a.right-o>0&&a.left+o<xt.innerWidth:a.bottom-o>0&&a.top+o<xt.innerHeight},r.positionInViewport=function(n,i,s){ai(n)&&(n=$n(n));var a=n.getBoundingClientRect(),o=a[s?ls:cs],l=i==null?o/2:i in Fl?Fl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/xt.innerWidth:(a.top+l)/xt.innerHeight},r.killAll=function(n){if(_t.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ds.killAll||[];ds={},i.forEach(function(s){return s()})}},r})();ut.version="3.15.0";ut.saveStyles=function(r){return r?po(r).forEach(function(e){if(e&&e.style){var t=si.indexOf(e);t>=0&&si.splice(t,5),si.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ge.core.getCache(e),pu())}}):si};ut.revert=function(r,e){return Bf(!r,e)};ut.create=function(r,e){return new ut(r,e)};ut.refresh=function(r){return r?Ha(!0):(Vs||ut.register())&&ts(!0)};ut.update=function(r){return++St.cache&&fr(r===!0?2:0)};ut.clearScrollMemory=Sm;ut.maxScroll=function(r,e){return Xi(r,e?Xn:dn)};ut.getScrollFunc=function(r,e){return zr($n(r),e?Xn:dn)};ut.getById=function(r){return gu[r]};ut.getAll=function(){return _t.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ut.isScrolling=function(){return!!wi};ut.snapDirectional=Of;ut.addEventListener=function(r,e){var t=ds[r]||(ds[r]=[]);~t.indexOf(e)||t.push(e)};ut.removeEventListener=function(r,e){var t=ds[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ut.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var d=[],f=[],h=Ge.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(g){d.length||h.restart(!0),d.push(g.trigger),f.push(g),s<=d.length&&h.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&Dn(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return Dn(s)&&(s=s(),vn(ut,"refresh",function(){return s=e.batchMax()})),po(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(ut.create(c))}),t};var zh=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},fc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(sn.isTouch?" pinch-zoom":""):"none",e===li&&r(Ft,t)},No={auto:1,scroll:1},t_=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Ge.core.getCache(s),o=Rn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==Ft&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(No[(l=Si(s)).overflowY]||No[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!hs(s)&&(No[(l=Si(s)).overflowY]||No[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},bm=function(e,t,n,i){return sn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&t_,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&vn(Bt,sn.eventTypes[0],Gh,!1,!0)},onDisable:function(){return _n(Bt,sn.eventTypes[0],Gh,!0)}})},n_=/(input|label|select|textarea)/i,kh,Gh=function(e){var t=n_.test(e.target.tagName);(t||kh)&&(e._gsapAllow=!0,kh=t)},i_=function(e){jr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=$n(e.target)||li,u=Ge.core.globals().ScrollSmoother,d=u&&u.get(),f=Er&&(e.content&&$n(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=zr(c,dn),g=zr(c,Xn),_=1,m=(sn.isTouch&&xt.visualViewport?xt.visualViewport.scale*xt.visualViewport.width:xt.outerWidth)/xt.innerWidth,p=0,S=Dn(i)?function(){return i(o)}:function(){return i||2.8},b,x,y=bm(c,e.type,!0,s),E=function(){return x=!1},w=ki,v=ki,T=function(){l=Xi(c,dn),v=Za(Er?1:0,l),n&&(w=Za(0,Xi(c,Xn))),b=us},A=function(){f._gsap.y=ka(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},U=function(){if(x){requestAnimationFrame(E);var V=ka(o.deltaY/2),W=v(h.v-V);if(f&&W!==h.v+h.offset){h.offset=W-h.v;var R=ka((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",f._gsap.y=R+"px",h.cacheID=St.cache,fr()}return!0}h.offset&&A(),x=!0},I,G,F,X,L=function(){T(),I.isActive()&&I.vars.scrollY>l&&(h()>l?I.progress(1)&&h(l):I.resetTo("scrollY",l))};return f&&Ge.set(f,{y:"+=0"}),e.ignoreCheck=function(D){return Er&&D.type==="touchmove"&&U()||_>1.05&&D.type!=="touchstart"||o.isGesturing||D.touches&&D.touches.length>1},e.onPress=function(){x=!1;var D=_;_=ka((xt.visualViewport&&xt.visualViewport.scale||1)/m),I.pause(),D!==_&&fc(c,_>1.01?!0:n?!1:"x"),G=g(),F=h(),T(),b=us},e.onRelease=e.onGestureStart=function(D,V){if(h.offset&&A(),!V)X.restart(!0);else{St.cache++;var W=S(),R,Q;n&&(R=g(),Q=R+W*.05*-D.velocityX/.227,W*=zh(g,R,Q,Xi(c,Xn)),I.vars.scrollX=w(Q)),R=h(),Q=R+W*.05*-D.velocityY/.227,W*=zh(h,R,Q,Xi(c,dn)),I.vars.scrollY=v(Q),I.invalidate().duration(W).play(.01),(Er&&I.vars.scrollY>=l||R>=l-1)&&Ge.to({},{onUpdate:L,duration:W})}a&&a(D)},e.onWheel=function(){I._ts&&I.pause(),Rn()-p>1e3&&(b=0,p=Rn())},e.onChange=function(D,V,W,R,Q){if(us!==b&&T(),V&&n&&g(w(R[2]===V?G+(D.startX-D.x):g()+V-R[1])),W){h.offset&&A();var Se=Q[2]===W,Re=Se?F+D.startY-D.y:h()+W-Q[1],Ue=v(Re);Se&&Re!==Ue&&(F+=Ue-Re),h(Ue)}(W||V)&&fr()},e.onEnable=function(){fc(c,n?!1:"x"),ut.addEventListener("refresh",L),vn(xt,"resize",L),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=g.smooth=!1),y.enable()},e.onDisable=function(){fc(c,!0),_n(xt,"resize",L),ut.removeEventListener("refresh",L),y.kill()},e.lockAxis=e.lockAxis!==!1,o=new sn(e),o.iOS=Er,Er&&!h()&&h(1),Er&&Ge.ticker.add(ki),X=o._dc,I=Ge.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:ym(h,h(),function(){return I.pause()})},onUpdate:fr,onComplete:X.vars.onComplete}),o};ut.sort=function(r){if(Dn(r))return _t.sort(r);var e=xt.pageYOffset||0;return ut.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+xt.innerHeight}),_t.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ut.observe=function(r){return new sn(r)};ut.normalizeScroll=function(r){if(typeof r>"u")return Hn;if(r===!0&&Hn)return Hn.enable();if(r===!1){Hn&&Hn.kill(),Hn=r;return}var e=r instanceof sn?r:i_(r);return Hn&&Hn.target===e.target&&Hn.kill(),hs(e.target)&&(Hn=e),e};ut.core={_getVelocityProp:fu,_inputObserver:bm,_scrollers:St,_proxies:qi,bridge:{ss:function(){wi||ps("scrollStart"),wi=Rn()},ref:function(){return Cn}}};fm()&&Ge.registerPlugin(ut);var Hh="1.3.26";function Em(r,e,t){return Math.max(r,Math.min(e,t))}function r_(r,e,t){return(1-t)*r+t*e}function s_(r,e,t,n){return r_(r,e,1-Math.exp(-t*n))}function a_(r,e){return(r%e+e)%e}var o_=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(r){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const t=Em(0,this.currentTime/this.duration,1);e=t>=1;const n=e?1:this.easing(t);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=s_(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=a}};function l_(r,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(this,n)},e)}}var c_=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){this.wrapper=r,this.content=e,t&&(this.debouncedResize=l_(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Tm=class{events={};emit(r,...e){const t=this.events[r]||[];for(let n=0,i=t.length;n<i;n++)t[n]?.(...e)}on(r,e){return this.events[r]?this.events[r].push(e):this.events[r]=[e],()=>{this.events[r]=this.events[r]?.filter(t=>e!==t)}}off(r,e){this.events[r]=this.events[r]?.filter(t=>e!==t)}destroy(){this.events={}}};const u_=100/6,vr={passive:!1};function Vh(r,e){return r===1?u_:r===2?e:1}var f_=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Tm;constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,vr),this.element.addEventListener("touchstart",this.onTouchStart,vr),this.element.addEventListener("touchmove",this.onTouchMove,vr),this.element.addEventListener("touchend",this.onTouchEnd,vr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,vr),this.element.removeEventListener("touchstart",this.onTouchStart,vr),this.element.removeEventListener("touchmove",this.onTouchMove,vr),this.element.removeEventListener("touchend",this.onTouchEnd,vr)}onTouchStart=r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})};onTouchMove=r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})};onTouchEnd=r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})};onWheel=r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=Vh(n,this.window.width),s=Vh(n,this.window.height);e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};const Wh=r=>Math.min(1,1.001-2**(-10*r));var h_=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)");isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new o_;emitter=new Tm;dimensions;virtualScroll;constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f=d==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:S=!0,autoRaf:b=!1,anchors:x=!1,autoToggle:y=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:w=!1,naiveDimensions:v=w,stopInertiaOnNavigate:T=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=Hh,window.lenis||(window.lenis={}),window.lenis.version=Hh,d==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof l!="function"?l=Wh:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:S,autoRaf:b,anchors:x,autoToggle:y,allowNestedScroll:E,naiveDimensions:v,stopInertiaOnNavigate:T,respectReducedMotion:A},this.dimensions=new c_(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new f_(t,{touchMultiplier:h,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}onScrollEnd=r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=r=>{r.propertyName?.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()};setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}onClick=r=>{const e=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(i=>t.host===i.host&&t.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}};onPointerDown=r=>{r.button===1&&this.reset()};isTouchOnSelectionHandle(r){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=r.targetTouches[0]??r.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-i.left,t.clientY-i.top)<=a,l=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||l}onVirtualScroll=r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(g=>g instanceof HTMLElement&&(typeof c=="function"&&c?.(g)||g.hasAttribute?.("data-lenis-prevent")||u==="vertical"&&g.hasAttribute?.("data-lenis-prevent-vertical")||u==="horizontal"&&g.hasAttribute?.("data-lenis-prevent-horizontal")||i&&g.hasAttribute?.("data-lenis-prevent-touch")||s&&g.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:t}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=t;this.options.gestureOrientation==="both"?d=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(d=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const f=i&&this.options.syncTouch,h=i&&n.type==="touchend";h&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:h?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:a=i?this.options.duration:void 0,easing:o=i?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(i?t=!0:(s=1,a=void 0,o=void 0)),(this.isStopped||this.isLocked)&&!u)return;let f=r,h=e;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let g=null;if(typeof f=="string"?(g=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),g||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof HTMLElement&&f?.nodeType&&(g=f),g){if(this.options.wrapper!==window){const x=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?x.left:x.top}const _=g.getBoundingClientRect(),m=getComputedStyle(g),p=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),S=getComputedStyle(this.rootElement),b=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);f=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(b)?0:b)}}if(typeof f=="number"){if(f+=h,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const g=f-this.animatedScroll;g>this.limit/2?f-=this.limit:g<-this.limit/2&&(f+=this.limit)}}else f=Em(0,f,this.limit);if(f===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof a=="number"&&typeof o!="function"?o=Wh:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,f,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(g,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),i&&(this.targetScroll=g),_||this.emit(),_&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,a,o,l,c,u,d,f,h,g;if(n-(i.time??0)>2e3){i.time=Date.now();const E=window.getComputedStyle(r);if(i.computedStyle=E,s=["auto","overlay","scroll"].includes(E.overflowX),a=["auto","overlay","scroll"].includes(E.overflowY),c=["auto"].includes(E.overscrollBehaviorX),u=["auto"].includes(E.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=a,!(s||a))return!1;d=r.scrollWidth,f=r.scrollHeight,h=r.clientWidth,g=r.clientHeight,o=d>h,l=f>g,i.isScrollableX=o,i.isScrollableY=l,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=h,i.clientHeight=g,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=u}else o=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,a=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,h=i.clientWidth,g=i.clientHeight,c=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(s&&o||a&&l))return!1;const _=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let m,p,S,b,x,y;if(_==="horizontal")m=Math.round(r.scrollLeft),p=d-h,S=e,b=s,x=o,y=c;else if(_==="vertical")m=Math.round(r.scrollTop),p=f-g,S=t,b=a,x=l,y=u;else return!1;return!y&&(m>=p||m<=0)?!0:(S>0?m<p:m>0)&&b&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?a_(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zf="186",d_=0,Xh=1,p_=2,Sl=1,m_=2,Va=3,kr=0,qn=1,Yn=2,hr=0,io=1,Yh=2,qh=3,$h=4,g_=5,Xs=100,__=101,v_=102,x_=103,S_=104,M_=200,y_=201,b_=202,E_=203,wm=204,Am=205,T_=206,w_=207,A_=208,C_=209,R_=210,P_=211,D_=212,L_=213,I_=214,xu=0,Su=1,Mu=2,go=3,yu=4,bu=5,Eu=6,Tu=7,Cm=0,U_=1,N_=2,$i=0,Rm=1,Pm=2,Dm=3,Lm=4,Im=5,Um=6,Nm=7,Fm=300,ms=301,pa=302,hc=303,dc=304,Kl=306,wu=1e3,ur=1001,Au=1002,En=1003,F_=1004,Fo=1005,Ln=1006,pc=1007,ns=1008,yi=1009,Om=1010,Bm=1011,_o=1012,kf=1013,Zi=1014,Li=1015,Ji=1016,Gf=1017,Hf=1018,vo=1020,zm=35902,km=35899,Gm=1021,Hm=1022,Ii=1023,gr=1026,is=1027,Vf=1028,Wf=1029,gs=1030,Xf=1031,Yf=1033,Ml=33776,yl=33777,bl=33778,El=33779,Cu=35840,Ru=35841,Pu=35842,Du=35843,Lu=36196,Iu=37492,Uu=37496,Nu=37488,Fu=37489,Ol=37490,Ou=37491,Bu=37808,zu=37809,ku=37810,Gu=37811,Hu=37812,Vu=37813,Wu=37814,Xu=37815,Yu=37816,qu=37817,$u=37818,Ku=37819,Zu=37820,Ju=37821,Qu=36492,ju=36494,ef=36495,tf=36283,nf=36284,Bl=36285,rf=36286,O_=3200,Kh=0,B_=1,wr="",Kn="srgb",zl="srgb-linear",kl="linear",zt="srgb",mc=7680,z_=519,k_=512,G_=513,H_=514,qf=515,V_=516,W_=517,$f=518,X_=519,Vm=35044,Oo=35048,Zh="300 es",Yi=2e3,Gl=2001;function Y_(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Hl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function q_(){const r=Hl("canvas");return r.style.display="block",r}const Jh={};function Vl(...r){const e="THREE."+r.shift();console.log(e,...r)}function Wm(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function lt(...r){r=Wm(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Dt(...r){r=Wm(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function sa(...r){const e=r.join(" ");e in Jh||(Jh[e]=!0,lt(...r))}function $_(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const K_={[xu]:Su,[Mu]:Eu,[yu]:Tu,[go]:bu,[Su]:xu,[Eu]:Mu,[Tu]:yu,[bu]:go};class xs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],gc=Math.PI/180,sf=180/Math.PI;function Nr(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]).toLowerCase()}function Mt(r,e,t){return Math.max(e,Math.min(t,r))}function Z_(r,e){return(r%e+e)%e}function _c(r,e,t){return(1-t)*r+t*e}function Vi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Gt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class je{static{je.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ga{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],f=s[a+0],h=s[a+1],g=s[a+2],_=s[a+3];if(d!==_||l!==f||c!==h||u!==g){let m=l*f+c*h+u*g+d*_;m<0&&(f=-f,h=-h,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){const S=Math.acos(m),b=Math.sin(S);p=Math.sin(p*S)/b,o=Math.sin(o*S)/b,l=l*p+f*o,c=c*p+h*o,u=u*p+g*o,d=d*p+_*o}else{l=l*p+f*o,c=c*p+h*o,u=u*p+g*o,d=d*p+_*o;const S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[a],f=s[a+1],h=s[a+2],g=s[a+3];return e[t]=o*g+u*d+l*h-c*f,e[t+1]=l*g+u*f+c*d-o*h,e[t+2]=c*g+u*h+o*f-l*d,e[t+3]=u*g-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(s/2),f=l(n/2),h=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"YZX":this._x=f*u*d+c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d-f*h*g;break;case"XZY":this._x=f*u*d-c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d+f*h*g;break;default:lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(a-i)*h}else if(n>o&&n>d){const h=2*Math.sqrt(1+n-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+a)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-n-d);this._w=(s-c)/h,this._x=(i+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-o);this._w=(a-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{static{H.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=i+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vc.copy(this).projectOnVector(e),this.sub(vc)}reflect(e){return this.sub(vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vc=new H,Qh=new ga;class ct{static{ct.prototype.isMatrix3=!0}constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],g=n[8],_=i[0],m=i[3],p=i[6],S=i[1],b=i[4],x=i[7],y=i[2],E=i[5],w=i[8];return s[0]=a*_+o*S+l*y,s[3]=a*m+o*b+l*E,s[6]=a*p+o*x+l*w,s[1]=c*_+u*S+d*y,s[4]=c*m+u*b+d*E,s[7]=c*p+u*x+d*w,s[2]=f*_+h*S+g*y,s[5]=f*m+h*b+g*E,s[8]=f*p+h*x+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*s,h=c*s-a*l,g=t*d+n*f+i*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*c-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=h*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return sa("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xc.makeScale(e,t)),this}rotate(e){return sa("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xc.makeRotation(-e)),this}translate(e,t){return sa("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xc=new ct,jh=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ed=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function J_(){const r={enabled:!0,workingColorSpace:zl,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===zt&&(i.r=dr(i.r),i.g=dr(i.g),i.b=dr(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===zt&&(i.r=aa(i.r),i.g=aa(i.g),i.b=aa(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===wr?kl:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return sa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return sa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[zl]:{primaries:e,whitePoint:n,transfer:kl,toXYZ:jh,fromXYZ:ed,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kn},outputColorSpaceConfig:{drawingBufferColorSpace:Kn}},[Kn]:{primaries:e,whitePoint:n,transfer:zt,toXYZ:jh,fromXYZ:ed,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kn}}}),r}const wt=J_();function dr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function aa(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ts;class Q_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ts===void 0&&(Ts=Hl("canvas")),Ts.width=e.width,Ts.height=e.height;const i=Ts.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=dr(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(dr(t[n]/255)*255):t[n]=dr(t[n]);return{data:t,width:e.width,height:e.height}}else return lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let j_=0;class Kf{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=Nr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Sc(i[a].image)):s.push(Sc(i[a]))}else s=Sc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Sc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Q_.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(lt("Texture: Unable to serialize Texture."),{})}let ev=0;const Mc=new H;class Un extends xs{constructor(e=Un.DEFAULT_IMAGE,t=Un.DEFAULT_MAPPING,n=ur,i=ur,s=Ln,a=ns,o=Ii,l=yi,c=Un.DEFAULT_ANISOTROPY,u=wr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=Nr(),this.name="",this.source=new Kf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mc).x}get height(){return this.source.getSize(Mc).y}get depth(){return this.source.getSize(Mc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){lt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){lt(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wu:e.x=e.x-Math.floor(e.x);break;case ur:e.x=e.x<0?0:1;break;case Au:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wu:e.y=e.y-Math.floor(e.y);break;case ur:e.y=e.y<0?0:1;break;case Au:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Un.DEFAULT_IMAGE=null;Un.DEFAULT_MAPPING=Fm;Un.DEFAULT_ANISOTROPY=1;class tn{static{tn.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,x=(h+1)/2,y=(p+1)/2,E=(u+f)/4,w=(d+_)/4,v=(g+m)/4;return b>x&&b>y?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=E/n,s=w/n):x>y?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=E/i,s=v/i):y<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(y),n=w/s,i=v/s),this.set(n,i,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-_)/S,this.z=(f-u)/S,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this.w=Mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this.w=Mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tv extends xs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tn(0,0,e,t),this.scissorTest=!1,this.viewport=new tn(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Un(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Kf(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends tv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xm extends Un{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=En,this.minFilter=En,this.wrapR=ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class nv extends Un{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=En,this.minFilter=En,this.wrapR=ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Yt{static{Yt.prototype.isMatrix4=!0}constructor(e,t,n,i,s,a,o,l,c,u,d,f,h,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,d,f,h,g,_,m)}set(e,t,n,i,s,a,o,l,c,u,d,f,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/ws.setFromMatrixColumn(e,0).length(),s=1/ws.setFromMatrixColumn(e,1).length(),a=1/ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,h=a*d,g=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+h*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,g=c*u,_=c*d;t[0]=f+_*o,t[4]=g*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,g=c*u,_=c*d;t[0]=f-_*o,t[4]=-a*d,t[8]=g+h*o,t[1]=h+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,h=a*d,g=o*u,_=o*d;t[0]=l*u,t[4]=g*c-h,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=h*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,h=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=a*l,h=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+_,t[5]=a*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=o*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iv,e,rv)}lookAt(e,t,n){const i=this.elements;return ii.subVectors(e,t),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),xr.crossVectors(n,ii),xr.lengthSq()===0&&(Math.abs(n.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),xr.crossVectors(n,ii)),xr.normalize(),Bo.crossVectors(ii,xr),i[0]=xr.x,i[4]=Bo.x,i[8]=ii.x,i[1]=xr.y,i[5]=Bo.y,i[9]=ii.y,i[2]=xr.z,i[6]=Bo.z,i[10]=ii.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],b=n[7],x=n[11],y=n[15],E=i[0],w=i[4],v=i[8],T=i[12],A=i[1],U=i[5],I=i[9],G=i[13],F=i[2],X=i[6],L=i[10],D=i[14],V=i[3],W=i[7],R=i[11],Q=i[15];return s[0]=a*E+o*A+l*F+c*V,s[4]=a*w+o*U+l*X+c*W,s[8]=a*v+o*I+l*L+c*R,s[12]=a*T+o*G+l*D+c*Q,s[1]=u*E+d*A+f*F+h*V,s[5]=u*w+d*U+f*X+h*W,s[9]=u*v+d*I+f*L+h*R,s[13]=u*T+d*G+f*D+h*Q,s[2]=g*E+_*A+m*F+p*V,s[6]=g*w+_*U+m*X+p*W,s[10]=g*v+_*I+m*L+p*R,s[14]=g*T+_*G+m*D+p*Q,s[3]=S*E+b*A+x*F+y*V,s[7]=S*w+b*U+x*X+y*W,s[11]=S*v+b*I+x*L+y*R,s[15]=S*T+b*G+x*D+y*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15],S=l*h-c*f,b=o*h-c*d,x=o*f-l*d,y=a*h-c*u,E=a*f-l*u,w=a*d-o*u;return t*(_*S-m*b+p*x)-n*(g*S-m*y+p*E)+i*(g*b-_*y+p*w)-s*(g*x-_*E+m*w)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(s*u-o*l)+i*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=t*o-n*a,b=t*l-i*a,x=t*c-s*a,y=n*l-i*o,E=n*c-s*o,w=i*c-s*l,v=u*_-d*g,T=u*m-f*g,A=u*p-h*g,U=d*m-f*_,I=d*p-h*_,G=f*p-h*m,F=S*G-b*I+x*U+y*A-E*T+w*v;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const X=1/F;return e[0]=(o*G-l*I+c*U)*X,e[1]=(i*I-n*G-s*U)*X,e[2]=(_*w-m*E+p*y)*X,e[3]=(f*E-d*w-h*y)*X,e[4]=(l*A-a*G-c*T)*X,e[5]=(t*G-i*A+s*T)*X,e[6]=(m*x-g*w-p*b)*X,e[7]=(u*w-f*x+h*b)*X,e[8]=(a*I-o*A+c*v)*X,e[9]=(n*A-t*I-s*v)*X,e[10]=(g*E-_*x+p*S)*X,e[11]=(d*x-u*E-h*S)*X,e[12]=(o*T-a*U-l*v)*X,e[13]=(t*U-n*T+i*v)*X,e[14]=(_*b-g*y-m*S)*X,e[15]=(u*y-d*b+f*S)*X,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,f=s*c,h=s*u,g=s*d,_=a*u,m=a*d,p=o*d,S=l*c,b=l*u,x=l*d,y=n.x,E=n.y,w=n.z;return i[0]=(1-(_+p))*y,i[1]=(h+x)*y,i[2]=(g-b)*y,i[3]=0,i[4]=(h-x)*E,i[5]=(1-(f+p))*E,i[6]=(m+S)*E,i[7]=0,i[8]=(g+b)*w,i[9]=(m-S)*w,i[10]=(1-(f+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ws.set(i[0],i[1],i[2]).length();const o=ws.set(i[4],i[5],i[6]).length(),l=ws.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Ci.copy(this);const c=1/a,u=1/o,d=1/l;return Ci.elements[0]*=c,Ci.elements[1]*=c,Ci.elements[2]*=c,Ci.elements[4]*=u,Ci.elements[5]*=u,Ci.elements[6]*=u,Ci.elements[8]*=d,Ci.elements[9]*=d,Ci.elements[10]*=d,t.setFromRotationMatrix(Ci),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=Yi,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i);let g,_;if(l)g=s/(a-s),_=a*s/(a-s);else if(o===Yi)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Gl)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Yi,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),h=-(n+i)/(n-i);let g,_;if(l)g=1/(a-s),_=a/(a-s);else if(o===Yi)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===Gl)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ws=new H,Ci=new Yt,iv=new H(0,0,0),rv=new H(1,1,1),xr=new H,Bo=new H,ii=new H,td=new Yt,nd=new ga;class _s{constructor(e=0,t=0,n=0,i=_s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return td.makeRotationFromQuaternion(e),this.setFromRotationMatrix(td,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nd.setFromEuler(this),this.setFromQuaternion(nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_s.DEFAULT_ORDER="XYZ";class Ym{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sv=0;const id=new H,As=new ga,ji=new Yt,zo=new H,Ea=new H,av=new H,ov=new ga,rd=new H(1,0,0),sd=new H(0,1,0),ad=new H(0,0,1),od={type:"added"},lv={type:"removed"},Cs={type:"childadded",child:null},yc={type:"childremoved",child:null};class Nn extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sv++}),this.uuid=Nr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nn.DEFAULT_UP.clone();const e=new H,t=new _s,n=new ga,i=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Yt},normalMatrix:{value:new ct}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=Nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ym,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(rd,e)}rotateY(e){return this.rotateOnAxis(sd,e)}rotateZ(e){return this.rotateOnAxis(ad,e)}translateOnAxis(e,t){return id.copy(e).applyQuaternion(this.quaternion),this.position.add(id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rd,e)}translateY(e){return this.translateOnAxis(sd,e)}translateZ(e){return this.translateOnAxis(ad,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ji.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zo.copy(e):zo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ea.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ji.lookAt(Ea,zo,this.up):ji.lookAt(zo,Ea,this.up),this.quaternion.setFromRotationMatrix(ji),i&&(ji.extractRotation(i.matrixWorld),As.setFromRotationMatrix(ji),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Dt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(od),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lv),yc.child=e,this.dispatchEvent(yc),yc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(od),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ea,e,av),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ea,ov,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Nn.DEFAULT_UP=new H(0,1,0);Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ks extends Nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cv={type:"move"};class bc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ks,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ks,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ks,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ks;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const qm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},ko={h:0,s:0,l:0};function Ec(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class It{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,wt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=wt.workingColorSpace){return this.r=e,this.g=t,this.b=n,wt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=wt.workingColorSpace){if(e=Z_(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ec(a,s,e+1/3),this.g=Ec(a,s,e),this.b=Ec(a,s,e-1/3)}return wt.colorSpaceToWorking(this,i),this}setStyle(e,t=Kn){function n(s){s!==void 0&&parseFloat(s)<1&&lt("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:lt("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);lt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kn){const n=qm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):lt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}copyLinearToSRGB(e){return this.r=aa(e.r),this.g=aa(e.g),this.b=aa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kn){return wt.workingToColorSpace(An.copy(this),e),Math.round(Mt(An.r*255,0,255))*65536+Math.round(Mt(An.g*255,0,255))*256+Math.round(Mt(An.b*255,0,255))}getHexString(e=Kn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=wt.workingColorSpace){wt.workingToColorSpace(An.copy(this),t);const n=An.r,i=An.g,s=An.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=wt.workingColorSpace){return wt.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=Kn){wt.workingToColorSpace(An.copy(this),e);const t=An.r,n=An.g,i=An.b;return e!==Kn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(ko);const n=_c(Sr.h,ko.h,t),i=_c(Sr.s,ko.s,t),s=_c(Sr.l,ko.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const An=new It;It.NAMES=qm;class uv extends Nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _s,this.environmentIntensity=1,this.environmentRotation=new _s,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ri=new H,er=new H,Tc=new H,tr=new H,Rs=new H,Ps=new H,ld=new H,wc=new H,Ac=new H,Cc=new H,Rc=new tn,Pc=new tn,Dc=new tn;class bi{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ri.subVectors(e,t),i.cross(Ri);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ri.subVectors(i,t),er.subVectors(n,t),Tc.subVectors(e,t);const a=Ri.dot(Ri),o=Ri.dot(er),l=Ri.dot(Tc),c=er.dot(er),u=er.dot(Tc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,g=(a*u-o*l)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,tr)===null?!1:tr.x>=0&&tr.y>=0&&tr.x+tr.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,tr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,tr.x),l.addScaledVector(a,tr.y),l.addScaledVector(o,tr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Rc.setScalar(0),Pc.setScalar(0),Dc.setScalar(0),Rc.fromBufferAttribute(e,t),Pc.fromBufferAttribute(e,n),Dc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Rc,s.x),a.addScaledVector(Pc,s.y),a.addScaledVector(Dc,s.z),a}static isFrontFacing(e,t,n,i){return Ri.subVectors(n,t),er.subVectors(e,t),Ri.cross(er).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),er.subVectors(this.a,this.b),Ri.cross(er).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return bi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Rs.subVectors(i,n),Ps.subVectors(s,n),wc.subVectors(e,n);const l=Rs.dot(wc),c=Ps.dot(wc);if(l<=0&&c<=0)return t.copy(n);Ac.subVectors(e,i);const u=Rs.dot(Ac),d=Ps.dot(Ac);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Rs,a);Cc.subVectors(e,s);const h=Rs.dot(Cc),g=Ps.dot(Cc);if(g>=0&&h<=g)return t.copy(s);const _=h*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ps,o);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return ld.subVectors(s,i),o=(d-u)/(d-u+(h-g)),t.copy(i).addScaledVector(ld,o);const p=1/(m+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(Rs,a).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ss{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Pi):Pi.fromBufferAttribute(s,a),Pi.applyMatrix4(e.matrixWorld),this.expandByPoint(Pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Go.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Go.copy(n.boundingBox)),Go.applyMatrix4(e.matrixWorld),this.union(Go)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pi),Pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ta),Ho.subVectors(this.max,Ta),Ds.subVectors(e.a,Ta),Ls.subVectors(e.b,Ta),Is.subVectors(e.c,Ta),Mr.subVectors(Ls,Ds),yr.subVectors(Is,Ls),Xr.subVectors(Ds,Is);let t=[0,-Mr.z,Mr.y,0,-yr.z,yr.y,0,-Xr.z,Xr.y,Mr.z,0,-Mr.x,yr.z,0,-yr.x,Xr.z,0,-Xr.x,-Mr.y,Mr.x,0,-yr.y,yr.x,0,-Xr.y,Xr.x,0];return!Lc(t,Ds,Ls,Is,Ho)||(t=[1,0,0,0,1,0,0,0,1],!Lc(t,Ds,Ls,Is,Ho))?!1:(Vo.crossVectors(Mr,yr),t=[Vo.x,Vo.y,Vo.z],Lc(t,Ds,Ls,Is,Ho))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const nr=[new H,new H,new H,new H,new H,new H,new H,new H],Pi=new H,Go=new Ss,Ds=new H,Ls=new H,Is=new H,Mr=new H,yr=new H,Xr=new H,Ta=new H,Ho=new H,Vo=new H,Yr=new H;function Lc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Yr.fromArray(r,s);const o=i.x*Math.abs(Yr.x)+i.y*Math.abs(Yr.y)+i.z*Math.abs(Yr.z),l=e.dot(Yr),c=t.dot(Yr),u=n.dot(Yr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ln=new H,Wo=new je;let fv=0;class xn extends xs{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vm,this.updateRanges=[],this.gpuType=Li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wo.fromBufferAttribute(this,t),Wo.applyMatrix3(e),this.setXY(t,Wo.x,Wo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix3(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Vi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array),s=Gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class $m extends xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Km extends xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends xn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const hv=new Ss,wa=new H,Ic=new H;class _a{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):hv.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wa.subVectors(e,this.center);const t=wa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(wa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wa.copy(e.center).add(Ic)),this.expandByPoint(wa.copy(e.center).sub(Ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let dv=0;const _i=new Yt,Uc=new Nn,Us=new H,ri=new Ss,Aa=new Ss,gn=new H;class an extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dv++}),this.uuid=Nr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Y_(e)?Km:$m)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ct().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _i.makeRotationFromQuaternion(e),this.applyMatrix4(_i),this}rotateX(e){return _i.makeRotationX(e),this.applyMatrix4(_i),this}rotateY(e){return _i.makeRotationY(e),this.applyMatrix4(_i),this}rotateZ(e){return _i.makeRotationZ(e),this.applyMatrix4(_i),this}translate(e,t,n){return _i.makeTranslation(e,t,n),this.applyMatrix4(_i),this}scale(e,t,n){return _i.makeScale(e,t,n),this.applyMatrix4(_i),this}lookAt(e){return Uc.lookAt(e),Uc.updateMatrix(),this.applyMatrix4(Uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new kt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];ri.setFromBufferAttribute(s),this.morphTargetsRelative?(gn.addVectors(this.boundingBox.min,ri.min),this.boundingBox.expandByPoint(gn),gn.addVectors(this.boundingBox.max,ri.max),this.boundingBox.expandByPoint(gn)):(this.boundingBox.expandByPoint(ri.min),this.boundingBox.expandByPoint(ri.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _a);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(ri.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Aa.setFromBufferAttribute(o),this.morphTargetsRelative?(gn.addVectors(ri.min,Aa.min),ri.expandByPoint(gn),gn.addVectors(ri.max,Aa.max),ri.expandByPoint(gn)):(ri.expandByPoint(Aa.min),ri.expandByPoint(Aa.max))}ri.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)gn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(gn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)gn.fromBufferAttribute(o,c),l&&(Us.fromBufferAttribute(e,c),gn.add(Us)),i=Math.max(i,n.distanceToSquared(gn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new H,l[v]=new H;const c=new H,u=new H,d=new H,f=new je,h=new je,g=new je,_=new H,m=new H;function p(v,T,A){c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,A),f.fromBufferAttribute(s,v),h.fromBufferAttribute(s,T),g.fromBufferAttribute(s,A),u.sub(c),d.sub(c),h.sub(f),g.sub(f);const U=1/(h.x*g.y-g.x*h.y);isFinite(U)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(U),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(U),o[v].add(_),o[T].add(_),o[A].add(_),l[v].add(m),l[T].add(m),l[A].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,T=S.length;v<T;++v){const A=S[v],U=A.start,I=A.count;for(let G=U,F=U+I;G<F;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const b=new H,x=new H,y=new H,E=new H;function w(v){y.fromBufferAttribute(i,v),E.copy(y);const T=o[v];b.copy(T),b.sub(y.multiplyScalar(y.dot(T))).normalize(),x.crossVectors(E,T);const U=x.dot(l[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,U)}for(let v=0,T=S.length;v<T;++v){const A=S[v],U=A.start,I=A.count;for(let G=U,F=U+I;G<F;G+=3)w(e.getX(G+0)),w(e.getX(G+1)),w(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new xn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new H,s=new H,a=new H,o=new H,l=new H,c=new H,u=new H,d=new H;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gn.fromBufferAttribute(e,t),gn.normalize(),e.setXYZ(t,gn.x,gn.y,gn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?h=l[_]*o.data.stride+o.offset:h=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[h++]}return new xn(f,u,d)}if(this.index===null)return lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new an,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vm,this.updateRanges=[],this.version=0,this.uuid=Nr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Bn=new H;class Wl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.applyMatrix4(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.applyNormalMatrix(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bn.fromBufferAttribute(this,t),Bn.transformDirection(e),this.setXYZ(t,Bn.x,Bn.y,Bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Vi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Vi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Vi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Vi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Vi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array),s=Gt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Vl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new xn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Wl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Nc=new H,mv=new H,gv=new ct;class Tr{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Nc.subVectors(n,t).cross(mv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Nc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gv.getNormalMatrix(e),i=this.coplanarPoint(Nc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let _v=0;class va extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_v++}),this.uuid=Nr(),this.name="",this.type="Material",this.blending=io,this.side=kr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wm,this.blendDst=Am,this.blendEquation=Xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=go,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=z_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mc,this.stencilZFail=mc,this.stencilZPass=mc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){lt(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){lt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new It().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Tr().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new je().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new je().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class af extends va{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ns;const Ca=new H,Fs=new H,Os=new H,Bs=new je,Ra=new je,Zm=new Yt,Xo=new H,Pa=new H,Yo=new H,cd=new je,Fc=new je,ud=new je;class fd extends Nn{constructor(e=new af){if(super(),this.isSprite=!0,this.type="Sprite",Ns===void 0){Ns=new an;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pv(t,5);Ns.setIndex([0,1,2,0,2,3]),Ns.setAttribute("position",new Wl(n,3,0,!1)),Ns.setAttribute("uv",new Wl(n,2,3,!1))}this.geometry=Ns,this.material=e,this.center=new je(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Dt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),Zm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;qo(Xo.set(-.5,-.5,0),Os,a,Fs,i,s),qo(Pa.set(.5,-.5,0),Os,a,Fs,i,s),qo(Yo.set(.5,.5,0),Os,a,Fs,i,s),cd.set(0,0),Fc.set(1,0),ud.set(1,1);let o=e.ray.intersectTriangle(Xo,Pa,Yo,!1,Ca);if(o===null&&(qo(Pa.set(-.5,.5,0),Os,a,Fs,i,s),Fc.set(0,1),o=e.ray.intersectTriangle(Xo,Yo,Pa,!1,Ca),o===null))return;const l=e.ray.origin.distanceTo(Ca);l<e.near||l>e.far||t.push({distance:l,point:Ca.clone(),uv:bi.getInterpolation(Ca,Xo,Pa,Yo,cd,Fc,ud,new je),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function qo(r,e,t,n,i,s){Bs.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Ra.x=s*Bs.x-i*Bs.y,Ra.y=i*Bs.x+s*Bs.y):Ra.copy(Bs),r.copy(e),r.x+=Ra.x,r.y+=Ra.y,r.applyMatrix4(Zm)}const ir=new H,Oc=new H,$o=new H,Ko=new H;class Jm{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ir)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ir.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ir.copy(this.origin).addScaledVector(this.direction,t),ir.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Oc.copy(e).add(t).multiplyScalar(.5),$o.copy(t).sub(e).normalize(),Ko.copy(this.origin).sub(Oc);const s=e.distanceTo(t)*.5,a=-this.direction.dot($o),o=Ko.dot(this.direction),l=-Ko.dot($o),c=Ko.lengthSq(),u=Math.abs(1-a*a);let d,f,h,g;if(u>0)if(d=a*l-o,f=a*o-l,g=s*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,h=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Oc).addScaledVector($o,f),h}intersectSphere(e,t){if(e.radius<0)return null;ir.subVectors(e.center,this.origin);const n=ir.dot(this.direction),i=ir.dot(ir)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ir)!==null}intersectTriangle(e,t,n,i,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,f=e.y-a.y,h=e.z-a.z,g=t.x-a.x,_=t.y-a.y,m=t.z-a.z,p=n.x-a.x,S=n.y-a.y,b=n.z-a.z,x=Math.abs(l),y=Math.abs(c),E=Math.abs(u);let w,v,T,A,U,I,G,F,X,L,D,V;if(x>=y&&x>=E?(T=l,I=d,X=g,V=p,l>=0?(w=c,v=u,A=f,U=h,G=_,F=m,L=S,D=b):(w=u,v=c,A=h,U=f,G=m,F=_,L=b,D=S)):y>=E?(T=c,I=f,X=_,V=S,c>=0?(w=u,v=l,A=h,U=d,G=m,F=g,L=b,D=p):(w=l,v=u,A=d,U=h,G=g,F=m,L=p,D=b)):(T=u,I=h,X=m,V=b,u>=0?(w=l,v=c,A=d,U=f,G=g,F=_,L=p,D=S):(w=c,v=l,A=f,U=d,G=_,F=g,L=S,D=p)),T===0)return null;const W=w/T,R=v/T,Q=1/T,Se=A-W*I,Re=U-R*I,Ue=G-W*X,Me=F-R*X,Ve=L-W*V,J=D-R*V,ae=Ve*Me-J*Ue,Ee=Se*J-Re*Ve,Ye=Ue*Re-Me*Se;if(i){if(ae<0||Ee<0||Ye<0)return null}else if((ae<0||Ee<0||Ye<0)&&(ae>0||Ee>0||Ye>0))return null;const xe=ae+Ee+Ye;if(xe===0)return null;const Be=Q*(ae*I+Ee*X+Ye*V);return(xe>0?Be<0:Be>0)?null:this.at(Be/xe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qm extends va{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.combine=Cm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hd=new Yt,qr=new Jm,Zo=new _a,dd=new H,Jo=new H,Qo=new H,jo=new H,Bc=new H,el=new H,pd=new H,tl=new H;class Jt extends Nn{constructor(e=new an,t=new Qm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){el.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Bc.fromBufferAttribute(d,e),a?el.addScaledVector(Bc,u):el.addScaledVector(Bc.sub(t),u))}t.add(el)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zo.copy(n.boundingSphere),Zo.applyMatrix4(s),qr.copy(e.ray).recast(e.near),!(Zo.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Zo,dd)===null||qr.origin.distanceToSquared(dd)>(e.far-e.near)**2))&&(hd.copy(s).invert(),qr.copy(e.ray).applyMatrix4(hd),!(n.boundingBox!==null&&qr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,h.start),b=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let x=S,y=b;x<y;x+=3){const E=o.getX(x),w=o.getX(x+1),v=o.getX(x+2);i=nl(this,p,e,n,c,u,d,E,w,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),_=Math.min(o.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const S=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);i=nl(this,a,e,n,c,u,d,S,b,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,h.start),b=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let x=S,y=b;x<y;x+=3){const E=x,w=x+1,v=x+2;i=nl(this,p,e,n,c,u,d,E,w,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const S=m,b=m+1,x=m+2;i=nl(this,a,e,n,c,u,d,S,b,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function vv(r,e,t,n,i,s,a,o){let l;if(e.side===qn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===kr,o),l===null)return null;tl.copy(o),tl.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(tl);return c<t.near||c>t.far?null:{distance:c,point:tl.clone(),object:r}}function nl(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Jo),r.getVertexPosition(l,Qo),r.getVertexPosition(c,jo);const u=vv(r,e,t,n,Jo,Qo,jo,pd);if(u){const d=new H;bi.getBarycoord(pd,Jo,Qo,jo,d),i&&(u.uv=bi.getInterpolatedAttribute(i,o,l,c,d,new je)),s&&(u.uv1=bi.getInterpolatedAttribute(s,o,l,c,d,new je)),a&&(u.normal=bi.getInterpolatedAttribute(a,o,l,c,d,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new H,materialIndex:0};bi.getNormal(Jo,Qo,jo,f.normal),u.face=f,u.barycoord=d}return u}class jm extends Un{constructor(e=null,t=1,n=1,i,s,a,o,l,c=En,u=En,d,f){super(null,a,o,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class of extends xn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const zs=new Yt,md=new Yt,il=[],gd=new Ss,xv=new Yt,Da=new Jt,La=new _a;class _d extends Jt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new of(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,xv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ss),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),gd.copy(e.boundingBox).applyMatrix4(zs),this.boundingBox.union(gd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _a),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),La.copy(e.boundingSphere).applyMatrix4(zs),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Da.geometry=this.geometry,Da.material=this.material,Da.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,zs),md.multiplyMatrices(n,zs),Da.matrixWorld=md,Da.raycast(e,il);for(let a=0,o=il.length;a<o;a++){const l=il[a];l.instanceId=s,l.object=this,t.push(l)}il.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new of(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new jm(new Float32Array(i*this.count),i,this.count,Vf,Li));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const $r=new _a,Sv=new je(.5,.5),rl=new H;class e0{constructor(e=new Tr,t=new Tr,n=new Tr,i=new Tr,s=new Tr,a=new Tr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yi,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],_=s[9],m=s[10],p=s[11],S=s[12],b=s[13],x=s[14],y=s[15];if(i[0].setComponents(c-a,h-u,p-g,y-S).normalize(),i[1].setComponents(c+a,h+u,p+g,y+S).normalize(),i[2].setComponents(c+o,h+d,p+_,y+b).normalize(),i[3].setComponents(c-o,h-d,p-_,y-b).normalize(),n)i[4].setComponents(l,f,m,x).normalize(),i[5].setComponents(c-l,h-f,p-m,y-x).normalize();else if(i[4].setComponents(c-l,h-f,p-m,y-x).normalize(),t===Yi)i[5].setComponents(c+l,h+f,p+m,y+x).normalize();else if(t===Gl)i[5].setComponents(l,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($r)}intersectsSprite(e){$r.center.set(0,0,0);const t=Sv.distanceTo(e.center);return $r.radius=.7071067811865476+t,$r.applyMatrix4(e.matrixWorld),this.intersectsSphere($r)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(rl.x=i.normal.x>0?e.max.x:e.min.x,rl.y=i.normal.y>0?e.max.y:e.min.y,rl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(rl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mv extends va{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vd=new Yt,lf=new Jm,sl=new _a,al=new H;class xd extends Nn{constructor(e=new an,t=new Mv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sl.copy(n.boundingSphere),sl.applyMatrix4(i),sl.radius+=s,e.ray.intersectsSphere(sl)===!1)return;vd.copy(i).invert(),lf.copy(e.ray).applyMatrix4(vd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),h=Math.min(c.count,a.start+a.count);for(let g=f,_=h;g<_;g++){const m=c.getX(g);al.fromBufferAttribute(d,m),Sd(al,m,l,i,e,t,this)}}else{const f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let g=f,_=h;g<_;g++)al.fromBufferAttribute(d,g),Sd(al,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Sd(r,e,t,n,i,s,a){const o=lf.distanceSqToPoint(r);if(o<t){const l=new H;lf.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class t0 extends Un{constructor(e=[],t=ms,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Md extends Un{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xo extends Un{constructor(e,t,n=Zi,i,s,a,o=En,l=En,c,u=gr,d=1){if(u!==gr&&u!==is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class yv extends xo{constructor(e,t=Zi,n=ms,i,s,a=En,o=En,l,c=gr){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class n0 extends Un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mo extends an{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(u,3)),this.setAttribute("uv",new kt(d,2));function g(_,m,p,S,b,x,y,E,w,v,T){const A=x/w,U=y/v,I=x/2,G=y/2,F=E/2,X=w+1,L=v+1;let D=0,V=0;const W=new H;for(let R=0;R<L;R++){const Q=R*U-G;for(let Se=0;Se<X;Se++){const Re=Se*A-I;W[_]=Re*S,W[m]=Q*b,W[p]=F,c.push(W.x,W.y,W.z),W[_]=0,W[m]=0,W[p]=E>0?1:-1,u.push(W.x,W.y,W.z),d.push(Se/w),d.push(1-R/v),D+=1}}for(let R=0;R<v;R++)for(let Q=0;Q<w;Q++){const Se=f+Q+X*R,Re=f+Q+X*(R+1),Ue=f+(Q+1)+X*(R+1),Me=f+(Q+1)+X*R;l.push(Se,Re,Me),l.push(Re,Ue,Me),V+=6}o.addGroup(h,V,T),h+=V,f+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Zf extends an{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new H,u=new je;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const h=n+d/t*i;c.x=e*Math.cos(h),c.y=e*Math.sin(h),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new kt(a,3)),this.setAttribute("normal",new kt(o,3)),this.setAttribute("uv",new kt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jf extends an{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],d=[],f=[],h=[];let g=0;const _=[],m=n/2;let p=0;S(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new kt(d,3)),this.setAttribute("normal",new kt(f,3)),this.setAttribute("uv",new kt(h,2));function S(){const x=new H,y=new H;let E=0;const w=(t-e)/n;for(let v=0;v<=s;v++){const T=[],A=v/s,U=A*(t-e)+e;for(let I=0;I<=i;I++){const G=I/i,F=G*l+o,X=Math.sin(F),L=Math.cos(F);y.x=U*X,y.y=-A*n+m,y.z=U*L,d.push(y.x,y.y,y.z),x.set(X,w,L).normalize(),f.push(x.x,x.y,x.z),h.push(G,1-A),T.push(g++)}_.push(T)}for(let v=0;v<i;v++)for(let T=0;T<s;T++){const A=_[T][v],U=_[T+1][v],I=_[T+1][v+1],G=_[T][v+1];(e>0||T!==0)&&(u.push(A,U,G),E+=3),(t>0||T!==s-1)&&(u.push(U,I,G),E+=3)}c.addGroup(p,E,0),p+=E}function b(x){const y=g,E=new je,w=new H;let v=0;const T=x===!0?e:t,A=x===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,m*A,0),f.push(0,A,0),h.push(.5,.5),g++;const U=g;for(let I=0;I<=i;I++){const F=I/i*l+o,X=Math.cos(F),L=Math.sin(F);w.x=T*L,w.y=m*A,w.z=T*X,d.push(w.x,w.y,w.z),f.push(0,A,0),E.x=X*.5+.5,E.y=L*.5*A+.5,h.push(E.x,E.y),g++}for(let I=0;I<i;I++){const G=y+I,F=U+I;x===!0?u.push(F,F+1,G):u.push(F+1,F,G),v+=3}c.addGroup(p,v,x===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jf(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qf extends an{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new kt(s,3)),this.setAttribute("normal",new kt(s.slice(),3)),this.setAttribute("uv",new kt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const b=new H,x=new H,y=new H;for(let E=0;E<t.length;E+=3)h(t[E+0],b),h(t[E+1],x),h(t[E+2],y),l(b,x,y,S)}function l(S,b,x,y){const E=y+1,w=[];for(let v=0;v<=E;v++){w[v]=[];const T=S.clone().lerp(x,v/E),A=b.clone().lerp(x,v/E),U=E-v;for(let I=0;I<=U;I++)I===0&&v===E?w[v][I]=T:w[v][I]=T.clone().lerp(A,I/U)}for(let v=0;v<E;v++)for(let T=0;T<2*(E-v)-1;T++){const A=Math.floor(T/2);T%2===0?(f(w[v][A+1]),f(w[v+1][A]),f(w[v][A])):(f(w[v][A+1]),f(w[v+1][A+1]),f(w[v+1][A]))}}function c(S){const b=new H;for(let x=0;x<s.length;x+=3)b.x=s[x+0],b.y=s[x+1],b.z=s[x+2],b.normalize().multiplyScalar(S),s[x+0]=b.x,s[x+1]=b.y,s[x+2]=b.z}function u(){const S=new H;for(let b=0;b<s.length;b+=3){S.x=s[b+0],S.y=s[b+1],S.z=s[b+2];const x=m(S)/2/Math.PI+.5,y=p(S)/Math.PI+.5;a.push(x,1-y)}g(),d()}function d(){for(let S=0;S<a.length;S+=6){const b=a[S+0],x=a[S+2],y=a[S+4],E=Math.max(b,x,y),w=Math.min(b,x,y);E>.9&&w<.1&&(b<.2&&(a[S+0]+=1),x<.2&&(a[S+2]+=1),y<.2&&(a[S+4]+=1))}}function f(S){s.push(S.x,S.y,S.z)}function h(S,b){const x=S*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function g(){const S=new H,b=new H,x=new H,y=new H,E=new je,w=new je,v=new je;for(let T=0,A=0;T<s.length;T+=9,A+=6){S.set(s[T+0],s[T+1],s[T+2]),b.set(s[T+3],s[T+4],s[T+5]),x.set(s[T+6],s[T+7],s[T+8]),E.set(a[A+0],a[A+1]),w.set(a[A+2],a[A+3]),v.set(a[A+4],a[A+5]),y.copy(S).add(b).add(x).divideScalar(3);const U=m(y);_(E,A+0,S,U),_(w,A+2,b,U),_(v,A+4,x,U)}}function _(S,b,x,y){y<0&&S.x===1&&(a[b]=S.x-1),x.x===0&&x.z===0&&(a[b]=y/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qf(e.vertices,e.indices,e.radius,e.detail)}}class bv{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){lt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],f=n[i+1]-u,h=(a-u)/f;return(i+h)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new je:new H);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new H,i=[],s=[],a=[],o=new H,l=new Yt;for(let h=0;h<=e;h++){const g=h/e;i[h]=this.getTangentAt(g,new H)}s[0]=new H,a[0]=new H;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(i[h-1],i[h]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Mt(i[h-1].dot(i[h]),-1,1));s[h].applyMatrix4(l.makeRotationAxis(o,g))}a[h].crossVectors(i[h],s[h])}if(t===!0){let h=Math.acos(Mt(s[0].dot(s[e]),-1,1));h/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(h=-h);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],h*g)),a[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function jf(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let f=(a-s)/c-(o-s)/(c+u)+(o-a)/u,h=(o-a)/u-(l-a)/(u+d)+(l-o)/d;f*=u,h*=u,i(a,o,f,h)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const yd=new H,bd=new H,zc=new jf,kc=new jf,Gc=new jf;class Ed extends bv{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new H){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(bd.subVectors(i[0],i[1]).add(i[0]),c=bd);const d=i[o%s],f=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(yd.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=yd),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),h),_=Math.pow(d.distanceToSquared(f),h),m=Math.pow(f.distanceToSquared(u),h);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),zc.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,g,_,m),kc.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,g,_,m),Gc.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(zc.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),kc.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Gc.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return n.set(zc.calc(l),kc.calc(l),Gc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new H().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class eh extends Qf{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new eh(e.radius,e.detail)}}class th extends an{constructor(e=[new je(0,-.5),new je(.5,0),new je(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Mt(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,d=new H,f=new je,h=new H,g=new H,_=new H;let m=0,p=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,h.x=p*1,h.y=-m,h.z=p*0,_.copy(h),h.normalize(),l.push(h.x,h.y,h.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:m=e[S+1].x-e[S].x,p=e[S+1].y-e[S].y,h.x=p*1,h.y=-m,h.z=p*0,g.copy(h),h.x+=_.x,h.y+=_.y,h.z+=_.z,h.normalize(),l.push(h.x,h.y,h.z),_.copy(g)}for(let S=0;S<=t;S++){const b=n+S*u*i,x=Math.sin(b),y=Math.cos(b);for(let E=0;E<=e.length-1;E++){d.x=e[E].x*x,d.y=e[E].y,d.z=e[E].x*y,a.push(d.x,d.y,d.z),f.x=S/t,f.y=E/(e.length-1),o.push(f.x,f.y);const w=l[3*E+0]*x,v=l[3*E+1],T=l[3*E+0]*y;c.push(w,v,T)}}for(let S=0;S<t;S++)for(let b=0;b<e.length-1;b++){const x=b+S*e.length,y=x,E=x+e.length,w=x+e.length+1,v=x+1;s.push(y,E,v),s.push(w,v,E)}this.setIndex(s),this.setAttribute("position",new kt(a,3)),this.setAttribute("uv",new kt(o,2)),this.setAttribute("normal",new kt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new th(e.points,e.segments,e.phiStart,e.phiLength)}}class xa extends an{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=e/o,f=t/l,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const S=p*f-a;for(let b=0;b<c;b++){const x=b*d-s;g.push(x,-S,0),_.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const b=S+c*p,x=S+c*(p+1),y=S+1+c*(p+1),E=S+1+c*p;h.push(b,x,E),h.push(x,y,E)}this.setIndex(h),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(_,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.width,e.height,e.widthSegments,e.heightSegments)}}class ro extends an{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let d=e;const f=(t-e)/i,h=new H,g=new je;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=s+m/n*a;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),g.x=(h.x/t+1)/2,g.y=(h.y/t+1)/2,u.push(g.x,g.y)}d+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const S=p+m,b=S,x=S+n+1,y=S+n+2,E=S+1;o.push(b,x,E),o.push(x,y,E)}}this.setIndex(o),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class fs extends an{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new H,f=new H,h=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],b=p/n,x=a+b*o,y=e*Math.cos(x),E=Math.sqrt(e*e-y*y);let w=0;p===0&&a===0?w=.5/t:p===n&&l===Math.PI&&(w=-.5/t);for(let v=0;v<=t;v++){const T=v/t,A=i+T*s;d.x=-E*Math.cos(A),d.y=y,d.z=E*Math.sin(A),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(T+w,1-b),S.push(c++)}u.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const b=u[p][S+1],x=u[p][S],y=u[p+1][S],E=u[p+1][S+1];(p!==0||a>0)&&h.push(b,x,E),(p!==n-1||l<Math.PI)&&h.push(x,y,E)}this.setIndex(h),this.setAttribute("position",new kt(g,3)),this.setAttribute("normal",new kt(_,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ma(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(Td(i))i.isRenderTargetTexture?(lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Td(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function kn(r){const e={};for(let t=0;t<r.length;t++){const n=ma(r[t]);for(const i in n)e[i]=n[i]}return e}function Td(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Ev(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function i0(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:wt.workingColorSpace}const Tv={clone:ma,merge:kn};var wv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Av=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends va{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wv,this.fragmentShader=Av,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ma(e.uniforms),this.uniformsGroups=Ev(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new It().setHex(i.value);break;case"v2":this.uniforms[n].value=new je().fromArray(i.value);break;case"v3":this.uniforms[n].value=new H().fromArray(i.value);break;case"v4":this.uniforms[n].value=new tn().fromArray(i.value);break;case"m3":this.uniforms[n].value=new ct().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Yt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Cv extends Ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rv extends va{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=O_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Pv extends va{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ol=new H,ll=new ga,Oi=new H;class r0 extends Nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ol,ll,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ol,ll,Oi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ol,ll,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ol,ll,Oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const br=new H,wd=new je,Ad=new je;class Mi extends r0{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sf*2*Math.atan(Math.tan(gc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){br.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(br.x,br.y).multiplyScalar(-e/br.z),br.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(br.x,br.y).multiplyScalar(-e/br.z)}getViewSize(e,t){return this.getViewBounds(e,wd,Ad),t.subVectors(Ad,wd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(gc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class s0 extends r0{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ks=-90,Gs=1;class Dv extends Nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Mi(ks,Gs,e,t);i.layers=this.layers,this.add(i);const s=new Mi(ks,Gs,e,t);s.layers=this.layers,this.add(s);const a=new Mi(ks,Gs,e,t);a.layers=this.layers,this.add(a);const o=new Mi(ks,Gs,e,t);o.layers=this.layers,this.add(o);const l=new Mi(ks,Gs,e,t);l.layers=this.layers,this.add(l);const c=new Mi(ks,Gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Yi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Lv extends Mi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class a0{static{a0.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}}function Cd(r,e,t,n){const i=Iv(n);switch(t){case Gm:return r*e;case Vf:return r*e/i.components*i.byteLength;case Wf:return r*e/i.components*i.byteLength;case gs:return r*e*2/i.components*i.byteLength;case Xf:return r*e*2/i.components*i.byteLength;case Hm:return r*e*3/i.components*i.byteLength;case Ii:return r*e*4/i.components*i.byteLength;case Yf:return r*e*4/i.components*i.byteLength;case Ml:case yl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case bl:case El:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ru:case Du:return Math.max(r,16)*Math.max(e,8)/4;case Cu:case Pu:return Math.max(r,8)*Math.max(e,8)/2;case Lu:case Iu:case Nu:case Fu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Uu:case Ol:case Ou:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Bu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case zu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case ku:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Gu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Hu:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Vu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Wu:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Xu:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Yu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case qu:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case $u:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ku:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Zu:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ju:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Qu:case ju:case ef:return Math.ceil(r/4)*Math.ceil(e/4)*16;case tf:case nf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Bl:case rf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Iv(r){switch(r){case yi:case Om:return{byteLength:1,components:1};case _o:case Bm:case Ji:return{byteLength:2,components:1};case Gf:case Hf:return{byteLength:2,components:4};case Zi:case kf:case Li:return{byteLength:4,components:1};case zm:case km:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zf}}));typeof window<"u"&&(window.__THREE__?lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zf);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function o0(){let r=null,e=!1,t=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),t(s,a)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Uv(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){const g=d[f],_=d[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){const _=d[h];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Nv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ov=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Wv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$v=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Kv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ex=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ix=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ax=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ux=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fx="gl_FragColor = linearToOutputTexel( gl_FragColor );",hx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,px=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_x=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ex=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ax=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Cx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Px=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ix=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ux=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ox=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Bx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$x=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,e1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,t1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,r1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,s1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,a1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,l1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,c1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,u1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,f1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,h1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,p1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,m1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,g1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,v1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,x1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,S1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,M1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,b1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,T1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,w1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,A1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,C1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,R1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,P1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,D1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,L1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,U1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const N1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,F1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,H1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,V1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,W1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,X1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Y1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,K1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Z1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Q1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,iS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,aS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,uS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:Nv,alphahash_pars_fragment:Fv,alphamap_fragment:Ov,alphamap_pars_fragment:Bv,alphatest_fragment:zv,alphatest_pars_fragment:kv,aomap_fragment:Gv,aomap_pars_fragment:Hv,batching_pars_vertex:Vv,batching_vertex:Wv,begin_vertex:Xv,beginnormal_vertex:Yv,bsdfs:qv,iridescence_fragment:$v,bumpmap_pars_fragment:Kv,clipping_planes_fragment:Zv,clipping_planes_pars_fragment:Jv,clipping_planes_pars_vertex:Qv,clipping_planes_vertex:jv,color_fragment:ex,color_pars_fragment:tx,color_pars_vertex:nx,color_vertex:ix,common:rx,cube_uv_reflection_fragment:sx,defaultnormal_vertex:ax,displacementmap_pars_vertex:ox,displacementmap_vertex:lx,emissivemap_fragment:cx,emissivemap_pars_fragment:ux,colorspace_fragment:fx,colorspace_pars_fragment:hx,envmap_fragment:dx,envmap_common_pars_fragment:px,envmap_pars_fragment:mx,envmap_pars_vertex:gx,envmap_physical_pars_fragment:Ax,envmap_vertex:_x,fog_vertex:vx,fog_pars_vertex:xx,fog_fragment:Sx,fog_pars_fragment:Mx,gradientmap_pars_fragment:yx,lightmap_pars_fragment:bx,lights_lambert_fragment:Ex,lights_lambert_pars_fragment:Tx,lights_pars_begin:wx,lights_toon_fragment:Cx,lights_toon_pars_fragment:Rx,lights_phong_fragment:Px,lights_phong_pars_fragment:Dx,lights_physical_fragment:Lx,lights_physical_pars_fragment:Ix,lights_fragment_begin:Ux,lights_fragment_maps:Nx,lights_fragment_end:Fx,lightprobes_pars_fragment:Ox,logdepthbuf_fragment:Bx,logdepthbuf_pars_fragment:zx,logdepthbuf_pars_vertex:kx,logdepthbuf_vertex:Gx,map_fragment:Hx,map_pars_fragment:Vx,map_particle_fragment:Wx,map_particle_pars_fragment:Xx,metalnessmap_fragment:Yx,metalnessmap_pars_fragment:qx,morphinstance_vertex:$x,morphcolor_vertex:Kx,morphnormal_vertex:Zx,morphtarget_pars_vertex:Jx,morphtarget_vertex:Qx,normal_fragment_begin:jx,normal_fragment_maps:e1,normal_pars_fragment:t1,normal_pars_vertex:n1,normal_vertex:i1,normalmap_pars_fragment:r1,clearcoat_normal_fragment_begin:s1,clearcoat_normal_fragment_maps:a1,clearcoat_pars_fragment:o1,iridescence_pars_fragment:l1,opaque_fragment:c1,packing:u1,premultiplied_alpha_fragment:f1,project_vertex:h1,dithering_fragment:d1,dithering_pars_fragment:p1,roughnessmap_fragment:m1,roughnessmap_pars_fragment:g1,shadowmap_pars_fragment:_1,shadowmap_pars_vertex:v1,shadowmap_vertex:x1,shadowmask_pars_fragment:S1,skinbase_vertex:M1,skinning_pars_vertex:y1,skinning_vertex:b1,skinnormal_vertex:E1,specularmap_fragment:T1,specularmap_pars_fragment:w1,tonemapping_fragment:A1,tonemapping_pars_fragment:C1,transmission_fragment:R1,transmission_pars_fragment:P1,uv_pars_fragment:D1,uv_pars_vertex:L1,uv_vertex:I1,worldpos_vertex:U1,background_vert:N1,background_frag:F1,backgroundCube_vert:O1,backgroundCube_frag:B1,cube_vert:z1,cube_frag:k1,depth_vert:G1,depth_frag:H1,distance_vert:V1,distance_frag:W1,equirect_vert:X1,equirect_frag:Y1,linedashed_vert:q1,linedashed_frag:$1,meshbasic_vert:K1,meshbasic_frag:Z1,meshlambert_vert:J1,meshlambert_frag:Q1,meshmatcap_vert:j1,meshmatcap_frag:eS,meshnormal_vert:tS,meshnormal_frag:nS,meshphong_vert:iS,meshphong_frag:rS,meshphysical_vert:sS,meshphysical_frag:aS,meshtoon_vert:oS,meshtoon_frag:lS,points_vert:cS,points_frag:uS,shadow_vert:fS,shadow_frag:hS,sprite_vert:dS,sprite_frag:pS},Ie={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Gi={basic:{uniforms:kn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:kn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new It(0)},envMapIntensity:{value:1}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:kn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:kn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:kn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new It(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:kn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:kn([Ie.points,Ie.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:kn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:kn([Ie.common,Ie.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:kn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:kn([Ie.sprite,Ie.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distance:{uniforms:kn([Ie.common,Ie.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distance_vert,fragmentShader:pt.distance_frag},shadow:{uniforms:kn([Ie.lights,Ie.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Gi.physical={uniforms:kn([Gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const cl={r:0,b:0,g:0},mS=new Yt,l0=new ct;l0.set(-1,0,0,0,1,0,0,0,1);function gS(r,e,t,n,i,s){const a=new It(0);let o=i===!0?0:1,l,c,u=null,d=0,f=null;function h(S){let b=S.isScene===!0?S.background:null;if(b&&b.isTexture){const x=S.backgroundBlurriness>0;b=e.get(b,x)}return b}function g(S){let b=!1;const x=h(S);x===null?m(a,o):x&&x.isColor&&(m(x,1),b=!0);const y=r.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(S,b){const x=h(b);x&&(x.isCubeTexture||x.mapping===Kl)?(c===void 0&&(c=new Jt(new Mo(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:ma(Gi.backgroundCube.uniforms),vertexShader:Gi.backgroundCube.vertexShader,fragmentShader:Gi.backgroundCube.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mS.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(l0),c.material.toneMapped=wt.getTransfer(x.colorSpace)!==zt,(u!==x||d!==x.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Jt(new xa(2,2),new Ni({name:"BackgroundMaterial",uniforms:ma(Gi.background.uniforms),vertexShader:Gi.background.vertexShader,fragmentShader:Gi.background.fragmentShader,side:kr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=wt.getTransfer(x.colorSpace)!==zt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,b){S.getRGB(cl,i0(r)),t.buffers.color.setClear(cl.r,cl.g,cl.b,b,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,b=1){a.set(S),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:_,dispose:p}}function _S(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,a=!1;function o(U,I,G,F,X){let L=!1;const D=d(U,F,G,I);s!==D&&(s=D,c(s.object)),L=h(U,F,G,X),L&&g(U,F,G,X),X!==null&&e.update(X,r.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,x(U,I,G,F),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return r.createVertexArray()}function c(U){return r.bindVertexArray(U)}function u(U){return r.deleteVertexArray(U)}function d(U,I,G,F){const X=F.wireframe===!0;let L=n[I.id];L===void 0&&(L={},n[I.id]=L);const D=U.isInstancedMesh===!0?U.id:0;let V=L[D];V===void 0&&(V={},L[D]=V);let W=V[G.id];W===void 0&&(W={},V[G.id]=W);let R=W[X];return R===void 0&&(R=f(l()),W[X]=R),R}function f(U){const I=[],G=[],F=[];for(let X=0;X<t;X++)I[X]=0,G[X]=0,F[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:F,object:U,attributes:{},index:null}}function h(U,I,G,F){const X=s.attributes,L=I.attributes;let D=0;const V=G.getAttributes();for(const W in V)if(V[W].location>=0){const Q=X[W];let Se=L[W];if(Se===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(Se=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(Se=U.instanceColor)),Q===void 0||Q.attribute!==Se||Se&&Q.data!==Se.data)return!0;D++}return s.attributesNum!==D||s.index!==F}function g(U,I,G,F){const X={},L=I.attributes;let D=0;const V=G.getAttributes();for(const W in V)if(V[W].location>=0){let Q=L[W];Q===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(Q=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(Q=U.instanceColor));const Se={};Se.attribute=Q,Q&&Q.data&&(Se.data=Q.data),X[W]=Se,D++}s.attributes=X,s.attributesNum=D,s.index=F}function _(){const U=s.newAttributes;for(let I=0,G=U.length;I<G;I++)U[I]=0}function m(U){p(U,0)}function p(U,I){const G=s.newAttributes,F=s.enabledAttributes,X=s.attributeDivisors;G[U]=1,F[U]===0&&(r.enableVertexAttribArray(U),F[U]=1),X[U]!==I&&(r.vertexAttribDivisor(U,I),X[U]=I)}function S(){const U=s.newAttributes,I=s.enabledAttributes;for(let G=0,F=I.length;G<F;G++)I[G]!==U[G]&&(r.disableVertexAttribArray(G),I[G]=0)}function b(U,I,G,F,X,L,D){D===!0?r.vertexAttribIPointer(U,I,G,X,L):r.vertexAttribPointer(U,I,G,F,X,L)}function x(U,I,G,F){_();const X=F.attributes,L=G.getAttributes(),D=I.defaultAttributeValues;for(const V in L){const W=L[V];if(W.location>=0){let R=X[V];if(R===void 0&&(V==="instanceMatrix"&&U.instanceMatrix&&(R=U.instanceMatrix),V==="instanceColor"&&U.instanceColor&&(R=U.instanceColor)),R!==void 0){const Q=R.normalized,Se=R.itemSize,Re=e.get(R);if(Re===void 0)continue;const Ue=Re.buffer,Me=Re.type,Ve=Re.bytesPerElement,J=Me===r.INT||Me===r.UNSIGNED_INT||R.gpuType===kf;if(R.isInterleavedBufferAttribute){const ae=R.data,Ee=ae.stride,Ye=R.offset;if(ae.isInstancedInterleavedBuffer){for(let xe=0;xe<W.locationSize;xe++)p(W.location+xe,ae.meshPerAttribute);U.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let xe=0;xe<W.locationSize;xe++)m(W.location+xe);r.bindBuffer(r.ARRAY_BUFFER,Ue);for(let xe=0;xe<W.locationSize;xe++)b(W.location+xe,Se/W.locationSize,Me,Q,Ee*Ve,(Ye+Se/W.locationSize*xe)*Ve,J)}else{if(R.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)p(W.location+ae,R.meshPerAttribute);U.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae);r.bindBuffer(r.ARRAY_BUFFER,Ue);for(let ae=0;ae<W.locationSize;ae++)b(W.location+ae,Se/W.locationSize,Me,Q,Se*Ve,Se/W.locationSize*ae*Ve,J)}}else if(D!==void 0){const Q=D[V];if(Q!==void 0)switch(Q.length){case 2:r.vertexAttrib2fv(W.location,Q);break;case 3:r.vertexAttrib3fv(W.location,Q);break;case 4:r.vertexAttrib4fv(W.location,Q);break;default:r.vertexAttrib1fv(W.location,Q)}}}}S()}function y(){T();for(const U in n){const I=n[U];for(const G in I){const F=I[G];for(const X in F){const L=F[X];for(const D in L)u(L[D].object),delete L[D];delete F[X]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const I=n[U.id];for(const G in I){const F=I[G];for(const X in F){const L=F[X];for(const D in L)u(L[D].object),delete L[D];delete F[X]}}delete n[U.id]}function w(U){for(const I in n){const G=n[I];for(const F in G){const X=G[F];if(X[U.id]===void 0)continue;const L=X[U.id];for(const D in L)u(L[D].object),delete L[D];delete X[U.id]}}}function v(U){for(const I in n){const G=n[I],F=U.isInstancedMesh===!0?U.id:0,X=G[F];if(X!==void 0){for(const L in X){const D=X[L];for(const V in D)u(D[V].object),delete D[V];delete X[L]}delete G[F],Object.keys(G).length===0&&delete n[I]}}}function T(){A(),a=!0,s!==i&&(s=i,c(s.object))}function A(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:A,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function vS(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(r.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];t.update(f,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function xS(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(w){return!(w!==Ii&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const v=w===Ji&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==yi&&w!==Li&&!v&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(lt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&lt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),y=r.getParameter(r.MAX_SAMPLES),E=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:x,maxSamples:y,samples:E}}function SS(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Tr,o=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const S=s?0:n,b=S*4;let x=p.clippingState||null;l.value=x,x=u(g,f,b,h);for(let y=0;y!==b;++y)x[y]=t[y];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=h+_*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=h;b!==_;++b,x+=4)a.copy(d[b]).applyMatrix4(S,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Zs=4,MS=6,yS=20,bS=256,Ia=new s0,Rd=new It;let Hc=null,Vc=0,Wc=0,Xc=!1;const ES=new H,Kr=new H;class Pd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=ES}=s;Hc=this._renderer.getRenderTarget(),Vc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),Xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Id(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ld(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hc,Vc,Wc),this._renderer.xr.enabled=Xc,e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ms||e.mapping===pa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hc=this._renderer.getRenderTarget(),Vc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),Xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:Ji,format:Ii,colorSpace:zl,depthBuffer:!1},i=Dd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dd(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=TS(s)),this._blurMaterial=AS(s,e,t),this._ggxMaterial=wS(s,e,t)}return i}_compileMaterial(e){const t=new Jt(new an,e);this._renderer.compile(t,Ia)}_sceneToCubeUV(e,t,n,i,s){const l=new Mi(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Rd),d.toneMapping=$i,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new Mo,new Qm({name:"PMREM.Background",side:qn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(Rd),p=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[b],s.y,s.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[b]));const y=this._cubeSize;Hs(i,x*y,b>2?y:0,y,y),d.setRenderTarget(i),p&&d.render(_,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ms||e.mapping===pa;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Id()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ld());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Hs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ia)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=c*1.25,h=d*f,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Zs?n-g+Zs:0),p=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=g-t,Hs(s,m,p,3*_,2*_),i.setRenderTarget(s),i.render(o,Ia),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,Hs(e,m,p,3*_,2*_),i.setRenderTarget(e),i.render(o,Ia)}_blur(e,t,n,i){const s=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,i,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[i],d=3*u*(i>this._lodMax-Zs?i-this._lodMax+Zs:0),f=4*(this._cubeSize-u);Hs(t,d,f,3*u,2*u),a.setRenderTarget(t),a.render(l,Ia)}}function TS(r){const e=[],t=[];let n=r;const i=r-Zs+1+MS;for(let s=0;s<i;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,f=6,h=3,g=new Float32Array(h*f*d),_=new Float32Array(h*f*d);for(let p=0;p<d;p++){const S=p%3*2/3-1,b=p>2?0:-1,x=[S,b,0,S+2/3,b,0,S+2/3,b+1,0,S,b,0,S+2/3,b+1,0,S,b+1,0];g.set(x,h*f*p);for(let y=0;y<f;y++){const E=u[y*2]*2-1,w=u[y*2+1]*2-1;p===0?Kr.set(1,w,E):p===1?Kr.set(-E,1,-w):p===2?Kr.set(-E,w,1):p===3?Kr.set(-1,w,-E):p===4?Kr.set(-E,-1,w):Kr.set(E,w,-1),Kr.toArray(_,(p*f+y)*h)}}const m=new an;m.setAttribute("position",new xn(g,h)),m.setAttribute("outputDirection",new xn(_,h)),t.push(new Jt(m,null)),n>Zs&&n--}return{lodMeshes:t,sizeLods:e}}function Dd(r,e,t){const n=new Ui(r,e,t);return n.texture.mapping=Kl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function wS(r,e,t){return new Ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:hr,depthTest:!1,depthWrite:!1})}function AS(r,e,t){return new Ni({name:"SphericalGaussianBlur",defines:{SAMPLES:yS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Zl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:hr,depthTest:!1,depthWrite:!1})}function Ld(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hr,depthTest:!1,depthWrite:!1})}function Id(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hr,depthTest:!1,depthWrite:!1})}function Zl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class c0 extends Ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new t0(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Mo(5,5,5),s=new Ni({name:"CubemapFromEquirect",uniforms:ma(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qn,blending:hr});s.uniforms.tEquirect.value=t;const a=new Jt(i,s),o=t.minFilter;return t.minFilter===ns&&(t.minFilter=Ln),new Dv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function CS(r){let e=new WeakMap,t=new WeakMap,n=null;function i(f,h=!1){return f==null?null:h?a(f):s(f)}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===hc||h===dc)if(e.has(f)){const g=e.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const _=new c0(g.height);return _.fromEquirectangularTexture(r,f),e.set(f,_),f.addEventListener("dispose",c),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const h=f.mapping,g=h===hc||h===dc,_=h===ms||h===pa;if(g||_){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Pd(r)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const S=f.image;return g&&S&&S.height>0||_&&S&&l(S)?(n===null&&(n=new Pd(r)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,h){return h===hc?f.mapping=ms:h===dc&&(f.mapping=pa),f}function l(f){let h=0;const g=6;for(let _=0;_<g;_++)f[_]!==void 0&&h++;return h===g}function c(f){const h=f.target;h.removeEventListener("dispose",c);const g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){const h=f.target;h.removeEventListener("dispose",u);const g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function RS(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&sa("WebGLRenderer: "+n+" extension not supported."),i}}}function PS(r,e,t,n){const i={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,g=d.attributes.position;let _=0;if(g===void 0)return;if(h!==null){const S=h.array;_=h.version;for(let b=0,x=S.length;b<x;b+=3){const y=S[b+0],E=S[b+1],w=S[b+2];f.push(y,E,E,w,w,y)}}else{const S=g.array;_=g.version;for(let b=0,x=S.length/3-1;b<x;b+=3){const y=b+0,E=b+1,w=b+2;f.push(y,E,E,w,w,y)}}const m=new(g.count>=65535?Km:$m)(f,1);m.version=_;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function DS(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,h){h!==0&&(r.drawElementsInstanced(n,f,s,d*a,h),t.update(f,n,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,h);let _=0;for(let m=0;m<h;m++)_+=f[m];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function LS(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Dt("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function IS(r,e,t){const n=new WeakMap,i=new tn;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let T=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const h=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let b=0;h===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let x=o.attributes.position.count*b,y=1;x>e.maxTextureSize&&(y=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*y*4*d),w=new Xm(E,x,y,d);w.type=Li,w.needsUpdate=!0;const v=b*4;for(let A=0;A<d;A++){const U=m[A],I=p[A],G=S[A],F=x*y*4*A;for(let X=0;X<U.count;X++){const L=X*v;h===!0&&(i.fromBufferAttribute(U,X),E[F+L+0]=i.x,E[F+L+1]=i.y,E[F+L+2]=i.z,E[F+L+3]=0),g===!0&&(i.fromBufferAttribute(I,X),E[F+L+4]=i.x,E[F+L+5]=i.y,E[F+L+6]=i.z,E[F+L+7]=0),_===!0&&(i.fromBufferAttribute(G,X),E[F+L+8]=i.x,E[F+L+9]=i.y,E[F+L+10]=i.z,E[F+L+11]=G.itemSize===4?i.w:1)}}f={count:d,texture:w,size:new je(x,y)},n.set(o,f),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let h=0;for(let _=0;_<c.length;_++)h+=c[_];const g=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function US(r,e,t,n,i){let s=new WeakMap;function a(c){const u=i.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const NS={[Rm]:"LINEAR_TONE_MAPPING",[Pm]:"REINHARD_TONE_MAPPING",[Dm]:"CINEON_TONE_MAPPING",[Lm]:"ACES_FILMIC_TONE_MAPPING",[Um]:"AGX_TONE_MAPPING",[Nm]:"NEUTRAL_TONE_MAPPING",[Im]:"CUSTOM_TONE_MAPPING"};function FS(r,e,t,n,i,s){const a=new Ui(e,t,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new an;c.setAttribute("position",new kt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new kt([0,2,0,0,2,0],2));const u=new Cv({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Jt(c,u),f=new s0(-1,1,1,-1,0,1);let h=null,g=null,_=!1,m,p=null,S=[],b=!1;this.setSize=function(x,y){a.setSize(x,y),o!==null&&o.setSize(x,y),l!==null&&l.setSize(x,y);for(let E=0;E<S.length;E++){const w=S[E];w.setSize&&w.setSize(x,y)}},this.setEffects=function(x){S=x,b=S.length>0&&S[0].isRenderPass===!0;const y=a.width,E=a.height;S.length>0&&o===null&&(o=new Ui(y,E,{type:Ji,depthBuffer:!1,stencilBuffer:!1}),l=new Ui(y,E,{type:Ji,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<S.length;w++){const v=S[w];v.setSize&&v.setSize(y,E)}},this.begin=function(x,y){if(_||x.toneMapping===$i&&S.length===0)return!1;if(p=y,y!==null){const E=y.width,w=y.height;(a.width!==E||a.height!==w)&&this.setSize(E,w)}return b===!1&&x.setRenderTarget(a),m=x.toneMapping,x.toneMapping=$i,!0},this.hasRenderPass=function(){return b},this.end=function(x,y){x.toneMapping=m,_=!0;let E=a,w=o;for(let v=0;v<S.length;v++){const T=S[v];T.enabled!==!1&&(T.render(x,w,E,y),T.needsSwap!==!1&&(E=w,w=w===o?l:o))}if(h!==x.outputColorSpace||g!==x.toneMapping){h=x.outputColorSpace,g=x.toneMapping,u.defines={},wt.getTransfer(h)===zt&&(u.defines.SRGB_TRANSFER="");const v=NS[g];v&&(u.defines[v]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(p),x.render(d,f),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const u0=new Un,cf=new xo(1,1),f0=new Xm,h0=new nv,d0=new t0,Ud=[],Nd=[],Fd=new Float32Array(16),Od=new Float32Array(9),Bd=new Float32Array(4);function Sa(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ud[i];if(s===void 0&&(s=new Float32Array(i),Ud[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function pn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function mn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Jl(r,e){let t=Nd[e];t===void 0&&(t=new Int32Array(e),Nd[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function OS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function BS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;r.uniform2fv(this.addr,e),mn(t,e)}}function zS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pn(t,e))return;r.uniform3fv(this.addr,e),mn(t,e)}}function kS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;r.uniform4fv(this.addr,e),mn(t,e)}}function GS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;Bd.set(n),r.uniformMatrix2fv(this.addr,!1,Bd),mn(t,n)}}function HS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;Od.set(n),r.uniformMatrix3fv(this.addr,!1,Od),mn(t,n)}}function VS(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;Fd.set(n),r.uniformMatrix4fv(this.addr,!1,Fd),mn(t,n)}}function WS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function XS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;r.uniform2iv(this.addr,e),mn(t,e)}}function YS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;r.uniform3iv(this.addr,e),mn(t,e)}}function qS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;r.uniform4iv(this.addr,e),mn(t,e)}}function $S(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function KS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;r.uniform2uiv(this.addr,e),mn(t,e)}}function ZS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;r.uniform3uiv(this.addr,e),mn(t,e)}}function JS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;r.uniform4uiv(this.addr,e),mn(t,e)}}function QS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(cf.compareFunction=t.isReversedDepthBuffer()?$f:qf,s=cf):s=u0,t.setTexture2D(e||s,i)}function jS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||h0,i)}function eM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||d0,i)}function tM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||f0,i)}function nM(r){switch(r){case 5126:return OS;case 35664:return BS;case 35665:return zS;case 35666:return kS;case 35674:return GS;case 35675:return HS;case 35676:return VS;case 5124:case 35670:return WS;case 35667:case 35671:return XS;case 35668:case 35672:return YS;case 35669:case 35673:return qS;case 5125:return $S;case 36294:return KS;case 36295:return ZS;case 36296:return JS;case 35678:case 36198:case 36298:case 36306:case 35682:return QS;case 35679:case 36299:case 36307:return jS;case 35680:case 36300:case 36308:case 36293:return eM;case 36289:case 36303:case 36311:case 36292:return tM}}function iM(r,e){r.uniform1fv(this.addr,e)}function rM(r,e){const t=Sa(e,this.size,2);r.uniform2fv(this.addr,t)}function sM(r,e){const t=Sa(e,this.size,3);r.uniform3fv(this.addr,t)}function aM(r,e){const t=Sa(e,this.size,4);r.uniform4fv(this.addr,t)}function oM(r,e){const t=Sa(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function lM(r,e){const t=Sa(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function cM(r,e){const t=Sa(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function uM(r,e){r.uniform1iv(this.addr,e)}function fM(r,e){r.uniform2iv(this.addr,e)}function hM(r,e){r.uniform3iv(this.addr,e)}function dM(r,e){r.uniform4iv(this.addr,e)}function pM(r,e){r.uniform1uiv(this.addr,e)}function mM(r,e){r.uniform2uiv(this.addr,e)}function gM(r,e){r.uniform3uiv(this.addr,e)}function _M(r,e){r.uniform4uiv(this.addr,e)}function vM(r,e,t){const n=this.cache,i=e.length,s=Jl(t,i);pn(n,s)||(r.uniform1iv(this.addr,s),mn(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=cf:a=u0;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function xM(r,e,t){const n=this.cache,i=e.length,s=Jl(t,i);pn(n,s)||(r.uniform1iv(this.addr,s),mn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||h0,s[a])}function SM(r,e,t){const n=this.cache,i=e.length,s=Jl(t,i);pn(n,s)||(r.uniform1iv(this.addr,s),mn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||d0,s[a])}function MM(r,e,t){const n=this.cache,i=e.length,s=Jl(t,i);pn(n,s)||(r.uniform1iv(this.addr,s),mn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||f0,s[a])}function yM(r){switch(r){case 5126:return iM;case 35664:return rM;case 35665:return sM;case 35666:return aM;case 35674:return oM;case 35675:return lM;case 35676:return cM;case 5124:case 35670:return uM;case 35667:case 35671:return fM;case 35668:case 35672:return hM;case 35669:case 35673:return dM;case 5125:return pM;case 36294:return mM;case 36295:return gM;case 36296:return _M;case 35678:case 36198:case 36298:case 36306:case 35682:return vM;case 35679:case 36299:case 36307:return xM;case 35680:case 36300:case 36308:case 36293:return SM;case 36289:case 36303:case 36311:case 36292:return MM}}class bM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nM(t.type)}}class EM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=yM(t.type)}}class TM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Yc=/(\w+)(\])?(\[|\.)?/g;function zd(r,e){r.seq.push(e),r.map[e.id]=e}function wM(r,e,t){const n=r.name,i=n.length;for(Yc.lastIndex=0;;){const s=Yc.exec(n),a=Yc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){zd(t,c===void 0?new bM(o,r,e):new EM(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new TM(o),zd(t,d)),t=d}}}class Tl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);wM(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function kd(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const AM=37297;let CM=0;function RM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Gd=new ct;function PM(r){wt._getMatrix(Gd,wt.workingColorSpace,r);const e=`mat3( ${Gd.elements.map(t=>t.toFixed(4))} )`;switch(wt.getTransfer(r)){case kl:return[e,"LinearTransferOETF"];case zt:return[e,"sRGBTransferOETF"];default:return lt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Hd(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+RM(r.getShaderSource(e),o)}else return s}function DM(r,e){const t=PM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const LM={[Rm]:"Linear",[Pm]:"Reinhard",[Dm]:"Cineon",[Lm]:"ACESFilmic",[Um]:"AgX",[Nm]:"Neutral",[Im]:"Custom"};function IM(r,e){const t=LM[e];return t===void 0?(lt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ul=new H;function UM(){wt.getLuminanceCoefficients(ul);const r=ul.x.toFixed(4),e=ul.y.toFixed(4),t=ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wa).join(`
`)}function FM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function OM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Wa(r){return r!==""}function Vd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wd(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const BM=/^[ \t]*#include +<([\w\d./]+)>/gm;function uf(r){return r.replace(BM,kM)}const zM=new Map;function kM(r,e){let t=pt[e];if(t===void 0){const n=zM.get(e);if(n!==void 0)t=pt[n],lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return uf(t)}const GM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xd(r){return r.replace(GM,HM)}function HM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yd(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const VM={[Sl]:"SHADOWMAP_TYPE_PCF",[Va]:"SHADOWMAP_TYPE_VSM"};function WM(r){return VM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const XM={[ms]:"ENVMAP_TYPE_CUBE",[pa]:"ENVMAP_TYPE_CUBE",[Kl]:"ENVMAP_TYPE_CUBE_UV"};function YM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":XM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const qM={[pa]:"ENVMAP_MODE_REFRACTION"};function $M(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":qM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const KM={[Cm]:"ENVMAP_BLENDING_MULTIPLY",[U_]:"ENVMAP_BLENDING_MIX",[N_]:"ENVMAP_BLENDING_ADD"};function ZM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":KM[r.combine]||"ENVMAP_BLENDING_NONE"}function JM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function QM(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=WM(t),c=YM(t),u=$M(t),d=ZM(t),f=JM(t),h=NM(t),g=FM(s),_=i.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wa).join(`
`),p.length>0&&(p+=`
`)):(m=[Yd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wa).join(`
`),p=[Yd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?pt.tonemapping_pars_fragment:"",t.toneMapping!==$i?IM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,DM("linearToOutputTexel",t.outputColorSpace),UM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wa).join(`
`)),a=uf(a),a=Vd(a,t),a=Wd(a,t),o=uf(o),o=Vd(o,t),o=Wd(o,t),a=Xd(a),o=Xd(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Zh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+m+a,x=S+p+o,y=kd(i,i.VERTEX_SHADER,b),E=kd(i,i.FRAGMENT_SHADER,x);i.attachShader(_,y),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(U){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_)||"",G=i.getShaderInfoLog(y)||"",F=i.getShaderInfoLog(E)||"",X=I.trim(),L=G.trim(),D=F.trim();let V=!0,W=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(V=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,y,E);else{const R=Hd(i,y,"vertex"),Q=Hd(i,E,"fragment");Dt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+X+`
`+R+`
`+Q)}else X!==""?lt("WebGLProgram: Program Info Log:",X):(L===""||D==="")&&(W=!1);W&&(U.diagnostics={runnable:V,programLog:X,vertexShader:{log:L,prefix:m},fragmentShader:{log:D,prefix:p}})}i.deleteShader(y),i.deleteShader(E),v=new Tl(i,_),T=OM(i,_)}let v;this.getUniforms=function(){return v===void 0&&w(this),v};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=i.getProgramParameter(_,AM)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=CM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=E,this}let jM=0;class ey{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ty(e),t.set(e,n)),n}}class ty{constructor(e){this.id=jM++,this.code=e,this.usedTimes=0}}function ny(r){return r===gs||r===Ol||r===Bl}function iy(r,e,t,n,i,s){const a=new Ym,o=new ey,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,T,A,U,I,G){const F=U.fog,X=I.geometry,L=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,D=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,V=e.get(v.envMap||L,D),W=V&&V.mapping===Kl?V.image.height:null,R=h[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&lt("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const Q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Se=Q!==void 0?Q.length:0;let Re=0;X.morphAttributes.position!==void 0&&(Re=1),X.morphAttributes.normal!==void 0&&(Re=2),X.morphAttributes.color!==void 0&&(Re=3);let Ue,Me,Ve,J;if(R){const ze=Gi[R];Ue=ze.vertexShader,Me=ze.fragmentShader}else{Ue=v.vertexShader,Me=v.fragmentShader;const ze=o.getVertexShaderStage(v),pe=o.getFragmentShaderStage(v);o.update(v,ze,pe),Ve=ze.id,J=pe.id}const ae=r.getRenderTarget(),Ee=r.state.buffers.depth.getReversed(),Ye=I.isInstancedMesh===!0,xe=I.isBatchedMesh===!0,Be=!!v.map,We=!!v.matcap,Fe=!!V,$e=!!v.aoMap,ot=!!v.lightMap,q=!!v.bumpMap&&v.wireframe===!1,it=!!v.normalMap,Lt=!!v.displacementMap,Ot=!!v.emissiveMap,Ke=!!v.metalnessMap,bt=!!v.roughnessMap,z=v.anisotropy>0,Nt=v.clearcoat>0,Xe=v.dispersion>0,P=v.retroreflectivity>0,M=v.iridescence>0,O=v.sheen>0,Y=v.transmission>0,ne=z&&!!v.anisotropyMap,ve=Nt&&!!v.clearcoatMap,_e=Nt&&!!v.clearcoatNormalMap,oe=Nt&&!!v.clearcoatRoughnessMap,le=M&&!!v.iridescenceMap,k=M&&!!v.iridescenceThicknessMap,se=O&&!!v.sheenColorMap,ee=O&&!!v.sheenRoughnessMap,fe=!!v.specularMap,ue=!!v.specularColorMap,Ce=!!v.specularIntensityMap,Pe=Y&&!!v.transmissionMap,N=Y&&!!v.thicknessMap,me=!!v.gradientMap,re=!!v.alphaMap,ye=v.alphaTest>0,Te=!!v.alphaHash,ce=!!v.extensions;let ge=$i;v.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ge=r.toneMapping);const de={shaderID:R,shaderType:v.type,shaderName:v.name,vertexShader:Ue,fragmentShader:Me,defines:v.defines,customVertexShaderID:Ve,customFragmentShaderID:J,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:xe,batchingColor:xe&&I._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&I.instanceColor!==null,instancingMorph:Ye&&I.morphTexture!==null,outputColorSpace:ae===null?r.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:wt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Be,matcap:We,envMap:Fe,envMapMode:Fe&&V.mapping,envMapCubeUVHeight:W,aoMap:$e,lightMap:ot,bumpMap:q,normalMap:it,displacementMap:Lt,emissiveMap:Ot,normalMapObjectSpace:it&&v.normalMapType===B_,normalMapTangentSpace:it&&v.normalMapType===Kh,packedNormalMap:it&&v.normalMapType===Kh&&ny(v.normalMap.format),metalnessMap:Ke,roughnessMap:bt,anisotropy:z,anisotropyMap:ne,clearcoat:Nt,clearcoatMap:ve,clearcoatNormalMap:_e,clearcoatRoughnessMap:oe,dispersion:Xe,retroreflection:P,iridescence:M,iridescenceMap:le,iridescenceThicknessMap:k,sheen:O,sheenColorMap:se,sheenRoughnessMap:ee,specularMap:fe,specularColorMap:ue,specularIntensityMap:Ce,transmission:Y,transmissionMap:Pe,thicknessMap:N,gradientMap:me,opaque:v.transparent===!1&&v.blending===io&&v.alphaToCoverage===!1,alphaMap:re,alphaTest:ye,alphaHash:Te,combine:v.combine,mapUv:Be&&g(v.map.channel),aoMapUv:$e&&g(v.aoMap.channel),lightMapUv:ot&&g(v.lightMap.channel),bumpMapUv:q&&g(v.bumpMap.channel),normalMapUv:it&&g(v.normalMap.channel),displacementMapUv:Lt&&g(v.displacementMap.channel),emissiveMapUv:Ot&&g(v.emissiveMap.channel),metalnessMapUv:Ke&&g(v.metalnessMap.channel),roughnessMapUv:bt&&g(v.roughnessMap.channel),anisotropyMapUv:ne&&g(v.anisotropyMap.channel),clearcoatMapUv:ve&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:_e&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:k&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:se&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ee&&g(v.sheenRoughnessMap.channel),specularMapUv:fe&&g(v.specularMap.channel),specularColorMapUv:ue&&g(v.specularColorMap.channel),specularIntensityMapUv:Ce&&g(v.specularIntensityMap.channel),transmissionMapUv:Pe&&g(v.transmissionMap.channel),thicknessMapUv:N&&g(v.thicknessMap.channel),alphaMapUv:re&&g(v.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(it||z),vertexNormals:!!X.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!X.attributes.uv&&(Be||re),fog:!!F,useFog:v.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||X.attributes.normal===void 0&&it===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ee,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Re,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&A.length>0,shadowMapType:r.shadowMap.type,toneMapping:ge,decodeVideoTexture:Be&&v.map.isVideoTexture===!0&&wt.getTransfer(v.map.colorSpace)===zt,decodeVideoTextureEmissive:Ot&&v.emissiveMap.isVideoTexture===!0&&wt.getTransfer(v.emissiveMap.colorSpace)===zt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Yn,flipSided:v.side===qn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ce&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&v.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return de.vertexUv1s=l.has(1),de.vertexUv2s=l.has(2),de.vertexUv3s=l.has(3),l.clear(),de}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const A in v.defines)T.push(A),T.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(p(T,v),S(T,v),T.push(r.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numSunLights),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numSunLightShadows),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function S(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function b(v){const T=h[v.type];let A;if(T){const U=Gi[T];A=Tv.clone(U.uniforms)}else A=v.uniforms;return A}function x(v,T){let A=u.get(T);return A!==void 0?++A.usedTimes:(A=new QM(r,T,v,i),c.push(A),u.set(T,A)),A}function y(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function E(v){o.remove(v)}function w(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:b,acquireProgram:x,releaseProgram:y,releaseShaderCache:E,programs:c,dispose:w}}function ry(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function sy(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function qd(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function $d(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,g,_,m,p){let S=r[e];return S===void 0?(S={id:f.id,object:f,geometry:h,material:g,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},r[e]=S):(S.id=f.id,S.object=f,S.geometry=h,S.material=g,S.materialVariant=a(f),S.groupOrder=_,S.renderOrder=f.renderOrder,S.z=m,S.group=p),e++,S}function l(f,h,g,_,m,p,S){S.reversedDepth===!0&&(m=-m);const b=o(f,h,g,_,m,p);g.transmission>0?n.push(b):g.transparent===!0?i.push(b):t.push(b)}function c(f,h,g,_,m,p){const S=o(f,h,g,_,m,p);g.transmission>0?n.unshift(S):g.transparent===!0?i.unshift(S):t.unshift(S)}function u(f,h){t.length>1&&t.sort(f||sy),n.length>1&&n.sort(h||qd),i.length>1&&i.sort(h||qd)}function d(){for(let f=e,h=r.length;f<h;f++){const g=r[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:u}}function ay(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new $d,r.set(n,[a])):i>=s.length?(a=new $d,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function oy(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new It};break;case"SpotLight":t={position:new H,direction:new H,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new It,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new It,groundColor:new It};break;case"RectAreaLight":t={color:new It,position:new H,halfWidth:new H,halfHeight:new H};break}return r[e.id]=t,t}}}function ly(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let cy=0;function uy(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function fy(r){const e=new oy,t=ly(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const i=new H,s=new Yt,a=new Yt;function o(c){let u=0,d=0,f=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,S=0,b=0,x=0,y=0,E=0,w=0,v=0,T=0,A=0;c.sort(uy);for(let I=0,G=c.length;I<G;I++){const F=c[I],X=F.color,L=F.intensity,D=F.distance;let V=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===gs?V=F.shadow.map.texture:V=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)u+=X.r*L,d+=X.g*L,f+=X.b*L;else if(F.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(F.sh.coefficients[W],L);A++}else if(F.isSunLight){const W=e.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const R=F.shadow,Q=t.get(F);Q.shadowIntensity=R.intensity,Q.shadowBias=R.bias,Q.shadowNormalBias=R.normalBias,Q.shadowRadius=R.radius,Q.shadowMapSize.copy(R.mapSize).multiply(R.getFrameExtents()),n.sunShadow[g]=Q,n.sunShadowMap[g]=V;const Se=R.getViewportCount();for(let Re=0;Re<Se;Re++)n.sunShadowMatrix[_+Re]=R.getMatrix(Re),n.sunShadowCascade[_+Re]=R._cascadeData[Re];_+=Se,g++}n.sun[h]=W,h++}else if(F.isDirectionalLight){const W=e.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const R=F.shadow,Q=t.get(F);Q.shadowIntensity=R.intensity,Q.shadowBias=R.bias,Q.shadowNormalBias=R.normalBias,Q.shadowRadius=R.radius,Q.shadowMapSize=R.mapSize,n.directionalShadow[m]=Q,n.directionalShadowMap[m]=V,n.directionalShadowMatrix[m]=F.shadow.matrix,y++}n.directional[m]=W,m++}else if(F.isSpotLight){const W=e.get(F);W.position.setFromMatrixPosition(F.matrixWorld),W.color.copy(X).multiplyScalar(L),W.distance=D,W.coneCos=Math.cos(F.angle),W.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),W.decay=F.decay,n.spot[S]=W;const R=F.shadow;if(F.map&&(n.spotLightMap[v]=F.map,v++,R.updateMatrices(F),F.castShadow&&T++),n.spotLightMatrix[S]=R.matrix,F.castShadow){const Q=t.get(F);Q.shadowIntensity=R.intensity,Q.shadowBias=R.bias,Q.shadowNormalBias=R.normalBias,Q.shadowRadius=R.radius,Q.shadowMapSize=R.mapSize,n.spotShadow[S]=Q,n.spotShadowMap[S]=V,w++}S++}else if(F.isRectAreaLight){const W=e.get(F);W.color.copy(X).multiplyScalar(L),W.halfWidth.set(F.width*.5,0,0),W.halfHeight.set(0,F.height*.5,0),n.rectArea[b]=W,b++}else if(F.isPointLight){const W=e.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity),W.distance=F.distance,W.decay=F.decay,F.castShadow){const R=F.shadow,Q=t.get(F);Q.shadowIntensity=R.intensity,Q.shadowBias=R.bias,Q.shadowNormalBias=R.normalBias,Q.shadowRadius=R.radius,Q.shadowMapSize=R.mapSize,Q.shadowCameraNear=R.camera.near,Q.shadowCameraFar=R.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=V,n.pointShadowMatrix[p]=F.shadow.matrix,E++}n.point[p]=W,p++}else if(F.isHemisphereLight){const W=e.get(F);W.skyColor.copy(F.color).multiplyScalar(L),W.groundColor.copy(F.groundColor).multiplyScalar(L),n.hemi[x]=W,x++}}b>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const U=n.hash;(U.sunLength!==h||U.directionalLength!==m||U.pointLength!==p||U.spotLength!==S||U.rectAreaLength!==b||U.hemiLength!==x||U.numSunShadows!==g||U.numDirectionalShadows!==y||U.numPointShadows!==E||U.numSpotShadows!==w||U.numSpotMaps!==v||U.numLightProbes!==A)&&(n.sun.length=h,n.directional.length=m,n.spot.length=S,n.rectArea.length=b,n.point.length=p,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=w,n.spotShadowMap.length=w,n.spotLightMatrix.length=w+v-T,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,U.sunLength=h,U.directionalLength=m,U.pointLength=p,U.spotLength=S,U.rectAreaLength=b,U.hemiLength=x,U.numSunShadows=g,U.numDirectionalShadows=y,U.numPointShadows=E,U.numSpotShadows=w,U.numSpotMaps=v,U.numLightProbes=A,n.version=cy++)}function l(c,u){let d=0,f=0,h=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let S=0,b=c.length;S<b;S++){const x=c[S];if(x.isSunLight){const y=n.sun[d];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(p),d++}else if(x.isDirectionalLight){const y=n.directional[f];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(x.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),g++}else if(x.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),h++}else if(x.isHemisphereLight){const y=n.hemi[m];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function Kd(r){const e=new fy(r),t=[],n=[],i=[];function s(f){d.camera=f,t.length=0,n.length=0,i.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function l(f){i.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function hy(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Kd(r),e.set(i,[o])):s>=a.length?(o=new Kd(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const dy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,py=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,my=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],gy=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Zd=new Yt,Ua=new H,qc=new H;function _y(r,e,t){let n=new e0;const i=new je,s=new je,a=new tn,o=new Rv,l=new Pv,c={},u=t.maxTextureSize,d={[kr]:qn,[qn]:kr,[Yn]:Yn},f=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:dy,fragmentShader:py}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new an;g.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Jt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sl;let p=this.type;this.render=function(E,w,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===m_&&(lt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Sl);const T=r.getRenderTarget(),A=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),I=r.state;I.setBlending(hr),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const G=p!==this.type;G&&w.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(X=>X.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,X=E.length;F<X;F++){const L=E[F],D=L.shadow;if(D===void 0){lt("WebGLShadowMap:",L,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);const V=D.getFrameExtents();i.multiply(V),s.copy(D.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/V.x),i.x=s.x*V.x,D.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/V.y),i.y=s.y*V.y,D.mapSize.y=s.y));const W=r.state.buffers.depth.getReversed();if(D.camera._reversedDepth=W,D.map===null||G===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===Va){if(L.isPointLight){lt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new Ui(i.x,i.y,{format:gs,type:Ji,minFilter:Ln,magFilter:Ln,generateMipmaps:!1}),D.map.texture.name=L.name+".shadowMap",D.map.depthTexture=new xo(i.x,i.y,Li),D.map.depthTexture.name=L.name+".shadowMapDepth",D.map.depthTexture.format=gr,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=En,D.map.depthTexture.magFilter=En}else L.isPointLight?(D.map=new c0(i.x),D.map.depthTexture=new yv(i.x,Zi)):(D.map=new Ui(i.x,i.y),D.map.depthTexture=new xo(i.x,i.y,Zi)),D.map.depthTexture.name=L.name+".shadowMap",D.map.depthTexture.format=gr,this.type===Sl?(D.map.depthTexture.compareFunction=W?$f:qf,D.map.depthTexture.minFilter=Ln,D.map.depthTexture.magFilter=Ln):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=En,D.map.depthTexture.magFilter=En);D.camera.updateProjectionMatrix()}D.map.isWebGLCubeRenderTarget!==!0&&(D.map.width!==i.x||D.map.height!==i.y)&&D.map.setSize(i.x,i.y);const R=D.map.isWebGLCubeRenderTarget?6:D.getViewportCount();L.isPointLight!==!0&&D.updateMatrices(L,v);for(let Q=0;Q<R;Q++){const Se=D.getCamera(Q);if(L.isPointLight){const Re=D.camera,Ue=D.matrix,Me=L.distance||Re.far;Me!==Re.far&&(Re.far=Me,Re.updateProjectionMatrix()),Ua.setFromMatrixPosition(L.matrixWorld),Re.position.copy(Ua),qc.copy(Re.position),qc.add(my[Q]),Re.up.copy(gy[Q]),Re.lookAt(qc),Re.updateMatrixWorld(),Ue.makeTranslation(-Ua.x,-Ua.y,-Ua.z),Zd.multiplyMatrices(Re.projectionMatrix,Re.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Zd,Re.coordinateSystem,Re.reversedDepth)}if(D.map.isWebGLCubeRenderTarget)r.setRenderTarget(D.map,Q),r.clear();else{Q===0&&(r.setRenderTarget(D.map),r.clear());const Re=D.getViewport(Q);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),I.viewport(a)}n=D.getFrustum(Q),x(w,v,Se,L,this.type)}D.isPointLightShadow!==!0&&this.type===Va&&S(D,v),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(T,A,U)};function S(E,w){const v=e.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null?E.mapPass=new Ui(i.x,i.y,{format:gs,type:Ji}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(w,null,v,f,_,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(w,null,v,h,_,null)}function b(E,w,v,T){let A=null;const U=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)A=U;else if(A=v.isPointLight===!0?l:o,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const I=A.uuid,G=w.uuid;let F=c[I];F===void 0&&(F={},c[I]=F);let X=F[G];X===void 0&&(X=A.clone(),F[G]=X,w.addEventListener("dispose",y)),A=X}if(A.visible=w.visible,A.wireframe=w.wireframe,T===Va?A.side=w.shadowSide!==null?w.shadowSide:w.side:A.side=w.shadowSide!==null?w.shadowSide:d[w.side],A.alphaMap=w.alphaMap,A.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,A.map=w.map,A.clipShadows=w.clipShadows,A.clippingPlanes=w.clippingPlanes,A.clipIntersection=w.clipIntersection,A.displacementMap=w.displacementMap,A.displacementScale=w.displacementScale,A.displacementBias=w.displacementBias,A.wireframeLinewidth=w.wireframeLinewidth,A.linewidth=w.linewidth,v.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const I=r.properties.get(A);I.light=v}return A}function x(E,w,v,T,A){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&A===Va)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const G=e.update(E),F=E.material;if(Array.isArray(F)){const X=G.groups;for(let L=0,D=X.length;L<D;L++){const V=X[L],W=F[V.materialIndex];if(W&&W.visible){const R=b(E,W,T,A);E.onBeforeShadow(r,E,w,v,G,R,V),r.renderBufferDirect(v,null,G,R,E,V),E.onAfterShadow(r,E,w,v,G,R,V)}}}else if(F.visible){const X=b(E,F,T,A);E.onBeforeShadow(r,E,w,v,G,X,null),r.renderBufferDirect(v,null,G,X,E,null),E.onAfterShadow(r,E,w,v,G,X,null)}}const I=E.children;for(let G=0,F=I.length;G<F;G++)x(I[G],w,v,T,A)}function y(E){E.target.removeEventListener("dispose",y);for(const v in c){const T=c[v],A=E.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function vy(r,e){function t(){let N=!1;const me=new tn;let re=null;const ye=new tn(0,0,0,0);return{setMask:function(Te){re!==Te&&!N&&(r.colorMask(Te,Te,Te,Te),re=Te)},setLocked:function(Te){N=Te},setClear:function(Te,ce,ge,de,ze){ze===!0&&(Te*=de,ce*=de,ge*=de),me.set(Te,ce,ge,de),ye.equals(me)===!1&&(r.clearColor(Te,ce,ge,de),ye.copy(me))},reset:function(){N=!1,re=null,ye.set(-1,0,0,0)}}}function n(){let N=!1,me=!1,re=null,ye=null,Te=null;return{setReversed:function(ce){if(me!==ce){const ge=e.get("EXT_clip_control");ce?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),me=ce;const de=Te;Te=null,this.setClear(de)}},getReversed:function(){return me},setTest:function(ce){ce?ae(r.DEPTH_TEST):Ee(r.DEPTH_TEST)},setMask:function(ce){re!==ce&&!N&&(r.depthMask(ce),re=ce)},setFunc:function(ce){if(me&&(ce=K_[ce]),ye!==ce){switch(ce){case xu:r.depthFunc(r.NEVER);break;case Su:r.depthFunc(r.ALWAYS);break;case Mu:r.depthFunc(r.LESS);break;case go:r.depthFunc(r.LEQUAL);break;case yu:r.depthFunc(r.EQUAL);break;case bu:r.depthFunc(r.GEQUAL);break;case Eu:r.depthFunc(r.GREATER);break;case Tu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ye=ce}},setLocked:function(ce){N=ce},setClear:function(ce){Te!==ce&&(Te=ce,me&&(ce=1-ce),r.clearDepth(ce))},reset:function(){N=!1,re=null,ye=null,Te=null,me=!1}}}function i(){let N=!1,me=null,re=null,ye=null,Te=null,ce=null,ge=null,de=null,ze=null;return{setTest:function(pe){N||(pe?ae(r.STENCIL_TEST):Ee(r.STENCIL_TEST))},setMask:function(pe){me!==pe&&!N&&(r.stencilMask(pe),me=pe)},setFunc:function(pe,He,Le){(re!==pe||ye!==He||Te!==Le)&&(r.stencilFunc(pe,He,Le),re=pe,ye=He,Te=Le)},setOp:function(pe,He,Le){(ce!==pe||ge!==He||de!==Le)&&(r.stencilOp(pe,He,Le),ce=pe,ge=He,de=Le)},setLocked:function(pe){N=pe},setClear:function(pe){ze!==pe&&(r.clearStencil(pe),ze=pe)},reset:function(){N=!1,me=null,re=null,ye=null,Te=null,ce=null,ge=null,de=null,ze=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f={},h=new WeakMap,g=[],_=null,m=!1,p=null,S=null,b=null,x=null,y=null,E=null,w=null,v=new It(0,0,0),T=0,A=!1,U=null,I=null,G=null,F=null,X=null;const L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,V=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(W)[1]),D=V>=1):W.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),D=V>=2);let R=null,Q={};const Se=r.getParameter(r.SCISSOR_BOX),Re=r.getParameter(r.VIEWPORT),Ue=new tn().fromArray(Se),Me=new tn().fromArray(Re);function Ve(N,me,re,ye){const Te=new Uint8Array(4),ce=r.createTexture();r.bindTexture(N,ce),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ge=0;ge<re;ge++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,ye,0,r.RGBA,r.UNSIGNED_BYTE,Te):r.texImage2D(me+ge,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Te);return ce}const J={};J[r.TEXTURE_2D]=Ve(r.TEXTURE_2D,r.TEXTURE_2D,1),J[r.TEXTURE_CUBE_MAP]=Ve(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[r.TEXTURE_2D_ARRAY]=Ve(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),J[r.TEXTURE_3D]=Ve(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(r.DEPTH_TEST),a.setFunc(go),q(!1),it(Xh),ae(r.CULL_FACE),$e(hr);function ae(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function Ee(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Ye(N,me){return f[N]!==me?(r.bindFramebuffer(N,me),f[N]=me,N===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=me),N===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=me),!0):!1}function xe(N,me){let re=g,ye=!1;if(N){re=h.get(me),re===void 0&&(re=[],h.set(me,re));const Te=N.textures;if(re.length!==Te.length||re[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,ge=Te.length;ce<ge;ce++)re[ce]=r.COLOR_ATTACHMENT0+ce;re.length=Te.length,ye=!0}}else re[0]!==r.BACK&&(re[0]=r.BACK,ye=!0);ye&&r.drawBuffers(re)}function Be(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const We={[Xs]:r.FUNC_ADD,[__]:r.FUNC_SUBTRACT,[v_]:r.FUNC_REVERSE_SUBTRACT};We[x_]=r.MIN,We[S_]=r.MAX;const Fe={[M_]:r.ZERO,[y_]:r.ONE,[b_]:r.SRC_COLOR,[wm]:r.SRC_ALPHA,[R_]:r.SRC_ALPHA_SATURATE,[A_]:r.DST_COLOR,[T_]:r.DST_ALPHA,[E_]:r.ONE_MINUS_SRC_COLOR,[Am]:r.ONE_MINUS_SRC_ALPHA,[C_]:r.ONE_MINUS_DST_COLOR,[w_]:r.ONE_MINUS_DST_ALPHA,[P_]:r.CONSTANT_COLOR,[D_]:r.ONE_MINUS_CONSTANT_COLOR,[L_]:r.CONSTANT_ALPHA,[I_]:r.ONE_MINUS_CONSTANT_ALPHA};function $e(N,me,re,ye,Te,ce,ge,de,ze,pe){if(N===hr){m===!0&&(Ee(r.BLEND),m=!1);return}if(m===!1&&(ae(r.BLEND),m=!0),N!==g_){if(N!==p||pe!==A){if((S!==Xs||y!==Xs)&&(r.blendEquation(r.FUNC_ADD),S=Xs,y=Xs),pe)switch(N){case io:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Yh:r.blendFunc(r.ONE,r.ONE);break;case qh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case $h:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Dt("WebGLState: Invalid blending: ",N);break}else switch(N){case io:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Yh:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case qh:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $h:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",N);break}b=null,x=null,E=null,w=null,v.set(0,0,0),T=0,p=N,A=pe}return}Te=Te||me,ce=ce||re,ge=ge||ye,(me!==S||Te!==y)&&(r.blendEquationSeparate(We[me],We[Te]),S=me,y=Te),(re!==b||ye!==x||ce!==E||ge!==w)&&(r.blendFuncSeparate(Fe[re],Fe[ye],Fe[ce],Fe[ge]),b=re,x=ye,E=ce,w=ge),(de.equals(v)===!1||ze!==T)&&(r.blendColor(de.r,de.g,de.b,ze),v.copy(de),T=ze),p=N,A=!1}function ot(N,me){N.side===Yn?Ee(r.CULL_FACE):ae(r.CULL_FACE);let re=N.side===qn;me&&(re=!re),q(re),N.blending===io&&N.transparent===!1?$e(hr):$e(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const ye=N.stencilWrite;o.setTest(ye),ye&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ot(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ae(r.SAMPLE_ALPHA_TO_COVERAGE):Ee(r.SAMPLE_ALPHA_TO_COVERAGE)}function q(N){U!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),U=N)}function it(N){N!==d_?(ae(r.CULL_FACE),N!==I&&(N===Xh?r.cullFace(r.BACK):N===p_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ee(r.CULL_FACE),I=N}function Lt(N){N!==G&&(D&&r.lineWidth(N),G=N)}function Ot(N,me,re){N?(ae(r.POLYGON_OFFSET_FILL),(F!==me||X!==re)&&(F=me,X=re,a.getReversed()&&(me=-me),r.polygonOffset(me,re))):Ee(r.POLYGON_OFFSET_FILL)}function Ke(N){N?ae(r.SCISSOR_TEST):Ee(r.SCISSOR_TEST)}function bt(N){N===void 0&&(N=r.TEXTURE0+L-1),R!==N&&(r.activeTexture(N),R=N)}function z(N,me,re){re===void 0&&(R===null?re=r.TEXTURE0+L-1:re=R);let ye=Q[re];ye===void 0&&(ye={type:void 0,texture:void 0},Q[re]=ye),(ye.type!==N||ye.texture!==me)&&(R!==re&&(r.activeTexture(re),R=re),r.bindTexture(N,me||J[N]),ye.type=N,ye.texture=me)}function Nt(){const N=Q[R];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Xe(){try{r.compressedTexImage2D(...arguments)}catch(N){Dt("WebGLState:",N)}}function P(){try{r.compressedTexImage3D(...arguments)}catch(N){Dt("WebGLState:",N)}}function M(){try{r.texSubImage2D(...arguments)}catch(N){Dt("WebGLState:",N)}}function O(){try{r.texSubImage3D(...arguments)}catch(N){Dt("WebGLState:",N)}}function Y(){try{r.compressedTexSubImage2D(...arguments)}catch(N){Dt("WebGLState:",N)}}function ne(){try{r.compressedTexSubImage3D(...arguments)}catch(N){Dt("WebGLState:",N)}}function ve(){try{r.texStorage2D(...arguments)}catch(N){Dt("WebGLState:",N)}}function _e(){try{r.texStorage3D(...arguments)}catch(N){Dt("WebGLState:",N)}}function oe(){try{r.texImage2D(...arguments)}catch(N){Dt("WebGLState:",N)}}function le(){try{r.texImage3D(...arguments)}catch(N){Dt("WebGLState:",N)}}function k(N){return d[N]!==void 0?d[N]:r.getParameter(N)}function se(N,me){d[N]!==me&&(r.pixelStorei(N,me),d[N]=me)}function ee(N){Ue.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Ue.copy(N))}function fe(N){Me.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Me.copy(N))}function ue(N,me){let re=c.get(me);re===void 0&&(re=new WeakMap,c.set(me,re));let ye=re.get(N);ye===void 0&&(ye=r.getUniformBlockIndex(me,N.name),re.set(N,ye))}function Ce(N,me){const ye=c.get(me).get(N);l.get(me)!==ye&&(r.uniformBlockBinding(me,ye,N.__bindingPointIndex),l.set(me,ye))}function Pe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),u={},d={},R=null,Q={},f={},h=new WeakMap,g=[],_=null,m=!1,p=null,S=null,b=null,x=null,y=null,E=null,w=null,v=new It(0,0,0),T=0,A=!1,U=null,I=null,G=null,F=null,X=null,Ue.set(0,0,r.canvas.width,r.canvas.height),Me.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ae,disable:Ee,bindFramebuffer:Ye,drawBuffers:xe,useProgram:Be,setBlending:$e,setMaterial:ot,setFlipSided:q,setCullFace:it,setLineWidth:Lt,setPolygonOffset:Ot,setScissorTest:Ke,activeTexture:bt,bindTexture:z,unbindTexture:Nt,compressedTexImage2D:Xe,compressedTexImage3D:P,texImage2D:oe,texImage3D:le,pixelStorei:se,getParameter:k,updateUBOMapping:ue,uniformBlockBinding:Ce,texStorage2D:ve,texStorage3D:_e,texSubImage2D:M,texSubImage3D:O,compressedTexSubImage2D:Y,compressedTexSubImage3D:ne,scissor:ee,viewport:fe,reset:Pe}}function xy(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new je,u=new WeakMap,d=new Set;let f;const h=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,M){return g?new OffscreenCanvas(P,M):Hl("canvas")}function m(P,M,O){let Y=1;const ne=Xe(P);if((ne.width>O||ne.height>O)&&(Y=O/Math.max(ne.width,ne.height)),Y<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ve=Math.floor(Y*ne.width),_e=Math.floor(Y*ne.height);f===void 0&&(f=_(ve,_e));const oe=M?_(ve,_e):f;return oe.width=ve,oe.height=_e,oe.getContext("2d").drawImage(P,0,0,ve,_e),lt("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ve+"x"+_e+")."),oe}else return"data"in P&&lt("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),P;return P}function p(P){return P.generateMipmaps}function S(P){r.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(P,M,O,Y,ne,ve=!1){if(P!==null){if(r[P]!==void 0)return r[P];lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let _e;Y&&(_e=e.get("EXT_texture_norm16"),_e||lt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=M;if(M===r.RED&&(O===r.FLOAT&&(oe=r.R32F),O===r.HALF_FLOAT&&(oe=r.R16F),O===r.UNSIGNED_BYTE&&(oe=r.R8),O===r.UNSIGNED_SHORT&&_e&&(oe=_e.R16_EXT),O===r.SHORT&&_e&&(oe=_e.R16_SNORM_EXT)),M===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(oe=r.R8UI),O===r.UNSIGNED_SHORT&&(oe=r.R16UI),O===r.UNSIGNED_INT&&(oe=r.R32UI),O===r.BYTE&&(oe=r.R8I),O===r.SHORT&&(oe=r.R16I),O===r.INT&&(oe=r.R32I)),M===r.RG&&(O===r.FLOAT&&(oe=r.RG32F),O===r.HALF_FLOAT&&(oe=r.RG16F),O===r.UNSIGNED_BYTE&&(oe=r.RG8),O===r.UNSIGNED_SHORT&&_e&&(oe=_e.RG16_EXT),O===r.SHORT&&_e&&(oe=_e.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(oe=r.RG8UI),O===r.UNSIGNED_SHORT&&(oe=r.RG16UI),O===r.UNSIGNED_INT&&(oe=r.RG32UI),O===r.BYTE&&(oe=r.RG8I),O===r.SHORT&&(oe=r.RG16I),O===r.INT&&(oe=r.RG32I)),M===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(oe=r.RGB8UI),O===r.UNSIGNED_SHORT&&(oe=r.RGB16UI),O===r.UNSIGNED_INT&&(oe=r.RGB32UI),O===r.BYTE&&(oe=r.RGB8I),O===r.SHORT&&(oe=r.RGB16I),O===r.INT&&(oe=r.RGB32I)),M===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(oe=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(oe=r.RGBA16UI),O===r.UNSIGNED_INT&&(oe=r.RGBA32UI),O===r.BYTE&&(oe=r.RGBA8I),O===r.SHORT&&(oe=r.RGBA16I),O===r.INT&&(oe=r.RGBA32I)),M===r.RGB&&(O===r.UNSIGNED_SHORT&&_e&&(oe=_e.RGB16_EXT),O===r.SHORT&&_e&&(oe=_e.RGB16_SNORM_EXT),O===r.UNSIGNED_INT_5_9_9_9_REV&&(oe=r.RGB9_E5),O===r.UNSIGNED_INT_10F_11F_11F_REV&&(oe=r.R11F_G11F_B10F)),M===r.RGBA){const le=ve?kl:wt.getTransfer(ne);O===r.FLOAT&&(oe=r.RGBA32F),O===r.HALF_FLOAT&&(oe=r.RGBA16F),O===r.UNSIGNED_BYTE&&(oe=le===zt?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT&&_e&&(oe=_e.RGBA16_EXT),O===r.SHORT&&_e&&(oe=_e.RGBA16_SNORM_EXT),O===r.UNSIGNED_SHORT_4_4_4_4&&(oe=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(oe=r.RGB5_A1)}return(oe===r.R16F||oe===r.R32F||oe===r.RG16F||oe===r.RG32F||oe===r.RGBA16F||oe===r.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function y(P,M){let O;return P?M===null||M===Zi||M===vo?O=r.DEPTH24_STENCIL8:M===Li?O=r.DEPTH32F_STENCIL8:M===_o&&(O=r.DEPTH24_STENCIL8,lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Zi||M===vo?O=r.DEPTH_COMPONENT24:M===Li?O=r.DEPTH_COMPONENT32F:M===_o&&(O=r.DEPTH_COMPONENT16),O}function E(P,M){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==En&&P.minFilter!==Ln?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function w(P){const M=P.target;M.removeEventListener("dispose",w),T(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&d.delete(M)}function v(P){const M=P.target;M.removeEventListener("dispose",v),U(M)}function T(P){const M=n.get(P);if(M.__webglInit===void 0)return;const O=P.source,Y=h.get(O);if(Y){const ne=Y[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&A(P),Object.keys(Y).length===0&&h.delete(O)}n.remove(P)}function A(P){const M=n.get(P);r.deleteTexture(M.__webglTexture);const O=P.source,Y=h.get(O);delete Y[M.__cacheKey],a.memory.textures--}function U(P){const M=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let ne=0;ne<M.__webglFramebuffer[Y].length;ne++)r.deleteFramebuffer(M.__webglFramebuffer[Y][ne]);else r.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)r.deleteFramebuffer(M.__webglFramebuffer[Y]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=P.textures;for(let Y=0,ne=O.length;Y<ne;Y++){const ve=n.get(O[Y]);ve.__webglTexture&&(r.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(O[Y])}n.remove(P)}let I=0;function G(){I=0}function F(){return I}function X(P){I=P}function L(){const P=I;return P>=i.maxTextures&&lt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+i.maxTextures),I+=1,P}function D(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function V(P,M){const O=n.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&O.__version!==P.version){const Y=P.image;if(Y===null)lt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)lt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(O,P,M);return}}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+M)}function W(P,M){const O=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){Ee(O,P,M);return}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+M)}function R(P,M){const O=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){Ee(O,P,M);return}t.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+M)}function Q(P,M){const O=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&O.__version!==P.version){Ye(O,P,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+M)}const Se={[wu]:r.REPEAT,[ur]:r.CLAMP_TO_EDGE,[Au]:r.MIRRORED_REPEAT},Re={[En]:r.NEAREST,[F_]:r.NEAREST_MIPMAP_NEAREST,[Fo]:r.NEAREST_MIPMAP_LINEAR,[Ln]:r.LINEAR,[pc]:r.LINEAR_MIPMAP_NEAREST,[ns]:r.LINEAR_MIPMAP_LINEAR},Ue={[k_]:r.NEVER,[X_]:r.ALWAYS,[G_]:r.LESS,[qf]:r.LEQUAL,[H_]:r.EQUAL,[$f]:r.GEQUAL,[V_]:r.GREATER,[W_]:r.NOTEQUAL};function Me(P,M){if(M.type===Li&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Ln||M.magFilter===pc||M.magFilter===Fo||M.magFilter===ns||M.minFilter===Ln||M.minFilter===pc||M.minFilter===Fo||M.minFilter===ns)&&lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,Se[M.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,Se[M.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,Se[M.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,Re[M.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,Re[M.minFilter]),M.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,Ue[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===En||M.minFilter!==Fo&&M.minFilter!==ns||M.type===Li&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ve(P,M){let O=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",w));const Y=M.source;let ne=h.get(Y);ne===void 0&&(ne={},h.set(Y,ne));const ve=D(M);if(ve!==P.__cacheKey){ne[ve]===void 0&&(ne[ve]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,O=!0),ne[ve].usedTimes++;const _e=ne[P.__cacheKey];_e!==void 0&&(ne[P.__cacheKey].usedTimes--,_e.usedTimes===0&&A(M)),P.__cacheKey=ve,P.__webglTexture=ne[ve].texture}return O}function J(P,M,O){return Math.floor(Math.floor(P/O)/M)}function ae(P,M,O,Y){const ve=P.updateRanges;if(ve.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,O,Y,M.data);else{ve.sort((se,ee)=>se.start-ee.start);let _e=0;for(let se=1;se<ve.length;se++){const ee=ve[_e],fe=ve[se],ue=ee.start+ee.count,Ce=J(fe.start,M.width,4),Pe=J(ee.start,M.width,4);fe.start<=ue+1&&Ce===Pe&&J(fe.start+fe.count-1,M.width,4)===Ce?ee.count=Math.max(ee.count,fe.start+fe.count-ee.start):(++_e,ve[_e]=fe)}ve.length=_e+1;const oe=t.getParameter(r.UNPACK_ROW_LENGTH),le=t.getParameter(r.UNPACK_SKIP_PIXELS),k=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let se=0,ee=ve.length;se<ee;se++){const fe=ve[se],ue=Math.floor(fe.start/4),Ce=Math.ceil(fe.count/4),Pe=ue%M.width,N=Math.floor(ue/M.width),me=Ce,re=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Pe,N,me,re,O,Y,M.data)}P.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,oe),t.pixelStorei(r.UNPACK_SKIP_PIXELS,le),t.pixelStorei(r.UNPACK_SKIP_ROWS,k)}}function Ee(P,M,O){let Y=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=r.TEXTURE_3D);const ne=Ve(P,M),ve=M.source;t.bindTexture(Y,P.__webglTexture,r.TEXTURE0+O);const _e=n.get(ve);if(ve.version!==_e.__version||ne===!0){if(t.activeTexture(r.TEXTURE0+O),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const re=wt.getPrimaries(wt.workingColorSpace),ye=M.colorSpace===wr?null:wt.getPrimaries(M.colorSpace),Te=M.colorSpace===wr||re===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let le=m(M.image,!1,i.maxTextureSize);le=Nt(M,le);const k=s.convert(M.format,M.colorSpace),se=s.convert(M.type);let ee=x(M.internalFormat,k,se,M.normalized,M.colorSpace,M.isVideoTexture);Me(Y,M);let fe;const ue=M.mipmaps,Ce=M.isVideoTexture!==!0,Pe=_e.__version===void 0||ne===!0,N=ve.dataReady,me=E(M,le);if(M.isDepthTexture)ee=y(M.format===is,M.type),Pe&&(Ce?t.texStorage2D(r.TEXTURE_2D,1,ee,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,ee,le.width,le.height,0,k,se,null));else if(M.isDataTexture)if(ue.length>0){Ce&&Pe&&t.texStorage2D(r.TEXTURE_2D,me,ee,ue[0].width,ue[0].height);for(let re=0,ye=ue.length;re<ye;re++)fe=ue[re],Ce?N&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,fe.width,fe.height,k,se,fe.data):t.texImage2D(r.TEXTURE_2D,re,ee,fe.width,fe.height,0,k,se,fe.data);M.generateMipmaps=!1}else Ce?(Pe&&t.texStorage2D(r.TEXTURE_2D,me,ee,le.width,le.height),N&&ae(M,le,k,se)):t.texImage2D(r.TEXTURE_2D,0,ee,le.width,le.height,0,k,se,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ce&&Pe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,me,ee,ue[0].width,ue[0].height,le.depth);for(let re=0,ye=ue.length;re<ye;re++)if(fe=ue[re],M.format!==Ii)if(k!==null)if(Ce){if(N)if(M.layerUpdates.size>0){const Te=Cd(fe.width,fe.height,M.format,M.type);for(const ce of M.layerUpdates){const ge=fe.data.subarray(ce*Te/fe.data.BYTES_PER_ELEMENT,(ce+1)*Te/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,ce,fe.width,fe.height,1,k,ge)}}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,le.depth,k,fe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,ee,fe.width,fe.height,le.depth,0,fe.data,0,0);else lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,le.depth,k,se,fe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,ee,fe.width,fe.height,le.depth,0,k,se,fe.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Ce&&Pe&&t.texStorage2D(r.TEXTURE_2D,me,ee,ue[0].width,ue[0].height);for(let re=0,ye=ue.length;re<ye;re++)fe=ue[re],M.format!==Ii?k!==null?Ce?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,fe.width,fe.height,k,fe.data):t.compressedTexImage2D(r.TEXTURE_2D,re,ee,fe.width,fe.height,0,fe.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?N&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,fe.width,fe.height,k,se,fe.data):t.texImage2D(r.TEXTURE_2D,re,ee,fe.width,fe.height,0,k,se,fe.data)}else if(M.isDataArrayTexture)if(Ce){if(Pe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,me,ee,le.width,le.height,le.depth),N)if(M.layerUpdates.size>0){const re=Cd(le.width,le.height,M.format,M.type);for(const ye of M.layerUpdates){const Te=le.data.subarray(ye*re/le.data.BYTES_PER_ELEMENT,(ye+1)*re/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ye,le.width,le.height,1,k,se,Te)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,k,se,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ee,le.width,le.height,le.depth,0,k,se,le.data);else if(M.isData3DTexture)Ce?(Pe&&t.texStorage3D(r.TEXTURE_3D,me,ee,le.width,le.height,le.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,k,se,le.data)):t.texImage3D(r.TEXTURE_3D,0,ee,le.width,le.height,le.depth,0,k,se,le.data);else if(M.isFramebufferTexture){if(Pe)if(Ce)t.texStorage2D(r.TEXTURE_2D,me,ee,le.width,le.height);else{let re=le.width,ye=le.height;for(let Te=0;Te<me;Te++)t.texImage2D(r.TEXTURE_2D,Te,ee,re,ye,0,k,se,null),re>>=1,ye>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){const re=r.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),le.parentNode!==re){re.appendChild(le),d.add(M),re.onpaint=ye=>{const Te=ye.changedElements;for(const ce of d)Te.includes(ce.image)&&(ce.needsUpdate=!0)},re.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,le);else{const Te=r.RGBA,ce=r.RGBA,ge=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Te,ce,ge,le)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(ue.length>0){if(Ce&&Pe){const re=Xe(ue[0]);t.texStorage2D(r.TEXTURE_2D,me,ee,re.width,re.height)}for(let re=0,ye=ue.length;re<ye;re++)fe=ue[re],Ce?N&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,k,se,fe):t.texImage2D(r.TEXTURE_2D,re,ee,k,se,fe);M.generateMipmaps=!1}else if(Ce){if(Pe){const re=Xe(le);t.texStorage2D(r.TEXTURE_2D,me,ee,re.width,re.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,k,se,le)}else t.texImage2D(r.TEXTURE_2D,0,ee,k,se,le);p(M)&&S(Y),_e.__version=ve.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Ye(P,M,O){if(M.image.length!==6)return;const Y=Ve(P,M),ne=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+O);const ve=n.get(ne);if(ne.version!==ve.__version||Y===!0){t.activeTexture(r.TEXTURE0+O);const _e=wt.getPrimaries(wt.workingColorSpace),oe=M.colorSpace===wr?null:wt.getPrimaries(M.colorSpace),le=M.colorSpace===wr||_e===oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const k=M.isCompressedTexture||M.image[0].isCompressedTexture,se=M.image[0]&&M.image[0].isDataTexture,ee=[];for(let ce=0;ce<6;ce++)!k&&!se?ee[ce]=m(M.image[ce],!0,i.maxCubemapSize):ee[ce]=se?M.image[ce].image:M.image[ce],ee[ce]=Nt(M,ee[ce]);const fe=ee[0],ue=s.convert(M.format,M.colorSpace),Ce=s.convert(M.type),Pe=x(M.internalFormat,ue,Ce,M.normalized,M.colorSpace),N=M.isVideoTexture!==!0,me=ve.__version===void 0||Y===!0,re=ne.dataReady;let ye=E(M,fe);Me(r.TEXTURE_CUBE_MAP,M);let Te;if(k){N&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ye,Pe,fe.width,fe.height);for(let ce=0;ce<6;ce++){Te=ee[ce].mipmaps;for(let ge=0;ge<Te.length;ge++){const de=Te[ge];M.format!==Ii?ue!==null?N?re&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge,Pe,de.width,de.height,0,de.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge,0,0,de.width,de.height,ue,Ce,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge,Pe,de.width,de.height,0,ue,Ce,de.data)}}}else{if(Te=M.mipmaps,N&&me){Te.length>0&&ye++;const ce=Xe(ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ye,Pe,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(se){N?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ee[ce].width,ee[ce].height,ue,Ce,ee[ce].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Pe,ee[ce].width,ee[ce].height,0,ue,Ce,ee[ce].data);for(let ge=0;ge<Te.length;ge++){const ze=Te[ge].image[ce].image;N?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge+1,0,0,ze.width,ze.height,ue,Ce,ze.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge+1,Pe,ze.width,ze.height,0,ue,Ce,ze.data)}}else{N?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ue,Ce,ee[ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Pe,ue,Ce,ee[ce]);for(let ge=0;ge<Te.length;ge++){const de=Te[ge];N?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge+1,0,0,ue,Ce,de.image[ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge+1,Pe,ue,Ce,de.image[ce])}}}p(M)&&S(r.TEXTURE_CUBE_MAP),ve.__version=ne.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function xe(P,M,O,Y,ne,ve){const _e=s.convert(O.format,O.colorSpace),oe=s.convert(O.type),le=x(O.internalFormat,_e,oe,O.normalized,O.colorSpace),k=n.get(M),se=n.get(O);if(se.__renderTarget=M,!k.__hasExternalTextures){const ee=Math.max(1,M.width>>ve),fe=Math.max(1,M.height>>ve);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,ve,le,ee,fe,M.depth,0,_e,oe,null):t.texImage2D(ne,ve,le,ee,fe,0,_e,oe,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),bt(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,ne,se.__webglTexture,0,Ke(M)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,ne,se.__webglTexture,ve),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Be(P,M,O){if(r.bindRenderbuffer(r.RENDERBUFFER,P),M.depthBuffer){const Y=M.depthTexture,ne=Y&&Y.isDepthTexture?Y.type:null,ve=y(M.stencilBuffer,ne),_e=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;bt(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke(M),ve,M.width,M.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke(M),ve,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,ve,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,P)}else{const Y=M.textures;for(let ne=0;ne<Y.length;ne++){const ve=Y[ne],_e=s.convert(ve.format,ve.colorSpace),oe=s.convert(ve.type),le=x(ve.internalFormat,_e,oe,ve.normalized,ve.colorSpace);bt(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke(M),le,M.width,M.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke(M),le,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,le,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function We(P,M,O){const Y=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=n.get(M.depthTexture);if(ne.__renderTarget=M,(!ne.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,M.depthTexture.addEventListener("dispose",w)),ne.__webglTexture===void 0){ne.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),Me(r.TEXTURE_CUBE_MAP,M.depthTexture);const k=s.convert(M.depthTexture.format),se=s.convert(M.depthTexture.type);let ee;M.depthTexture.format===gr?ee=r.DEPTH_COMPONENT24:M.depthTexture.format===is&&(ee=r.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ee,M.width,M.height,0,k,se,null)}}else V(M.depthTexture,0);const ve=ne.__webglTexture,_e=Ke(M),oe=Y?r.TEXTURE_CUBE_MAP_POSITIVE_X+O:r.TEXTURE_2D,le=M.depthTexture.format===is?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===gr)bt(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,le,oe,ve,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,le,oe,ve,0);else if(M.depthTexture.format===is)bt(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,le,oe,ve,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,le,oe,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Fe(P){const M=n.get(P),O=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const Y=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",ne)};Y.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=Y}if(P.depthTexture&&!M.__autoAllocateDepthBuffer)if(O)for(let Y=0;Y<6;Y++)We(M.__webglFramebuffer[Y],P,Y);else{const Y=P.texture.mipmaps;Y&&Y.length>0?We(M.__webglFramebuffer[0],P,0):We(M.__webglFramebuffer,P,0)}else if(O){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=r.createRenderbuffer(),Be(M.__webglDepthbuffer[Y],P,!1);else{const ne=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,ve),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ve)}}else{const Y=P.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),Be(M.__webglDepthbuffer,P,!1);else{const ne=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ve),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ve)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function $e(P,M,O){const Y=n.get(P);M!==void 0&&xe(Y.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&Fe(P)}function ot(P){const M=P.texture,O=n.get(P),Y=n.get(M);P.addEventListener("dispose",v);const ne=P.textures,ve=P.isWebGLCubeRenderTarget===!0,_e=ne.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=M.version,a.memory.textures++),ve){O.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[oe]=[];for(let le=0;le<M.mipmaps.length;le++)O.__webglFramebuffer[oe][le]=r.createFramebuffer()}else O.__webglFramebuffer[oe]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)O.__webglFramebuffer[oe]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(_e)for(let oe=0,le=ne.length;oe<le;oe++){const k=n.get(ne[oe]);k.__webglTexture===void 0&&(k.__webglTexture=r.createTexture(),a.memory.textures++)}if(P.samples>0&&bt(P)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let oe=0;oe<ne.length;oe++){const le=ne[oe];O.__webglColorRenderbuffer[oe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[oe]);const k=s.convert(le.format,le.colorSpace),se=s.convert(le.type),ee=x(le.internalFormat,k,se,le.normalized,le.colorSpace,P.isXRRenderTarget===!0),fe=Ke(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,fe,ee,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+oe,r.RENDERBUFFER,O.__webglColorRenderbuffer[oe])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),Be(O.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ve){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),Me(r.TEXTURE_CUBE_MAP,M);for(let oe=0;oe<6;oe++)if(M.mipmaps&&M.mipmaps.length>0)for(let le=0;le<M.mipmaps.length;le++)xe(O.__webglFramebuffer[oe][le],P,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,le);else xe(O.__webglFramebuffer[oe],P,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);p(M)&&S(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let oe=0,le=ne.length;oe<le;oe++){const k=ne[oe],se=n.get(k);let ee=r.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ee=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ee,se.__webglTexture),Me(ee,k),xe(O.__webglFramebuffer,P,k,r.COLOR_ATTACHMENT0+oe,ee,0),p(k)&&S(ee)}t.unbindTexture()}else{let oe=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(oe=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),Me(oe,M),M.mipmaps&&M.mipmaps.length>0)for(let le=0;le<M.mipmaps.length;le++)xe(O.__webglFramebuffer[le],P,M,r.COLOR_ATTACHMENT0,oe,le);else xe(O.__webglFramebuffer,P,M,r.COLOR_ATTACHMENT0,oe,0);p(M)&&S(oe),t.unbindTexture()}P.depthBuffer&&Fe(P)}function q(P){const M=P.textures;for(let O=0,Y=M.length;O<Y;O++){const ne=M[O];if(p(ne)){const ve=b(P),_e=n.get(ne).__webglTexture;t.bindTexture(ve,_e),S(ve),t.unbindTexture()}}}const it=[],Lt=[];function Ot(P){if(P.samples>0){if(bt(P)===!1){const M=P.textures,O=P.width,Y=P.height;let ne=r.COLOR_BUFFER_BIT;const ve=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=n.get(P),oe=M.length>1;if(oe)for(let k=0;k<M.length;k++)t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+k,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+k,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const le=P.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let k=0;k<M.length;k++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),oe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,_e.__webglColorRenderbuffer[k]);const se=n.get(M[k]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,se,0)}r.blitFramebuffer(0,0,O,Y,0,0,O,Y,ne,r.NEAREST),l===!0&&(it.length=0,Lt.length=0,it.push(r.COLOR_ATTACHMENT0+k),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(it.push(ve),Lt.push(ve),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Lt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,it))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),oe)for(let k=0;k<M.length;k++){t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+k,r.RENDERBUFFER,_e.__webglColorRenderbuffer[k]);const se=n.get(M[k]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+k,r.TEXTURE_2D,se,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){const M=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function Ke(P){return Math.min(i.maxSamples,P.samples)}function bt(P){const M=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function z(P){const M=a.render.frame;u.get(P)!==M&&(u.set(P,M),P.update())}function Nt(P,M){const O=P.colorSpace,Y=P.format,ne=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||O!==zl&&O!==wr&&(wt.getTransfer(O)===zt?(Y!==Ii||ne!==yi)&&lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",O)),M}function Xe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=G,this.getTextureUnits=F,this.setTextureUnits=X,this.setTexture2D=V,this.setTexture2DArray=W,this.setTexture3D=R,this.setTextureCube=Q,this.rebindTextures=$e,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=Ot,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Sy(r,e){function t(n,i=wr){let s;const a=wt.getTransfer(i);if(n===yi)return r.UNSIGNED_BYTE;if(n===Gf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Hf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===zm)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===km)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Om)return r.BYTE;if(n===Bm)return r.SHORT;if(n===_o)return r.UNSIGNED_SHORT;if(n===kf)return r.INT;if(n===Zi)return r.UNSIGNED_INT;if(n===Li)return r.FLOAT;if(n===Ji)return r.HALF_FLOAT;if(n===Gm)return r.ALPHA;if(n===Hm)return r.RGB;if(n===Ii)return r.RGBA;if(n===gr)return r.DEPTH_COMPONENT;if(n===is)return r.DEPTH_STENCIL;if(n===Vf)return r.RED;if(n===Wf)return r.RED_INTEGER;if(n===gs)return r.RG;if(n===Xf)return r.RG_INTEGER;if(n===Yf)return r.RGBA_INTEGER;if(n===Ml||n===yl||n===bl||n===El)if(a===zt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ml)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===El)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ml)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===El)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cu||n===Ru||n===Pu||n===Du)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Cu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ru)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Du)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lu||n===Iu||n===Uu||n===Nu||n===Fu||n===Ol||n===Ou)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lu||n===Iu)return a===zt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Uu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Nu)return s.COMPRESSED_R11_EAC;if(n===Fu)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ol)return s.COMPRESSED_RG11_EAC;if(n===Ou)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Bu||n===zu||n===ku||n===Gu||n===Hu||n===Vu||n===Wu||n===Xu||n===Yu||n===qu||n===$u||n===Ku||n===Zu||n===Ju)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Bu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ku)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Hu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$u)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ku)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zu)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ju)return a===zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qu||n===ju||n===ef)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Qu)return a===zt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ju)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ef)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===tf||n===nf||n===Bl||n===rf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===tf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===nf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vo?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const My=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class by{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new n0(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ni({vertexShader:My,fragmentShader:yy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jt(new xa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ey extends xs{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,g=null;const _=typeof XRWebGLBinding<"u",m=new by,p={},S=t.getContextAttributes();let b=null,x=null;const y=[],E=[],w=new je;let v=null,T=null;const A=new Mi;A.viewport=new tn;const U=new Mi;U.viewport=new tn;const I=[A,U],G=new Lv;let F=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ae=y[J];return ae===void 0&&(ae=new bc,y[J]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(J){let ae=y[J];return ae===void 0&&(ae=new bc,y[J]=ae),ae.getGripSpace()},this.getHand=function(J){let ae=y[J];return ae===void 0&&(ae=new bc,y[J]=ae),ae.getHandSpace()};function L(J){const ae=E.indexOf(J.inputSource);if(ae===-1)return;const Ee=y[ae];Ee!==void 0&&(Ee.update(J.inputSource,J.frame,c||a),Ee.dispatchEvent({type:J.type,data:J.inputSource}))}function D(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",V);for(let J=0;J<y.length;J++){const ae=E[J];ae!==null&&(E[J]=null,y[J].disconnect(ae))}F=null,X=null,m.reset();for(const J in p)delete p[J];if(e.setRenderTarget(b),h=null,f=null,d=null,i=null,x=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(w.width,w.height,!1),T!==null){const J=T.camera;J.fov=T.fov,J.zoom=T.zoom,J.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",D),i.addEventListener("inputsourceschange",V),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,Ye=null,xe=null;S.depth&&(xe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=S.stencil?is:gr,Ye=S.stencil?vo:Zi);const Be={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Be),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Ui(f.textureWidth,f.textureHeight,{format:Ii,type:yi,depthTexture:new xo(f.textureWidth,f.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const Ee={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Ee),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),x=new Ui(h.framebufferWidth,h.framebufferHeight,{format:Ii,type:yi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ve.setContext(i),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(J){for(let ae=0;ae<J.removed.length;ae++){const Ee=J.removed[ae],Ye=E.indexOf(Ee);Ye>=0&&(E[Ye]=null,y[Ye].disconnect(Ee))}for(let ae=0;ae<J.added.length;ae++){const Ee=J.added[ae];let Ye=E.indexOf(Ee);if(Ye===-1){for(let Be=0;Be<y.length;Be++)if(Be>=E.length){E.push(Ee),Ye=Be;break}else if(E[Be]===null){E[Be]=Ee,Ye=Be;break}if(Ye===-1)break}const xe=y[Ye];xe&&xe.connect(Ee)}}const W=new H,R=new H;function Q(J,ae,Ee){W.setFromMatrixPosition(ae.matrixWorld),R.setFromMatrixPosition(Ee.matrixWorld);const Ye=W.distanceTo(R),xe=ae.projectionMatrix.elements,Be=Ee.projectionMatrix.elements,We=xe[14]/(xe[10]-1),Fe=xe[14]/(xe[10]+1),$e=(xe[9]+1)/xe[5],ot=(xe[9]-1)/xe[5],q=(xe[8]-1)/xe[0],it=(Be[8]+1)/Be[0],Lt=We*q,Ot=We*it,Ke=Ye/(-q+it),bt=Ke*-q;if(ae.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(bt),J.translateZ(Ke),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),xe[10]===-1)J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const z=We+Ke,Nt=Fe+Ke,Xe=Lt-bt,P=Ot+(Ye-bt),M=$e*Fe/Nt*z,O=ot*Fe/Nt*z;J.projectionMatrix.makePerspective(Xe,P,M,O,z,Nt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Se(J,ae){ae===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ae.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let ae=J.near,Ee=J.far;m.texture!==null&&(m.depthNear>0&&(ae=m.depthNear),m.depthFar>0&&(Ee=m.depthFar)),G.near=U.near=A.near=ae,G.far=U.far=A.far=Ee,(F!==G.near||X!==G.far)&&(i.updateRenderState({depthNear:G.near,depthFar:G.far}),F=G.near,X=G.far),G.layers.mask=J.layers.mask|6,A.layers.mask=G.layers.mask&-5,U.layers.mask=G.layers.mask&-3;const Ye=J.parent,xe=G.cameras;Se(G,Ye);for(let Be=0;Be<xe.length;Be++)Se(xe[Be],Ye);xe.length===2?Q(G,A,U):G.projectionMatrix.copy(A.projectionMatrix),T===null&&J.isPerspectiveCamera&&(T={camera:J,fov:J.fov,zoom:J.zoom}),Re(J,G,Ye)};function Re(J,ae,Ee){Ee===null?J.matrix.copy(ae.matrixWorld):(J.matrix.copy(Ee.matrixWorld),J.matrix.invert(),J.matrix.multiply(ae.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=sf*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(J){return p[J]};let Ue=null;function Me(J,ae){if(u=ae.getViewerPose(c||a),g=ae,u!==null){const Ee=u.views;h!==null&&(e.setRenderTargetFramebuffer(x,h.framebuffer),e.setRenderTarget(x));let Ye=!1;Ee.length!==G.cameras.length&&(G.cameras.length=0,Ye=!0);for(let Fe=0;Fe<Ee.length;Fe++){const $e=Ee[Fe];let ot=null;if(h!==null)ot=h.getViewport($e);else{const it=d.getViewSubImage(f,$e);ot=it.viewport,Fe===0&&(e.setRenderTargetTextures(x,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(x))}let q=I[Fe];q===void 0&&(q=new Mi,q.layers.enable(Fe),q.viewport=new tn,I[Fe]=q),q.matrix.fromArray($e.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray($e.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(ot.x,ot.y,ot.width,ot.height),Fe===0&&(G.matrix.copy(q.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ye===!0&&G.cameras.push(q)}const xe=i.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const Fe=d.getDepthInformation(Ee[0]);Fe&&Fe.isValid&&Fe.texture&&m.init(Fe,i.renderState)}if(xe&&xe.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let Fe=0;Fe<Ee.length;Fe++){const $e=Ee[Fe].camera;if($e){let ot=p[$e];ot||(ot=new n0,p[$e]=ot);const q=d.getCameraImage($e);ot.sourceTexture=q}}}}for(let Ee=0;Ee<y.length;Ee++){const Ye=E[Ee],xe=y[Ee];Ye!==null&&xe!==void 0&&xe.update(Ye,ae,c||a)}Ue&&Ue(J,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),g=null}const Ve=new o0;Ve.setAnimationLoop(Me),this.setAnimationLoop=function(J){Ue=J},this.dispose=function(){}}}const Ty=new Yt,p0=new ct;p0.set(-1,0,0,0,1,0,0,0,1);function wy(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,i0(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,b,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),b=S.envMap,x=S.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(Ty.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(p0),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ay(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const E=y.program;n.uniformBlockBinding(x,E)}function c(x,y){let E=i[x.id];E===void 0&&(m(x),E=u(x),i[x.id]=E,x.addEventListener("dispose",S));const w=y.program;n.updateUBOMapping(x,w);const v=e.render.frame;s[x.id]!==v&&(f(x),s[x.id]=v)}function u(x){const y=d();x.__bindingPointIndex=y;const E=r.createBuffer(),w=x.__size,v=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,w,v),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,E),E}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Dt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const y=i[x.id],E=x.uniforms,w=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let v=0,T=E.length;v<T;v++){const A=E[v];if(Array.isArray(A))for(let U=0,I=A.length;U<I;U++)h(A[U],v,U,w);else h(A,v,0,w)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(x,y,E,w){if(_(x,y,E,w)===!0){const v=x.__offset,T=x.value;if(Array.isArray(T)){let A=0;for(let U=0;U<T.length;U++){const I=T[U],G=p(I);g(I,x.__data,A),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(A+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,x.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,v,x.__data)}}function g(x,y,E){typeof x=="number"||typeof x=="boolean"?y[0]=x:x.isMatrix3?(y[0]=x.elements[0],y[1]=x.elements[1],y[2]=x.elements[2],y[3]=0,y[4]=x.elements[3],y[5]=x.elements[4],y[6]=x.elements[5],y[7]=0,y[8]=x.elements[6],y[9]=x.elements[7],y[10]=x.elements[8],y[11]=0):ArrayBuffer.isView(x)?y.set(new x.constructor(x.buffer,x.byteOffset,y.length)):x.toArray(y,E)}function _(x,y,E,w){const v=x.value,T=y+"_"+E;if(w[T]===void 0)return typeof v=="number"||typeof v=="boolean"?w[T]=v:ArrayBuffer.isView(v)?w[T]=v.slice():w[T]=v.clone(),!0;{const A=w[T];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return w[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function m(x){const y=x.uniforms;let E=0;const w=16;for(let T=0,A=y.length;T<A;T++){const U=Array.isArray(y[T])?y[T]:[y[T]];for(let I=0,G=U.length;I<G;I++){const F=U[I],X=Array.isArray(F.value)?F.value:[F.value];for(let L=0,D=X.length;L<D;L++){const V=X[L],W=p(V),R=E%w,Q=R%W.boundary,Se=R+Q;E+=Q,Se!==0&&w-Se<W.storage&&(E+=w-Se),F.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=E,E+=W.storage}}}const v=E%w;return v>0&&(E+=w-v),x.__size=E,x.__cache={},this}function p(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(y.boundary=16,y.storage=x.byteLength):lt("WebGLRenderer: Unsupported uniform value type.",x),y}function S(x){const y=x.target;y.removeEventListener("dispose",S);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function b(){for(const x in i)r.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:l,update:c,dispose:b}}const Cy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Bi=null;function Ry(){return Bi===null&&(Bi=new jm(Cy,16,16,gs,Ji),Bi.name="DFG_LUT",Bi.minFilter=Ln,Bi.magFilter=Ln,Bi.wrapS=ur,Bi.wrapT=ur,Bi.generateMipmaps=!1,Bi.needsUpdate=!0),Bi}class Py{constructor(e={}){const{canvas:t=q_(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=yi}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=h,m=new Set([Yf,Xf,Wf]),p=new Set([yi,Zi,_o,vo,Gf,Hf]),S=new Uint32Array(4),b=new Int32Array(4),x=new H;let y=null,E=null;const w=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let U=!1,I=null,G=null,F=null,X=null;this._outputColorSpace=Kn;let L=0,D=0,V=null,W=-1,R=null;const Q=new tn,Se=new tn;let Re=null;const Ue=new It(0);let Me=0,Ve=t.width,J=t.height,ae=1,Ee=null,Ye=null;const xe=new tn(0,0,Ve,J),Be=new tn(0,0,Ve,J);let We=!1;const Fe=new e0;let $e=!1,ot=!1;const q=new Yt,it=new H,Lt=new tn,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function bt(){return V===null?ae:1}let z=n;function Nt(C,B){return t.getContext(C,B)}let Xe,P,M,O,Y,ne,ve,_e,oe,le,k,se,ee,fe,ue,Ce,Pe,N,me,re,ye,Te,ce;try{const C={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zf}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",He,!1),z===null){const B="webgl2";if(z=Nt(B,C),z===null)throw Nt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ge()}catch(C){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",He,!1),Dt("WebGLRenderer: "+C.message),C}function ge(){Xe=new RS(z),Xe.init(),ye=new Sy(z,Xe),P=new xS(z,Xe,e,ye),M=new vy(z,Xe),P.reversedDepthBuffer&&f&&M.buffers.depth.setReversed(!0),G=z.createFramebuffer(),F=z.createFramebuffer(),X=z.createFramebuffer(),O=new LS(z),Y=new ry,ne=new xy(z,Xe,M,Y,P,ye,O),ve=new CS(A),_e=new Uv(z),Te=new _S(z,_e),oe=new PS(z,_e,O,Te),le=new US(z,oe,_e,Te,O),N=new IS(z,P,ne),ue=new SS(Y),k=new iy(A,ve,Xe,P,Te,ue),se=new wy(A,Y),ee=new ay,fe=new hy(Xe),Pe=new gS(A,ve,M,le,g,l),Ce=new _y(A,le,P),ce=new Ay(z,O,P,M),me=new vS(z,Xe,O),re=new DS(z,Xe,O),O.programs=k.programs,A.capabilities=P,A.extensions=Xe,A.properties=Y,A.renderLists=ee,A.shadowMap=Ce,A.state=M,A.info=O}_!==yi&&(T=new FS(_,t.width,t.height,o,i,s));const de=new Ey(A,z);this.xr=de,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const C=Xe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Xe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(C){C!==void 0&&(ae=C,this.setSize(Ve,J,!1))},this.getSize=function(C){return C.set(Ve,J)},this.setSize=function(C,B,j=!0){if(de.isPresenting){lt("WebGLRenderer: Can't change size while VR device is presenting.");return}Ve=C,J=B,t.width=Math.floor(C*ae),t.height=Math.floor(B*ae),j===!0&&(t.style.width=C+"px",t.style.height=B+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,C,B)},this.getDrawingBufferSize=function(C){return C.set(Ve*ae,J*ae).floor()},this.setDrawingBufferSize=function(C,B,j){Ve=C,J=B,ae=j,t.width=Math.floor(C*j),t.height=Math.floor(B*j),this.setViewport(0,0,C,B)},this.setEffects=function(C){if(_===yi){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let B=0;B<C.length;B++)if(C[B].isOutputPass===!0){lt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(Q)},this.getViewport=function(C){return C.copy(xe)},this.setViewport=function(C,B,j,Z){C.isVector4?xe.set(C.x,C.y,C.z,C.w):xe.set(C,B,j,Z),M.viewport(Q.copy(xe).multiplyScalar(ae).round())},this.getScissor=function(C){return C.copy(Be)},this.setScissor=function(C,B,j,Z){C.isVector4?Be.set(C.x,C.y,C.z,C.w):Be.set(C,B,j,Z),M.scissor(Se.copy(Be).multiplyScalar(ae).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(C){M.setScissorTest(We=C)},this.setOpaqueSort=function(C){Ee=C},this.setTransparentSort=function(C){Ye=C},this.getClearColor=function(C){return C.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(C=!0,B=!0,j=!0){let Z=0;if(C){let $=!1;if(V!==null){const we=V.texture.format;$=m.has(we)}if($){const we=V.texture.type,Oe=p.has(we),K=Pe.getClearColor(),ie=Pe.getClearAlpha(),he=K.r,Ae=K.g,Ne=K.b;Oe?(S[0]=he,S[1]=Ae,S[2]=Ne,S[3]=ie,z.clearBufferuiv(z.COLOR,0,S)):(b[0]=he,b[1]=Ae,b[2]=Ne,b[3]=ie,z.clearBufferiv(z.COLOR,0,b))}else Z|=z.COLOR_BUFFER_BIT}B&&(Z|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),I=C},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",He,!1),Pe.dispose(),ee.dispose(),fe.dispose(),Y.dispose(),ve.dispose(),le.dispose(),Te.dispose(),ce.dispose(),k.dispose(),de.dispose(),de.removeEventListener("sessionstart",Ct),de.removeEventListener("sessionend",et),rt.stop()};function ze(C){C.preventDefault(),Vl("WebGLRenderer: Context Lost."),U=!0}function pe(){Vl("WebGLRenderer: Context Restored."),U=!1;const C=O.autoReset,B=Ce.enabled,j=Ce.autoUpdate,Z=Ce.needsUpdate,$=Ce.type;ge(),O.autoReset=C,Ce.enabled=B,Ce.autoUpdate=j,Ce.needsUpdate=Z,Ce.type=$}function He(C){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Le(C){const B=C.target;B.removeEventListener("dispose",Le),Je(B)}function Je(C){Ut(C),Y.remove(C)}function Ut(C){const B=Y.get(C).programs;B!==void 0&&(B.forEach(function(j){k.releaseProgram(j)}),C.isShaderMaterial&&k.releaseShaderCache(C))}this.renderBufferDirect=function(C,B,j,Z,$,we){B===null&&(B=Ot);const Oe=$.isMesh&&$.matrixWorld.determinantAffine()<0,K=Kt(C,B,j,Z,$);M.setMaterial(Z,Oe);let ie=j.index,he=1;if(Z.wireframe===!0){if(ie=oe.getWireframeAttribute(j),ie===void 0)return;he=2}const Ae=j.drawRange,Ne=j.attributes.position;let be=Ae.start*he,Qe=(Ae.start+Ae.count)*he;we!==null&&(be=Math.max(be,we.start*he),Qe=Math.min(Qe,(we.start+we.count)*he)),ie!==null?(be=Math.max(be,0),Qe=Math.min(Qe,ie.count)):Ne!=null&&(be=Math.max(be,0),Qe=Math.min(Qe,Ne.count));const Et=Qe-be;if(Et<0||Et===1/0)return;Te.setup($,Z,K,j,ie);let yt,st=me;if(ie!==null&&(yt=_e.get(ie),st=re,st.setIndex(yt)),$.isMesh)Z.wireframe===!0?(M.setLineWidth(Z.wireframeLinewidth*bt()),st.setMode(z.LINES)):st.setMode(z.TRIANGLES);else if($.isLine){let Tt=Z.linewidth;Tt===void 0&&(Tt=1),M.setLineWidth(Tt*bt()),$.isLineSegments?st.setMode(z.LINES):$.isLineLoop?st.setMode(z.LINE_LOOP):st.setMode(z.LINE_STRIP)}else $.isPoints?st.setMode(z.POINTS):$.isSprite&&st.setMode(z.TRIANGLES);if($.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))st.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Tt=$._multiDrawStarts,De=$._multiDrawCounts,on=$._multiDrawCount,dt=ie?_e.get(ie).bytesPerElement:1,yn=Y.get(Z).currentProgram.getUniforms();for(let tt=0;tt<on;tt++)yn.setValue(z,"_gl_DrawID",tt),st.render(Tt[tt]/dt,De[tt])}else if($.isInstancedMesh)st.renderInstances(be,Et,$.count);else if(j.isInstancedBufferGeometry){const Tt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,De=Math.min(j.instanceCount,Tt);st.renderInstances(be,Et,De)}else st.render(be,Et)};function Ze(C,B,j,Z){I!==null&&C.isNodeMaterial&&I.setObject(Z,C),$e===!0&&ue.setState(C,j,!1),C.transparent===!0&&C.side===Yn&&C.forceSinglePass===!1?(C.side=qn,C.needsUpdate=!0,Pt(C,B,Z),C.side=kr,C.needsUpdate=!0,Pt(C,B,Z),C.side=Yn):Pt(C,B,Z)}this.compile=function(C,B,j=null){j===null&&(j=C),I!==null&&I.renderStart(C,B,j),E=fe.get(j),E.init(B),v.push(E),j.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),C!==j&&C.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),I!==null&&I.updateLights(E.state.lightsArray),ot=this.localClippingEnabled,$e=ue.init(this.clippingPlanes,ot),$e===!0&&ue.setGlobalState(this.clippingPlanes,B),I!==null&&Ce.render(E.state.shadowsArray,j,B);const Z=new Set;return C.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const we=$.material;if(we)if(Array.isArray(we))for(let Oe=0;Oe<we.length;Oe++){const K=we[Oe];Ze(K,j,B,$),Z.add(K)}else Ze(we,j,B,$),Z.add(we)}),E=v.pop(),I!==null&&I.renderEnd(),Z},this.compileAsync=function(C,B,j=null){const Z=this.compile(C,B,j);return new Promise($=>{function we(){if(Z.forEach(function(Oe){const ie=Y.get(Oe).currentProgram;(ie===void 0||ie.isReady())&&Z.delete(Oe)}),Z.size===0){$(C);return}setTimeout(we,10)}Xe.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let ht=null;function qt(C){ht&&ht(C)}function Ct(){rt.stop()}function et(){rt.start()}const rt=new o0;rt.setAnimationLoop(qt),typeof self<"u"&&rt.setContext(self),this.setAnimationLoop=function(C){ht=C,de.setAnimationLoop(C),C===null?rt.stop():rt.start()},de.addEventListener("sessionstart",Ct),de.addEventListener("sessionend",et),this.render=function(C,B){if(B!==void 0&&B.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;I!==null&&I.renderStart(C,B);const j=de.enabled===!0&&de.isPresenting===!0,Z=T!==null&&(V===null||j)&&T.begin(A,V);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(de.cameraAutoUpdate===!0&&de.updateCamera(B),B=de.getCamera()),C.isScene===!0&&C.onBeforeRender(A,C,B,V),E=fe.get(C,v.length),E.init(B),E.state.textureUnits=ne.getTextureUnits(),v.push(E),q.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Fe.setFromProjectionMatrix(q,Yi,B.reversedDepth),ot=this.localClippingEnabled,$e=ue.init(this.clippingPlanes,ot),y=ee.get(C,w.length),y.init(),w.push(y),de.enabled===!0&&de.isPresenting===!0){const Oe=A.xr.getDepthSensingMesh();Oe!==null&&Ht(Oe,B,-1/0,A.sortObjects)}Ht(C,B,0,A.sortObjects),y.finish(),I!==null&&I.updateLights(E.state.lightsArray),A.sortObjects===!0&&y.sort(Ee,Ye),Ke=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,Ke&&Pe.addToRenderList(y,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&ue.beginShadows();const $=E.state.shadowsArray;if(Ce.render($,C,B),$e===!0&&ue.endShadows(),(Z&&T.hasRenderPass())===!1){const Oe=y.opaque,K=y.transmissive;if(E.setupLights(),B.isArrayCamera){const ie=B.cameras;if(K.length>0)for(let he=0,Ae=ie.length;he<Ae;he++){const Ne=ie[he];mt(Oe,K,C,Ne)}Ke&&Pe.render(C);for(let he=0,Ae=ie.length;he<Ae;he++){const Ne=ie[he];ke(y,C,Ne,Ne.viewport)}}else K.length>0&&mt(Oe,K,C,B),Ke&&Pe.render(C),ke(y,C,B)}V!==null&&D===0&&(ne.updateMultisampleRenderTarget(V),ne.updateRenderTargetMipmap(V)),Z&&T.end(A),C.isScene===!0&&C.onAfterRender(A,C,B),Te.resetDefaultState(),W=-1,R=null,v.pop(),v.length>0?(E=v[v.length-1],ne.setTextureUnits(E.state.textureUnits),$e===!0&&ue.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,w.pop(),w.length>0?y=w[w.length-1]:y=null,I!==null&&I.renderEnd()};function Ht(C,B,j,Z){if(C.visible===!1)return;if(C.layers.test(B.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(B);else if(C.isLightProbeGrid)E.pushLightProbeGrid(C);else if(C.isLight)E.pushLight(C),C.castShadow&&E.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(Fe)){Z&&Lt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(q);const Oe=le.update(C),K=C.material;K.visible&&y.push(C,Oe,K,j,Lt.z,null,B)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(Fe))){const Oe=le.update(C),K=C.material;if(Z&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Lt.copy(C.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),Lt.copy(Oe.boundingSphere.center)),Lt.applyMatrix4(C.matrixWorld).applyMatrix4(q)),Array.isArray(K)){const ie=Oe.groups;for(let he=0,Ae=ie.length;he<Ae;he++){const Ne=ie[he],be=K[Ne.materialIndex];be&&be.visible&&y.push(C,Oe,be,j,Lt.z,Ne,B)}}else K.visible&&y.push(C,Oe,K,j,Lt.z,null,B)}}const we=C.children;for(let Oe=0,K=we.length;Oe<K;Oe++)Ht(we[Oe],B,j,Z)}function ke(C,B,j,Z){const{opaque:$,transmissive:we,transparent:Oe}=C;E.setupLightsView(j),$e===!0&&ue.setGlobalState(A.clippingPlanes,j),Z&&M.viewport(Q.copy(Z)),$.length>0&&qe($,B,j),we.length>0&&qe(we,B,j),Oe.length>0&&qe(Oe,B,j),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function mt(C,B,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[Z.id]===void 0){const be=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[Z.id]=new Ui(1,1,{generateMipmaps:!0,type:be?Ji:yi,minFilter:ns,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:wt.workingColorSpace})}const we=E.state.transmissionRenderTarget[Z.id],Oe=Z.viewport||Q;we.setSize(Oe.z*A.transmissionResolutionScale,Oe.w*A.transmissionResolutionScale);const K=A.getRenderTarget(),ie=A.getActiveCubeFace(),he=A.getActiveMipmapLevel();A.setRenderTarget(we),A.getClearColor(Ue),Me=A.getClearAlpha(),Me<1&&A.setClearColor(16777215,.5),A.clear(),Ke&&Pe.render(j);const Ae=A.toneMapping;A.toneMapping=$i;const Ne=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),E.setupLightsView(Z),$e===!0&&ue.setGlobalState(A.clippingPlanes,Z),qe(C,j,Z),ne.updateMultisampleRenderTarget(we),ne.updateRenderTargetMipmap(we),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Qe=0,Et=B.length;Qe<Et;Qe++){const yt=B[Qe],{object:st,geometry:Tt,material:De,group:on}=yt;if(De.side===Yn&&st.layers.test(Z.layers)){const dt=De.side;De.side=qn,De.needsUpdate=!0,Rt(st,j,Z,Tt,De,on),De.side=dt,De.needsUpdate=!0,be=!0}}be===!0&&(ne.updateMultisampleRenderTarget(we),ne.updateRenderTargetMipmap(we))}A.setRenderTarget(K,ie,he),A.setClearColor(Ue,Me),Ne!==void 0&&(Z.viewport=Ne),A.toneMapping=Ae}function qe(C,B,j){const Z=B.isScene===!0?B.overrideMaterial:null;for(let $=0,we=C.length;$<we;$++){const Oe=C[$],{object:K,geometry:ie,group:he}=Oe;let Ae=Oe.material;Ae.allowOverride===!0&&Z!==null&&(Ae=Z),K.layers.test(j.layers)&&Rt(K,B,j,ie,Ae,he)}}function Rt(C,B,j,Z,$,we){I!==null&&$.isNodeMaterial&&I.setObject(C,$),C.onBeforeRender(A,B,j,Z,$,we),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),$.onBeforeRender(A,B,j,Z,C,we),$.transparent===!0&&$.side===Yn&&$.forceSinglePass===!1?($.side=qn,$.needsUpdate=!0,A.renderBufferDirect(j,B,Z,$,C,we),$.side=kr,$.needsUpdate=!0,A.renderBufferDirect(j,B,Z,$,C,we),$.side=Yn):A.renderBufferDirect(j,B,Z,$,C,we),C.onAfterRender(A,B,j,Z,$,we)}function Pt(C,B,j){B.isScene!==!0&&(B=Ot);const Z=Y.get(C),$=E.state.lights,we=E.state.shadowsArray,Oe=$.state.version,K=k.getParameters(C,$.state,we,B,j,E.state.lightProbeGridArray),ie=k.getProgramCacheKey(K);let he=Z.programs;Z.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?B.environment:null,Z.fog=B.fog;const Ae=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;Z.envMap=ve.get(C.envMap||Z.environment,Ae),Z.envMapRotation=Z.environment!==null&&C.envMap===null?B.environmentRotation:C.envMapRotation,he===void 0&&(C.addEventListener("dispose",Le),he=new Map,Z.programs=he);let Ne=he.get(ie);if(Ne!==void 0){if(Z.currentProgram===Ne&&Z.lightsStateVersion===Oe)return en(C,K),Ne}else K.uniforms=k.getUniforms(C),I!==null&&C.isNodeMaterial&&I.build(C,j,K),C.onBeforeCompile(K,A),Ne=k.acquireProgram(K,ie),he.set(ie,Ne),Z.uniforms=K.uniforms;const be=Z.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(be.clippingPlanes=ue.uniform),en(C,K),Z.needsLights=Mn(C),Z.lightsStateVersion=Oe,Z.needsLights&&(be.ambientLightColor.value=$.state.ambient,be.lightProbe.value=$.state.probe,be.sunLights.value=$.state.sun,be.sunLightShadows.value=$.state.sunShadow,be.directionalLights.value=$.state.directional,be.directionalLightShadows.value=$.state.directionalShadow,be.spotLights.value=$.state.spot,be.spotLightShadows.value=$.state.spotShadow,be.rectAreaLights.value=$.state.rectArea,be.ltc_1.value=$.state.rectAreaLTC1,be.ltc_2.value=$.state.rectAreaLTC2,be.pointLights.value=$.state.point,be.pointLightShadows.value=$.state.pointShadow,be.hemisphereLights.value=$.state.hemi,be.sunShadowMatrix.value=$.state.sunShadowMatrix,be.sunShadowCascade.value=$.state.sunShadowCascade,be.directionalShadowMatrix.value=$.state.directionalShadowMatrix,be.spotLightMatrix.value=$.state.spotLightMatrix,be.spotLightMap.value=$.state.spotLightMap,be.pointShadowMatrix.value=$.state.pointShadowMatrix),Z.lightProbeGrid=E.state.lightProbeGridArray.length>0,Z.currentProgram=Ne,Z.uniformsList=null,Ne}function ft(C){if(C.uniformsList===null){const B=C.currentProgram.getUniforms();C.uniformsList=Tl.seqWithValue(B.seq,C.uniforms)}return C.uniformsList}function en(C,B){const j=Y.get(C);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function ni(C,B){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;x.setFromMatrixPosition(B.matrixWorld);for(let j=0,Z=C.length;j<Z;j++){const $=C[j];if($.texture!==null&&$.boundingBox.containsPoint(x))return $}return null}function Kt(C,B,j,Z,$){B.isScene!==!0&&(B=Ot),ne.resetTextureUnits();const we=B.fog,Oe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?B.environment:null,K=V===null?A.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:wt.workingColorSpace,ie=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,he=ve.get(Z.envMap||Oe,ie),Ae=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ne=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),be=!!j.morphAttributes.position,Qe=!!j.morphAttributes.normal,Et=!!j.morphAttributes.color;let yt=$i;Z.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(yt=A.toneMapping);const st=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Tt=st!==void 0?st.length:0,De=Y.get(Z),on=E.state.lights;if($e===!0&&(ot===!0||C!==R)){const gt=C===R&&Z.id===W;ue.setState(Z,C,gt)}let dt=!1;Z.version===De.__version?(De.needsLights&&De.lightsStateVersion!==on.state.version||De.outputColorSpace!==K||$.isBatchedMesh&&De.batching===!1||!$.isBatchedMesh&&De.batching===!0||$.isBatchedMesh&&De.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&De.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&De.instancing===!1||!$.isInstancedMesh&&De.instancing===!0||$.isSkinnedMesh&&De.skinning===!1||!$.isSkinnedMesh&&De.skinning===!0||$.isInstancedMesh&&De.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&De.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&De.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&De.instancingMorph===!1&&$.morphTexture!==null||De.envMap!==he||Z.fog===!0&&De.fog!==we||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==ue.numPlanes||De.numIntersection!==ue.numIntersection)||De.vertexAlphas!==Ae||De.vertexTangents!==Ne||De.morphTargets!==be||De.morphNormals!==Qe||De.morphColors!==Et||De.toneMapping!==yt||De.morphTargetsCount!==Tt||!!De.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,De.__version=Z.version);let yn=De.currentProgram;dt===!0&&(yn=Pt(Z,B,$),I&&Z.isNodeMaterial&&I.onUpdateProgram(Z,yn,De));let tt=!1,gi=!1,Fi=!1;const te=yn.getUniforms(),at=De.uniforms;if(M.useProgram(yn.program)&&(tt=!0,gi=!0,Fi=!0),Z.id!==W&&(W=Z.id,gi=!0),De.needsLights){const gt=ni(E.state.lightProbeGridArray,$);De.lightProbeGrid!==gt&&(De.lightProbeGrid=gt,gi=!0)}if(tt||R!==C){M.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),te.setValue(z,"projectionMatrix",C.projectionMatrix),te.setValue(z,"viewMatrix",C.matrixWorldInverse);const vt=te.map.cameraPosition;vt!==void 0&&vt.setValue(z,it.setFromMatrixPosition(C.matrixWorld)),P.logarithmicDepthBuffer&&te.setValue(z,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&te.setValue(z,"isOrthographic",C.isOrthographicCamera===!0),R!==C&&(R=C,gi=!0,Fi=!0)}if(De.needsLights&&(on.state.sunShadowMap.length>0&&te.setValue(z,"sunShadowMap",on.state.sunShadowMap,ne),on.state.directionalShadowMap.length>0&&te.setValue(z,"directionalShadowMap",on.state.directionalShadowMap,ne),on.state.spotShadowMap.length>0&&te.setValue(z,"spotShadowMap",on.state.spotShadowMap,ne),on.state.pointShadowMap.length>0&&te.setValue(z,"pointShadowMap",on.state.pointShadowMap,ne)),$.isSkinnedMesh){te.setOptional(z,$,"bindMatrix"),te.setOptional(z,$,"bindMatrixInverse");const gt=$.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),te.setValue(z,"boneTexture",gt.boneTexture,ne))}$.isBatchedMesh&&(te.setOptional(z,$,"batchingTexture"),te.setValue(z,"batchingTexture",$._matricesTexture,ne),te.setOptional(z,$,"batchingIdTexture"),te.setValue(z,"batchingIdTexture",$._indirectTexture,ne),te.setOptional(z,$,"batchingColorTexture"),$._colorsTexture!==null&&te.setValue(z,"batchingColorTexture",$._colorsTexture,ne));const nt=j.morphAttributes;if((nt.position!==void 0||nt.normal!==void 0||nt.color!==void 0)&&N.update($,j,yn),(gi||De.receiveShadow!==$.receiveShadow)&&(De.receiveShadow=$.receiveShadow,te.setValue(z,"receiveShadow",$.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&B.environment!==null&&(at.envMapIntensity.value=B.environmentIntensity),at.dfgLUT!==void 0&&(at.dfgLUT.value=Ry()),gi){if(te.setValue(z,"toneMappingExposure",A.toneMappingExposure),De.needsLights&&Vt(at,Fi),we&&Z.fog===!0&&se.refreshFogUniforms(at,we),se.refreshMaterialUniforms(at,Z,ae,J,E.state.transmissionRenderTarget[C.id]),De.needsLights&&De.lightProbeGrid){const gt=De.lightProbeGrid;at.probesSH.value=gt.texture,at.probesMin.value.copy(gt.boundingBox.min),at.probesMax.value.copy(gt.boundingBox.max),at.probesResolution.value.copy(gt.resolution)}Tl.upload(z,ft(De),at,ne)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Tl.upload(z,ft(De),at,ne),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&te.setValue(z,"center",$.center),te.setValue(z,"modelViewMatrix",$.modelViewMatrix),te.setValue(z,"normalMatrix",$.normalMatrix),te.setValue(z,"modelMatrix",$.matrixWorld),Z.uniformsGroups!==void 0){const gt=Z.uniformsGroups;for(let vt=0,Fn=gt.length;vt<Fn;vt++){const _r=gt[vt];ce.update(_r,yn),ce.bind(_r,yn)}}return yn}function Vt(C,B){C.ambientLightColor.needsUpdate=B,C.lightProbe.needsUpdate=B,C.sunLights.needsUpdate=B,C.sunLightShadows.needsUpdate=B,C.directionalLights.needsUpdate=B,C.directionalLightShadows.needsUpdate=B,C.pointLights.needsUpdate=B,C.pointLightShadows.needsUpdate=B,C.spotLights.needsUpdate=B,C.spotLightShadows.needsUpdate=B,C.rectAreaLights.needsUpdate=B,C.hemisphereLights.needsUpdate=B}function Mn(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(C,B,j){const Z=Y.get(C);Z.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Y.get(C.texture).__webglTexture=B,Y.get(C.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,B){const j=Y.get(C);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(C,B=0,j=0){V=C,L=B,D=j;let Z=null,$=!1,we=!1;if(C){const K=Y.get(C);if(K.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(z.FRAMEBUFFER,K.__webglFramebuffer),Q.copy(C.viewport),Se.copy(C.scissor),Re=C.scissorTest,M.viewport(Q),M.scissor(Se),M.setScissorTest(Re),W=-1;return}else if(K.__webglFramebuffer===void 0)ne.setupRenderTarget(C);else if(K.__hasExternalTextures)ne.rebindTextures(C,Y.get(C.texture).__webglTexture,Y.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ae=C.depthTexture;if(K.__boundDepthTexture!==Ae){if(Ae!==null&&Y.has(Ae)&&(C.width!==Ae.image.width||C.height!==Ae.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(C)}}const ie=C.texture;(ie.isData3DTexture||ie.isDataArrayTexture||ie.isCompressedArrayTexture)&&(we=!0);const he=Y.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(he[B])?Z=he[B][j]:Z=he[B],$=!0):C.samples>0&&ne.useMultisampledRTT(C)===!1?Z=Y.get(C).__webglMultisampledFramebuffer:Array.isArray(he)?Z=he[j]:Z=he,Q.copy(C.viewport),Se.copy(C.scissor),Re=C.scissorTest}else Q.copy(xe).multiplyScalar(ae).floor(),Se.copy(Be).multiplyScalar(ae).floor(),Re=We;if(j!==0&&(Z=G),M.bindFramebuffer(z.FRAMEBUFFER,Z)&&M.drawBuffers(C,Z),M.viewport(Q),M.scissor(Se),M.setScissorTest(Re),$){const K=Y.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,K.__webglTexture,j)}else if(we){const K=B;for(let ie=0;ie<C.textures.length;ie++){const he=Y.get(C.textures[ie]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+ie,he.__webglTexture,j,K)}}else if(C!==null&&j!==0){const K=Y.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,K.__webglTexture,j)}W=-1};function Qi(C){const B=Y.get(C);return(B.__readFormat!==C.format||B.__readType!==C.type)&&(B.__readFormat=C.format,B.__readType=C.type,B.__formatReadable=P.textureFormatReadable(C.format),B.__typeReadable=P.textureTypeReadable(C.type)),B}this.readRenderTargetPixels=function(C,B,j,Z,$,we,Oe,K=0){if(!(C&&C.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ie=Y.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Oe!==void 0&&(ie=ie[Oe]),ie){M.bindFramebuffer(z.FRAMEBUFFER,ie);try{const he=C.textures[K],Ae=he.format,Ne=he.type;C.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+K);const be=Qi(he);if(be.__formatReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(be.__typeReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=C.width-Z&&j>=0&&j<=C.height-$&&z.readPixels(B,j,Z,$,ye.convert(Ae),ye.convert(Ne),we)}finally{const he=V!==null?Y.get(V).__webglFramebuffer:null;M.bindFramebuffer(z.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(C,B,j,Z,$,we,Oe,K=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ie=Y.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Oe!==void 0&&(ie=ie[Oe]),ie)if(B>=0&&B<=C.width-Z&&j>=0&&j<=C.height-$){M.bindFramebuffer(z.FRAMEBUFFER,ie);const he=C.textures[K],Ae=he.format,Ne=he.type;C.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+K);const be=Qi(he);if(be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.bufferData(z.PIXEL_PACK_BUFFER,we.byteLength,z.STREAM_READ),z.readPixels(B,j,Z,$,ye.convert(Ae),ye.convert(Ne),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Et=V!==null?Y.get(V).__webglFramebuffer:null;M.bindFramebuffer(z.FRAMEBUFFER,Et);const yt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await $_(z,yt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Qe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,we),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(Qe),z.deleteSync(yt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,B=null,j=0){const Z=Math.pow(2,-j),$=Math.floor(C.image.width*Z),we=Math.floor(C.image.height*Z),Oe=B!==null?B.x:0,K=B!==null?B.y:0;ne.setTexture2D(C,0),z.copyTexSubImage2D(z.TEXTURE_2D,j,0,0,Oe,K,$,we),M.unbindTexture()},this.copyTextureToTexture=function(C,B,j=null,Z=null,$=0,we=0){let Oe,K,ie,he,Ae,Ne,be,Qe,Et;const yt=C.isCompressedTexture?C.mipmaps[we]:C.image;if(j!==null)Oe=j.max.x-j.min.x,K=j.max.y-j.min.y,ie=j.isBox3?j.max.z-j.min.z:1,he=j.min.x,Ae=j.min.y,Ne=j.isBox3?j.min.z:0;else{const at=Math.pow(2,-$);Oe=Math.floor(yt.width*at),K=Math.floor(yt.height*at),C.isDataArrayTexture?ie=yt.depth:C.isData3DTexture?ie=Math.floor(yt.depth*at):ie=1,he=0,Ae=0,Ne=0}Z!==null?(be=Z.x,Qe=Z.y,Et=Z.z):(be=0,Qe=0,Et=0);const st=ye.convert(B.format),Tt=ye.convert(B.type);let De;B.isData3DTexture?(ne.setTexture3D(B,0),De=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(ne.setTexture2DArray(B,0),De=z.TEXTURE_2D_ARRAY):(ne.setTexture2D(B,0),De=z.TEXTURE_2D),M.activeTexture(z.TEXTURE0),M.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),M.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),M.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);const on=M.getParameter(z.UNPACK_ROW_LENGTH),dt=M.getParameter(z.UNPACK_IMAGE_HEIGHT),yn=M.getParameter(z.UNPACK_SKIP_PIXELS),tt=M.getParameter(z.UNPACK_SKIP_ROWS),gi=M.getParameter(z.UNPACK_SKIP_IMAGES);M.pixelStorei(z.UNPACK_ROW_LENGTH,yt.width),M.pixelStorei(z.UNPACK_IMAGE_HEIGHT,yt.height),M.pixelStorei(z.UNPACK_SKIP_PIXELS,he),M.pixelStorei(z.UNPACK_SKIP_ROWS,Ae),M.pixelStorei(z.UNPACK_SKIP_IMAGES,Ne);const Fi=C.isDataArrayTexture||C.isData3DTexture,te=B.isDataArrayTexture||B.isData3DTexture;if(C.isDepthTexture){const at=Y.get(C),nt=Y.get(B),gt=Y.get(at.__renderTarget),vt=Y.get(nt.__renderTarget);M.bindFramebuffer(z.READ_FRAMEBUFFER,gt.__webglFramebuffer),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Fn=0;Fn<ie;Fn++)Fi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Y.get(C).__webglTexture,$,Ne+Fn),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Y.get(B).__webglTexture,we,Et+Fn)),z.blitFramebuffer(he,Ae,Oe,K,be,Qe,Oe,K,z.DEPTH_BUFFER_BIT,z.NEAREST);M.bindFramebuffer(z.READ_FRAMEBUFFER,null),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if($!==0||C.isRenderTargetTexture||Y.has(C)){const at=Y.get(C),nt=Y.get(B);M.bindFramebuffer(z.READ_FRAMEBUFFER,F),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,X);for(let gt=0;gt<ie;gt++)Fi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,at.__webglTexture,$,Ne+gt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,at.__webglTexture,$),te?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,nt.__webglTexture,we,Et+gt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,nt.__webglTexture,we),$!==0?z.blitFramebuffer(he,Ae,Oe,K,be,Qe,Oe,K,z.COLOR_BUFFER_BIT,z.NEAREST):te?z.copyTexSubImage3D(De,we,be,Qe,Et+gt,he,Ae,Oe,K):z.copyTexSubImage2D(De,we,be,Qe,he,Ae,Oe,K);M.bindFramebuffer(z.READ_FRAMEBUFFER,null),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else te?C.isDataTexture||C.isData3DTexture?z.texSubImage3D(De,we,be,Qe,Et,Oe,K,ie,st,Tt,yt.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(De,we,be,Qe,Et,Oe,K,ie,st,yt.data):z.texSubImage3D(De,we,be,Qe,Et,Oe,K,ie,st,Tt,yt):C.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,we,be,Qe,Oe,K,st,Tt,yt.data):C.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,we,be,Qe,yt.width,yt.height,st,yt.data):z.texSubImage2D(z.TEXTURE_2D,we,be,Qe,Oe,K,st,Tt,yt);M.pixelStorei(z.UNPACK_ROW_LENGTH,on),M.pixelStorei(z.UNPACK_IMAGE_HEIGHT,dt),M.pixelStorei(z.UNPACK_SKIP_PIXELS,yn),M.pixelStorei(z.UNPACK_SKIP_ROWS,tt),M.pixelStorei(z.UNPACK_SKIP_IMAGES,gi),we===0&&B.generateMipmaps&&z.generateMipmap(De),M.unbindTexture()},this.initRenderTarget=function(C){Y.get(C).__webglFramebuffer===void 0&&ne.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?ne.setTextureCube(C,0):C.isData3DTexture?ne.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?ne.setTexture2DArray(C,0):ne.setTexture2D(C,0),M.unbindTexture()},this.resetState=function(){L=0,D=0,V=null,M.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=wt._getDrawingBufferColorSpace(e),t.unpackColorSpace=wt._getUnpackColorSpace()}}const hn=r=>Math.min(1,Math.max(0,r)),Gn=(r,e,t)=>{const n=hn((t-r)/(e-r));return n*n*(3-2*n)},ar=(r,e,t)=>r+(e-r)*t,Jd={d:[{b:"abs",w:0,p:[0,8.5,28],t:[2,2.6,-20],f:40,s:1},{b:"hive",w:.7,p:[-2,4.5,18],t:[-4.2,.6,0],f:40,s:.3},{b:"hive",w:.15,p:[-4,8,28],t:[-5.8,2.2,0],f:40,s:.3},{b:"hive",w:0,p:[-3,5.5,22],t:[-6.5,1,0],f:40,s:.4},{b:"P",w:0,p:[4,2.4,12],t:[-1.5,5.5,-30],f:40,s:.35},{b:"abs",w:0,p:[2,66,28],t:[2,0,-11],f:40,s:.2},{b:"P",w:0,p:[2,4.4,10.5],t:[4.2,1.7,-1.5],f:40,s:.2},{b:"P",w:0,p:[-14.6,8,17],t:[-4.6,4,-18],f:40,s:.4},{b:"abs",w:0,p:[-2,15.5,32],t:[6,1.5,-24],f:46,s:.8}],m:[{b:"abs",w:0,p:[-3,9,17],t:[9.5,14.5,-20],f:60,s:1},{b:"hive",w:.7,p:[-2,3.2,13.5],t:[-.8,.2,0],f:58,s:.3,o:.1},{b:"hive",w:.1,p:[-1,15,44],t:[.5,0,-1],f:58,s:.3,o:.1},{b:"hive",w:0,p:[-1,2.8,17.5],t:[-1.6,1.6,0],f:58,s:.4,o:.1},{b:"P",w:0,p:[-2.5,3.6,13],t:[3,-1.6,-30],f:58,s:.35,o:.1},{b:"abs",w:0,p:[2.8,66,24],t:[2.8,0,-13],f:50,s:.2},{b:"P",w:0,p:[-3,6.5,13],t:[1,.6,-2],f:56,s:.2,o:.1},{b:"P",w:0,p:[-4,11,23],t:[3,-.5,-16],f:56,s:.4,o:.08},{b:"abs",w:0,p:[-2,17,36],t:[6,-2,-24],f:56,s:.8}]},Dy=[0,0,0],Ly=(r,e,t)=>{const n=r.b==="hive"?e.hive:r.b==="P"?e.P:Dy;return[0,1,2].map(i=>ar(n[i],t[i],r.w))},Qd=(r,e,t)=>{const n=Ly(r,e,t);return{p:[n[0]+r.p[0],n[1]+r.p[1],n[2]+r.p[2]],t:[n[0]+r.t[0],n[1]+r.t[1],n[2]+r.t[2]]}};function Iy(r,e,t,n){const i=e?Jd.m:Jd.d,s=Math.min(i.length-2,Math.max(0,Math.floor(r))),a=Gn(0,1,Math.min(1,Math.max(0,r-s))),o=i[s],l=i[s+1],c=Qd(o,t,n),u=Qd(l,t,n),d=(f,h)=>[ar(f[0],h[0],a),ar(f[1],h[1],a),ar(f[2],h[2],a)];return{p:d(c.p,u.p),t:d(c.t,u.t),f:ar(o.f,l.f,a),s:ar(o.s,l.s,a),o:ar(o.o??0,l.o??0,a)}}const m0=["chatgpt","claude","gemini","perplexity","google"],Uy={chatgpt:"ChatGPT",claude:"Claude",gemini:"Gemini",perplexity:"Perplexity",google:"Google AI"},Ny="What's the best invoicing tool for a small team?",jd="Been there. For five people we needed recurring invoices and automatic reminders. Your brand does both without setup, so we stopped chasing payments by hand.",Zr=[["r/smallbusiness","Best invoicing tool for a 5 person team?",214],["r/startups","Anyone switched off Notion for task tracking?",87],["r/SaaS","How do you track brand mentions in ChatGPT?",342],["r/Entrepreneur","What CRM do you actually pay for?",156],["r/marketing","Is anyone getting real leads from AI search?",121],["r/freelance","How do you chase late invoices politely?",268],["r/webdev","Cheapest hosting that will not fall over?",193],["r/ecommerce","Best email tool for a small Shopify store?",77],["r/sysadmin","VPN alternative for a 20 person team?",305],["r/accounting","Is there a simple bookkeeping app that just works?",112]],g0={chatgpt:{kind:"glyph",svg:`<svg width="256" height="256" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
<path d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z"></path>
</svg>`},claude:{kind:"app",svg:'<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 509.64"><path fill="#3b3b37" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"></path><path fill="#fafaf7" fill-rule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"></path></svg>'},gemini:{kind:"glyph",svg:'<svg width="256" height="256" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65"><mask id="maskme" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="65"><path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="#000"></path><path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="url(#prefix__paint0_linear_2001_67)"></path></mask><g mask="url(#maskme)"><g filter="url(#prefix__filter0_f_2001_67)"><path d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z" fill="#FFE432"></path></g><g filter="url(#prefix__filter1_f_2001_67)"><path d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z" fill="#FC413D"></path></g><g filter="url(#prefix__filter2_f_2001_67)"><path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"></path></g><g filter="url(#prefix__filter3_f_2001_67)"><path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"></path></g><g filter="url(#prefix__filter4_f_2001_67)"><path d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z" fill="#00B95C"></path></g><g filter="url(#prefix__filter5_f_2001_67)"><path d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z" fill="#3186FF"></path></g><g filter="url(#prefix__filter6_f_2001_67)"><path d="M-13.065 40.944c9.33 7.094 22.959 4.869 30.442-4.972 7.483-9.84 5.987-23.569-3.343-30.663C4.704-1.786-8.924.439-16.408 10.28c-7.483 9.84-5.986 23.57 3.343 30.664z" fill="#FBBC04"></path></g><g filter="url(#prefix__filter7_f_2001_67)"><path d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z" fill="#3186FF"></path></g><g filter="url(#prefix__filter8_f_2001_67)"><path d="M54.984-2.336c2.833 3.852-.808 11.34-8.131 16.727-7.324 5.387-15.557 6.631-18.39 2.78-2.833-3.853.807-11.342 8.13-16.728 7.324-5.387 15.558-6.631 18.39-2.78z" fill="#749BFF"></path></g><g filter="url(#prefix__filter9_f_2001_67)"><path d="M31.727 16.104C43.053 5.598 46.94-8.626 40.41-15.666c-6.53-7.04-21.006-4.232-32.332 6.274s-15.214 24.73-8.683 31.77c6.53 7.04 21.006 4.232 32.332-6.274z" fill="#FC413D"></path></g><g filter="url(#prefix__filter10_f_2001_67)"><path d="M8.51 53.838c6.732 4.818 14.46 5.55 17.262 1.636 2.802-3.915-.384-10.994-7.116-15.812-6.731-4.818-14.46-5.55-17.261-1.636-2.802 3.915.383 10.994 7.115 15.812z" fill="#FFEE48"></path></g></g><defs><filter id="prefix__filter0_f_2001_67" x="-19.824" y="13.152" width="39.274" height="43.217" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter1_f_2001_67" x="-15.001" y="-40.257" width="84.868" height="85.688" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter2_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter3_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter4_f_2001_67" x="-19.845" y="15.459" width="79.731" height="81.505" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter5_f_2001_67" x="29.832" y="-11.552" width="75.117" height="73.758" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter6_f_2001_67" x="-38.583" y="-16.253" width="78.135" height="78.758" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="8.706" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter7_f_2001_67" x="8.107" y="-5.966" width="78.877" height="77.539" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter8_f_2001_67" x="13.587" y="-18.488" width="56.272" height="51.81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="6.957" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter9_f_2001_67" x="-15.526" y="-31.297" width="70.856" height="69.306" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="5.876" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><filter id="prefix__filter10_f_2001_67" x="-14.168" y="20.964" width="55.501" height="51.571" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="7.273" result="effect1_foregroundBlur_2001_67"></feGaussianBlur></filter><linearGradient id="prefix__paint0_linear_2001_67" x1="18.447" y1="43.42" x2="52.153" y2="15.004" gradientUnits="userSpaceOnUse"><stop stop-color="#4893FC"></stop><stop offset=".27" stop-color="#4893FC"></stop><stop offset=".777" stop-color="#969DFF"></stop><stop offset="1" stop-color="#BD99FE"></stop></linearGradient></defs></svg>'},perplexity:{kind:"app",svg:'<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 509.64"><path fill="#3b3b37" d="M115.613 0h280.774C459.974 0 512 52.025 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.613C52.026 509.64 0 457.614 0 394.027V115.612C0 52.025 52.026 0 115.613 0z"></path><path fill="#fafaf7" fill-rule="nonzero" d="M348.851 128.063l-68.946 58.302h68.946v-58.302zm-83.908 48.709l100.931-85.349v94.942h32.244v143.421h-38.731v90.004l-94.442-86.662v83.946h-17.023v-83.906l-96.596 86.246v-89.628h-37.445V186.365h38.732V90.768l95.309 84.958v-83.16h17.023l-.002 84.206zm-29.209 26.616c-34.955.02-69.893 0-104.83 0v109.375h20.415v-27.121l84.415-82.254zm41.445 0l82.208 82.324v27.051h21.708V203.388c-34.617 0-69.274.02-103.916 0zm-42.874-17.023l-64.669-57.646v57.646h64.669zm13.617 124.076v-95.2l-79.573 77.516v88.731l79.573-71.047zm17.252-95.022v94.863l77.19 70.83c0-29.485-.012-58.943-.012-88.425l-77.178-77.268z"></path></svg>'},google:{kind:"glyph",svg:`<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
`},reddit:{kind:"line",svg:'<svg width="256" height="256" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3b3b37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="4.2" cy="11.8" r="2" fill="#fafaf7"/><circle cx="19.8" cy="11.8" r="2" fill="#fafaf7"/><ellipse cx="12" cy="14.4" rx="7.6" ry="5.6" fill="#fafaf7"/><path d="M12 8.8L13.5 3.8L17.4 4.8"/><circle cx="18.4" cy="5" r="1.5" fill="#fafaf7"/><circle cx="9" cy="13.8" r="1.2" fill="#3b3b37" stroke="none"/><circle cx="15" cy="13.8" r="1.2" fill="#3b3b37" stroke="none"/><path d="M9.1 16.9Q12 18.7 14.9 16.9"/></svg>'}},_0=r=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(r),Fy=r=>new Promise((e,t)=>{const n=new Image;n.onload=()=>e(n),n.onerror=t,n.src=r}),ff=(r,e)=>{const t=document.createElement("canvas");return t.width=r,t.height=e,t};async function Oy(r){const e=g0[r],t=256,n=ff(t,t),i=n.getContext("2d"),s=await Fy(_0(e.svg));if(i.fillStyle="#fafaf7",i.beginPath(),i.arc(t/2,t/2,t/2,0,Math.PI*2),i.fill(),i.fillStyle="#3b3b37",i.beginPath(),i.arc(t/2,t/2,t/2-12,0,Math.PI*2),i.fill(),e.kind==="app")i.save(),i.beginPath(),i.arc(t/2,t/2,t/2-12,0,Math.PI*2),i.clip(),i.drawImage(s,12,12,t-24,t-24),i.restore();else{const a=ff(t,t),o=a.getContext("2d"),l=t*.5;o.drawImage(s,(t-l)/2,(t-l)/2,l,l),o.globalCompositeOperation="source-in",o.fillStyle="#fafaf7",o.fillRect(0,0,t,t),i.drawImage(a,0,0)}return n}function By(){const r=ff(160,160),e=r.getContext("2d");e.lineJoin="round",e.lineCap="round",e.beginPath(),e.moveTo(40,26),e.arcTo(136,26,136,96,26),e.arcTo(136,96,24,96,26),e.lineTo(62,96),e.lineTo(38,130),e.lineTo(42,96),e.arcTo(24,96,24,26,26),e.arcTo(24,26,136,26,26),e.closePath(),e.fillStyle="#fafaf7",e.fill(),e.strokeStyle="#3b3b37",e.lineWidth=7,e.stroke(),e.fillStyle="#3b3b37";for(const t of[56,80,104])e.beginPath(),e.arc(t,61,7.5,0,Math.PI*2),e.fill();return r}const nh=`
  uniform float uTime, uOutlinePx, uPx, uSwayAmt;
  uniform vec2 uRes;
  vec3 swayOff(vec2 b, float amp, float t01) {
    float ph  = uTime * 1.15 + b.x * 0.31 + b.y * 0.23;
    float ph2 = uTime * 0.70 + b.x * 0.11 - b.y * 0.19;
    vec2 d = vec2(sin(ph) + 0.5 * sin(ph2 * 2.3), cos(ph * 0.87) + 0.5 * cos(ph2 * 1.9));
    return vec3(d.x, 0.0, d.y) * amp * t01 * t01;
  }
  vec4 outlineClip(vec4 wp, vec3 nW) {
    vec4 mv = viewMatrix * wp;
    vec4 clip = projectionMatrix * mv;
    vec3 nv = normalize(mat3(viewMatrix) * nW);
    vec2 nd = (projectionMatrix * vec4(nv, 0.0)).xy;
    nd = nd / max(length(nd), 1e-4);
    float far = smoothstep(12.0, 110.0, -mv.z);
    float px = uOutlinePx * mix(1.0, 0.4, far);
    clip.xy += nd * (px * uPx * 2.0 / uRes) * clip.w;
    return clip;
  }
`,Hr=`
  uniform float uTime, uPx, uHatch, uSoft, uFogNear, uFogFar;
  uniform vec3 uPaper, uPaperShade, uInk, uInk2, uAmber, uLight;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float lineMask(float x, float w) {
    float f = abs(fract(x + 0.5) - 0.5);
    float aa = fwidth(x) * 0.5;
    return 1.0 - smoothstep(w * 0.5 - aa, w * 0.5 + aa, f);
  }
  float hatchCoverage(float shade) {
    vec2 p = gl_FragCoord.xy / uPx;
    float period = 7.0;
    float l1 = lineMask((p.x + p.y) / period, 0.2);
    float l2 = lineMask((p.x - p.y) / period, 0.17);
    float c1 = 1.0 - smoothstep(0.50, 0.62, shade);
    float c2 = 1.0 - smoothstep(0.26, 0.40, shade);
    return clamp(l1 * c1 + l2 * c2, 0.0, 1.0) * 0.55 * uHatch;
  }
  float toonBand(float lit) { return mix(floor(lit * 3.0 + 0.5) / 3.0, lit, uSoft); }
  vec3 fogMix(vec3 c, float dist) { return mix(c, uPaper, smoothstep(uFogNear, uFogFar, dist)); }
`,zy=`
  varying vec3 vW; varying vec3 vN;
  void main() { vW = position; vN = normal; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }
`,ky=`
  ${Hr}
  varying vec3 vW; varying vec3 vN;
  void main() {
    vec3 N = normalize(vN);
    float lit = dot(N, normalize(uLight)) * 0.5 + 0.5;
    float n = vnoise(vW.xz * 0.05) * 0.62 + vnoise(vW.xz * 0.14 + 7.0) * 0.38;
    lit -= smoothstep(0.50, 0.68, n) * 0.6;
    float band = toonBand(lit);
    vec3 c = mix(uPaperShade, uPaper, band);
    c = mix(c, uInk, hatchCoverage(band));
    gl_FragColor = vec4(fogMix(c, distance(vW, cameraPosition)), 1.0);
  }
`,Gy=`
  ${nh}
  attribute float aH; attribute float aW; attribute float aSeed;
  varying float vY; varying float vSeed; varying vec3 vW;
  void main() {
    vec3 p = position;
    p.x *= aW;
    p.y *= aH;
    p.z += position.y * position.y * aH * 0.32 * (0.4 + aSeed);
    vec4 wp = modelMatrix * instanceMatrix * vec4(p, 1.0);
    wp.xyz += swayOff(instanceMatrix[3].xz, aH * 0.3, position.y);
    vY = position.y; vSeed = aSeed; vW = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,Hy=`
  ${Hr}
  uniform vec2 uRes; uniform float uPortrait, uClearMode;
  varying float vY; varying float vSeed; varying vec3 vW;
  void main() {
    vec2 sp = gl_FragCoord.xy / uRes;
    float clearing = uPortrait > 0.5 ? mix(smoothstep(0.34, 0.86, sp.y), smoothstep(0.50, 0.08, sp.y), uClearMode) : smoothstep(0.62, 0.08, sp.x);
    if (vSeed < clearing * 0.94) discard;
    vec3 c = mix(uInk, uInk2, vSeed * 0.45 + vY * 0.5);
    c = mix(c, uPaperShade * 0.72, uSoft * 0.6);
    gl_FragColor = vec4(fogMix(c, distance(vW, cameraPosition)), 1.0);
  }
`,or=`
  ${nh}
  attribute float aH; attribute float aCited; attribute float aSeed; attribute float aPart;
  varying vec3 vN; varying vec3 vW; varying vec3 vObj; varying vec2 vUv;
  varying float vCited; varying float vSeed; varying float vPart;
  void main() {
    vec3 base = instanceMatrix[3].xyz;
    vec3 p = position;
    #ifdef STEM
      p.y *= aH;
      vec4 wp = modelMatrix * instanceMatrix * vec4(p, 1.0);
      wp.xyz += swayOff(base.xz, aH * uSwayAmt, position.y);
    #else
      vec4 wp = modelMatrix * instanceMatrix * vec4(p, 1.0);
      wp.xyz += swayOff(base.xz, aH * uSwayAmt, 1.0);
    #endif
    vec3 nW = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
    vW = wp.xyz; vN = nW; vObj = position; vUv = uv;
    vCited = aCited; vSeed = aSeed; vPart = aPart;
    #ifdef OUTLINE
      gl_Position = outlineClip(wp, nW);
    #else
      gl_Position = projectionMatrix * viewMatrix * wp;
    #endif
  }
`,Js=`
  ${nh}
  varying vec3 vN; varying vec3 vW; varying vec3 vObj; varying vec2 vUv;
  varying float vCited; varying float vSeed; varying float vPart;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vec3 nW = normalize(mat3(modelMatrix) * normal);
    vW = wp.xyz; vN = nW; vObj = position; vUv = uv;
    vCited = 0.0; vSeed = 0.0; vPart = 0.0;
    #ifdef OUTLINE
      gl_Position = outlineClip(wp, nW);
    #else
      gl_Position = projectionMatrix * viewMatrix * wp;
    #endif
  }
`,v0=`
  ${Hr}
  varying vec3 vW;
  void main() { gl_FragColor = vec4(fogMix(uInk, distance(vW, cameraPosition)), 1.0); }
`,hf=`
  ${Hr}
  varying vec3 vW;
  void main() { vec3 c = mix(mix(uInk, uInk2, 0.25), uPaperShade * 0.7, uSoft * 0.6); gl_FragColor = vec4(fogMix(c, distance(vW, cameraPosition)), 1.0); }
`,oa=`
  ${Hr}
  varying vec3 vN; varying vec3 vW; varying vec3 vObj; varying vec2 vUv;
  varying float vCited; varying float vSeed; varying float vPart;
  void main() {
    vec3 N = normalize(vN);
    if (!gl_FrontFacing) N = -N;
    float lit = dot(N, normalize(uLight)) * 0.5 + 0.5;
    vec3 baseC = uPaper;
    vec3 shadeC = uPaperShade;
    #if KIND == 0
      baseC = mix(uPaper, mix(uInk, uAmber, vCited), vPart);
      shadeC = mix(uPaperShade, mix(uInk, uAmber * 0.7, vCited), vPart);
    #elif KIND == 1
      baseC = uAmber; shadeC = uAmber * 0.62;
    #endif
    float band = toonBand(lit);
    vec3 c = mix(shadeC, baseC, band);
    #if KIND == 3
      c = mix(uPaper, uPaperShade, (1.0 - lit) * 0.3);
      c = mix(c, uInk, smoothstep(0.84, 0.94, length(vUv - 0.5) * 2.0));
    #else
      c = mix(c, uInk, hatchCoverage(band));
    #endif
    #if KIND == 1
      float stripe = smoothstep(0.05, 0.22, sin(vObj.z * 21.0 + 0.5)) * step(-0.43, vObj.z) * step(vObj.z, 0.29);
      float head = smoothstep(0.30, 0.34, vObj.z);
      float tail = smoothstep(-0.42, -0.46, vObj.z);
      c = mix(c, uInk, max(max(stripe, head), tail));
    #elif KIND == 2
      float ang = atan(vObj.x, vObj.z) / 6.2831853;
      float coil = lineMask(vObj.y * 6.5 + ang * 0.7, 0.07);
      c = mix(c, uInk, coil * 0.7 * (1.0 - uSoft * 0.5));
      vec2 q = vObj.xy;
      float e = (q.x * q.x) / 0.0676 + (q.y * q.y) / 0.16;
      float door = (1.0 - smoothstep(0.92, 1.0, e)) * step(-0.02, q.y) * step(0.3, vObj.z);
      c = mix(c, uInk, door);
    #elif KIND == 4
      c = mix(c, uInk2, 1.0 - smoothstep(0.10, 0.2, vObj.y));
    #endif
    gl_FragColor = vec4(fogMix(c, distance(vW, cameraPosition)), 1.0);
  }
`,ep=`
  uniform float uPointScale;
  attribute float aA; attribute float aS;
  varying float vA;
  void main() {
    vA = aA;
    vec4 mv = viewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(1.5, aS * uPointScale / -mv.z);
  }
`,Vy=`
  uniform vec3 uAmber;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.36, d) * vA;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uAmber, a);
  }
`,$c=`
  varying vec3 vObj; varying vec3 vW;
  void main() {
    vObj = position; vec4 wp = modelMatrix * vec4(position, 1.0); vW = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,tp=`
  ${Hr}
  varying vec3 vObj; varying vec3 vW;
  void main() {
    float ang = atan(vObj.z, vObj.x) / 6.2831853;
    float dash = fract(ang * 14.0 + uTime * 0.04);
    if (dash > 0.58) discard;
    gl_FragColor = vec4(fogMix(uAmber, distance(vW, cameraPosition)), 1.0);
  }
`,Wy=`
  varying vec3 vObj; varying vec3 vW;
  void main() { vObj = position; vec4 wp = modelMatrix * vec4(position, 1.0); vW = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }
`,Xy=`
  ${Hr}
  uniform float uPlot, uPrep, uCited;
  varying vec3 vObj; varying vec3 vW;
  const vec3 LOGO = vec3(0.847, 0.251, 0.125);
  void main() {
    float r = length(vObj.xz) / 2.15;
    if (r > 1.0) discard;
    float ang = atan(vObj.z, vObj.x) / 6.2831853;
    float ring = smoothstep(0.945, 0.96, r);
    float dash = step(fract(ang * 16.0 + uTime * 0.03), 0.62);
    vec3 c = mix(uPaperShade, uPaper, 0.25 * (1.0 - r));
    c = mix(c, uInk, hatchCoverage(0.56));
    float f = lineMask(vObj.z * 1.7, 0.15) * step(vObj.x, mix(-2.1, 2.1, uPrep)) * step(-2.1, vObj.x) * step(r, 0.84);
    c = mix(c, uInk, f * 0.8);
    float rc = ring * dash;
    c = mix(c, mix(LOGO, uAmber, uCited), rc);
    gl_FragColor = vec4(fogMix(c, distance(vW, cameraPosition)), uPlot * (ring > 0.5 ? dash : 1.0));
  }
`,Yy=`
  ${Hr}
  uniform float uScanA;
  varying vec3 vObj; varying vec3 vW;
  void main() {
    float ang = atan(vObj.z, vObj.x) / 6.2831853;
    if (fract(ang * 110.0) > 0.55) discard;
    gl_FragColor = vec4(uInk, uScanA);
  }
`,qy=`
  uniform vec3 uInk;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.36, d) * vA;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uInk, a);
  }
`;async function $y(r,e){const{scene:t,camera:n,U:i,small:s,still:a,mat:o,hullOf:l,hulls:c,instanced:u,withHull:d,dummy:f,rng:h,hAt:g,HX:_,HZ:m,cited:p,Fs:S,P:b,hive:x,stemGeo:y,daisyGeo:E}=r;let w=0;const v=new H,T=new H,A=(K,ie,he)=>new H(K,ie,he),U=(K,ie)=>K.clone().add(A(0,ie,0)),I=(K,ie,he)=>U(K.clone().lerp(ie,.5),he),G=4.6,F={},X={};let L=null;try{for(const K of m0){const ie=await Oy(K),he=new Md(ie);he.colorSpace=Kn,he.anisotropy=4,F[K]=he,X[K]=ie.toDataURL()}L=new Md(By()),L.colorSpace=Kn}catch(K){console.warn("logo textures unavailable",K)}const D=x.localToWorld(A(0,.5,1.5));D.clone();const V=x.localToWorld(A(0,1.8,0)),W=A(_,g(_,m)+3.4,m),R=A(b.x,b.y,b.z),Q=K=>A(K.x,K.y+K.H+.9,K.z),Se=(K,ie)=>Math.hypot(K.x-ie.x,K.z-ie.z),Re=[];if(L){for(let K=0;K<8;K++){const ie=new fd(new af({map:L,transparent:!0,depthWrite:!1,opacity:0}));t.add(ie),Re.push({sp:ie,t0:-99})}for(let K=0;K<3;K++)Re[K].t0=14-.7-K*1.5}let Ue=3;const Me=()=>{Re.length&&e.crowd>.6&&(Re[Ue++%Re.length].t0=w)},Ve=p.filter(K=>K!==S).sort((K,ie)=>Se(K,W)-Se(ie,W)).slice(0,3),J=(()=>{let K=null;for(const ie of[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]){const he=ie.map(Ne=>Ve[Ne]),Ae=Se(D,he[0])+Se(he[0],he[1])+Se(he[1],he[2])+Se(he[2],D);(!K||Ae<K.L)&&(K={L:Ae,o:he})}return K.o})(),[ae,Ee,Ye]=J.map(Q),xe=[];{const K=h(29),ie=p.filter(Ae=>Ae!==S&&!J.includes(Ae)).map(Ae=>{const Ne=K()*6.283,be=1.9+K()*.7,Qe=Ae.x+Math.cos(Ne)*be,Et=Ae.z+Math.sin(Ne)*be;return{x:Qe,z:Et,y:g(Qe,Et),H:2.6+K()*1.8,tilt:.35+K()*.5,yaw:K()*6.283}});let he={x:D.x,z:D.z};for(;xe.length<6&&ie.length;){ie.sort((Ne,be)=>Se(Ne,he)-Se(be,he));const Ae=ie.shift();xe.push(Ae),he=Ae}}const Be=K=>new Ed(K,!1,"catmullrom",.5),We=U(R,3.6),Fe=A(b.x,b.y+G+.9,b.z),$e=Be([A(-9,7,23),A(-3.5,8.6,11),A(2.5,9.8,-1),D.clone().add(A(-2.5,.9,7)),D.clone().add(A(-.9,.35,3)),D.clone()]),ot=Be([D.clone(),I(D,ae,3.4),ae,I(ae,Ee,2.4),Ee,I(Ee,Ye,2.4),Ye,I(Ye,D,3.4),D.clone()]),q=Be([D.clone(),I(D,We,4.5),We.clone().add(A(2.4,.3,-1.6)),We.clone().add(A(.4,.2,2.4)),We.clone().add(A(-2.2,.8,.4)),R.clone().add(A(6,9,-5))]),it=Be([R.clone().add(A(5,22,-7)),R.clone().add(A(2.5,12,-2)),R.clone().add(A(.9,6.4,1)),R.clone().add(A(0,3.4,0))]),Lt=Be([R.clone().add(A(0,3.4,0)),R.clone().add(A(-3,5.5,-2)),R.clone().add(A(-9,11,-6))]),Ot=Be([R.clone().add(A(-10,6,13)),R.clone().add(A(-4.5,7.4,6)),Fe.clone(),I(Fe,D,4),D.clone()]),Ke=[D.clone()];xe.forEach((K,ie)=>{const he=A(K.x,K.y+3,K.z);Ke.push(I(ie?A(xe[ie-1].x,xe[ie-1].y+3,xe[ie-1].z):D,he,3.2),he)});const bt=xe[xe.length-1];Ke.push(A(bt.x+8,bt.y+9,bt.z-4));const z=Be(Ke),Nt=xe.map((K,ie)=>(2+2*ie)/(Ke.length-1)),Xe=[["f1",$e],["f2",ot],["f3",q],["f4",it],["f4x",Lt],["f5",Ot],["f6",z]];let P=0,M=0;const O=A(-9,7,23),Y=A(1,0,-1),ne=A(-9,7,23);function ve(){let K=0;for(let ie=0;ie<Xe.length;ie++)e[Xe[ie][0]]>1e-4&&(K=ie);M=hn(e[Xe[K][0]]),P=K,Xe[K][1].getPoint(M,O),Xe[K][1].getTangent(M,Y)}const _e={uPlot:{value:0},uPrep:{value:0},uCited:{value:0}},oe=(()=>{const K=new xa(4.6,4.6,26,26);K.rotateX(-Math.PI/2);const ie=K.attributes.position;for(let Ae=0;Ae<ie.count;Ae++)ie.setY(Ae,g(b.x+ie.getX(Ae),b.z+ie.getZ(Ae))-b.y+.07);const he=new Jt(K,o(Wy,Xy,{transparent:!0,depthWrite:!1,side:Yn,uniforms:_e}));return he.material.polygonOffset=!0,he.material.polygonOffsetFactor=-2,he.material.polygonOffsetUnits=-2,he.position.set(b.x,b.y,b.z),he.frustumCulled=!1,he.renderOrder=1,he.visible=!1,t.add(he),he})();function le(K){const ie={uSwayAmt:{value:.07}},he=()=>new Float32Array(K),Ae=u(y.clone(),o(or,hf,{defines:{STEM:1},uniforms:ie}),K,{aH:he(),aCited:he(),aSeed:he(),aPart:he()}),Ne=u(E.clone(),o(or,oa,{defines:{KIND:0},uniforms:{...ie}}),K,{aH:he(),aCited:he(),aSeed:Float32Array.from({length:K},(st,Tt)=>Tt*.37%1)});t.add(Ae),d(Ne,or,{KIND:0},{...ie});const be=c[c.length-1],Qe=Ae.geometry.attributes.aH,Et=Ne.geometry.attributes.aH,yt=Ne.geometry.attributes.aCited;return{set(st,Tt,De,on,dt,yn,tt,gi,Fi){const te=Math.max(.001,dt*yn);Qe.array[st]=te,Et.array[st]=te,yt.array[st]=tt,f.position.set(Tt,De-.05,on),f.rotation.set(0,0,0),f.scale.set(1,1,1),f.updateMatrix(),Ae.setMatrixAt(st,f.matrix);const at=Math.max(1e-4,(.24+.05*dt)*1.4*yn);f.position.set(Tt,De-.05+te,on),f.rotation.set(gi,Fi,0,"YXZ"),f.scale.setScalar(at),f.updateMatrix(),Ne.setMatrixAt(st,f.matrix)},flush(){Ae.instanceMatrix.needsUpdate=!0,Ne.instanceMatrix.needsUpdate=!0,Qe.needsUpdate=!0,Et.needsUpdate=!0,yt.needsUpdate=!0},show(st){Ae.visible=st,Ne.visible=st,be.visible=st}}}const k=le(1);k.show(!1);const se={x:b.x,y:b.y,z:b.z,H:.1},ee=(()=>{const K=new fs(.19,12,9);K.scale(.85,1.35,.85);const ie=new Jt(K,o(Js,v0));return ie.visible=!1,t.add(ie),ie})(),fe=le(xe.length);fe.show(!1);const ue=xe.map(K=>{const ie=new Jt(new ro(.86,1,56).rotateX(-Math.PI/2),o($c,tp,{side:Yn}));return ie.position.set(K.x,K.y+.06,K.z),ie.scale.setScalar(.001),ie.frustumCulled=!1,ie.visible=!1,t.add(ie),ie}),Ce=new fs(.5,22,16);Ce.scale(.72,.68,1);const Pe=new Zf(.5,24);Pe.rotateX(-Math.PI/2),Pe.scale(1,1,.55),Pe.translate(.5,0,0),Pe.scale(.85,1,.85);const N=Pe.clone();N.scale(-1,1,1);const me=o(Js,oa,{defines:{KIND:1}}),re=o(Js,oa,{defines:{KIND:3},side:Yn}),ye=l(Js,{});function Te(K,ie,he,Ae){const Ne=new Ks,be=new Jt(Ce,me),Qe=new Jt(Ce,ye);c.push(Qe);const Et=new Jt(N,re),yt=new Jt(Pe,re);Et.position.set(-.1,.27,.05),yt.position.set(.1,.27,.05),Ne.add(be,Qe,Et,yt),Ne.scale.setScalar(K),t.add(Ne);let st=null;const Tt=F[ie];return Tt&&(st=new fd(new af({map:Tt,transparent:!0,depthWrite:!1})),st.scale.setScalar(he),t.add(st)),{grp:Ne,wl:Et,wr:yt,badge:st,bs:he,sc:K,lift:Ae,engine:ie}}const ce=Te(2.3,"chatgpt",2.1,2.3);ce.grp.visible=!1,ce.badge&&(ce.badge.visible=!1);const ge=[],de=["chatgpt","claude","gemini","perplexity","google","chatgpt"],ze=new Map;{const K=p.length;for(let ie=0;ie<6;ie++){const he=[ie%K,(ie+3)%K,(ie+6)%K];he.forEach(Tt=>{const De=ze.get(p[Tt])||new Set;De.add(de[ie]),ze.set(p[Tt],De)});const[Ae,Ne,be]=he.map(Tt=>Q(p[Tt])),Qe=Tt=>{const De=[U(D,.3*ie),U(D.clone().lerp(Tt,.5),3.2),Tt,U(Tt.clone().lerp(Ne,.5),2.2+ie%3),Ne,U(Ne.clone().lerp(be,.5),2.2+(ie+1)%3),be];return ie===0?De.push(A(6.5,5.8,12.5),A(10,7,0)):De.push(U(be.clone().lerp(D,.5),3)),new Ed(De,!0,"catmullrom",.5)},Et=Qe(Ae),yt=ie<3?Qe(Fe):null,st=Te(ie===0?2.1:1.6,de[ie],ie===0?1.8:1.3,ie===0?1.95:1.45);ge.push({...st,curve:Et,curveB:yt,len:Et.getLength(),u:(ie/6+.05)%1,speed:3.6+ie*.5,phase:ie*1.7,load:0,visit:{},dropCool:0})}}const pe=[];{const K=new ro(.86,1,72);K.rotateX(-Math.PI/2);const ie=o($c,tp,{side:Yn});for(const he of p){const Ae=new Jt(K,ie);Ae.position.set(he.x,he.y+.06,he.z),Ae.scale.setScalar(1.9),Ae.frustumCulled=!1,t.add(Ae),pe.push(Ae)}}const He={uScanA:{value:0}},Le=new Jt(new ro(.992,1,220).rotateX(-Math.PI/2),o($c,Yy,{side:Yn,transparent:!0,depthWrite:!1,depthTest:!1,uniforms:He}));Le.position.set(_,g(_,m)+.3,m),Le.frustumCulled=!1,Le.renderOrder=2,Le.visible=!1,t.add(Le);const Je=44,Ut=7,Ze=3,ht=72,qt=34,Ct=ge.length*(Je+Ze)+p.length*Ut+ht+qt+Ze,et=new Float32Array(Ct*3),rt=new Float32Array(Ct),Ht=new Float32Array(Ct),ke=new an;ke.setAttribute("position",new xn(et,3).setUsage(Oo)),ke.setAttribute("aA",new xn(rt,1).setUsage(Oo)),ke.setAttribute("aS",new xn(Ht,1).setUsage(Oo));const mt=new xd(ke,o(ep,Vy,{transparent:!0,depthWrite:!1}));mt.frustumCulled=!1,t.add(mt);const qe={x:new Float32Array(ht),y:new Float32Array(ht),z:new Float32Array(ht),vx:new Float32Array(ht),vy:new Float32Array(ht),vz:new Float32Array(ht),life:new Float32Array(ht)};let Rt=0;function Pt(K,ie,he){for(let Ae=0;Ae<14;Ae++){const Ne=Rt++%ht,be=Math.random()*6.283,Qe=.8+Math.random()*1.6;qe.x[Ne]=K,qe.y[Ne]=ie,qe.z[Ne]=he,qe.vx[Ne]=Math.cos(be)*Qe,qe.vz[Ne]=Math.sin(be)*Qe,qe.vy[Ne]=.8+Math.random()*1.6,qe.life[Ne]=.7+Math.random()*.5}}const ft=120,en=new Float32Array(ge.length*ft*3),ni=new Float32Array(ge.length*ft),Kt=new Float32Array(ge.length*ft).fill(.17);ge.forEach((K,ie)=>{for(let he=0;he<ft;he++){K.curve.getPoint(he/ft,v);const Ae=(ie*ft+he)*3;en[Ae]=v.x,en[Ae+1]=v.y-.3,en[Ae+2]=v.z}});const Vt=new an;Vt.setAttribute("position",new xn(en,3)),Vt.setAttribute("aA",new xn(ni,1).setUsage(Oo)),Vt.setAttribute("aS",new xn(Kt,1));const Mn=new xd(Vt,o(ep,qy,{transparent:!0,depthWrite:!1}));Mn.frustumCulled=!1,Mn.visible=!1,t.add(Mn);let Qi=-1;const C=()=>2.3*e.sprout+(G-2.3)*e.grow;let B=0,j=0;const Z=[0,0,0],$=new H;function we(K,ie,he){w=he,i.uTime.value=w;const Ae=e.season/3;i.uLight.value.set(ar(-.55,.55,Ae),.78-.24*Math.sin(Math.PI*Ae),.42).normalize(),i.uClearMode.value=hn(e.cam*2),ve(),O.y+=Math.sin(w*5)*.1,ne.lerp(O,ie?1:1-Math.exp(-K*4.5));const Ne=e.lead,be=Ne>.02;if(ce.grp.visible=be,ce.badge&&(ce.badge.visible=be),be){ce.grp.position.copy(O),ce.grp.scale.setScalar(ce.sc*(s?.75:1)*Gn(0,1,Ne)),ce.grp.lookAt(O.x+Y.x,O.y+Y.y*.35,O.z+Y.z);const te=.2+.65*Math.abs(Math.sin(w*26));ce.wr.rotation.z=te,ce.wl.rotation.z=-te,ce.badge&&(ce.badge.position.set(O.x,O.y+ce.lift*Ne,O.z),ce.badge.scale.setScalar(ce.bs*(s?.8:1)*Ne*Math.min(1,Math.max(.6,n.position.distanceTo(O)/30))))}let Qe=0;P===1&&(Qe=(M>=.25?1:0)+(M>=.5?1:0)+(M>=.75?1:0)),P===5&&(Qe=M>=.5?1:0);const Et=(P===1||P===5)&&M>.985;Et&&(Qe=0),!a&&be&&Qe>B&&P===j&&Pt(O.x,O.y-.6,O.z),!a&&be&&Et&&B>0&&Pt(D.x,D.y+.3,D.z),B=Qe,j=P,_e.uPlot.value=e.plot,_e.uPrep.value=e.prep,_e.uCited.value=e.bloom,oe.visible=e.plot>.01;const yt=P===3&&be&&e.seed<.01;ee.visible=(yt||e.seed>.01)&&e.sprout<.02,yt?ee.position.set(O.x,O.y-.95,O.z):ee.visible&&ee.position.set(b.x+.05,b.y+.16+(1-Gn(0,1,e.seed))*2.45,b.z);const st=C();k.show(e.sprout>.01),e.sprout>.01&&(k.set(0,b.x,b.y,b.z,st,1,e.bloom,.3,.6),k.flush()),se.H=st;const Tt=e.f6>.001;fe.show(Tt),Tt?(xe.forEach((te,at)=>{const nt=Gn(Nt[at],Nt[at]+.05,e.f6);fe.set(at,te.x,te.y,te.z,te.H,nt,1,te.tilt,te.yaw),ue[at].visible=nt>.01,ue[at].scale.setScalar(Math.max(.001,2*nt))}),fe.flush()):ue.forEach(te=>{te.visible=!1});const De=e.map>.01;if(Mn.visible=De,De&&Math.abs(Qi-e.trace)>.002){Qi=e.trace;for(let te=0;te<ge.length;te++){const at=hn(e.trace-Math.min(te,4));for(let nt=0;nt<ft;nt++)ni[te*ft+nt]=hn((at-nt/ft)*14)*.85}Vt.attributes.aA.needsUpdate=!0}const on=2+e.trace/5*52;Le.visible=De&&e.trace>.02&&e.trace<4.98,Le.scale.setScalar(on),He.uScanA.value=.55*(1-Gn(4.2,4.98,e.trace));const dt=Gn(0,1,e.rings);pe.forEach((te,at)=>{te.visible=dt>.01,te.scale.setScalar((1.9+e.map*.28*Math.sin(w*2.2+at))*dt)}),J.forEach((te,at)=>{const nt=Math.hypot(O.x-te.x,O.y-(te.y+te.H+.9),O.z-te.z),gt=P===1&&be?Gn(8,3.2,nt):0;Z[at]=gt;const vt=pe[p.indexOf(te)];gt>.02&&(vt.visible=!0,vt.scale.setScalar(Math.max(vt.scale.x,1.9*Gn(0,.8,gt))))});const yn=Math.ceil(hn(e.crowd)*ge.length-1e-6);let tt=0;ge.forEach((te,at)=>{const nt=at<yn;if(te.grp.visible=nt,te.badge&&(te.badge.visible=nt),!nt){for(let vt=0;vt<Je+Ze;vt++,tt++)rt[tt]=0;return}if(te.u=(te.u+K*te.speed/te.len)%1,te.curve.getPoint(te.u,v),te.curve.getTangent(te.u,T),te.curveB&&e.route>.001){const vt=new H;te.curveB.getPoint(te.u,vt),v.lerp(vt,e.route),te.curveB.getTangent(te.u,vt),T.lerp(vt,e.route)}te.grp.position.copy(v),te.grp.position.y+=Math.sin(w*6+te.phase)*.09,te.badge&&(te.badge.position.set(v.x,te.grp.position.y+te.lift*(1+e.map*.5),v.z),te.badge.scale.setScalar(te.bs*(1+e.map*.9)*Math.min(1,Math.max(.7,n.position.distanceTo(te.grp.position)/34)))),te.grp.lookAt(v.x+T.x,te.grp.position.y+T.y,v.z+T.z);const gt=.2+.65*Math.abs(Math.sin(w*26+te.phase));te.wr.rotation.z=gt,te.wl.rotation.z=-gt;for(let vt=0;vt<Je;vt++,tt++){const Fn=(te.u-(vt+1)*.32/te.len+1)%1;te.curve.getPoint(Fn,v),et[tt*3]=v.x,et[tt*3+1]=v.y,et[tt*3+2]=v.z;const _r=vt/Je;rt[tt]=(1-_r)*.98*(1-e.map*.6),Ht[tt]=.27*(1-.6*_r)}for(let vt=0;vt<Ze;vt++,tt++){const Fn=te.grp.position;et[tt*3]=Fn.x+(vt-1)*.2*te.sc,et[tt*3+1]=Fn.y-.42*te.sc+Math.sin(w*9+vt)*.03,et[tt*3+2]=Fn.z+(vt%2-.5)*.18*te.sc,rt[tt]=te.load>vt?1:0,Ht[tt]=.2}}),p.forEach((te,at)=>{for(let nt=0;nt<Ut;nt++,tt++){const gt=w*.6+nt*.9+at*1.3,vt=.5+.35*Math.sin(w*.9+nt*2.1);et[tt*3]=te.x+Math.cos(gt)*vt,et[tt*3+1]=te.y+te.H+.55+Math.sin(w*1.1+nt)*.35+nt*.06,et[tt*3+2]=te.z+Math.sin(gt)*vt,rt[tt]=.95*dt,Ht[tt]=.15}});for(let te=0;te<ht;te++,tt++){qe.life[te]>0&&(qe.life[te]-=K*1.1,qe.x[te]+=qe.vx[te]*K,qe.y[te]+=qe.vy[te]*K,qe.z[te]+=qe.vz[te]*K,qe.vy[te]-=1.6*K);const at=Math.max(0,qe.life[te]);et[tt*3]=qe.x[te],et[tt*3+1]=qe.y[te],et[tt*3+2]=qe.z[te],rt[tt]=at,Ht[tt]=.06+.12*at}const gi=Xe[P][1];for(let te=0;te<qt;te++,tt++){const at=Math.max(0,M-(te+1)*.011);gi.getPoint(at,$),et[tt*3]=$.x,et[tt*3+1]=$.y,et[tt*3+2]=$.z;const nt=te/qt;rt[tt]=be?(1-nt)*.95*Gn(0,1,Ne)*(1-e.map):0,Ht[tt]=.3*(1-.6*nt)}for(let te=0;te<Ze;te++,tt++)et[tt*3]=O.x+(te-1)*.3,et[tt*3+1]=O.y-.95+Math.sin(w*9+te)*.04,et[tt*3+2]=O.z+(te%2-.5)*.26,rt[tt]=be&&Qe>te?1:0,Ht[tt]=.24;ke.attributes.position.needsUpdate=!0,ke.attributes.aA.needsUpdate=!0,ke.attributes.aS.needsUpdate=!0;const Fi=Gn(.5,1,e.crowd);Re.forEach((te,at)=>{const nt=(w-te.t0)/6.5;if(nt<0||nt>1){te.sp.material.opacity=0;return}te.sp.position.set(V.x+Math.sin(nt*5+at*1.7)*.7+nt*1.8,V.y+.5+nt*4.6,V.z+Math.cos(at*2.1)*.5+nt*.8),te.sp.scale.setScalar(.9+1*Math.min(1,nt*3.5)),te.sp.material.opacity=Gn(0,.1,nt)*(1-Gn(.62,1,nt))*.92*Fi}),a||ge.forEach((te,at)=>{if(!te.grp.visible)return;const nt=te.grp.position,gt=(Ai,yo)=>{if(w<(te.visit[yo]||0))return!1;const ih=nt.x-Ai.x,rh=nt.y-(Ai.y+Ai.H+.9),sh=nt.z-Ai.z;return ih*ih+rh*rh+sh*sh>2.2?!1:(te.visit[yo]=w+6,te.load=Math.min(Ze,te.load+1),Pt(Ai.x,Ai.y+Ai.H+.7,Ai.z),!0)};p.forEach((Ai,yo)=>{gt(Ai,yo)&&Oe.onCollect?.(Ai,te.engine,w)}),te.curveB&&e.route>.6&&gt(se,99)&&Oe.onYoursCollect?.(te.engine,w);const vt=nt.x-D.x,Fn=nt.y-D.y,_r=nt.z-D.z;te.load>0&&w>te.dropCool&&vt*vt+Fn*Fn+_r*_r<7&&(te.load=0,te.dropCool=w+4,Me())})}const Oe={};return{badgeUrl:X,hooks:Oe,visitAmt:Z,curves:Xe.map(K=>K[1]),data:{bees:ge,lead:ce,TT:J,patches:xe,engOf:ze,rings:pe,hiveTop:V,HE:D,hiveC:W,Pv:R,yf:se},lead:()=>({k:P,u:M,pos:O,tan:Y,sm:ne}),update:we}}function Ky(r,e,t,n){const{camera:i,small:s,still:a,cited:o,Fs:l,P:c}=r,{engOf:u,TT:d,hiveTop:f,yf:h,lead:g}=e.data,{badgeUrl:_,visitAmt:m}=e,p=n;let S=1,b=1;const x=72,y=document.getElementById("sun"),E=document.getElementById("tags"),w=_0(g0.reddit.svg.replace(/#3b3b37/g,"#ffffff").replace(/#fafaf7/g,"none")),v="/images/reddgrow-logo.png",T=k=>{const se=document.createElement("div");se.className="tag",se.innerHTML=`<div class="tag-in"><div class="tag-sub"><span class="tag-badge"><img class="tag-ico" alt="" src="${w}"></span><span class="tag-r"></span><span class="tag-up"><svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M5 9V2M2 5l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><i></i></span><span class="tag-eng"></span></div><div class="tag-title"><span class="tt"></span><span class="caret"></span></div><div class="tag-cite"><span class="cl"></span><span class="ce"></span><span class="dot"></span></div><div class="tag-reply"><div class="rh"><img alt="" src="${v}"><span>Your comment</span><em>Draft</em></div><div class="rt"></div></div></div>`,k.appendChild(se);const ee=fe=>se.querySelector(fe);return{el:se,inner:ee(".tag-in"),ico:ee(".tag-ico"),r:ee(".tag-r"),up:ee(".tag-up"),n:ee(".tag-up i"),eng:ee(".tag-eng"),tt:ee(".tt"),caret:ee(".caret"),cite:ee(".tag-cite"),cl:ee(".cl"),ce:ee(".ce"),reply:ee(".tag-reply"),rt:ee(".rt"),pill:ee(".rh em"),idx:0,count:0,typing:0,openUntil:0,open:!1,sx:0,sy:0}},A=Array.from({length:s?4:8},(k,se)=>{const ee=T(E);return ee.idx=se,ee});let U=0;const I=k=>[...k||[]].filter(se=>m0.indexOf(se)<U).map(se=>`<img alt="" src="${_[se]||""}">`).join(""),G=k=>k.map(se=>`<img alt="" src="${_[se]||""}">`).join("");function F(k,se,ee){const[fe,ue,Ce]=Zr[se%Zr.length];if(k.idx=se,k.r.textContent=fe,k.count=Ce,k.n.textContent=Ce,clearInterval(k.typing),!ee){k.tt.textContent=ue,k.caret.style.display="none";return}k.tt.textContent="",k.caret.style.display="";let Pe=0;k.typing=setInterval(()=>{k.tt.textContent=ue.slice(0,++Pe),Pe>=ue.length&&clearInterval(k.typing)},28)}const X=k=>{const se=new Set(A.filter(ee=>ee!==k).map(ee=>ee.idx%Zr.length));for(let ee=1;ee<=Zr.length;ee++){const fe=(k.idx+ee)%Zr.length;if(!se.has(fe))return fe}return k.idx},L=k=>{k.up.classList.remove("bump"),k.up.offsetWidth,k.up.classList.add("bump")},D=(k,se,ee)=>{k.cl.textContent=se,k.ce.innerHTML=G(ee)+(ee.length===1?`<b>${Uy[ee[0]]}</b>`:"")};function V(k,se){k.open||F(k,k.idx,!a),k.open=!0,k.el.classList.add("open"),D(k,"Collected by",[se]),requestAnimationFrame(()=>k.cite.classList.add("on")),k.count+=9+Math.floor(Math.random()*6),k.n.textContent=k.count,L(k)}function W(k){k.open=!1,k.el.classList.remove("open"),k.cite.classList.remove("on")}A.forEach((k,se)=>{F(k,se,!1),!a&&(setInterval(()=>{k.open||(k.count+=1+Math.floor(Math.random()*3),k.n.textContent=k.count,L(k))},2300+se*430),setInterval(()=>{k.open||(k.inner.classList.toggle("alt"),F(k,X(k),!1))},11e3+se*1700))}),a&&V(A[0],"chatgpt");const R=s?1.12:1.3,Q=k=>{const se=T(k);return se.el._k=R,se.el.style.setProperty("--k",R),se.el.classList.add("story"),se.open=!0,se.el.classList.add("open"),se.caret.style.display="none",se.el.style.opacity=0,se.el.style.visibility="hidden",se},Se=[0,5,9],Re=d.map((k,se)=>{const ee=Q(p),[fe,ue,Ce]=Zr[Se[se]];return ee.r.textContent=fe,ee.n.textContent=Ce,ee.full=ue,D(ee,"Collected by",["chatgpt"]),ee}),Ue=Q(p);{const[k,se,ee]=Zr[0];Ue.r.textContent=k,Ue.n.textContent=ee,Ue.full=se}D(Ue,"Cited by",[...u.get(l)||[]]),Ue.cite.classList.add("on");const Me=Q(p);Me.el.classList.add("mine"),Me.ico.src=v,Me.ico.classList.add("mark"),Me.r.textContent="Your brand",Me.up.style.display="none";let Ve=0;const J=new H,ae=(k,se,ee)=>(J.set(k.x,k.y+k.H+.2,k.z).project(i),{x:(J.x*.5+.5)*se,y:(-J.y*.5+.5)*ee,ok:J.z<1});function Ee(k,se,ee,fe,ue){J.copy(k).project(i);const Ce=(J.x*.5+.5)*fe,Pe=(-J.y*.5+.5)*ue;return{x0:Ce-se,x1:Ce+se,y0:Pe-ee,y1:Pe+ee}}const Ye=()=>{const k=t.cam<.5;return s?k?{x0:80,x1:S-80,y0:470,y1:b-90}:{x0:70,x1:S-70,y0:x+78,y1:b*.52}:k?{x0:Math.max(S*.47+40,48+Math.min(740,S*.56)*.75+110),x1:S-100,y0:240,y1:b-100}:{x0:48+Math.min(600,S*.44)+150,x1:S-80,y0:x+78,y1:b-90}},xe=()=>{const k=Math.round(t.cam);return k===0||k===5?s?k===0?2:4:8:0};let Be=[];function We(){const k=Ye(),se=Math.min(A.length,xe()),ee=[],fe=Ee(f,s?48:100,0,S,b);ee.push({x0:fe.x0,x1:fe.x1,y0:fe.y0-50,y1:fe.y0+(s?90:230)});const ue=N=>{const me={x0:N.x-100,x1:N.x+100,y0:N.y-64,y1:N.y+4};return ee.every(re=>me.x0>=re.x1||me.x1<=re.x0||me.y0>=re.y1||me.y1<=re.y0)},Ce=o.map(N=>({f:N,s:ae(N,S,b)})).filter(({s:N})=>N.ok&&N.x>k.x0&&N.x<k.x1&&N.y>k.y0&&N.y<k.y1&&ue(N)).sort((N,me)=>me.s.y-N.s.y),Pe=[];for(const N of Ce)if(Pe.every(me=>Math.abs(me.s.x-N.s.x)>200||Math.abs(me.s.y-N.s.y)>60)&&Pe.push(N),Pe.length>=se)break;Be=Pe.map(N=>N.f),A.forEach((N,me)=>{const re=me<Be.length;N.el.style.display=re?"":"none",re&&(N.eng.innerHTML=I(u.get(Be[me])))})}let Fe=!0,$e=0,ot=-1;const q={x:0,y:0},it=document.getElementById("chat"),Lt=it.querySelector(".q"),Ot=document.getElementById("qchip");it.querySelector("#qt").textContent=Ny;const Ke=[...it.querySelectorAll(".cell")],bt=document.getElementById("think"),z=[...document.querySelectorAll("[data-p]")];z.forEach(k=>{k._lines=[...k.querySelectorAll(".line")],k._chips=[...k.querySelectorAll(".chips li")],k._links=[...k.querySelectorAll("a")];const se=k.querySelector("h2");if(se){const ee=[];se.childNodes.forEach(fe=>{const ue=fe.nodeType===1?fe.className:"";fe.textContent.trim().split(/\s+/).filter(Boolean).forEach(Ce=>ee.push([Ce,ue]))}),se.setAttribute("aria-label",ee.map(fe=>fe[0]).join(" ")),se.innerHTML=ee.map(([fe,ue])=>`<span class="w${ue?" "+ue:""}" aria-hidden="true">${fe}</span>`).join(" "),k._w=[...se.querySelectorAll(".w")]}});const Nt=document.getElementById("logos"),Xe=[...document.querySelectorAll('[data-p="4"] .steps li')],P=document.getElementById("veil"),M=(k,se)=>{k.style.opacity=se.toFixed(3),k.style.visibility=se>.01?"visible":"hidden"},O=new H,Y=(k,se,ee)=>(O.set(k,se,ee).project(i),{x:(O.x*.5+.5)*S,y:(-O.y*.5+.5)*b,ok:O.z<1}),ne=(k,se,ee)=>{k.style.transform=`translate3d(${se.toFixed(1)}px, ${ee.toFixed(1)}px, 0)`};let ve=null;const _e=(k,se,ee,fe)=>{const ue=k.firstElementChild,Ce=k._k||1,Pe=ue.offsetWidth*Ce/2+8;let N=Pe,me=S-Pe,re=fe?Math.max(ee,ue.offsetHeight*Ce+x+44):ee;ve&&k._k&&(s?re=Math.min(re,ve.t-14):ve.l<S/2?N=Math.max(N,ve.r+18+Pe):me=Math.min(me,ve.l-18-Pe)),ne(k,N>me?(N+me)/2:Math.min(me,Math.max(N,se)),re)};function oe(k){const{k:se,pos:ee}=e.lead(),fe=t.season/3;n.classList.toggle("later",t.cam>.5);const ue=y.offsetWidth||120,Ce=s?S*.94-ue:S*.9-ue,Pe=s?b*.6-ue:b*.08;y.style.transform=`translate3d(${ar(Ce,S*.34,fe).toFixed(1)}px, ${(Pe-Math.sin(Math.PI*fe)*b*.05+fe*b*.05).toFixed(1)}px, 0)`;const N=Ye();ve=null,z.forEach(ke=>{if(+ke.dataset.p>0&&t["p"+ke.dataset.p]>.5){const mt=ke.getBoundingClientRect();ve={l:mt.left,r:mt.right,t:mt.top}}}),E.style.opacity=t.chips.toFixed(3),E.classList.toggle("eng-mode",t.map>.5);const me=Math.floor(hn(t.trace/5)*5+1e-6);me!==U&&(U=me,Be.forEach((ke,mt)=>{A[mt].eng.innerHTML=I(u.get(ke))})),Be.forEach((ke,mt)=>{const qe=ae(ke,S,b);A[mt].sx=qe.x,A[mt].sy=qe.y,_e(A[mt].el,qe.x,qe.y,!1);const Rt=qe.ok&&qe.x>N.x0-30&&qe.x<N.x1+30&&qe.y>N.y0-30&&qe.y<N.y1+50;A[mt].el.style.opacity=Rt?"":"0"});const re=g.grp.visible&&(se===0&&t.f1<.955||se===5&&t.f5<.9),ye=Y(ee.x,ee.y+g.lift+1.1,ee.z),Te=Ot.firstElementChild.offsetWidth/2+12,ce=Math.min(S-Te,Math.max(Te,ye.x)),ge=Math.max(ye.y,x+88);ne(Ot,ce,ge),M(Ot,re&&ye.ok?hn(t.lead*1.6)*hn((.5-t.p0)*3):0),d.forEach((ke,mt)=>{const qe=Re[mt],Rt=m[mt]<.12?0:m[mt],Pt=Y(ke.x,ke.y+ke.H+.2,ke.z);_e(qe.el,Pt.x,Pt.y,!0),M(qe.el,Pt.ok?Rt:0);const ft=Math.floor(qe.full.length*hn((Rt-.25)/.6));qe.tt.dataset.n!==String(ft)&&(qe.tt.dataset.n=String(ft),qe.tt.textContent=qe.full.slice(0,ft)),qe.cite.classList.toggle("on",Rt>.85)});const de=Y(f.x,f.y+.9,f.z),ze=it.firstElementChild.offsetWidth/2+8;let pe=ze,He=S-ze,Le=Math.min(b-60,Math.max(it.firstElementChild.offsetHeight+x+48,de.y));ve&&(s?Le=Math.min(Le,ve.t-14):ve.l<S/2?pe=Math.max(pe,ve.r+18+ze):He=Math.min(He,ve.l-18-ze)),q.x=pe>He?(pe+He)/2:Math.min(He,Math.max(pe,de.x)),q.y=Le,ne(it,q.x,q.y);const Je=Math.max(m[0],m[1],m[2]);M(it,de.ok?Gn(0,1,t.chat)*(1-hn(t.park*2))*(s?1-hn((Je-.1)*3):1):0),Lt.style.opacity=t.q.toFixed(2),bt.style.display=t.ans<.4&&t.q>.5?"":"none";for(let ke=0;ke<3;ke++)Ke[ke].classList.toggle("on",t.ans>ke+.4);const Ut=Ke[3],Ze=t.cellYou>.5;Ut.classList.toggle("you",Ze),Ut.classList.toggle("ghost",!Ze),Ut.classList.toggle("on",Ze||t.ghost>.5),Ut.style.display=Ze||t.ghost>.5?"":"none",Ut.dataset.you!==String(Ze)&&(Ut.dataset.you=String(Ze),Ut.innerHTML=Ze?`<span><img alt="" src="${v}">Your brand</span>`:"<span>Your brand?</span>");const ht=Y(l.x,l.y+l.H+.2,l.z),qt=Gn(0,1,t.match);_e(Ue.el,ht.x,ht.y,!0),M(Ue.el,ht.ok?qt:0);const Ct=Math.floor(Ue.full.length*hn(t.match*1.7));Ue.tt.dataset.n!==String(Ct)&&(Ue.tt.dataset.n=String(Ct),Ue.tt.textContent=Ue.full.slice(0,Ct)),Ue.reply.classList.toggle("on",t.draft>.02);const et=Math.floor(jd.length*hn(t.draft));Ue.rt.dataset.n!==String(et)&&(Ue.rt.dataset.n=String(et),Ue.rt.textContent=jd.slice(0,et));const rt=Y(c.x,c.y+(t.sprout>.02?.5+h.H:.6),c.z);_e(Me.el,rt.x,rt.y,!0);const Ht=t.season>.9?"Cited by AI engines":"No thread mentions you";if(Me.tt.dataset.t!==Ht&&(Me.tt.dataset.t=Ht,Me.tt.textContent=Ht),M(Me.el,rt.ok?Gn(0,1,t.mine)*(s&&t.season>.05?1-hn(t.chat*1.5):1):0),z.forEach(ke=>{const mt=+ke.dataset.p,qe=hn(t["p"+mt]),Rt=mt===6?qe*(1-hn(t.park*1.7)):qe;ke.style.opacity=Rt.toFixed(3),ke._links.forEach(ft=>{ft.tabIndex=Rt>.5?0:-1}),ke.style.pointerEvents=Rt>.6?"auto":"none";const Pt=((1-Rt)*22).toFixed(1);if(ke.style.transform=s?`translateY(${Pt}px)`:`translateY(calc(${mt===0?"-53%":"-50%"} + ${Pt}px))`,ke._w){const ft=ke._w.length;ke._w.forEach((en,ni)=>{const Kt=hn(qe*(ft+2)-ni-.5);en.style.opacity=Kt.toFixed(2),en.style.transform=`translateY(${((1-Kt)*.3).toFixed(2)}em)`})}if(ke._lines.length){const ft=Math.round(t["l"+mt]);ke._lines.forEach((en,ni)=>en.classList.toggle("on",ni===ft))}ke._chips.forEach((ft,en)=>ft.classList.toggle("on",t.trace>en+.15))}),M(Nt,hn(t.p0)),Nt.style.pointerEvents=t.p0>.6?"auto":"none",Xe.length){const ke=t.draft>.35;Xe[1].className=ke?"done":"on",Xe[2].className=ke?"on":"",Xe[0].className="done"}P.style.opacity=(t.park*.5).toFixed(3)}function le(k){a||(A.forEach(se=>{se.open&&k>se.openUntil&&W(se)}),k>Ve&&Me.cite.classList.remove("on")),Math.abs(t.cam-ot)>6e-4?$e=0:$e++,Math.round(t.cam)!==Math.round(ot<0?0:ot)&&(Fe=!0),ot=t.cam,Fe&&$e>8&&(Fe=!1,We())}return e.hooks.onCollect=(k,se,ee)=>{const fe=Be.indexOf(k);if(fe<0||t.chips<=.5)return;const ue=A[fe],Ce=A.some(N=>N!==ue&&N.open&&Math.abs(N.sx-ue.sx)<250&&Math.abs(N.sy-ue.sy)<130),Pe=s&&ue.sy<500&&t.cam<.5;(ue.open||!Ce&&!Pe)&&(V(ue,se),ue.openUntil=ee+3.8)},e.hooks.onYoursCollect=(k,se)=>{D(Me,"Collected by",[k]),Me.cite.classList.add("on"),Ve=se+3.6},{resize(k,se){S=k,b=se,Fe=!0,$e=0},update:oe,tick:le,requestPick(){Fe=!0,$e=99},pickNow(){Fe=!1,We()}}}function Zy(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new an;let c=0;for(let u=0;u<r.length;++u){const d=r[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;s[h]===void 0&&(s[h]=[]),s[h].push(d.attributes[h]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!i.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[h]===void 0&&(a[h]=[]),a[h].push(d.morphAttributes[h])}if(e){let h;if(t)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,h,u),c+=h}}if(t){let u=0;const d=[];for(let f=0;f<r.length;++f){const h=r[f].index;for(let g=0;g<h.count;++g)d.push(h.getX(g)+u);u+=r[f].attributes.position.count}l.setIndex(d)}for(const u in s){const d=np(s[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){const h=[];for(let _=0;_<a[u].length;++_)h.push(a[u][_][f]);const g=np(h);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}}return l}function np(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){const u=r[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new xn(a,t,n);let l=0;for(let c=0;c<r.length;++c){const u=r[c];if(u.isInterleavedBufferAttribute){const d=l/t;for(let f=0,h=u.count;f<h;f++)for(let g=0;g<t;g++){const _=u.getComponent(f,g);o.setComponent(f+d,g,_)}}else a.set(u.array,l);l+=u.count*t}return i!==void 0&&(o.gpuType=i),o}async function Jy(r){const e=matchMedia("(max-width: 760px)").matches,t=matchMedia("(prefers-reduced-motion: reduce)").matches,n=e?.5:1,i=new Py({canvas:r,antialias:!0,alpha:!0,powerPreference:"high-performance"});i.setClearColor(0,0);const s=Math.min(window.devicePixelRatio||1,e?1.5:2);i.setPixelRatio(s);const a=new uv,o=new Mi(40,1,.5,500),l=L=>new H((L>>16&255)/255,(L>>8&255)/255,(L&255)/255),c={uTime:{value:0},uRes:{value:new je(1,1)},uPx:{value:s},uHatch:{value:1},uSoft:{value:0},uOutline:{value:1},uOutlinePx:{value:1.25},uFogNear:{value:40},uFogFar:{value:150},uPaper:{value:l(16448247)},uPaperShade:{value:l(14736849)},uInk:{value:l(3881783)},uInk2:{value:l(8816255)},uAmber:{value:l(14722342)},uLight:{value:new H(-.55,.78,.42).normalize()},uPointScale:{value:1},uPortrait:{value:0},uClearMode:{value:0}},u=(L,D,V={})=>new Ni({uniforms:{...c,...V.uniforms||{}},vertexShader:L,fragmentShader:D,defines:V.defines||{},side:V.side??kr,transparent:!!V.transparent,depthWrite:V.depthWrite??!0}),d=(L,D,V)=>u(L,v0,{defines:{...D,OUTLINE:1},side:qn,uniforms:V}),f=[],h=12,g=-20,_=(L,D)=>Math.sin(L*.045+1.2)*Math.cos(D*.038+.4)*1.6+Math.sin(L*.09-D*.07)*.6+4.2*Math.exp(-((L-h)**2+(D-g)**2)/140)+Math.max(0,-D-40)*.06;{const L=new xa(420,420,240,240);L.rotateX(-Math.PI/2),L.translate(0,0,-70);const D=L.attributes.position;for(let W=0;W<D.count;W++)D.setY(W,_(D.getX(W),D.getZ(W)));L.computeVertexNormals();const V=new Jt(L,u(zy,ky));V.frustumCulled=!1,a.add(V)}const m=L=>()=>{L|=0,L=L+1831565813|0;let D=Math.imul(L^L>>>15,1|L);return D=D+Math.imul(D^D>>>7,61|D)^D,((D^D>>>14)>>>0)/4294967296},p=m(11),S=new Nn,b=[];{const L=Math.round(230*n);let D=0;for(;b.length<L&&D++<L*6;){const V=15+78*Math.pow(p(),1.25),W=(p()*2-1)*(.72*V+4),R=28-V;if(Math.hypot(W-h,R-g)<6)continue;const Q=1.1+4.6*Math.pow(p(),2.2);b.push({x:W,z:R,y:_(W,R),H:Q,d:V,bud:p()<.3,yaw:p()*6.283,tilt:.35+p()*.6,seed:p(),cited:0})}}const x=[];{const L=b.filter(D=>D.H>2.6&&D.d>14&&D.d<62&&D.x>.03*D.d&&D.x<.6*D.d);for(let D=L.length-1;D>0;D--){const V=Math.floor(p()*(D+1));[L[D],L[V]]=[L[V],L[D]]}for(const D of L){if(x.length>=11)break;x.every(V=>Math.hypot(V.x-D.x,V.z-D.z)>5.5)&&(D.cited=1,x.push(D))}for(const D of b.filter(V=>V.x>0&&!V.cited).sort((V,W)=>W.H-V.H)){if(x.length>=4)break;D.cited=1,x.push(D)}}const y=x.slice(0,Math.min(x.length,9)),E=y.filter(L=>L.x>3&&L.d>15).sort((L,D)=>L.d-D.d)[0]||y[0],w={x:E.x-2.7,z:E.z+1.3};w.y=_(w.x,w.z);for(let L=b.length-1;L>=0;L--)!b[L].cited&&Math.hypot(b[L].x-w.x,b[L].z-w.z)<3&&b.splice(L,1);const v=new Jf(.03,.045,1,5,1,!0);v.translate(0,.5,0);const T=(L,D)=>L.setAttribute("aPart",new kt(new Float32Array(L.attributes.position.count).fill(D),1)),A=(()=>{const L=[];for(let W=0;W<9;W++){const R=new fs(1,10,6);R.scale(.62,.09,.2),R.translate(.62,0,0),R.rotateZ(.2),R.rotateY(W/9*Math.PI*2),T(R,0),L.push(R)}const V=new fs(.3,12,8);return V.scale(1,.55,1),V.translate(0,.06,0),T(V,1),L.push(V),Zy(L)})(),U=(()=>{const L=new fs(.5,14,10);return L.scale(.8,1.15,.8),L.translate(0,.5,0),T(L,0),L})(),I=(()=>{const L=new eh(1,2);return L.scale(1,.88,1),T(L,0),L})();function G(L,D,V,W){for(const[Q,Se]of Object.entries(W))L.setAttribute(Q,new of(Se,1));const R=new _d(L,D,V);return R.frustumCulled=!1,R}function F(L,D,V,W){const R=new _d(L.geometry,d(D,V,W),L.count);R.instanceMatrix=L.instanceMatrix,R.frustumCulled=!1,f.push(R),a.add(L,R)}{const L=b,D={uSwayAmt:{value:.07}},V=G(v.clone(),u(or,hf,{defines:{STEM:1},uniforms:D}),L.length,{aH:Float32Array.from(L.map(R=>R.H)),aCited:new Float32Array(L.length),aSeed:new Float32Array(L.length),aPart:new Float32Array(L.length)});L.forEach((R,Q)=>{S.position.set(R.x,R.y-.05,R.z),S.rotation.set(0,0,0),S.scale.set(1,1,1),S.updateMatrix(),V.setMatrixAt(Q,S.matrix)}),a.add(V);const W=(R,Q,Se)=>{const Re=R.length,Ue=G(Q.clone(),u(or,oa,{defines:{KIND:Se},uniforms:{...D}}),Re,{aH:Float32Array.from(R.map(Me=>Me.H)),aCited:Float32Array.from(R.map(Me=>Me.cited)),aSeed:Float32Array.from(R.map(Me=>Me.seed))});R.forEach((Me,Ve)=>{const J=(.24+.05*Me.H)*(Me.cited?1.4:1);S.position.set(Me.x,Me.y-.05+Me.H,Me.z),S.rotation.set(Me.tilt,Me.yaw,0,"YXZ"),S.scale.setScalar(Se===4?J*1.15:J),S.updateMatrix(),Ue.setMatrixAt(Ve,S.matrix)}),F(Ue,or,{KIND:Se},{...D})};W(b.filter(R=>!R.bud),A,0),W(b.filter(R=>R.bud),U,4)}{const L=[];for(let R=0;R<Math.round(14*n);R++){const Q=-52-p()*45,Se=(p()*2-1)*(.7*(28-Q)+4);L.push({x:Se,z:Q,y:_(Se,Q),H:4+p()*3,r:3+p()*2.2})}const D={uSwayAmt:{value:0}},V=G(v.clone(),u(or,hf,{defines:{STEM:1},uniforms:D}),L.length,{aH:Float32Array.from(L.map(R=>R.H)),aCited:new Float32Array(L.length),aSeed:new Float32Array(L.length),aPart:new Float32Array(L.length)});L.forEach((R,Q)=>{S.position.set(R.x,R.y-.3,R.z),S.rotation.set(0,0,0),S.scale.set(4.5,1,4.5),S.updateMatrix(),V.setMatrixAt(Q,S.matrix)}),a.add(V);const W=G(I.clone(),u(or,oa,{defines:{KIND:5},uniforms:{...D}}),L.length,{aH:new Float32Array(L.length),aCited:new Float32Array(L.length),aSeed:new Float32Array(L.length)});L.forEach((R,Q)=>{S.position.set(R.x,R.y+R.H+R.r*.45,R.z),S.rotation.set(0,0,0),S.scale.setScalar(R.r),S.updateMatrix(),W.setMatrixAt(Q,S.matrix)}),F(W,or,{KIND:5},{...D})}{const L=Math.round(13500*n),D=new an;D.setAttribute("position",new kt([-.5,0,0,.5,0,0,-.32,.55,0,.32,.55,0,0,1,0],3)),D.setIndex([0,1,3,0,3,2,2,3,4]);const V=new Float32Array(L),W=new Float32Array(L),R=new Float32Array(L),Q=G(D,u(Gy,Hy,{side:Yn,uniforms:{}}),L,{aH:V,aW:W,aSeed:R});let Se=0,Re=0;for(;Se<L&&Re++<L*4;){const Ue=13+110*Math.pow(p(),2),Me=(p()*2-1)*(.78*Ue+6),Ve=28-Ue;if(Math.hypot(Me-h,Ve-g)<4.6||x.some(ae=>Math.hypot(ae.x-Me,ae.z-Ve)<2.6)||Math.hypot(w.x-Me,w.z-Ve)<2.9)continue;const J=.5+.5*Math.sin(Me*.21+Math.sin(Ve*.17)*2)*Math.sin(Ve*.19+Math.sin(Me*.13)*1.7);p()>.25+J*.9||(S.position.set(Me,_(Me,Ve)-.03,Ve),S.rotation.set(0,p()*6.283,0),S.scale.set(1,1,1),S.updateMatrix(),Q.setMatrixAt(Se,S.matrix),V[Se]=.55+p()*.75,W[Se]=.055+p()*.045,R[Se]=p(),Se++)}Q.count=Se,a.add(Q)}const X=(()=>{const L=[[1.02,0],[1.12,.18],[1.16,.42],[1.1,.72],[.96,1.02],[.76,1.3],[.5,1.52],[.24,1.66],[.06,1.72],[0,1.73]].map(([R,Q])=>new je(R,Q)),D=new th(L,44),V=new Ks;V.add(new Jt(D,u(Js,oa,{defines:{KIND:2}})));const W=new Jt(D,d(Js,{}));return f.push(W),V.add(W),V.scale.setScalar(3.4),V.position.set(h,_(h,g)-.05,g),V.rotation.y=-.45,a.add(V),V.updateMatrixWorld(!0),V})();return{renderer:i,scene:a,camera:o,U:c,small:e,still:t,dpr:s,mat:u,hullOf:d,hulls:f,instanced:G,withHull:F,dummy:S,rng:m,hAt:_,HX:h,HZ:g,flowers:b,cited:x,Fs:E,P:w,hive:X,stemGeo:v,daisyGeo:A}}const x0=1095,Qy=[0,292,415,588,756,995,x0],jy=()=>({cam:0,lead:0,f1:0,f2:0,f3:0,f4:0,f4x:0,f5:0,f6:0,crowd:1,rings:1,chips:1,chat:0,q:0,ans:0,ghost:0,cellYou:0,mine:0,map:0,trace:0,match:0,plot:0,prep:0,seed:0,sprout:0,draft:0,season:0,grow:0,bloom:0,route:0,park:0,p0:1,p1:0,p2:0,p3:0,p4:0,p5:0,p6:0,l1:0,l2:0,l3:0,l4:0,l5:0,l6:0});function eb(r,e){const t=r.timeline({paused:!0,defaults:{ease:"none"}}),n=(i,s,a,o,l)=>t.fromTo(e,{[i]:s},{[i]:a,duration:l-o,immediateRender:!1},o);return[[0,60],[100,150],[232,258],[305,385],[430,500],[600,665],[765,815],[985,1045]].forEach(([i,s],a)=>n("cam",a,a+1,i,s)),n("lead",0,1,6,16),n("lead",1,0,392,410),n("lead",0,1,598,610),n("lead",1,0,738,750),n("lead",0,1,845,857),n("f1",0,1,10,112),n("f2",0,1,122,232),n("f3",0,1,306,392),n("f4",0,1,604,690),n("f4x",0,1,712,742),n("f5",0,1,852,932),n("f6",0,1,1e3,1090),n("crowd",1,0,0,60),n("crowd",0,1,440,475),n("crowd",1,0,596,616),n("crowd",0,.5,776,800),n("crowd",.5,1,1e3,1040),n("rings",1,0,0,40),n("rings",0,1,500,560),n("chips",1,0,0,28),n("chips",0,1,476,500),n("chips",1,0,594,612),n("chat",0,1,114,126),n("chat",1,0,432,444),n("chat",0,1,930,940),n("q",0,1,112,114),n("q",1,0,850,850.01),n("q",0,1,930,932),n("ans",0,3,246,284),n("ans",3,0,850,850.01),n("ans",0,3,940,960),n("ghost",0,1,306,318),n("ghost",1,0,432,444),n("cellYou",0,1,962,972),n("plot",0,1,340,354),n("mine",0,1,352,366),n("mine",1,0,426,440),n("mine",0,1,812,824),n("mine",1,0,1030,1050),n("map",0,1,470,500),n("map",1,0,612,632),n("trace",0,5,490,585),n("match",0,1,664,678),n("match",1,0,772,790),n("prep",0,1,672,690),n("seed",0,1,690,706),n("sprout",0,1,706,726),n("draft",0,1,726,756),n("season",0,3,775,880),n("grow",0,1,780,830),n("bloom",0,1,830,845),n("route",0,1,840,870),n("p0",1,0,12,42),[[1,46,76,296,320],[2,328,356,420,446],[3,452,482,592,616],[4,622,650,758,782],[5,790,820,998,1022]].forEach(([i,s,a,o,l])=>{n(`p${i}`,0,1,s,a),n(`p${i}`,1,0,o,l)}),n("p6",0,1,1052,1078),n("l1",0,1,121,124),n("l1",1,2,236,239),n("l2",0,1,364,367),n("l2",1,2,398,401),n("l3",0,1,548,551),n("l3",1,2,580,583),n("l4",0,1,700,703),n("l5",0,1,851,854),n("l5",1,2,962,965),t.set({},{},x0),t}async function tb(){const r=document.documentElement,e=document.getElementById("stage"),t=document.getElementById("gl"),n=navigator.connection?.saveData;if(!e||!t||n){r.classList.add("no-gl");return}Oa.registerPlugin(ut);let i;try{i=await Jy(t)}catch{r.classList.add("no-gl");return}t.addEventListener("webglcontextlost",v=>{v.preventDefault(),r.classList.add("no-gl")});const{renderer:s,scene:a,camera:o,U:l,still:c}=i,u=jy(),d=await $y(i,u),f=Ky(i,d,u,e),h=eb(Oa,u),g={hive:d.data.hiveC.toArray(),P:d.data.Pv.toArray()};let _=!1,m=1,p=1;const S=()=>{const v=e.clientWidth||innerWidth,T=e.clientHeight||innerHeight;m=v,p=T,s.setSize(v,T,!1),l.uRes.value.copy(s.getDrawingBufferSize(new je)),o.aspect=v/T,_=v/T<.85,l.uPortrait.value=_?1:0,f.resize(v,T),y(0,!0)},b={x:0,y:0,tx:0,ty:0};addEventListener("pointermove",v=>{b.tx=v.clientX/innerWidth*2-1,b.ty=v.clientY/innerHeight*2-1});let x=14;function y(v,T=!1){x+=v,d.update(v,T,x);const A=d.lead().sm,U=Iy(u.cam,_,g,[A.x,A.y,A.z]);b.x+=(b.tx-b.x)*.04,b.y+=(b.ty-b.y)*.04;const I=U.s;o.fov=U.f,o.position.set(U.p[0]+(Math.sin(x*.11)*.7+b.x*1.6)*I,U.p[1]+(Math.sin(x*.08)*.25-b.y*.5)*I,U.p[2]),o.lookAt(U.t[0]+b.x*2*I,U.t[1],U.t[2]),U.o?o.setViewOffset(m,p,0,U.o*p,m,p):o.clearViewOffset(),o.updateProjectionMatrix(),o.updateMatrixWorld(),l.uPointScale.value=l.uRes.value.y/(2*Math.tan(o.fov*Math.PI/360)),f.update(x),f.tick(x),s.render(a,o)}new ResizeObserver(S).observe(e),S();const E=v=>v.id==="top"?0:v.getBoundingClientRect().top+scrollY-(v.closest("#story")?0:70);if(ut.create({trigger:"#below",start:"top 95%",end:"top 25%",scrub:!0,onUpdate:v=>{u.park=v.progress,r.classList.toggle("parked",v.progress>0),c&&y(0,!0)}}),Oa.ticker.lagSmoothing(0),c)r.classList.add("still"),document.querySelectorAll("#story section").forEach((v,T)=>{ut.create({trigger:v,start:"top 60%",end:"bottom 60%",onToggle:A=>{A.isActive&&(h.time(Qy[T]),f.requestPick(),y(0,!0),f.pickNow(),y(0,!0),setTimeout(()=>y(0,!0),500))}})}),f.pickNow(),y(0,!0);else{const v=new h_({lerp:.12,smoothWheel:!0});v.on("scroll",ut.update),document.querySelectorAll('a[href^="#"]').forEach(A=>A.addEventListener("click",U=>{const I=document.querySelector(A.getAttribute("href"));I&&(U.preventDefault(),v.scrollTo(E(I),{duration:1.6}))})),ut.create({trigger:"#story",start:"top top",end:"bottom bottom",scrub:1,animation:h,invalidateOnRefresh:!0});let T=0;Oa.ticker.add((A,U)=>{v.raf(A*1e3),!(u.park>.99&&A-T<1/15)&&(T=A,y(Math.min(.05,U/1e3)))})}ut.refresh(),t.classList.add("ready");const w=location.hash.length>1?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;w&&(scrollTo(0,E(w)),ut.update(),y(0,!0)),setInterval(()=>{const v=document.getElementById("silktide-banner");r.style.setProperty("--cookie-h",v?.getClientRects().length?v.offsetHeight+16+"px":"0px")},500)}export{tb as boot};
