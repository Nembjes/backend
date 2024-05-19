import { Sequelize, Op } from 'sequelize';
import Products from '../models/products.js';
import RateprodCustomer from '../models/rateprodcustomer.js';
import Images from '../models/images.js';
import Orderdetails from '../models/orderdetails.js';
import Rate from '../models/rate.js';

export const getAllProducts = async (req, res) => {
   try {
      const products = await Products.findAll({
         include: ['brand', 'category'],
         order: [['id', 'DESC']],
      });
      res.json(products);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const fetchMostPurchasedProducts = async (req, res) => {
   try {
      const mostPurchasedProducts = await Orderdetails.findAll({
         attributes: [
            'prod_code',
            [
               Sequelize.fn('SUM', Sequelize.literal('productQuantity')),
               'totalQuantity',
            ],
         ],
         group: ['prod_code'],
         order: [[Sequelize.literal('totalQuantity'), 'DESC']],
         limit: 8,
      });

      // Extract product codes from the result
      const productCodes = mostPurchasedProducts.map((item) => item.prod_code);

      // Fetch product details based on product codes
      const mostPurchasedProductsDetails = await Products.findAll({
         where: { id: productCodes },
         include: ['brand', 'category'],
      });

      res.json(mostPurchasedProductsDetails);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const fetchTopRatedProducts = async (req, res) => {
   try {
      const topRatedProducts = await RateprodCustomer.findAll({
         attributes: [
            'prod_code',
            [
               Sequelize.fn(
                  'AVG',
                  Sequelize.cast(Sequelize.literal('rate.value'), 'SIGNED')
               ),
               'averageRating',
            ],
         ],
         include: [
            {
               model: Rate,
               as: 'rate',
               attributes: [], // чтобы избежать извлечения всех столбцов из связанной таблицы
            },
         ],
         group: ['prod_code'],
         order: [[Sequelize.literal('averageRating'), 'DESC']],
         limit: 8,
      });

      // Extract product codes from the result
      const productCodes = topRatedProducts.map((item) => item.prod_code);

      // Fetch product details based on product codes
      const topRatedProductsDetails = await Products.findAll({
         where: { id: productCodes },
         include: ['brand', 'category'],
      });

      res.json(topRatedProductsDetails);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getProductById = async (req, res) => {
   try {
      const product = await Products.findAll({
         include: ['brand', 'category'],
         where: { id: req.params.id },
      });
      res.json(product[0]);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getProductsByCategoryId = async (req, res) => {
   try {
      const products = await Products.findAll({
         include: ['brand', 'category'],
         where: { category_id: req.params.id },
         order: [['createdAt', 'DESC']],
      });
      res.json(products);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getProductsByBrand = async (req, res) => {
   try {
      const products = await Products.findAll({
         include: ['brand', 'category'],
         where: { brand_id: req.params.id },
         order: [['createdAt', 'DESC']],
      });
      res.json(products);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getProductsByPriceRange = async (req, res) => {
   try {
      const { minPrice, maxPrice } = req.params;
      const products = await Products.findAll({
         include: ['brand', 'category'],
         where: {
            cost: {
               [Op.between]: [minPrice, maxPrice],
            },
         },
         order: [['createdAt', 'DESC']],
      });
      res.json(products);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getProductsByRating = async (req, res) => {
   try {
      const { minRating, maxRating } = req.params;

      const products = await Products.findAll({
         include: ['brand', 'category'],
         where: {
            '$rateprodCustomer.value$': {
               [Op.between]: [minRating, maxRating],
            },
         },
         include: [
            {
               model: RateprodCustomer,
               as: 'rateprodCustomer',
               attributes: [],
            },
         ],
         order: [['createdAt', 'DESC']],
      });

      res.json(products);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getUniqueBrands = async (req, res) => {
   try {
      const uniqueBrands = await Products.findAll({
         attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('brand_id')), 'brand_id'],
         ],
      });
      res.json(uniqueBrands);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getFeaturedProducts = async (req, res) => {
   try {
      const featuredProducts = await Products.findAll({
         limit: 5,
         order: [['createdAt', 'DESC']],
      });

      res.json(featuredProducts);
   } catch (error) {
      console.error('Error fetching featured products:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
   }
};

export const getUniqueCategories = async (req, res) => {
   try {
      const uniqueCategories = await Products.findAll({
         attributes: [
            [
               Sequelize.fn('DISTINCT', Sequelize.col('category_id')),
               'category_id',
            ],
         ],
      });
      res.json(uniqueCategories);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const createProduct = async (req, res) => {
   try {
      await Products.create(req.body);
      res.json({ message: 'Product Created' });
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const updateProduct = async (req, res) => {
   try {
      const { additionalImages, ...productData } = req.body;

      await Products.update(productData, {
         where: { id: req.params.id },
      });

      // Если есть дополнительные изображения, обновляем их
      if (additionalImages && additionalImages.length > 0) {
         // Удаляем все текущие дополнительные изображения для данного продукта
         await Images.destroy({
            where: { prod_id: req.params.id },
         });

         // Создаем новые записи для дополнительных изображений
         const imagePromises = additionalImages.map(async (link) => {
            await Images.create({ prod_id: req.params.id, link });
         });

         await Promise.all(imagePromises);
      }

      res.json({ message: 'Product Updated' });
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const deleteProduct = async (req, res) => {
   try {
      await Products.destroy({
         where: { id: req.params.id },
      });
      res.json({ message: 'Product Deleted' });
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const getImagesByProductId = async (req, res) => {
   try {
      const images = await Images.findAll({
         where: { prod_id: req.params.id },
         order: [['createdAt', 'DESC']],
      });
      res.json(images);
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const updateImageInProduct = async (req, res) => {
   try {
      const { imageId, productId } = req.body; 

      await Images.update(req.body, {
         where: { id: imageId, prod_code: productId },
      });
      res.json({ message: 'Image in Product Updated' });
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const addImageToProduct = async (req, res) => {
   try {
      const { prod_code, link } = req.params; // Изменено на req.params

      // Проверяем, есть ли продукт с указанным prod_code
      const product = await Products.findOne({ where: { prod_code } });

      if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }

      await Images.create({ prod_code, link });
      res.json({ message: 'Image Added to Product' });
   } catch (error) {
      res.json({ message: error.message });
   }
};

export const deleteImageFromProduct = async (req, res) => {
   try {
      await Images.destroy({
         where: { id: req.params.imageId, prod_code: req.params.productId },
      });
      res.json({ message: 'Image in Product Deleted' });
   } catch (error) {
      res.json({ message: error.message });
   }
};
