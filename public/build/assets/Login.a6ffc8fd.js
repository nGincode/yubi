import{u as N,r as f,j as s,a as e,H as b,L as c}from"./app.c80ce545.js";import{B as v}from"./Button.701a07ed.js";import{G as w}from"./Guest.c07678f8.js";import{I as l}from"./Input.9812c49a.js";import{L as i,I as o}from"./Label.f057ff72.js";function j({status:n,canResetPassword:d}){const{data:r,setData:u,post:h,processing:p,errors:m,reset:g}=N({email:"",password:"",remember:""});f.exports.useEffect(()=>()=>{g("password")},[]);const t=a=>{$("#email").val(a.target.value.replace(/\s/g,"").toLowerCase()),u(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)};return s(w,{children:[e(b,{title:"Login"}),e("div",{className:"authincation h-100",children:e("div",{className:"container h-100 mt-4",children:e("div",{className:"row justify-content-center h-100 align-items-center",children:e("div",{className:"col-md-6",children:e("div",{className:"authincation-content",children:e("div",{className:"row no-gutters",children:e("div",{className:"col-xl-12",children:s("div",{className:"auth-form",children:[e("div",{className:"text-center mb-3",children:e(c,{href:"/",children:e("center",{children:e("img",{src:"./assets/logo/yubi.png",alt:"",width:"150px",className:"img-fluid"})})})}),e("h4",{className:"text-center mb-4",children:"Sign in your account"}),n&&e("p",{className:"text-success",children:n}),s("form",{onSubmit:a=>{a.preventDefault(),h(route("login"))},children:[s("div",{className:"mb-3",children:[e(i,{forInput:"email",value:"Email"}),e(l,{type:"text",name:"email",id:"email",value:r.email,className:"form-control",autoComplete:"Email",pleaceholder:"Email",isFocused:!0,handleChange:t}),e(o,{message:m.email,className:"mt-2"})]}),s("div",{className:"mb-3",children:[e(i,{forInput:"password",value:"Password"}),e(l,{type:"password",name:"password",pleaceholder:"Password",value:r.password,className:"form-control",autoComplete:"current-password",handleChange:t}),e(o,{message:m.password,className:"mt-2"})]}),s("div",{className:"row d-flex justify-content-between mt-4 mb-2",children:[e("div",{className:"mb-3",children:e(l,{type:"checkbox",name:"remember",value:r.remember,rememberme:!0,handleChange:t,className:"form-check-input"})}),d&&e(c,{href:route("password.request"),className:"text-primary",children:"Forgot your password?"})]}),e(v,{type:"submit",className:"btn btn-primary btn-block",processing:p,children:"Sign In"})]}),e("div",{className:"new-account mt-3",children:s("p",{children:["Don't have an account?"," ",e(c,{className:"text-primary",href:route("register"),children:"Sign up"})]})})]})})})})})})})})]})}export{j as default};