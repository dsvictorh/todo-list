!function(){angular.module("angular-storage",["angular-storage.store"]),angular.module("angular-storage.cookieStorage",[]).service("cookieStorage",["$cookies",function(e){this.set=function(t,r){return e.put(t,r)},this.get=function(t){return e.get(t)},this.remove=function(t){return e.remove(t)}}]),angular.module("angular-storage.internalStore",["angular-storage.localStorage","angular-storage.sessionStorage"]).factory("InternalStore",["$log","$injector",function(e,t){function r(e,r,o,a){this.namespace=e||null,(angular.isUndefined(a)||null==a)&&(a=!0),this.useCache=a,this.delimiter=o||".",this.inMemoryCache={},this.storage=t.get(r||"localStorage")}return r.prototype.getNamespacedKey=function(e){return this.namespace?[this.namespace,e].join(this.delimiter):e},r.prototype.set=function(e,t){this.useCache&&(this.inMemoryCache[e]=t),this.storage.set(this.getNamespacedKey(e),JSON.stringify(t))},r.prototype.get=function(t){var r=null;if(this.useCache&&t in this.inMemoryCache)return this.inMemoryCache[t];var o=this.storage.get(this.getNamespacedKey(t));try{r="undefined"==typeof o||"undefined"===o?void 0:JSON.parse(o),this.useCache&&(this.inMemoryCache[t]=r)}catch(a){e.error("Error parsing saved value",a),this.remove(t)}return r},r.prototype.remove=function(e){this.useCache&&(this.inMemoryCache[e]=null),this.storage.remove(this.getNamespacedKey(e))},r}]),angular.module("angular-storage.localStorage",["angular-storage.cookieStorage"]).service("localStorage",["$window","$injector",function(e,t){var r;try{e.localStorage.setItem("testKey","test"),e.localStorage.removeItem("testKey"),r=!0}catch(o){r=!1}if(r)this.set=function(t,r){return e.localStorage.setItem(t,r)},this.get=function(t){return e.localStorage.getItem(t)},this.remove=function(t){return e.localStorage.removeItem(t)},this.clear=function(){e.localStorage.clear()};else{var a=t.get("cookieStorage");this.set=a.set,this.get=a.get,this.remove=a.remove}}]),angular.module("angular-storage.sessionStorage",["angular-storage.cookieStorage"]).service("sessionStorage",["$window","$injector",function(e,t){var r;try{e.sessionStorage.setItem("testKey","test"),e.sessionStorage.removeItem("testKey"),r=!0}catch(o){r=!1}if(r)this.set=function(t,r){return e.sessionStorage.setItem(t,r)},this.get=function(t){return e.sessionStorage.getItem(t)},this.remove=function(t){return e.sessionStorage.removeItem(t)};else{var a=t.get("cookieStorage");this.set=a.set,this.get=a.get,this.remove=a.remove}}]),angular.module("angular-storage.store",["angular-storage.internalStore"]).provider("store",function(){var e="localStorage",t=!0;this.setStore=function(t){t&&angular.isString(t)&&(e=t)},this.setCaching=function(e){t=!!e},this.$get=["InternalStore",function(r){var o=new r(null,e,null,t);return o.getNamespacedStore=function(e,t,o,a){return new r(e,t,o,a)},o}]})}();