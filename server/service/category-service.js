const СategoryModel = require('../models/category-model');
const CyrillicToTranslit = require('cyrillic-to-translit-js');
const ApiError = require('../exceptions/api-error')
const StyleModel = require('../models/style-model');

class CategoryService {
    async createNewCategory(categoryName) {
        if (!categoryName.trim()) {
            throw ApiError.BadRequest('Название категории не может быть пустым')
        }

        const existingCategory = await СategoryModel.findOne({ categoryName: { $regex: new RegExp(`^${categoryName}$`, 'i') }})
        if (existingCategory) {
            throw ApiError.BadRequest('Такая категория уже существует')
        }

        const cyrillicToTranslit = new CyrillicToTranslit();
        const categoryLink = cyrillicToTranslit.transform(categoryName, "_").toLowerCase()

        const newCategory = await СategoryModel.create({ categoryName, categoryLink })
        await StyleModel.create({ categoryName })

        return { newCategory }
    }
    
    async getCategories() {
        const categories = await СategoryModel.find()
        return categories;
    }

    async removeCategory(_id){
        const category = await СategoryModel.findOne({_id})
        const categoryName = category.categoryName
        await StyleModel.deleteOne({categoryName})
        const categotyData= await СategoryModel.deleteOne({_id})
        return categotyData 
    }

    async editCategory(_id, newCategoryName){
        const existingCategory = await СategoryModel.findOne({ categoryName: { $regex: new RegExp(`^${newCategoryName}$`, 'i') }})
        if (existingCategory) {
            throw ApiError.BadRequest('Такая категория уже существует')
        }
        
        const cyrillicToTranslit = new CyrillicToTranslit()
        const newCategoryLink = cyrillicToTranslit.transform(newCategoryName, "_").toLowerCase()

        const categoriy=await СategoryModel.findById({_id})
        const style = await StyleModel.findOne({categoryName:categoriy.categoryName})

        style.categoryName = newCategoryName
        style.save()

        categoriy.categoryName=newCategoryName
        categoriy.categoryLink=newCategoryLink
        categoriy.save()
        
        return categoriy
    }
}

module.exports= new CategoryService()