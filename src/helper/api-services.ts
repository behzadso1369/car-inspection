export default {
//masterSiteData
GetMasterPageData: "Site/GetMasterPageData",
GetOrders: "User/GetUserOrders",
CheckPhoneNumber: "User/UserCheckPhoneNumber",
UserVerify: "User/UserVerify",
UserRegister: "User/UserRegister",
Logout: "User/Logout",
GetBarnds: "Site/SearchWithBrand",
GetCarGroups: "Site/SearchWithCarGroup",
GetAllData: "Site/SearchWithAllData",
GetCarGroupWithBrandId: "Site/GetCarGroupWithBrandId",
GetCarInspectionData:"Site/GetCarInspectionData",
CreateOrder: "OrderSite/Create",
MoveOrder: "OrderSite/Move",
MovePrivateOrder: "OrderSite/Move/Private",
GetCarInspectionLocationData:"Site/GetCarInspectionLocationData",
GetCarInspectionDateAndTime:"Site/GetCarInspectionDateAndTime",
GetCarInspectionDateType:"Site/GetCarInspectionDateType",
GetUserOrderDetails: "Site/GetUserOrderDetails",
GetUserOrderDetail: "User/GetUserOrderDetails",

GetMasterBlogPageData: "SiteBlog/GetMasterPageData",
GetAboutUsPageData: "Site/GetAboutUsPageData",
SearchWithTermsCategory: "SiteBlog/SearchWithTermsCategory",
SearchCategoryWithId: "SiteBlog/SearchCategoryWithId"






} as { [type: string]: string };
