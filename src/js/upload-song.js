
{
    let view={
        el:'.songUpload',
        
        
        
    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.initBmob()
            
        },
        initBmob(){
            
        
        
        const fileUploadControl = document.getElementById('fileUpload')
                    fileUploadControl.onchange = () => {
                        const pic = fileUploadControl.files
                        let file
                        for(let item of pic){
                        file = Bmob.File(item.name, item);
                    }
                        file.save().then(res => {
                            
                            window.eventHub.emit('upload',{
                                url:res[0].url,
                                name:res[0].filename
                            })
                            
        
          
                        })
                    }
            
        }
        
        

            
        
    
  

        

    }
    controller.init(view,model)

}