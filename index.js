/* empty css                      */import{a as m,S as b,i as f}from"./assets/vendor-61TxKDl8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();async function L(e,t){return(await m.get(`${e}${t}`)).data}const S=document.querySelector(".gallery");function x(e){let t="";e.forEach(r=>{t+=`
            <li class="gallery_item">
                <a class="gallery_link" href="${r.largeImageURL}" title="${r.tags}">
                    <img
                        class="gallery-image"
                        src="${r.webformatURL}"
                        alt="${r.tags}"
                    />
                </a>
                <ul class="gallery_info">
                    <li><span class="bold_text">Likes</span><p class="text">${r.likes}</p></li>
                    <li><span class="bold_text">Views</span><p class="text">${r.views}</p></li>
                    <li><span class="bold_text">Comments</span><p class="text">${r.comments}</p></li>
                    <li><span class="bold_text">Downloads</span><p class="text">${r.downloads}</p></li>
                </ul>
            </li>
        `}),S.insertAdjacentHTML("beforeend",t),new b(".gallery a",{nav:!0,overlay:!0,captions:!0,captionSelector:"self",captionType:"attr",captionData:"title",captionPosition:"bottom",captionDelay:250}).refresh()}const{form:w,search:p,loader:v,loadButton:l,gallery:E}=C({form:"form",search:".search_bar",loader:".loader",loadButton:".load",gallery:".gallery"}),n={source:"https://pixabay.com/api/?",options:new URLSearchParams({key:"46749030-b6cef6a6b69e043ecf4444c1b",image_type:"photo",orientation:"horizontal",per_page:12})},d={noMatchError:"Sorry, there are no images matching your search query. Please try again!",collectionEndMessage:"We're sorry, but you've reached the end of search results."};let c;w.addEventListener("submit",I);l.addEventListener("click",$);function I(e){e.preventDefault();const t=q();t&&(h(!1),R(),u(!0),_(t))}function _(e){n.options.set("page",c),n.options.set("q",e),g()}function $(){u(!0),B(),g(),setTimeout(P,800)}function g(){L(n.source,n.options).then(e=>M(e)).catch(e=>{console.error("API Error:",e),y(e.message||"An unexpected error occurred. Please try again.")}).finally(()=>{u(!1),T()})}function P(){const e=document.querySelector(".gallery .gallery_item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2+20,left:0,behavior:"smooth"})}}function M(e){e.total?(x(e.hits),h(!0),O(e.total)):y(d.noMatchError)}function O(e){parseInt(n.options.get("per_page"))*parseInt(n.options.get("page"))>e&&(k(),A(d.collectionEndMessage))}function q(){return p.value.trim()}function R(){c=1,E.innerHTML=""}function T(){p.value=""}function u(e){v.style.display=e?"block":"none"}function h(e){l.style.display=e?"block":"none"}function B(){n.options.set("page",++c)}function k(){l.style.display="none"}function C(e){const t={};return Object.entries(e).forEach(([s,r])=>{t[s]=document.querySelector(r)}),t}function y(e){f.error({message:e,position:"topRight",color:"red",theme:"dark"})}function A(e){f.info({message:e,position:"topRight",color:"blue",theme:"dark"})}
//# sourceMappingURL=index.js.map