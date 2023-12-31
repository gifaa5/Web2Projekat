﻿using AutoMapper;
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
            CreateMap<User, SellerDto>().ReverseMap();

            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Order, NewOrderDto>().ReverseMap();
            
            CreateMap<Product, AddProductDto>().ReverseMap();
            CreateMap<Product, ProductInfoDto>().ReverseMap();
            
            CreateMap<Item, ItemDto>().ReverseMap();

        }
    }
}
