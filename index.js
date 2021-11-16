const core = require('@actions/core');
const github = require('@actions/github')
const axios = require('axios')

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