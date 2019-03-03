{
    let view={
        el:'.page>main',
        template:`<h1>新建歌曲</h1>
        <form action="" class="songForm">
            <div class="row">
                <lavel>
                    歌名
                    <input type=text>
                </lavel>
            </div>
            <div class="row">
                    <lavel>
                        歌手
                        <input type=text>
                    </lavel>
                </div>
                <div class="row">
                        <lavel>
                            外链
                            <input type=text>
                        </lavel>
                    </div>       
            <div class="row">
                    <label for="sub" class="ui-sub">保存</label>
                    <input type="submit" id="sub"   style="display: none;" />
            
            
                
            </div>             
        </form>`,
        render(data){
            $(this.el).html(this.template)
        }
        
    }
    let model={

    }
    let controller={
        init(ciew,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
        }

    }
    controller.init(view,model)

}