document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector("body"),t=e.querySelector("nav"),s=e.querySelector(".toggle"),n=e.querySelector(".search-box"),o=(document.querySelector("#darkModeSwitch"),document.querySelector(".main-content"));function l(){t.classList.contains("close")?o.style.marginLeft="0":o.style.marginLeft="250px"}function i(){let e=t.classList.contains("close")?"closed":"open";!function e(t,s,n){let o=new Date;o.setTime(o.getTime()+31536e6),document.cookie=`${t}=${s};expires=${o.toUTCString()};path=/`}("sidebarState",e,365)}!function e(){let s=function e(t){let s=document.cookie.split(";");for(let n=0;n<s.length;n++){let o=s[n].trim(),[l,i]=o.split("=");if(l===t)return i}return null}("sidebarState");"open"===s?(t.classList.remove("close"),l()):(t.classList.add("close"),l())}(),s.addEventListener("click",()=>{t.classList.toggle("close"),l(),i()}),n.addEventListener("click",()=>{t.classList.remove("close"),l(),i()}),!function e(){let s=new MutationObserver(()=>{i()});s.observe(t,{attributes:!0,attributeFilter:["class"]})}()});