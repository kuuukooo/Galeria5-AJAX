function getCookie(e){return new Promise((t,o)=>{var n=("; "+document.cookie).split("; "+e+"=");2==n.length?t(n.pop().split(";").shift()):o("Cookie not found")})}async function checkCookie(){try{var e=await getCookie("tipo_usuario");if("Usuario"==e){for(var t=document.getElementsByClassName("delete-button"),o=0;o<t.length;o++)t[o].style.display="none";for(var n=document.getElementsByClassName("btn-edit-description"),o=0;o<n.length;o++)n[o].style.display="none";let i=document.querySelectorAll('[data-ngy2action="custom1"]');for(let l=0;l<i.length;l++)i[l].style.display="none";let s=document.querySelectorAll('[data-ngy2action="custom2"]');for(let a=0;a<s.length;a++)s[a].style.display="none"}else $("#DashboardMenu").show()}catch(r){console.error(r)}}function observeDOM(){var e;new MutationObserver(function(e){e.forEach(function(e){("childList"===e.type||"subtree"===e.type)&&checkCookie()})}).observe(document.body,{childList:!0,subtree:!0})}window.onload=function(){checkCookie(),observeDOM()};