const StyleModel = require('../models/style-model');
const СategoryModel = require('../models/category-model');

class StyleService{
    async getStyle(categoryLink){   
        const currentСategory = await СategoryModel.findOne({categoryLink})
        if(currentСategory){
            const categoryName = currentСategory.categoryName
            const style = await StyleModel.findOne({categoryName})
            return style
        }else{
            const style = await StyleModel.findOne({categoryName:categoryLink})
            return style
        }
    }
    async editStyle(category, mainColor, secondСolor){  
        const currentСategory = await StyleModel.findOne({categoryName:category})
        
        if(currentСategory){
            currentСategory.mainColor = mainColor
            currentСategory.secondСolor = secondСolor
            
            const [r, g, b] = [
                parseInt(secondСolor.slice(1, 3), 16),
                parseInt(secondСolor.slice(3, 5), 16),
                parseInt(secondСolor.slice(5, 7), 16)   
            ]
            const clamp = (value) => Math.max(0, Math.min(255, value))
            const newR = clamp(r - 25)
            const newG = clamp(g - 25)
            const newB = clamp(b - 25)
            
            const rgbToHex = (r, g, b) => {
                const toHex = (value) => value.toString(16).padStart(2, '0')
                return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
            }
            currentСategory.accentColor = rgbToHex(newR, newG, newB)

            currentСategory.save()
            return currentСategory
        }
        
    }
}

module.exports = new StyleService();