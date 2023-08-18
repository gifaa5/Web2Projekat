using AutoMapper;
using WebShop.Dto;
using WebShop.Models;

namespace WebShop.Configuration
{
    public class Mapp:Profile
    {
        public Mapp()
        {
            CreateMap<User, RegisterDto>().ReverseMap();
            CreateMap<User, LoginDto>().ReverseMap();
            CreateMap<User, ProfileDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
        }
    }
}
