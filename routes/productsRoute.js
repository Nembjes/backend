// Код серверного роутинга productsRouter.js
import express from 'express';
import {
   getAllProducts,
   getProductById,
   getProductsByCategoryId,
   getProductsByBrand,
   getProductsByPriceRange,
   getUniqueBrands,
   getUniqueCategories,
   getFeaturedProducts,
   createProduct,
   updateProduct,
   deleteProduct,
   getProductsByRating,
   fetchMostPurchasedProducts,
   fetchTopRatedProducts,
   getImagesByProductId,
   addImageToProduct,
   updateImageInProduct,
   deleteImageFromProduct,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/featured', getFeaturedProducts);
productsRouter.get('/brands', getUniqueBrands);
productsRouter.get('/categories', getUniqueCategories);
productsRouter.get('/mostPurchased', fetchMostPurchasedProducts);
productsRouter.get('/topRated', fetchTopRatedProducts);

productsRouter.get('/:id', getProductById);
productsRouter.get('/category/:id', getProductsByCategoryId);
productsRouter.get('/brand/:id', getProductsByBrand);
productsRouter.get('/price/:minPrice/:maxPrice', getProductsByPriceRange);
productsRouter.get('/rating/:minRating/:maxRating', getProductsByRating);

productsRouter.post('/', createProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

productsRouter.get('/:id/images', getImagesByProductId);
productsRouter.post('/:id/images', addImageToProduct);
productsRouter.patch('/:productId/images/:imageId', updateImageInProduct);
productsRouter.delete('/:productId/images/:imageId', deleteImageFromProduct);

export default productsRouter;
