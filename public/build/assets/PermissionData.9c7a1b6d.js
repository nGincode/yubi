import{r as c,a as e,j as l,T as n}from"./app.c80ce545.js";function u(){const[i,t]=c.exports.useState(!1);return c.exports.useEffect(()=>{t(!0),$("html").css("overflow","hidden"),$("#content").hide()},[]),i?setTimeout(function(){$("#skeleton").hide(),$("html").css("overflow","auto"),$("#content").fadeIn()},300):$("html").css("overflow","hidden"),e("div",{id:"skeleton",children:l("div",{className:"row",children:[e("div",{className:"col-xl-12",children:e("div",{className:"card",children:l("div",{className:"card-body d-flex",children:[e("div",{className:"ssc-circle",style:{marginTop:"10px",width:"55px"}}),l("div",{className:"w-100 mbs",style:{margin:"8px"},children:[e("div",{className:"ssc-head-line mbs  w-80",style:{marginBottom:"8px"}}),e("div",{className:"mbs ssc-line mb w-50",style:{marginBottom:"8px"}}),e("div",{className:"mbs ssc-line w-30",style:{marginBottom:"8px"}}),e("div",{className:"mbs ssc-line mb w-30",style:{marginBottom:"8px"}})]})]})})}),e("div",{className:"col-xl-3 col-xxl-6 col-sm-6",children:e("div",{className:"card",children:l("div",{className:"card-body d-flex",children:[e("div",{className:"ssc-circle",style:{marginTop:"10px",width:"60px"}}),l("div",{className:"w-100 mr",style:{margin:"8px"},children:[e("div",{className:"ssc-head-line mr  w-80",style:{marginBottom:"8px"}}),e("div",{className:"ssc-line mb w-50",style:{marginBottom:"8px"}}),e("div",{className:"ssc-line w-90",style:{marginBottom:"8px"}}),e("div",{className:"ssc-line w-30",style:{marginBottom:"8px"}})]})]})})}),e("div",{className:"col-xl-3 col-xxl-6 col-sm-6",children:e("div",{className:"card",children:l("div",{className:"card-body d-flex",children:[e("div",{className:"ssc-circle",style:{marginTop:"10px",width:"60px"}}),l("div",{className:"w-100 mr",style:{margin:"8px"},children:[e("div",{className:"ssc-head-line mr  w-80",style:{marginBottom:"8px"}}),e("div",{className:"ssc-line mb w-50",style:{marginBottom:"8px"}}),e("div",{className:"ssc-line w-90",style:{marginBottom:"8px"}}),e("div",{className:"ssc-line w-30",style:{marginBottom:"8px"}})]})]})})}),e("div",{className:"col-xl-12",children:e("div",{className:"card",children:e("div",{className:"card-body d-flex",children:l("div",{className:"w-100 mr",children:[e("div",{className:"ssc-head-line"})," ",e("br",{}),e("div",{className:"ssc-square",style:{borderRadius:"20px"}})]})})})})]})})}const m=(i,t,o,r)=>{const a=s=>{if(s==="view")return!!t.includes(`view${r.toLowerCase().replace(" ","_").replace(" ","_")}`);if(s==="update")return!!t.includes(`update${r.toLowerCase().replace(" ","_").replace(" ","_")}`);if(s==="delete")return!!t.includes(`delete${r.toLowerCase().replace(" ","_").replace(" ","_")}`);if(s==="create")return!!t.includes(`create${r.toLowerCase().replace(" ","_").replace(" ","_")}`)},d=()=>{var s=[];return a("update")&&s.push("Update"),a("delete")&&s.push("Delete"),s};return a("view")||r!=="Dashboard"&&(n("error","You don't have permission"),setTimeout(()=>{window.location.replace("/dashboard")},2e3)),c.exports.useEffect(()=>{i==="Auth"&&(localStorage.getItem("urlOpen")==="/"||localStorage.getItem("urlOpen")==="/login"||localStorage.getItem("urlOpen")==="/register"||localStorage.getItem("urlOpen")==="/forgot-password"||localStorage.getItem("urlOpen").startsWith("/reset-password"))&&window.location.reload(),i==="Guest"&&(localStorage.getItem("urlOpen")==="/"||localStorage.getItem("urlOpen")==="/login"||localStorage.getItem("urlOpen")==="/register"||localStorage.getItem("urlOpen")==="/forgot-password"||localStorage.getItem("urlOpen")==="/verify-email"||localStorage.getItem("urlOpen").startsWith("/reset-password")||window.location.reload()),$("#quota").show()},[]),{managePerm:[...d(),o],view:a("view"),create:a("create"),update:a("update"),delete:a("delete")}},v=m;export{v as P,u as S};