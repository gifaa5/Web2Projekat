using WebShop.Dto;

namespace WebShop.Interfaces
{
    public interface ICheckService
    {
        public Task<string> Login(LoginDto loginDto);
        public Task<string> Register(RegisterDto registerDto);
        public Task<string> GoogleLogin(string token);


    }
}
