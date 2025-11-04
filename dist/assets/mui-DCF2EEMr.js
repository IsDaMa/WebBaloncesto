import{r as _,g as T}from"./react-CUqyWD5-.js";var c={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=_,v=Symbol.for("react.element"),R=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,O=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,P={key:!0,ref:!0,__self:!0,__source:!0};function y(e,r,o){var t,p={},n=null,a=null;o!==void 0&&(n=""+o),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(a=r.ref);for(t in r)x.call(r,t)&&!P.hasOwnProperty(t)&&(p[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps,r)p[t]===void 0&&(p[t]=r[t]);return{$$typeof:v,type:e,key:n,ref:a,props:p,_owner:O.current}}s.Fragment=R;s.jsx=y;s.jsxs=y;c.exports=s;var w=c.exports,u={exports:{}},E="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",d=E,S=d;function f(){}function m(){}m.resetWarningCache=f;var b=function(){function e(t,p,n,a,j,l){if(l!==S){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}e.isRequired=e;function r(){return e}var o={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:m,resetWarningCache:f};return o.PropTypes=o,o};u.exports=b();var g=u.exports;const C=T(g);export{C as P,w as j};
