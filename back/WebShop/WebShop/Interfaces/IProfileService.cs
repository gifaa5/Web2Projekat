using WebShop.Dto;

namespace WebShop.Interfaces
{
    public interface IProfileService
    {
        public Task<ProfileDto> GetProfileInfo(int id);
        public Task<string> EditProfile(int id, ProfileDto profileDto);
        public Task<List<OrderDto>> GetAllOrders();
        public Task<List<SellerDto>> GetSellers();
    }
}
