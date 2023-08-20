using WebShop.Dto;

namespace WebShop.Interfaces
{
    public interface IProfileService
    {
        public Task<ProfileDto> GetProfileInfo(int id);
        public Task<string> EditProfile(int id, ProfileDto profileDto);
        public Task<List<OrderDto>> GetAllOrders();
        public Task<List<SellerDto>> GetSellers();
        public Task VerifySeller(VerificationDto verificationDto);
        public Task AddProduct(AddProductDto addProductDt0o, int id);
        public Task<List<OrderDto>> GetSellersOrders(int id);
        public Task<List<OrderDto>> GetNewSellersOrders(int id);
        public Task<List<ProductInfoDto>> GetAllProducts();
    }
}
