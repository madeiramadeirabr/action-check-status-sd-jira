/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 806:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 946:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 771:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(806);
const github = __nccwpck_require__(946)
const axios = __nccwpck_require__(771)

var status = null
async function run (){    
    try {
      if(checkRepoConfig(github.context)){        
        let basic_auth =  core.getInput("basic-auth")
        let url = core.getInput("url-jira")    
        let interval = setInterval(()=>{
          if(getStatus() == null || getStatus() != 'done')
            setStatus(basic_auth, url)
          if (getStatus() != null)
            checkStatus(interval)
        } , 30000)
      }else{
        core.setFailed("The merge needs to be done with the default branch")
      }
    } catch (error) {
        core.setFailed(error.message) 
    }
}

async function checkStatus(interval) {   
    if (getStatus() == 'done'){
      clearInterval(interval)
      core.setOutput("result", "Approved Service Desk")
    }else{
      console.log('Pending approval')
    }
}

async function setStatus(basic_auth, url) {
    
    await axios.get(url,
      {
        headers: {
          Authorization: basic_auth,
        }

      }).then((res) => {
        status = res.data.currentStatus.statusCategory.toLowerCase()
      }).catch((error) => {
        core.setFailed(error.message)
      })      
}
 
function getStatus() {
    return status
}

function checkRepoConfig (context){
    return context.payload.pull_request.base.ref == context.payload.repository.default_branch
}

run()
})();

module.exports = __webpack_exports__;
/******/ })()
;