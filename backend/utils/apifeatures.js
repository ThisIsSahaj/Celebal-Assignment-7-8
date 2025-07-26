class ApiFeatures {
    constructor(query, queryStr) {

        // query in the url means anything after ?
        // for eg: http://localhost:4000/api/v1/products?keyword=laptop
        // so query is keyword=laptop

        this.query = query;
        this.queryStr = queryStr;

        // all the params like keyword, category, page are queryStr
        // so we can access them like queryStr.keyword, queryStr.page
    }



    // 📍 Function to SEARCH a product
    search() {
        
        const keyword = this.queryStr.keyword ?
            // if found
            {
                name: {
                    // from mongoDb
                    $regex: this.queryStr.keyword,
                    $options: "i", // "i" means caseInsensitive - capital letters input will also be searched
                }
            } :
            // if not found
            {};


        this.query = this.query.find({ ...keyword });
        return this;
    }

    // 📍 Function to FILTER products

    filter() {

        // first we will need to make some changes in the queryStr for filtering
        // so we will make it's copy

        // const queryCopy =  this.queryStr;  ❌ -- we cannot make a copy like this, bcoz queryStr is an object, and it will be passed as a reference, therefore if we change anything in queryCopy, it will be changed in queryStr as well
        // so to avoid this, copy it as mentioned below

        // ⭐ FILTER FOR CATEGORY

        const queryCopy = { ...this.queryStr };

        // console.log(queryCopy);  //before removing fields

        // Remove some fields from Filter for Category because they are handled separately
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // this will remove keyword, page, limit in URL 
        // eg: http://localhost:4000/api/v1/products?keyword=laptop?page=2
        // so it will remove keyword and page  

        // console.log(queryCopy);  // after removing fields



        // ⭐ FILTER FOR PRICE RANGE

        // console.log(queryCopy)
        // result of above clg - { price: { gte: '1800', lt: '3000' } }
        // when URL was http://localhost:4000/api/v1/products?keyword=macbook&price[gt]=1800&price[lt]=3000

        // The goal is to convert to {"price":{"$gte":"1800","$lt":"3000"}}
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // Eg. converts gt -> $gt




        // this.query = this.query.find(queryCopy);
        this.query = this.query.find(JSON.parse(queryStr));  // JSON.parse becaue we had made queryStr as String above, so here we have to pass it as an OBJECT

        // console.log(queryStr)
        // result of above clg - {"price":{"$gte":"1800","$lt":"3000"}}
        // when URL was http://localhost:4000/api/v1/products?keyword=macbook&price[gt]=1000&price[lt]=2000

        return this;

        //Eg: http://localhost:4000/api/v1/products?keyword=macbook&category=Laptop
        // therefore

    }

    // 📍 Function for PAGINATION - to show limited products on a page
    pagination(resulPerPage) {

        // all the params like keyword, category, page are queryStr
        // so we can access them like queryStr.page

        const currentPage = Number(this.queryStr.page) || 1; // as queryStr is string, we wrap it in Number
        //if page not given then current page will be 1

        const skip = resulPerPage * (currentPage - 1);  //Eg. if we are on 2nd page, then 5 * (2-1) = 5 therefore skip first 5 products

        this.query = this.query.limit(resulPerPage).skip(skip);  // show the first 5 products after skipping some(as we calculated)

        return this;

        // go to postman and try getting all products, only 5 will be shown per page



    }
}

module.exports = ApiFeatures