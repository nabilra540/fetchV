void 0===window.Hls&&(window.Hls={},window.Hls.isSupported=()=>!1);class t{constructor(){this.disableDetailUrl="/blog/not-support-youtube",this.tab=null,this.options=OPTION,this.langDir="",this.disable=!1,this.bootstrap=null,this.ruleId=1,this.items=[],this.storageKey=null,this.langRender(),this.$item=this.selector("item").cloneNode(!0),this.selector("item").remove(),this.$loading=this.selector("loading"),this.$empty=this.selector("empty"),this.$disable=this.selector("disable"),this.$container=this.selector("container"),this.$list=this.selector("list"),this.$optionsBtn=this.selector("optionsBtn"),this.$options=this.selector("options"),this.$record=this.selector("record",!0),this.$noResourceLead=this.selector("noResourceLead"),this.$noResourceBottom=this.selector("noResourceBottom"),this.$home=this.selector("home"),this.$disableDetail=this.selector("disableDetail")}itemToggle(t,e){const{max:s,min:i}=this.options.size;let o=!0;o=0!==i&&0!==s?e<i||e>s:(0!==i||0!==s)&&(0===i?e>s:e<i),o?t.classList.add("d-none"):t.classList.remove("d-none")}optionRender(){this.$options.classList.add("offcanvas"),this.$options.classList.remove("d-none");const t=new this.bootstrap.Offcanvas(this.$options);this.$optionsBtn.onclick=()=>{t.toggle()},document.querySelectorAll(".tooltip-toggle").forEach((t=>{new this.bootstrap.Tooltip(t)}));const{$options:e,options:s}=this,i=this.selector("sizeMin",!1,e),o=this.selector("sizeMax",!1,e),n=this.selector("noAddDomainTip",!1,e),a=this.selector("noRecordTip",!1,e);i.value=s.size.min/1024,o.value=s.size.max/1024,n.checked=!s.noAddDomainTip,a.checked=!s.noRecordTip;for(const t of s.domain)this.createOptionDomain(t);i.onblur=()=>{let t=i.value||0;t?t=parseInt(t):i.value=0,t*=1024,t!=this.options.size.min&&(this.options.size.min=t,this.saveOptions().then((()=>{for(const t of this.items)"hls"!==t.detail.type&&this.itemToggle(t.$item,t.detail.size);this.toast(this.lang("popup_option_setup_success"))})))},o.onblur=()=>{let t=o.value||0;t?t=parseInt(t):o.value=0,t*=1024,t!=this.options.size.max&&(this.options.size.max=t,this.saveOptions().then((()=>{for(const t of this.items)"hls"!==t.detail.type&&this.itemToggle(t.$item,t.detail.size);this.toast(this.lang("popup_option_setup_success"))})))},n.onclick=()=>{this.options.noAddDomainTip=!n.checked,this.saveOptions().then((()=>this.toast(this.lang("popup_option_setup_success"))))},a.onclick=()=>{this.options.noRecordTip=!a.checked,this.saveOptions().then((()=>this.toast(this.lang("popup_option_setup_success"))))}}createOptionDomain(t){const e=this.selector("domain",!1,this.$options),s=this.selector("noDomain",!1,this.$options);s.classList.contains("d-none")||s.classList.add("d-none");const i=document.createElement("div");i.className="d-flex justify-content-between align-items-center mb-1";const o=document.createElement("span");o.className="flex-grow-1 text-truncate me-2 text-decoration-underline",o.innerText=t;const n=document.createElement("button");n.className="btn btn-light",n.innerHTML='<i class="bi bi-trash3"></i>',i.appendChild(o),i.appendChild(n),e.appendChild(i),n.onclick=()=>{n.onclick=null;const e=this.options.domain.indexOf(t);e>-1&&(this.options.domain.splice(e,1),this.saveOptions()),i.remove(),0===this.options.domain.length&&s.classList.remove("d-none")}}langRender(){document.querySelectorAll(".lang-title").forEach((t=>{let e=t.getAttribute("title");e?(e=e.trim(),t.setAttribute("title",this.lang(e))):(e=t.getAttribute("data-bs-title"),e&&(e=e.trim(),t.setAttribute("data-bs-title",this.lang(e))))})),document.querySelectorAll(".lang").forEach((t=>{let e=t.innerText.trim();e&&(t.innerHTML=this.lang(e))}))}async init(){this.bootstrap=await new Promise((t=>{import("../bootstrap/js/bootstrap.bundle.min.js").then((({bootstrap:e})=>{t(e)}))})),await this.getOptions(),this.langDir=await this.getLangDir(),this.tab=await new Promise((t=>{chrome.tabs.query({currentWindow:!0}).then((e=>{for(const s of e)if(s.active){t(s);break}chrome.storage.local.get(["tasks"],(({tasks:t})=>{if(!t)return;const s=t.filter((t=>e.some((e=>e.id===t.tabId&&e.url.startsWith(this.options.site)))));s.length!==t.length&&chrome.storage.local.set({tasks:s})}))}))})),this.optionRender(),this.$home.onclick=()=>chrome.tabs.create({url:this.options.site+this.langDir,index:this.tab.index+1}),this.$disableDetail.onclick=()=>chrome.tabs.create({url:this.options.site+this.langDir+this.disableDetailUrl,index:this.tab.index+1}),this.$record.forEach((t=>{t.onclick=()=>{const{options:t}=this,e=()=>{const t={targetTab:this.tab.id,type:"rec"};this.createTab(t,!0)};t.noRecordTip?e():this.modal({title:this.lang("popup_record_modal_title"),content:this.lang("popup_record_modal_content"),btnConfirm:this.lang("popup_record_modal_btn_confirm")},(s=>{s!==t.noRecordTip?(t.noRecordTip=s,this.saveOptions().then((()=>e()))):e()}))}})),chrome.runtime.onMessage.addListener(((t,e,s)=>{const{cmd:i,parameter:o}=t;if("POPUP_APPEND_ITEMS"===i){if(!o.tab||!o.item||this.disable)return s(),!0;if(this.tab.id!==o.tab)return s(),!0;this.$empty.classList.add("d-none"),this.$container.classList.remove("d-none");for(const t in o.item)this.itemCreate(o.item[t]);return s(),!0}}));const t=["youtube.com","globo.com"];if(0===this.tab.url.indexOf("http")){const e=new URL(this.tab.url).hostname;for(const s of t)if(e.endsWith(s))return this.$loading.remove(),this.$disable.classList.remove("d-none"),void(this.disable=!0)}this.storageKey=`storage${this.tab.id}`;const e=await new Promise((t=>{try{chrome.storage.local.get([this.storageKey],(e=>{Object.keys(e).length>0?t(e[this.storageKey]):t({})}))}catch(e){t({})}}));if(0===Object.keys(e).length)return this.$loading.remove(),void this.$empty.classList.remove("d-none");this.$loading.remove(),this.$container.classList.remove("d-none");for(const t in e)this.itemCreate(e[t])}selector(t,e=!1,s=null){return s?e?s.querySelectorAll('[selector="'+t+'"]'):s.querySelector('[selector="'+t+'"]'):e?document.querySelectorAll('[selector="'+t+'"]'):document.querySelector('[selector="'+t+'"]')}saveOptions(t=!1){const e=JSON.parse(JSON.stringify(this.options));return e.size.min=e.size.min/1024,e.size.max=e.size.max/1024,new Promise((s=>{chrome.storage.sync.set({options:e}).then((()=>{const e={};t&&(e.storageKey=this.storageKey),chrome.runtime.sendMessage({cmd:"RESET_OPTIONS",parameter:e},(()=>{s()}))}))}))}getOptions(){const t=t=>{t?.size?.min&&(t.size.min=1024*t.size.min,t.size.min<0&&(t.size.min=0)),t?.size?.max&&(t.size.max=1024*t.size.max,t.size.max<0&&(t.size.max=0))};return new Promise((e=>{try{chrome.storage.sync.get(["options"]).then((({options:s})=>{if(s)for(let t in this.options)void 0!==s[t]&&"lang"!==t&&(this.options[t]=s[t]);t(this.options),e()}))}catch(s){t(this.options),e()}}))}getLangDir(){return new Promise((async t=>{let e=await chrome.i18n.getUILanguage();if(e=e.toLowerCase(),e=e.replace(/_/,"-"),e.includes("-")&&!e.startsWith("zh-")){const t=e.split("-")[0];t&&(e=t)}e=this.options.lang.indexOf(e)<0?"":"/"+e,t(e)}))}sizeConvert(t){return t<1024?t+="B":t=t<1048576?(t/1024).toFixed(0)+"K":t<1073741824?(t/1048576).toFixed(0)+"M":(t/1073741824).toFixed(2)+"G",t}creatRules(t){const e=[];t||(t={});let s=!1;for(const i in t){const o=i.toLowerCase();"origin"!==o&&"referer"!==o||(s=!0),e.push({header:i,operation:"set",value:t[i]})}return s?e:null}setRules(t,e){const{ruleId:s}=this;return new Promise((i=>{try{chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:[s],addRules:[{id:s,priority:1,action:{type:"modifyHeaders",requestHeaders:t},condition:{urlFilter:e,resourceTypes:["xmlhttprequest","media"]}}]},(function(){i(s)}))}catch(t){i(0)}}))}removeRules(){chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:[this.ruleId]})}player(t,e,s){const i=document.createElement("video");i.autoplay=!0,i.controls=!0,i.style.maxWidth="100%",e.appendChild(i);const o=this.creatRules(t.headers);if("hls"===t.type){if(Hls.isSupported()){const e={};o&&(e.fetchSetup=async(e,s)=>(await this.setRules(o,t.url),new Request(e.url,s)),e.xhrSetup=async(e,s)=>{await this.setRules(o,t.url),e.open("GET",s,!0)});const n=new Hls(e);return n.on(Hls.Events.FRAG_LOADED,(()=>{o&&this.removeRules()})),n.on(Hls.Events.DESTROYING,(()=>{o&&this.removeRules()})),n.on(Hls.Events.MANIFEST_PARSED,((t,e)=>{let o=0,a=0,l=0;for(const t of n.levels){const{bitrate:e,width:s,height:i}=t;e&&s&&i&&(e>l&&(l=e,o=s,a=i))}o&&a?s.innerText=`${o} x ${a}`:i.addEventListener("loadedmetadata",(()=>{const t=i.videoWidth,e=i.videoHeight;s.innerText=`${t} x ${e}`}))})),n.loadSource(t.url),n.attachMedia(i),n}}else i.addEventListener("loadedmetadata",(()=>{const e=`${i.videoWidth} x ${i.videoHeight}`;t.quality=e,s.innerText=e})),o?this.setRules(o,t.url).then((()=>{i.src=t.url})):i.src=t.url;return null}createTab(t,e=!1,s=null){t.initiator=this.tab.url,t.title=this.tab.title.trim()||this.tab.url,chrome.storage.local.set({queue:t},(()=>{const{options:t,langDir:i}=this;let o="bufferrecorder";if(!e){if(!s)return;o="hls"===s?"m3u8downloader":"videodownloader"}chrome.tabs.create({url:`${t.site}${i}/${o}`,index:this.tab.index+1})}))}itemCreate(t){let e=null;const s=this.$item.cloneNode(!0),i={requestId:t.requestId,detail:t,$item:s},o=this.selector("play",!1,s),n=this.selector("info",!1,s),a=this.selector("name-wrap",!1,s),l=this.selector("name-width",!1,s),r=this.selector("name",!1,s),c=this.selector("name-ellipsis",!1,s),d=this.selector("size",!1,s),h=this.selector("chevron-down",!1,s),m=this.selector("download",!1,s),p=this.selector("blocked",!1,s),u=this.selector("url-collapse",!1,s),b=this.selector("url",!1,s),g=this.selector("url-close",!1,s),f=this.selector("copy",!1,s),v=this.selector("player-collapse",!1,s),y=this.selector("resolution",!1,s),x=this.selector("player",!1,s),w=this.selector("player-close",!1,s);n.setAttribute("title",t.name),r.innerText=t.name,d.innerText="hls"===t.type?"HLS":`${t.type.toUpperCase()}/${this.sizeConvert(t.size)}`,b.innerText=t.url,this.$list.appendChild(s),l.offsetWidth<a.offsetWidth&&(l.classList.remove("h-100","position-absolute","top-0","end-0"),c.remove());const _=new this.bootstrap.Collapse(u,{toggle:!1}),$=new this.bootstrap.Collapse(v,{toggle:!1});u.addEventListener("hide.bs.collapse",(t=>{h.classList.remove("transform-up")})),u.addEventListener("show.bs.collapse",(t=>{h.classList.add("transform-up"),$.hide()})),v.addEventListener("hide.bs.collapse",(t=>{e&&e.destroy(),x.firstElementChild.remove()})),v.addEventListener("show.bs.collapse",(t=>{_.hide()})),n.onclick=()=>{for(const t of this.items)t.requestId!==i.requestId&&t.urlCollapse.hide();_.toggle()},g.onclick=()=>_.hide(),w.onclick=()=>$.hide(),o.onclick=()=>{for(const t of this.items)t.requestId!==i.requestId&&t.playerCollapse.hide();v.classList.contains("show")||(e=this.player(t,x,y),$.show())},m.onclick=()=>{t.contentType.startsWith("audio")?chrome.tabs.create({url:t.url,index:this.tab.index+1}):chrome.storage.local.get(["tasks"],(({tasks:e})=>{e?chrome.tabs.query({currentWindow:!0}).then((s=>{const i=e.find((e=>s.some((t=>t.id===e.tabId&&t.url.startsWith(this.options.site)))&&e.url===t.url));i?chrome.tabs.update(i.tabId,{active:!0}):this.createTab(t,!1,t.type)})):this.createTab(t,!1,t.type)}))},p.onclick=()=>{const{options:e}=this,{hostname:i}=new URL(t.url),o=()=>{if(e.domain.indexOf(i)<0){if(e.domain.length>30)return void this.toast(this.lang("popup_item_block_error"),4e3,!0);e.domain.push(i),this.saveOptions(!0).then((()=>{for(this.createOptionDomain(i);;){let t=!0,e=0;for(const s of this.items){if(new URL(s.detail.url).hostname===i){s.$item.remove(),this.items.splice(e,1),t=!1;break}e++}if(t)break}this.updateBadge(),this.toast(this.lang("popup_item_block_success"))}))}else s.remove()};e.noAddDomainTip?o():this.modal({title:`${this.lang("popup_item_block_modal_title")}: <span class="text-danger text-decoration-underline">${i}</span>`,btnConfirm:this.lang("popup_item_block_modal_btn_confirm"),content:this.lang("popup_item_block_modal_content")},(t=>{e.noAddDomainTip=t,o()}))},f.onclick=()=>{try{navigator.clipboard.writeText(t.url).then((()=>{this.toast(this.lang("popup_item_copy_success"))})).catch((t=>{this.toast(this.lang("popup_item_copy_error"),4e3,!0)}))}catch(t){this.toast(this.lang("popup_item_copy_error"),4e3,!0)}},i.urlCollapse=_,i.playerCollapse=$,this.items.push(i),"hls"!==t.type&&this.itemToggle(s,t.size)}updateBadge(){let t=this.items.length;0===t&&(this.$container.classList.add("d-none"),this.$empty.classList.remove("d-none")),t=t>0?t.toString():"",chrome.action.setBadgeText({text:t,tabId:this.tab.id});try{chrome.action.setBadgeTextColor({color:"#FFFFFF"}),chrome.action.setBadgeBackgroundColor({color:"#FF0000"})}catch(t){}}toast(t,e=3e3,s=!1){const i=document.createElement("div");i.style.zIndex=99999,i.className="w-100 h-100 fixed-top d-flex justify-content-center align-items-start pt-5 pe-none";const o=document.createElement("div");o.className="toast align-items-center border-0 text-white pe-auto";const n=document.createElement("div");n.className="d-flex";const a=document.createElement("div");a.className="toast-body",a.innerText=t;const l=document.createElement("button");if(l.className="btn-close btn-close-white me-2 m-auto",s){const t=document.createElement("span");t.className="text-danger-emphasis",n.appendChild(t),o.classList.add("bg-danger")}else o.classList.add("bg-success");i.appendChild(o),o.appendChild(n),n.appendChild(a),n.appendChild(l),document.body.appendChild(i);const r=new this.bootstrap.Toast(o);r.show(),o.addEventListener("hidden.bs.toast",(()=>{l.onclick=null,r.dispose(),i.remove()})),l.onclick=()=>r.hide(),setTimeout((()=>{r.hide()}),e)}modal(t={},e=((t=!1)=>{})){"string"!=typeof t.title&&(t.title="Tip"),"string"!=typeof t.btnConfirm&&(t.btnConfirm="Confirm"),"string"!=typeof t.content&&(t.content="Content");const{title:s,btnConfirm:i,content:o}=t,n=document.createElement("div");n.className="modal fade",n.setAttribute("tabindex","-1"),n.setAttribute("data-bs-delay",'{"show":150,"hide":150}');const a=document.createElement("div");a.className="modal-dialog",n.appendChild(a);const l=document.createElement("div");l.className="modal-content",a.appendChild(l);const r=document.createElement("div");r.className="modal-header py-3",r.innerHTML=`<h3 class="modal-title fs-6">${s}</h3><button type="button" class="btn-close" data-bs-dismiss="modal"></button>`,l.appendChild(r);const c=document.createElement("div");c.className="modal-body",c.innerHTML=o,l.appendChild(c);const d=document.createElement("div");d.className="modal-footer d-flex justify-content-between align-items-center",l.appendChild(d);const h=document.createElement("label");h.className="d-flex justify-content-start align-items-center pointer";const m=document.createElement("input");m.className="form-check-input fs-5 mt-0 border-2",m.setAttribute("type","checkbox");const p=document.createElement("span");p.className="ps-1",p.innerText=this.lang("popup_no_remind"),h.appendChild(m),h.appendChild(p),d.appendChild(h);const u=document.createElement("button");u.className="btn btn-primary",u.innerText=i,d.appendChild(u),document.body.appendChild(n);const b=new this.bootstrap.Modal(n);b.show(),n.addEventListener("hidden.bs.modal",(t=>{u.onclick=null,b.dispose(),n.remove()})),u.onclick=()=>{e(m.checked),b.hide()}}lang(t){return chrome.i18n.getMessage(t)}}const e=new t;e.init(),chrome.runtime.connect({name:"POPUP"});