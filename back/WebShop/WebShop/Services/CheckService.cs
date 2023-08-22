using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Tls.Crypto.Impl.BC;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebShop.Dto;
using WebShop.Interfaces;
using WebShop.Models;
using WebShop.Settings;

namespace WebShop.Services
{
    public class CheckService : ICheckService
    {

        private readonly ICheckService _checkService;
        private readonly IMapper _mapper;
        private readonly WebShopDBContext _dbContext;
        private readonly IConfiguration _config;
        public CheckService(IConfiguration configuration, IMapper mapper, WebShopDBContext dBContext) {
            _mapper = mapper;
            _dbContext = dBContext;
            _config = configuration;
        }

        public Task<string> GoogleLogin(string token)
        {
            throw new NotImplementedException();
        }

        public async Task<string> Login(LoginDto loginDto)
        {
            User user =await _dbContext.Users.FirstOrDefaultAsync(x=>x.Email==loginDto.email);
            if (user == null)
                return "Korisnik ne postoji";
            if (!BCrypt.Net.BCrypt.Verify(loginDto.password, user.Password))
                return "Neispravna lozinka";
            if (user.Type == UserType.Seller)
            {
                if (user.Status == Status.Odbijen)
                    return "Vas zahtev je odbijen";
                if (user.Status == Status.Ceka)
                    return "Jos ste na cekanju";
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username!),
                new Claim(ClaimTypes.Role, user.Type.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public async Task<string> Register(RegisterDto registerDto)
        {
            if(await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == registerDto.email) != null)
            {
                return "Korisnik sa tim emailom vec postoji";
            }
            if (await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == registerDto.username) != null)
            {
                return "Korisnik sa tim korisnickim imenom vec postoji";
            }

            registerDto.password = BCrypt.Net.BCrypt.HashPassword(registerDto.password);

            User user = _mapper.Map<User>(registerDto);
            if (user.Type == UserType.Seller)
                user.Status = Status.Ceka;
            else
                user.Status=Status.Prihvacen;
            if (registerDto.imageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    registerDto.imageFile.CopyTo(ms);
                    user.Image = ms.ToArray();
                }
            }
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username!),
                new Claim(ClaimTypes.Role, user.Type.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
