const a0_0x5a9b1e=a0_0x1968;!function(e,t){const n=a0_0x1968,o=a0_0x15d8();for(;;)try{if(862116===parseInt(n(412))/1+-parseInt(n(404))/2*(parseInt(n(419))/3)+-parseInt(n(391))/4*(parseInt(n(428))/5)+parseInt(n(425))/6*(-parseInt(n(427))/7)+-parseInt(n(397))/8+parseInt(n(407))/9*(parseInt(n(410))/10)+parseInt(n(393))/11*(parseInt(n(422))/12))break;o.push(o.shift())}catch(e){o.push(o.shift())}}();const OFFSET_TOLERANCE_VALUE=100,UIElementsFooter={footer:document[a0_0x5a9b1e(408)](a0_0x5a9b1e(424)),closePanel:document.getElementById("closeButton"),formSubmitButton:document.querySelector("#submitButton"),userForm:document[a0_0x5a9b1e(408)](a0_0x5a9b1e(420)),backgroundPanel:document[a0_0x5a9b1e(408)](a0_0x5a9b1e(409)),titleElement:document.querySelector("#PrivacyPolicyTitle"),loadingSpinner:document.querySelector(a0_0x5a9b1e(401))};function debounce(e,t){let n;return function(...o){clearTimeout(n),n=setTimeout((()=>{clearTimeout(n),e(...o)}),t)}}function adjustFooter(e,t){const n=a0_0x5a9b1e,o=e.backgroundPanel[n(405)],a=e[n(396)][n(402)];let r=OFFSET_TOLERANCE_VALUE+o+a;e[n(406)]&&(r+=e[n(406)][n(405)]+e.titleElement[n(402)]),t<=780&&(e.footer[n(411)][n(403)]=(r<t?t:r)+"px")}function centerSubmitButton(e){const t=a0_0x5a9b1e,n=(e[t(398)][t(416)]-e[t(395)][t(416)])/2,o=n+e[t(395)][t(416)]+20;e[t(395)][t(411)][t(394)]=n+"px",e.loadingSpinner[t(411)][t(394)]=o+"px"}function a0_0x1968(e,t){const n=a0_0x15d8();return(a0_0x1968=function(e,t){return n[e-=390]})(e,t)}function redirectToHomePage(){const e=a0_0x5a9b1e;window[e(429)][e(392)]=e(414)}function resetScrollIfNeeded(){const e=a0_0x5a9b1e;window[e(413)](document[e(426)])[e(423)]===e(400)&&window[e(421)]({top:0,left:0,behavior:"smooth"})}function initializeAndRefreshPage(e){const t=a0_0x5a9b1e,n=document.documentElement[t(418)],o=document[t(426)][t(430)];e[t(398)]&&e[t(395)]&&centerSubmitButton(e),adjustFooter(e,o,n),resetScrollIfNeeded()}function a0_0x15d8(){const e=["querySelector",".transparent_background","539860TExirV","style","14136fyUsAe","getComputedStyle","index","resize","offsetWidth","addEventListener","clientWidth","1103154YOyobv","form","scrollTo","17028UKqXbU","overflowY","footer","2570898KjpXac","documentElement","7JaUIpT","2430215JzFQoO","location","clientHeight","closePanel","12XjLCtF","href","24035aDejlU","left","formSubmitButton","backgroundPanel","3603688Dqdbqq","userForm","DOMContentLoaded","hidden",".loading-spinner","offsetHeight","top","6kXQmkb","offsetTop","titleElement","198PWcCRK"];return(a0_0x15d8=function(){return e})()}const debouncedRefreshPageSize=debounce((()=>initializeAndRefreshPage(UIElementsFooter)),250);window.addEventListener(a0_0x5a9b1e(399),(()=>{const e=a0_0x5a9b1e;initializeAndRefreshPage(UIElementsFooter),UIElementsFooter[e(390)][e(417)]("click",redirectToHomePage)})),window.addEventListener(a0_0x5a9b1e(415),(()=>debouncedRefreshPageSize(UIElementsFooter)));