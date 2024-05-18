import{r as a,g as he}from"./index-CDs2tPxN.js";var ve={exports:{}},W={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var De=a,Te=Symbol.for("react.element"),ze=Symbol.for("react.fragment"),Oe=Object.prototype.hasOwnProperty,Ee=De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Re={key:!0,ref:!0,__self:!0,__source:!0};function _e(s,r,i){var o,n={},t=null,c=null;i!==void 0&&(t=""+i),r.key!==void 0&&(t=""+r.key),r.ref!==void 0&&(c=r.ref);for(o in r)Oe.call(r,o)&&!Re.hasOwnProperty(o)&&(n[o]=r[o]);if(s&&s.defaultProps)for(o in r=s.defaultProps,r)n[o]===void 0&&(n[o]=r[o]);return{$$typeof:Te,type:s,key:t,ref:c,props:n,_owner:Ee.current}}W.Fragment=ze;W.jsx=_e;W.jsxs=_e;ve.exports=W;var e=ve.exports,ge={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(s){(function(){var r={}.hasOwnProperty;function i(){for(var t="",c=0;c<arguments.length;c++){var m=arguments[c];m&&(t=n(t,o(m)))}return t}function o(t){if(typeof t=="string"||typeof t=="number")return t;if(typeof t!="object")return"";if(Array.isArray(t))return i.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var c="";for(var m in t)r.call(t,m)&&t[m]&&(c=n(c,m));return c}function n(t,c){return c?t?t+" "+c:t+c:t}s.exports?(i.default=i,s.exports=i):window.classNames=i})()})(ge);var Ae=ge.exports;const C=he(Ae);function V(s,r,i){var o,n,t,c,m;r==null&&(r=100);function l(){var h=Date.now()-c;h<r&&h>=0?o=setTimeout(l,r-h):(o=null,i||(m=s.apply(t,n),t=n=null))}var d=function(){t=this,n=arguments,c=Date.now();var h=i&&!o;return o||(o=setTimeout(l,r)),h&&(m=s.apply(t,n),t=n=null),m};return d.clear=function(){o&&(clearTimeout(o),o=null)},d.flush=function(){o&&(m=s.apply(t,n),t=n=null,clearTimeout(o),o=null)},d}V.debounce=V;var ke=V;const K=he(ke);function U(s){let{debounce:r,scroll:i,polyfill:o,offsetSize:n}={debounce:0,scroll:!1,offsetSize:!1};const t=o||(typeof window>"u"?class{}:window.ResizeObserver);if(!t)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[c,m]=a.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),l=a.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:c}),d=r?typeof r=="number"?r:r.scroll:null,h=r?typeof r=="number"?r:r.resize:null,b=a.useRef(!1);a.useEffect(()=>(b.current=!0,()=>void(b.current=!1)));const[_,p,g]=a.useMemo(()=>{const f=()=>{if(!l.current.element)return;const{left:w,top:v,width:k,height:R,bottom:A,right:D,x:H,y:J}=l.current.element.getBoundingClientRect(),N={left:w,top:v,width:k,height:R,bottom:A,right:D,x:H,y:J};l.current.element instanceof HTMLElement&&n&&(N.height=l.current.element.offsetHeight,N.width=l.current.element.offsetWidth),Object.freeze(N),b.current&&!Me(l.current.lastBounds,N)&&m(l.current.lastBounds=N)};return[f,h?K(f,h):f,d?K(f,d):f]},[m,n,d,h]);function y(){l.current.scrollContainers&&(l.current.scrollContainers.forEach(f=>f.removeEventListener("scroll",g,!0)),l.current.scrollContainers=null),l.current.resizeObserver&&(l.current.resizeObserver.disconnect(),l.current.resizeObserver=null)}function x(){l.current.element&&(l.current.resizeObserver=new t(g),l.current.resizeObserver.observe(l.current.element),i&&l.current.scrollContainers&&l.current.scrollContainers.forEach(f=>f.addEventListener("scroll",g,{capture:!0,passive:!0})))}const S=f=>{!f||f===l.current.element||(y(),l.current.element=f,l.current.scrollContainers=ye(f),x())};return qe(g,!!i),Xe(p),a.useEffect(()=>{y(),x()},[i,g,p]),a.useEffect(()=>y,[]),[S,c,_]}function Xe(s){a.useEffect(()=>{const r=s;return window.addEventListener("resize",r),()=>void window.removeEventListener("resize",r)},[s])}function qe(s,r){a.useEffect(()=>{if(r){const i=s;return window.addEventListener("scroll",i,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",i,!0)}},[s,r])}function ye(s){const r=[];if(!s||s===document.body)return r;const{overflow:i,overflowX:o,overflowY:n}=window.getComputedStyle(s);return[i,o,n].some(t=>t==="auto"||t==="scroll")&&r.push(s),[...r,...ye(s.parentElement)]}const Le=["x","y","top","bottom","left","right","width","height"],Me=(s,r)=>Le.every(i=>s[i]===r[i]),Y=()=>e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right-short",viewBox:"0 0 16 16",children:e.jsx("path",{fillRule:"evenodd",d:"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"})});Y.__docgenInfo={description:"",methods:[],displayName:"ArrowIcon"};const xe=({onNextClick:s,onPrevClick:r,wrapperClassName:i,containerClassName:o,arrowClassName:n})=>e.jsx("div",{className:C({CarouselArrows:!i},i),children:e.jsxs("div",{className:C({CarouselArrows__container:!o},o),children:[e.jsx("button",{onClick:r,className:C({"CarouselArrows__arrow CarouselArrows__arrow--prev":!n,...n&&{[n]:!0,[`${n}--prev`]:!0}}),children:e.jsx(Y,{})}),e.jsx("button",{onClick:s,className:C({"CarouselArrows__arrow CarouselArrows__arrow--next":!n,...n&&{[n]:!0,[`${n}--next`]:!0}}),children:e.jsx(Y,{})})]})}),Be=a.memo(xe);xe.__docgenInfo={description:"",methods:[],displayName:"CarouselArrows",props:{onNextClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onPrevClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},containerClassName:{required:!1,tsType:{name:"string"},description:""},arrowClassName:{required:!1,tsType:{name:"string"},description:""},wrapperClassName:{required:!1,tsType:{name:"string"},description:""}}};const Ce=({dots:s,activeDot:r,containerClassName:i,trackClassName:o,wrapperClassName:n,dotClassName:t,onDotClick:c})=>{const[m,l]=U(),[d,h]=U(),[b,_]=U(),p=a.useMemo(()=>Array.from({length:s},(x,S)=>S),[s]),g=a.useMemo(()=>l.width/2-h.width/s/2-h.width/s*r,[l.width,_.width,r,h.width,s]),y=a.useCallback(x=>{c==null||c(x)},[]);return e.jsx("div",{className:C({CarouselDots:!n},n),children:e.jsx("div",{ref:m,className:C({CarouselDots__container:!i},i),children:e.jsx("div",{ref:d,style:{transform:`translateX(${g}px)`},className:C({CarouselDots__track:!o},o),children:p.map(x=>e.jsx("div",{onClick:()=>y==null?void 0:y(x),ref:b,className:C({CarouselDots__dot:!t,"CarouselDots__dot--active":x===r&&!t,...t&&{[t]:!0,[`${t}--active`]:x===r}})},x))})})})},Se=a.memo(Ce);Ce.__docgenInfo={description:"",methods:[],displayName:"CarouselDots",props:{dots:{required:!0,tsType:{name:"number"},description:""},activeDot:{required:!0,tsType:{name:"number"},description:""},containerClassName:{required:!1,tsType:{name:"string"},description:""},wrapperClassName:{required:!1,tsType:{name:"string"},description:""},trackClassName:{required:!1,tsType:{name:"string"},description:""},dotClassName:{required:!1,tsType:{name:"string"},description:""},onDotClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(dot: number) => void",signature:{arguments:[{type:{name:"number"},name:"dot"}],return:{name:"void"}}},description:""}}};const F=a.forwardRef(({customDots:s,customArrows:r,onSlideChange:i,children:o,containerClassName:n,trackClassName:t,slideClassName:c,disableTranslate:m,transitionDuration:l=.3,shownSlides:d=1},h)=>{const[b,_]=U(),[p,g]=a.useState(0),[y,x]=a.useState(0),[S,f]=a.useState(!1),w=a.useRef(null),v=a.useMemo(()=>a.Children.count(o),[o]),k=a.useCallback(u=>{g(u)},[]),R=a.useCallback(()=>{g(u=>(u-1+v)%v)},[v]),A=a.useCallback(()=>{g(u=>(u+1)%v)},[v]),D=a.useMemo(()=>{if(v<=d)return 0;const u=(v-d)*(_.width/d),j=p*(_.width/d);return Math.min(j,u)},[p,_.width,d,v]),H=a.useCallback(u=>{const j="touches"in u?u.touches[0].clientX:u.clientX;x(j),f(!0)},[]),J=a.useCallback(u=>{if(!S||!w.current)return;const X=("touches"in u?u.touches[0].clientX:u.clientX)-y;w.current.style.transform=`translateX(${-D+X}px)`},[S,y,D,w.current]),N=a.useCallback(u=>{if(!S)return;const X=("touches"in u?u.changedTouches[0].clientX:u.clientX)-y,be=_.width*(v-d)/d;let q=p;if(X>_.width/2?q=Math.max(0,p-1):X<-_.width/2&&(q=Math.min(v-d,p+1)),g(q),f(!1),w.current){const Ne=Math.max(0,Math.min(be,q*_.width/d));w.current.style.transform=`translateX(-${Ne}px)`}},[S,y,_.width,v,d,p,w.current]);a.useEffect(()=>{i==null||i(p)},[p]),a.useImperativeHandle(h,()=>({nextSlide:A,prevSlide:R}));const je=a.useMemo(()=>{if(!m)return{transform:`translateX(-${D}px)`,transition:`transform ${l}s`}},[D,l,m]);return e.jsxs("div",{ref:b,className:C({Carousel:!n},n),children:[e.jsx("div",{ref:w,onTouchStart:H,onTouchMove:J,onTouchEnd:N,style:je,className:C({Carousel__track:!t},t),children:a.Children.map(o,(u,j)=>e.jsx("div",{style:{width:_.width/d,height:_.height},className:C({...!c&&{Carousel__slide:!0,"Carousel__slide--dragging":S,"Carousel__slide--active":p===j},...c&&{[c]:!0,[`${c}--dragging`]:S,[`${c}--active`]:p===j}}),children:u}))}),s&&s({dots:v,activeDot:p,onDotClick:k}),!s&&s!==null&&e.jsx(Se,{dots:v,activeDot:p,onDotClick:k}),r&&r({onNextClick:A,onPrevClick:R}),!r&&r!==null&&e.jsx(Be,{onNextClick:A,onPrevClick:R})]})});F.__docgenInfo={description:"",methods:[],displayName:"Carousel",props:{shownSlides:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},transitionDuration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0.3",computed:!1}},containerClassName:{required:!1,tsType:{name:"string"},description:""},trackClassName:{required:!1,tsType:{name:"string"},description:""},slideClassName:{required:!1,tsType:{name:"string"},description:""},disableTranslate:{required:!1,tsType:{name:"boolean"},description:""},customDots:{required:!1,tsType:{name:"union",raw:`| ((props: {
    dots: number;
    activeDot: number;
    onDotClick?: (index: number) => void;
  }) => JSX.Element)
| null`,elements:[{name:"unknown"},{name:"null"}]},description:""},customArrows:{required:!1,tsType:{name:"union",raw:`| ((props: {
    onNextClick: () => void;
    onPrevClick: () => void;
  }) => JSX.Element)
| null`,elements:[{name:"unknown"},{name:"null"}]},description:""},onSlideChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""}},composes:["PropsWithChildren"]};const T=""+new URL("building-RKN_SCTu.webp",import.meta.url).href,z=""+new URL("coffee-0vwqLxLj.webp",import.meta.url).href,O=""+new URL("coffee2-BM_ZzHTz.webp",import.meta.url).href,E=""+new URL("flower-BdRbLf7S.webp",import.meta.url).href,Fe={title:"Carousel",component:F,argTypes:{children:{control:{disable:!0}},shownSlides:{type:"number",description:"Number of slides to show",control:{type:"number"}},transitionDuration:{type:"number",description:"Duration of the slide transition",control:{type:"number"}}}},L={args:{children:[e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:T})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:E})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:z})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:O})})]},decorators:[s=>e.jsx("div",{style:{width:"100%",height:400},children:e.jsx(s,{})})]},M={args:{children:[e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:T})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:E})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:z})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:O})})],customDots:s=>e.jsx(Se,{wrapperClassName:"CustomizedDots",dotClassName:"CustomizedDots__dot",...s})},decorators:[s=>e.jsx("div",{style:{width:"100%",height:400},children:e.jsx(s,{})})]},we=[T,E,z,O],$e=({activeDot:s,onDotClick:r})=>e.jsx("div",{className:"CustomDots",children:we.map((i,o)=>e.jsx("div",{className:C("CustomDots__dot",{"CustomDots__dot--active":s===o}),onClick:()=>r==null?void 0:r(o),children:e.jsx("img",{src:i})},o))}),B={args:{children:[e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:T})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:E})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:z})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:O})})],customDots:s=>e.jsx($e,{...s})},decorators:[s=>e.jsx("div",{style:{width:"100%",height:400},children:e.jsx(s,{})})]},$={args:{shownSlides:3,transitionDuration:.5,children:[e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:T})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:E})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:z})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:O})})]},decorators:[s=>e.jsx("div",{style:{width:"100%",height:400},className:"ActiveSlideStyle",children:e.jsx(s,{})})]},Ie=s=>{const r=a.useRef(null),[i,o]=a.useState(0);return e.jsxs(e.Fragment,{children:[e.jsx(F,{onSlideChange:o,ref:r,...s,children:s.children}),e.jsxs("div",{className:"DotsArrowsOutside__container",children:[e.jsx("button",{onClick:()=>{var n;(n=r.current)==null||n.prevSlide()},className:"DotsArrowsOutside__button",children:"Prev"}),e.jsx("div",{className:"DotsArrowsOutside__slideCount",children:i}),e.jsx("button",{onClick:()=>{var n;(n=r.current)==null||n.nextSlide()},className:"DotsArrowsOutside__button",children:"Next"})]})]})},I={args:{shownSlides:3,transitionDuration:.5,customArrows:null,customDots:null,children:[e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:T})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:E})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:z})}),e.jsx("div",{className:"CarouselStory__slide",children:e.jsx("img",{src:O})})]},render:s=>e.jsx(Ie,{...s}),decorators:[s=>e.jsx("div",{style:{width:"100%",height:400},className:"DotsArrowsOutside",children:e.jsx(s,{})})]},Pe=s=>{const[r,i]=a.useState(0);return e.jsx(e.Fragment,{children:e.jsx(F,{disableTranslate:!0,onSlideChange:i,trackClassName:"StylizedCarousel__track",slideClassName:"StylizedCarousel__carouselSlide",...s,children:we.map((o,n)=>{let t=0;return n>r?t=(n-r)*5+60:n<r&&(t=(r-n)*-5-60),e.jsx("div",{className:"CarouselStory__slide StylizedCarousel__slide",style:{rotate:`${t}deg`},children:e.jsx("img",{src:o})},n)})})})},P={args:{shownSlides:3,transitionDuration:.5},render:s=>e.jsx(Pe,{...s}),decorators:[s=>e.jsx("div",{style:{width:"100%",height:400},className:"StylizedCarousel",children:e.jsx(s,{})})]};var Z,G,Q;L.parameters={...L.parameters,docs:{...(Z=L.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: [<div className="CarouselStory__slide">
        <img src={building} />
      </div>, <div className="CarouselStory__slide">
        <img src={flower} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>]
  },
  decorators: [Story => <div style={{
    width: "100%",
    height: 400
  }}>
        <Story />
      </div>]
}`,...(Q=(G=L.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var ee,se,re;M.parameters={...M.parameters,docs:{...(ee=M.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    children: [<div className="CarouselStory__slide">
        <img src={building} />
      </div>, <div className="CarouselStory__slide">
        <img src={flower} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>],
    customDots: props => <CarouselDots wrapperClassName="CustomizedDots" dotClassName="CustomizedDots__dot" {...props} />
  },
  decorators: [Story => <div style={{
    width: "100%",
    height: 400
  }}>
        <Story />
      </div>]
}`,...(re=(se=M.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var te,ne,oe;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: [<div className="CarouselStory__slide">
        <img src={building} />
      </div>, <div className="CarouselStory__slide">
        <img src={flower} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>],
    customDots: props => <CustomDotComponent {...props} />
  },
  decorators: [Story => <div style={{
    width: "100%",
    height: 400
  }}>
        <Story />
      </div>]
}`,...(oe=(ne=B.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var ie,ae,le;$.parameters={...$.parameters,docs:{...(ie=$.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    shownSlides: 3,
    transitionDuration: 0.5,
    children: [<div className="CarouselStory__slide">
        <img src={building} />
      </div>, <div className="CarouselStory__slide">
        <img src={flower} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>]
  },
  decorators: [Story => <div style={{
    width: "100%",
    height: 400
  }} className="ActiveSlideStyle">
        <Story />
      </div>]
}`,...(le=(ae=$.parameters)==null?void 0:ae.docs)==null?void 0:le.source}}};var ce,de,ue;I.parameters={...I.parameters,docs:{...(ce=I.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    shownSlides: 3,
    transitionDuration: 0.5,
    customArrows: null,
    customDots: null,
    children: [<div className="CarouselStory__slide">
        <img src={building} />
      </div>, <div className="CarouselStory__slide">
        <img src={flower} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>, <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>]
  },
  render: props => <CarouselWithSeparateDots {...props} />,
  decorators: [Story => <div style={{
    width: "100%",
    height: 400
  }} className="DotsArrowsOutside">
        <Story />
      </div>]
}`,...(ue=(de=I.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var me,fe,pe;P.parameters={...P.parameters,docs:{...(me=P.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    shownSlides: 3,
    transitionDuration: 0.5
  },
  render: props => <StylizedCarouselComponent {...props} />,
  decorators: [Story => <div style={{
    width: "100%",
    height: 400
  }} className="StylizedCarousel">
        <Story />
      </div>]
}`,...(pe=(fe=P.parameters)==null?void 0:fe.docs)==null?void 0:pe.source}}};const He=["BasicCarousel","CustomizedDots","CustomDots","ActiveSlideStyle","DotsArrowsOutside","StylizedCarousel"];export{$ as ActiveSlideStyle,L as BasicCarousel,B as CustomDots,M as CustomizedDots,I as DotsArrowsOutside,P as StylizedCarousel,He as __namedExportsOrder,Fe as default};
