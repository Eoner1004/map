class Init {
    constructor(){
        this.serverUrl = null
        this.axiosFn = null
    }
    init(obj){
        if(obj){
            if(obj.serverUrl){
                this.serverUrl=obj.serverUrl
            }
            if(obj.axiosFn){
                this.axiosFn=obj.axiosFn
            }
        }
    }

    getAxiosFn = () => {
        if(this.axiosFn){
            return this.axiosFn
        }
    }

    getServerUrl = () => {
        if(this.serverUrl){
            return this.serverUrl
        }
    }
}

let initData = new Init()
export default initData