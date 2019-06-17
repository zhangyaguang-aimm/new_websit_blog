
class BaseModel{
    constructor(data,message){
        if(typeof data == 'string'){
            this.message = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}

class SuccessResModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.code = 1
    }
}

class ErrorResModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.code = -1
    }
}

module.exports = {
    SuccessResModel,
    ErrorResModel
}