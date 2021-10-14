const { TokenJWT } = require('../../middleware/authenticate');

const token = new TokenJWT();
const { UserController } = require('../../controllers/user.controller');

const userController = new UserController();

const { NewsController } = require('../../controllers/news.controller');

const newsController = new NewsController();

const { ListController } = require('../../controllers/lists.controller');

const listController = new ListController();

const { ItemController } = require('../../controllers/item.controller');

const itemController = new ItemController();

const { EventsController } = require('../../controllers/event.constroller');

const eventsController = new EventsController();

const { BannerController } = require('../../controllers/banner.controller');

const bannerController = new BannerController();

const { AdsController } = require('../../controllers/ads.controller');

const adsController = new AdsController();

const { VendorController } = require('../../controllers/vendor.controller');

const vendorController = new VendorController();

const { AccountController } = require('../../controllers/account.controller');

const accountController = new AccountController();

const supportController = require('../../controllers/support.controller');

const { DataChecker } = require('../../middleware/dataChecker');

const dataCheck = new DataChecker();

module.exports = (router) => {
  // user related All routes

  router.post('/user/login', userController.userLogin);
  router.post(
    '/user/register',
    dataCheck.dataValidation,
    userController.userRegister,
  );
  router.put(
    '/user/update-profile',
    token.tokenValidation,
    userController.updateProfile,
  );
  router.patch(
    '/user/update-password',
    token.tokenValidation,
    userController.updatePassword,
  );
  router.patch('/user/verify-password', userController.verifyPassword);
  router.get('/user/info', token.tokenValidation, userController.userInfo);
  router.get('/user/redeem-list', userController.redeemList);
  router.get('/user/options', userController.options);
  router.post('/user/update-email', userController.updateEmail);
  router.patch(
    '/user/update-mobile',
    token.tokenValidation,
    userController.updateMobile,
  );
  router.post('/user/update-personal-profile', userController.updatePersonalProfile);
  router.post('/user/update-vendor-profile', userController.updateVendorProfile);
  router.post('/user/upload-doc', userController.uploadDoc);
  router.post('/user/update-vehicle', userController.updateVehicle);
  router.get('/user/get-doc', userController.getDoc);
  router.get('/user/getAllUsers', token.tokenValidation, userController.getAllUsers);

  // News related All router

  router.post('/news/add', token.tokenValidation, newsController.add);
  router.put('/news/update', token.tokenValidation, newsController.updateNews);
  router.get('/news/list', token.tokenValidation, newsController.listNews);
  router.delete(
    '/news/removeNews',
    token.tokenValidation,
    newsController.removeNews,
  );
  router.get('/news/trending', token.tokenValidation, newsController.trendingNews);
  router.get('/news/happening', token.tokenValidation, newsController.happeningNews);
  router.get('/news/view', token.tokenValidation, newsController.view);
  router.post('/news/addGallery', token.tokenValidation, newsController.addGallery);
  router.put(
    '/news/updateGallery',
    token.tokenValidation,
    newsController.updateGallery,
  );
  router.delete(
    '/news/removeGallery',
    token.tokenValidation,
    newsController.removeGallery,
  );
  router.get('/news/getGallery', token.tokenValidation, newsController.getGallery);
  router.get('/news/searchNews', token.tokenValidation, newsController.getNews);

  // news updates through admin
  router.patch(
    '/news/isHappening',
    token.tokenValidation,
    newsController.isHappeningNews,
  );
  router.patch(
    '/news/isTrending',
    token.tokenValidation,
    newsController.isTrendingNews,
  );
  router.patch(
    '/news/isActiveNews',
    token.tokenValidation,
    newsController.isActiveNews,
  );

  router.get('/news/trending', newsController.trending);
  router.get('/news/happening', newsController.happening);
  router.get('/news/news', newsController.news);
  router.get('/news/guest', newsController.guest);

  // Listing related All router

  router.post('/listing/add', token.tokenValidation, listController.add);
  router.put('/listing/edit', token.tokenValidation, listController.edit);
  router.get('/listing/info', token.tokenValidation, listController.info);
  router.get('/listing/list-all', token.tokenValidation, listController.listAll);
  router.post('/listing/upload', token.tokenValidation, listController.upload);
  router.put(
    '/listing/replace-image',
    token.tokenValidation,
    listController.replaceImage,
  );
  router.patch(
    '/listing/set-primary',
    token.tokenValidation,
    listController.setPrimary,
  );
  router.delete(
    '/listing/gallery-delete',
    token.tokenValidation,
    listController.galleryDelete,
  );
  router.delete(
    '/listing/remove-list',
    token.tokenValidation,
    listController.removeList,
  );

  // Listing through Admin
  router.patch('/listing/approved', token.tokenValidation, listController.approved);

  // Item related All router

  router.post('/item/add', token.tokenValidation, itemController.add);
  router.put('/item/edit', token.tokenValidation, itemController.edit);
  router.get('/item/info', token.tokenValidation, itemController.info);
  router.get('/item/list-all', token.tokenValidation, itemController.itemAll);
  router.post('/item/upload', token.tokenValidation, itemController.upload);
  router.patch(
    '/item/set-primary',
    token.tokenValidation,
    itemController.setPrimary,
  );
  router.put(
    '/item/replace-image',
    token.tokenValidation,
    itemController.replaceImage,
  );
  router.delete(
    '/item/gallery-delete',
    token.tokenValidation,
    itemController.galleryDelete,
  );
  router.delete(
    '/item/removeItem',
    token.tokenValidation,
    itemController.removeItem,
  );

  // Item redeem
  router.post('/item/add-redeem', token.tokenValidation, itemController.addRedeem);
  router.get('/item/redeem-list', token.tokenValidation, itemController.getRedeem);
  router.get(
    '/item/redeem-info',
    token.tokenValidation,
    itemController.getRedeemInfo,
  );

  router.put(
    '/item/update-redeem',
    token.tokenValidation,
    itemController.updateRedeem,
  );
  router.delete(
    '/item/delete-redeem',
    token.tokenValidation,
    itemController.deleteRedeem,
  );

  // Items through Admin
  router.patch(
    '/item/item-approved',
    token.tokenValidation,
    itemController.approved,
  );
  router.patch(
    '/item/redeem-approved',
    token.tokenValidation,
    itemController.approvedRedeem,
  );

  // event controller related routes
  router.post('/event/create', token.tokenValidation, eventsController.create);
  router.put('/event/update', token.tokenValidation, eventsController.updateEvent);
  router.delete(
    '/event/deleteEvent',
    token.tokenValidation,
    eventsController.removeEvent,
  );
  router.get(
    '/event/getAllEvents',
    token.tokenValidation,
    eventsController.listEvent,
  );
  router.get('/event/view', token.tokenValidation, eventsController.view);

  // Event Gallery Related
  router.post(
    '/event/addGallery',
    token.tokenValidation,
    eventsController.addGallery,
  );
  router.put(
    '/event/updateGallery',
    token.tokenValidation,
    eventsController.updateGallery,
  );
  router.delete(
    '/event/removeGallery',
    token.tokenValidation,
    eventsController.removeGallery,
  );
  router.get(
    '/event/getGallery',
    token.tokenValidation,
    eventsController.getGallery,
  );

  // Banner controller related routes

  router.get('/banner/list', bannerController.list);
  router.get('/banner/viewBanner', bannerController.viewBanner);
  router.post('/banner/create', bannerController.create);
  router.put('/banner/updateBanner', bannerController.updateBanner);
  router.delete('/banner/removeBanner', bannerController.removeBanner);

  // Support controller related routes

  router.post('/support/inquire', supportController.inquire);

  // Ads controller related routes

  router.post('/ads/createAds', token.tokenValidation, adsController.add);
  router.patch(
    '/ads/updateisBottom',
    token.tokenValidation,
    adsController.updateisBottom,
  );
  router.get('/ads/list', token.tokenValidation, adsController.list);
  router.get('/ads/viewAds', token.tokenValidation, adsController.getById);
  router.patch('/ads/updateAds', token.tokenValidation, adsController.updateAds);
  router.delete('/ads/deleteAds', token.tokenValidation, adsController.removeAds);

  // vendor controller related routes

  router.get('/vendor/getProfile', token.tokenValidation, vendorController.list);
  router.post(
    '/vendor/registration',
    dataCheck.dataValidation,
    vendorController.registration,
  );
  router.put(
    '/vendor/update_1',
    token.tokenValidation,
    vendorController.updateVendor_1,
  );
  router.put(
    '/vendor/update_2',
    token.tokenValidation,
    vendorController.updateVendor_2,
  );
  router.put(
    '/vendor/update_3',
    token.tokenValidation,
    vendorController.updateVendor_3,
  );
  router.get(
    '/vendor/getAll',
    token.tokenValidation,
    vendorController.getAllVendors,
  );
  router.get('/vendor/view', token.tokenValidation, vendorController.viewVendor);
  router.delete('/vendor/removeVendor', vendorController.removeVendor);

  // Super Admin Routes which control Account section

  router.get('/account/list', accountController.list);
  router.post('/account/createAccount', accountController.createAccount);
  router.put('/account/updateAccount', accountController.updateAccount);
  router.delete('/account/removeAccount', accountController.removeAccount);
};
