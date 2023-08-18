﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebShop.Dto;
using WebShop.Interfaces;
using WebShop.Models;
using WebShop.Settings;

namespace WebShop.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IMapper _mapper;
        private readonly WebShopDBContext _dBContext;

        public ProfileService(IMapper mapper, WebShopDBContext dBContext)
        {
            _mapper = mapper;
            _dBContext = dBContext;
        }

        public async Task<string> EditProfile(int id, ProfileDto profileDto)
        {
            User user = await _dBContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(user == null)
            {
                return "Korisnik ne postoji";
            }
            if (profileDto.username != user.Username) {
                if (await _dBContext.Users.FirstAsync(x => x.Username==profileDto.username)!=null)
                {
                    return "Korisnik sa tim korisnickim imenov vec postoji";
                }        
            }
            if (profileDto.email != user.Email)
            {
                if (await _dBContext.Users.FirstAsync(x => x.Email == profileDto.email) != null)
                {
                    return "Korisnik sa tim emailom vec postoji";
                }
            }
            user.Username = profileDto.username;
            user.Password = BCrypt.Net.BCrypt.HashPassword(profileDto.password);
            user.Email = profileDto.email;
            user.Address = profileDto.address;
            user.Firstname = profileDto.firstname;
            user.Lastname = profileDto.lastname;
            user.Birthday = profileDto.birthday;
            user.Username = profileDto.username;
            if (profileDto.image != null)
            {
                using (var ms = new MemoryStream())
                {
                    profileDto.imagefile.CopyTo(ms);
                    user.Image = ms.ToArray();
                }
            }
            _dBContext.Users.Update(user);
            await _dBContext.SaveChangesAsync();

            return "Uspesna izmena";
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            return _mapper.Map<List<OrderDto>>(await _dBContext.Orders.ToListAsync());
        }

        public async Task<ProfileDto> GetProfileInfo(int id)
        {
            User user = await _dBContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }
            return _mapper.Map <ProfileDto>(user);
        }

        public async Task<List<SellerDto>> GetSellers()
        {
            return _mapper.Map<List<SellerDto>>(await _dBContext.Users.AllAsync(x=>x.Type==UserType.Seller));
        }
    }
}