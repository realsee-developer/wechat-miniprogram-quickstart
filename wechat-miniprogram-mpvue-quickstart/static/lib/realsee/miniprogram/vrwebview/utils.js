const r=()=>(65536*(1+Math.random())|0).toString(16).substring(1),e=getApp({allowDefault:!0}),s=s=>{e.__RsVrWebviewPropsMap__||(e.__RsVrWebviewPropsMap__=new Map);const _=(r()+r()+"-"+r()+"-4"+r().substr(0,3)+"-"+r()+"-"+r()+r()+r()).toLowerCase();return e.__RsVrWebviewPropsMap__.set(_,s),_},_=r=>{const s=Array.isArray(r)?r:[r],_={};return s.forEach((r=>{_[r]=e.__RsVrWebviewPropsMap__.get(r)})),Array.isArray(r)?_:_[r]},a=r=>{(Array.isArray(r)?r:[r]).forEach((r=>{e.__RsVrWebviewPropsMap__.delete(r)}))};export{_ as getRsVrWebviewProps,a as removeRsVrWebviewProps,s as rsVrWebviewPropsWrapper};
