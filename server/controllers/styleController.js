const StyleService = require('../service/style-service');

class StyleController {
    async getStyle(req,res,next){
        try {
            const style = await StyleService.getStyle(req.query.categorylink)
            return res.json(style)
        } catch (error) {
            next(error)
        }
    }
    async editStyle(req,res,next){
        try {
            const {selectedCategory,mainColor,secondСolor} = req.body.editCurrentCategory;
            const style = await StyleService.editStyle(selectedCategory,mainColor,secondСolor)
            return res.json(style) 
        } catch (error) {
            next(error)
        }
        
    }
}
module.exports = new StyleController()