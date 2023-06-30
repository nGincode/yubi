import{r as v,j as l,F as de,a,H as te,L as ce,S as i,T as u,b as me}from"./app.c80ce545.js";import{P as ne,S as oe}from"./PermissionData.9c7a1b6d.js";import{I as Z,D as C,V as ee}from"./DataTables.6ea16c13.js";import{B as ae}from"./Button.701a07ed.js";import{I as ue}from"./Input.9812c49a.js";function Ne(r){var V,U,O,A,S,T,F,k,B,P,D,q,M,K,E,j,R,H,I,J,L,G,z,W,X;const N="accounts_contact",n="Contact",o=ne("Auth",r.permission,r.groups.groups.data,N),[g,c]=v.exports.useState(!1),[e,le]=v.exports.useState([]),p=async m=>{var Y;if(m==="create"){var s=new FormData($("#createForm")[0]);((Y=r.groups)==null?void 0:Y.groups.data)!=="All"&&s.append("users_id",r.auth.user.uuid);try{await axios({method:"POST",url:"/api/contact/create",data:s,headers:{"Content-Type":"multipart/form-data",Accept:"application/json",Authorization:`Bearer ${r.auth.user.token_api}`,"X-CSRF-TOKEN":r.csrf_token}}).then(d=>{var t;setTimeout(()=>{c(!1)},5e3),d.data.response==="success"?(u(d.data.response,d.data.message),p("view"),$("#DataTables").DataTable().ajax.reload(),((t=r.groups)==null?void 0:t.groups.data)==="All"?$("#createForm")[0].reset():setTimeout(()=>{window.location.reload()},5e3),$(".is-valid").removeClass("is-valid")):d.data.data?me.fire({title:"<b>Name Detected</b>",text:` Are You Right With The Name ${d.data.data.name} ?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then(se=>{se.isConfirmed&&axios({method:"POST",url:"/api/contact/create",data:{users_id:r.auth.user.uuid,id:d.data.data.uuid},headers:{"Content-Type":"multipart/form-data",Accept:"application/json",Authorization:`Bearer ${r.auth.user.token_api}`,"X-CSRF-TOKEN":r.csrf_token}}).then(Q=>{u(Q.data.response,Q.data.message),setTimeout(()=>{window.location.reload()},5e3)})}):u(d.data.response,d.data.message)})}catch(d){u("error",d.message),setTimeout(()=>{c(!1)},5e3)}}else if(m==="update"){var s=new FormData($("#createForm")[0]);s.append("id",e==null?void 0:e.uuid),s.append("activeUpdate",e==null?void 0:e.active),s.append("date_of_entryUpdate",e==null?void 0:e.date_of_entry),s.append("positionUpdate",e==null?void 0:e.position),s.append("divisionUpdate",e==null?void 0:e.division),s.append("storeUpdate",e==null?void 0:e.store.uuid),s.append("activeUpdate",e==null?void 0:e.active),s.append("free_voucherUpdate",e==null?void 0:e.free_voucher);try{await axios({method:"POST",url:"/api/contact/update",data:s,headers:{"Content-Type":"multipart/form-data",Accept:"application/json",Authorization:`Bearer ${r.auth.user.token_api}`,"X-CSRF-TOKEN":r.csrf_token}}).then(t=>{setTimeout(()=>{c(!1)},5e3),u(t.data.response,t.data.message),t.data.response==="success"&&($("#DataTables").DataTable().ajax.reload(),e!=null&&e.id||($("#createForm")[0].reset(),$(".is-valid").removeClass("is-valid")))})}catch(t){u("error",t.message),setTimeout(()=>{c(!1)},5e3)}}},h=[{value:"Islam",label:"Islam"},{value:"Kristen",label:"Kristen"},{value:"Katolik",label:"Katolik"},{value:"Buddha",label:"Buddha"},{value:"Konghucu",label:"Konghucu"}],f=[{value:"Female",label:"Female"},{value:"Male",label:"Male"}],_=[{value:"Founder",label:"Founder"},{value:"Head Manager",label:"Head Manager"},{value:"Accounting",label:"Accounting"},{value:"Technology",label:"Technology"},{value:"Marketing",label:"Marketing"},{value:"Human Resource and General Affai",label:"Human Resource and General Affai"},{value:"Logistics",label:"Logistics"},{value:"Production Kitchen",label:"Production Kitchen"},{value:"Head Outlet",label:"Head Outlet"},{value:"Cashier",label:"Cashier"},{value:"Bartender",label:"Bartender"},{value:"Kitchen",label:"Kitchen"},{value:"Service Crew",label:"Service Crew"},{value:"Music",label:"Music"},{value:"Parking",label:"Parking"},,],x=[{value:"Owner",label:"Owner"},{value:"CEO (Chief Executive Office) ",label:"CEO (Chief Executive Office) "},{value:"COO (Chief Operating Officer) ",label:"COO (Chief Operating Officer) "},{value:"CMO (Chief Marketing Officer)",label:"CMO (Chief Marketing Officer)"},{value:"CTO (Chief Technology Officer)",label:"CTO (Chief Technology Officer)"},{value:"CFO (Chief Financial Officer)",label:"CFO (Chief Financial Officer)"},{value:"Manager",label:"Manager"},{value:"Supervisor",label:"Supervisor"},{value:"Leader",label:"Leader"},{value:"Staf",label:"Staf"},{value:"Freelance",label:"Freelance"}],re=[{value:"True",label:"Active"},{value:"False",label:"Resign"}],ie={name:{required:!0,minlength:3,maxlength:50},date_of_birth:{required:!0,date:!0},birth_of_place:{required:!0},date_of_entry:{required:!0,date:!0},religion:{required:!0},gender:{required:!0},address:{required:!0,minlength:3,maxlength:191},status:{required:!0},whatsapp:{required:!0,minlength:10,maxlength:15},position:{required:!0},division:{required:!0},active:{required:!0},free_voucher:{required:!0}},b={nameUpdate:{required:!0,minlength:3,maxlength:50},date_of_birthUpdate:{required:!0,date:!0},birth_of_placeUpdate:{required:!0},religionUpdate:{required:!0},genderUpdate:{required:!0},addressUpdate:{required:!0,minlength:3,maxlength:191},whatsappUpdate:{required:!0,minlength:10,maxlength:15}},y=["storeUpdate"],w=m=>{c(!0),m.preventDefault(),e!=null&&e.id?ee("#createForm",b)?p("update"):c(!1):ee("#createForm",ie,["store"])?p("create"):c(!1)};return v.exports.useEffect(()=>{var m;$("#main-wrapper").removeClass("menu-toggle"),$(".hamburger ").removeClass("is-active"),((m=r.groups)==null?void 0:m.groups.data)!=="All"&&le(r.contact)},[]),l(de,{children:[a(te,{title:n}),a("div",{className:"row page-titles",children:l("div",{className:"breadcrumb",children:[a("li",{className:"breadcrumb-item",children:a("a",{children:"Accounts"})}),a("li",{className:"breadcrumb-item  active",children:a(ce,{href:route(N),children:n})})]})}),a(oe,{}),e?l("div",{id:"content",children:[o.create&&a("div",{className:"col-xl-12 ",children:l("div",{className:"card",children:[a("div",{className:"card-header coin-card",children:a("h4",{className:"card-title text-white",children:a("b",{children:n})})}),a("div",{className:"card-body",children:a("div",{className:"basic-form",children:l("form",{id:"createForm",onSubmit:w,children:[a(Z,{name:"img",id:"img",src:e==null?void 0:e.img,empty:e!=null&&e.img?!1:e==null?void 0:e.name}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Full Name (KTP)"}),e!=null&&e.name?a("input",{name:"nameUpdate",id:"nameUpdate",type:"text",className:"form-control",placeholder:"Adi Saxxx",defaultValue:(B=e==null?void 0:e.name)!=null?B:""}):a("input",{name:"name",id:"name",type:"text",className:"form-control",placeholder:"Adi Saxxx",defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Date of Birth"}),e!=null&&e.date_of_birth?a("input",{type:"date",name:"date_of_birthUpdate",id:"date_of_birthUpdate",className:"form-control",defaultValue:(P=e==null?void 0:e.date_of_birth)!=null?P:""}):a("input",{type:"date",name:"date_of_birth",id:"date_of_birth",className:"form-control",defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Birth of Place"}),e!=null&&e.birth_of_place?a("input",{type:"text",name:"birth_of_placeUpdate",id:"birth_of_placeUpdate",className:"form-control",placeholder:"Bengkxx",defaultValue:(D=e==null?void 0:e.birth_of_place)!=null?D:""}):a("input",{type:"text",name:"birth_of_place",id:"birth_of_place",className:"form-control",placeholder:"Bengkxx",defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Date of Entry"}),((q=r.groups)==null?void 0:q.groups.data)!=="All"?a("input",{type:"date",readOnly:!0,className:"form-control",defaultValue:(M=e==null?void 0:e.date_of_entry)!=null?M:""}):a("input",{type:"date",id:"date_of_entry",name:"date_of_entry",className:"form-control",defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Religion"}),e!=null&&e.religion?a(i,{name:"religionUpdate",id:"religionUpdate",data:h,defaultValue:(K=e==null?void 0:e.religion)!=null?K:""}):a(i,{name:"religion",id:"religion",data:h,defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Gender"}),e!=null&&e.gender?a(i,{name:"genderUpdate",id:"genderUpdate",data:f,defaultValue:(E=e==null?void 0:e.gender)!=null?E:""}):a(i,{name:"gender",id:"gender",data:f,defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Address"}),e!=null&&e.address?a("input",{name:"addressUpdate",id:"addressUpdate",type:"text",className:"form-control",placeholder:"Jl. Jend Besar xxx",defaultValue:(j=e==null?void 0:e.address)!=null?j:""}):a("input",{name:"address",id:"address",type:"text",className:"form-control",placeholder:"Jl. Jend Besar xxx",defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Whatsapp"}),e!=null&&e.whatsapp?a("input",{name:"whatsappUpdate",id:"whatsappUpdate",type:"number",className:"form-control",placeholder:"0853xxxx",defaultValue:(R=e==null?void 0:e.whatsapp)!=null?R:""}):a("input",{name:"whatsapp",id:"whatsapp",type:"number",className:"form-control",placeholder:"0853xxxx",defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Position"}),((H=r.groups)==null?void 0:H.groups.data)!=="All"?a("input",{readOnly:!0,className:"form-control",value:(I=e==null?void 0:e.position)!=null?I:""}):a(i,{name:"position",id:"position",data:x,defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Division"}),((J=r.groups)==null?void 0:J.groups.data)!=="All"?a("input",{readOnly:!0,className:"form-control",value:(L=e==null?void 0:e.division)!=null?L:""}):a(i,{name:"division",id:"division",data:_,defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Store"}),((G=r.groups)==null?void 0:G.groups.data)!=="All"?a("input",{readOnly:!0,className:"form-control",value:e!=null&&e.store?e.store.name:""}):a(i,{name:"store",id:"store",data:r.storeActiveSelect,search:!0,defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:a("div",{className:"form-group",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Status"}),((z=r.groups)==null?void 0:z.groups.data)!=="All"?a("input",{readOnly:!0,className:"form-control",value:(e==null?void 0:e.active)==="True"?"Active":(e==null?void 0:e.active)==="False"?"False":""}):a(i,{name:"active",id:"active",data:re,defaultValue:""})]})})})]}),((W=r.groups)==null?void 0:W.groups.data)==="All"&&a("div",{className:"row",children:a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Free Vouchers"}),a(ue,{className:"form-control",rupiah:!0,read:!0,defaultValue:""})]})})}),a("hr",{}),a(ae,{type:"submit",className:"btn btn-primary",processing:g,children:"Submit"})]})})})]})}),o.view&&((X=r.groups)==null?void 0:X.groups.data)==="All"&&a("div",{className:"col-12",children:l("div",{className:"card",children:[a("div",{className:"card-header bg-secondary",children:a("h4",{className:"card-title  text-white",children:l("b",{children:["Data ",n]})})}),a("div",{className:"card-body",children:a("div",{className:"table-responsive",children:a(C,{columns:[{data:"img",title:"#"},{data:"name",title:"Name"},{data:"namestore",title:"Store"},{data:"position",title:"Position"},{data:"entry",title:"Date Of Entry"},{data:"cuti",title:"Leave"},{data:"action",title:"Action",orderable:!1,width:50,className:"text-right"}],API:"/api/contact",Method:"POST",Subject:"Contact",setValidate:b,setValidate2:y,csrf_token:r.csrf_token,api_token:`Bearer ${r.auth.user.token_api}`,Action:o.managePerm})})})]})})]}):l("div",{id:"content",children:[o.create&&a("div",{className:"col-xl-12 ",children:l("div",{className:"card",children:[a("div",{className:"card-header coin-card",children:a("h4",{className:"card-title text-white",children:a("b",{children:n})})}),a("div",{className:"card-body",children:a("div",{className:"basic-form",children:l("form",{id:"createForm",onSubmit:w,children:[a(Z,{name:"img",id:"img",src:e==null?void 0:e.img,empty:e!=null&&e.img?!1:e==null?void 0:e.name}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Full Name (KTP)"}),e!=null&&e.name?a("input",{name:"nameUpdate",id:"nameUpdate",type:"text",className:"form-control",placeholder:"Adi Saxxx",defaultValue:(V=e==null?void 0:e.name)!=null?V:""}):a("input",{name:"name",id:"name",type:"text",className:"form-control",placeholder:"Adi Saxxx",defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Date of Birth"}),e!=null&&e.date_of_birth?a("input",{type:"date",name:"date_of_birthUpdate",id:"date_of_birthUpdate",className:"form-control",defaultValue:(U=e==null?void 0:e.date_of_birth)!=null?U:""}):a("input",{type:"date",name:"date_of_birth",id:"date_of_birth",className:"form-control",defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Birth of Place"}),e!=null&&e.birth_of_place?a("input",{type:"text",name:"birth_of_placeUpdate",id:"birth_of_placeUpdate",className:"form-control",placeholder:"Bengkxx",defaultValue:(O=e==null?void 0:e.birth_of_place)!=null?O:""}):a("input",{type:"text",name:"birth_of_place",id:"birth_of_place",className:"form-control",placeholder:"Bengkxx",defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Date of Entry"}),a("input",{type:"date",id:"date_of_entry",name:"date_of_entry",className:"form-control",defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Religion"}),e!=null&&e.religion?a(i,{name:"religionUpdate",id:"religionUpdate",data:h,defaultValue:(A=e==null?void 0:e.religion)!=null?A:""}):a(i,{name:"religion",id:"religion",data:h,defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Gender"}),e!=null&&e.gender?a(i,{name:"genderUpdate",id:"genderUpdate",data:f,defaultValue:(S=e==null?void 0:e.gender)!=null?S:""}):a(i,{name:"gender",id:"gender",data:f,defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Address"}),e!=null&&e.address?a("input",{name:"addressUpdate",id:"addressUpdate",type:"text",className:"form-control",placeholder:"Jl. Jend Besar xxx",defaultValue:(T=e==null?void 0:e.address)!=null?T:""}):a("input",{name:"address",id:"address",type:"text",className:"form-control",placeholder:"Jl. Jend Besar xxx",defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Whatsapp"}),e!=null&&e.whatsapp?a("input",{name:"whatsappUpdate",id:"whatsappUpdate",type:"number",className:"form-control",placeholder:"0853xxxx",defaultValue:(F=e==null?void 0:e.whatsapp)!=null?F:""}):a("input",{name:"whatsapp",id:"whatsapp",type:"number",className:"form-control",placeholder:"0853xxxx",defaultValue:""})]})})]}),l("div",{className:"row",children:[a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Position"}),a(i,{name:"position",id:"position",data:x,defaultValue:""})]})}),a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Division"}),a(i,{name:"division",id:"division",data:_,defaultValue:""})]})})]}),a("div",{className:"row",children:a("div",{className:"mb-3 col-md-6",children:l("div",{className:"form-group",children:[a("label",{className:"form-label",children:"Store"}),a(i,{name:"store",id:"store",data:r.storeActiveSelect,search:!0,defaultValue:""}),a("input",{type:"hidden",name:"active",id:"active",value:"True"})]})})}),a("hr",{}),a(ae,{type:"submit",className:"btn btn-primary",processing:g,children:"Submit"})]})})})]})}),o.view&&((k=r.groups)==null?void 0:k.groups.data)==="All"&&a("div",{className:"col-12",children:l("div",{className:"card",children:[a("div",{className:"card-header bg-secondary",children:a("h4",{className:"card-title  text-white",children:l("b",{children:["Data ",n]})})}),a("div",{className:"card-body",children:a("div",{className:"table-responsive",children:a(C,{columns:[{data:"img",title:"#"},{data:"name",title:"Name"},{data:"namestore",title:"Store"},{data:"position",title:"Position"},{data:"entry",title:"Date Of Entry"},{data:"action",title:"Action",orderable:!1,width:50,className:"text-right"}],API:"/api/contact",Method:"POST",Subject:"Contact",setValidate:b,setValidate2:y,csrf_token:r.csrf_token,api_token:`Bearer ${r.auth.user.token_api}`,Action:o.managePerm})})})]})})]})]})}export{Ne as default};
