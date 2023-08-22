    using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Xml;
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

        public async Task AddProduct(AddProductDto addProductDto, int id)
        {
            Product product = _mapper.Map<Product>(addProductDto);
            product.SellerId= id;
            if (addProductDto.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    addProductDto.ImageFile.CopyTo(ms);
                    product.Image = ms.ToArray();
                }
            }
            await _dBContext.Products.AddAsync(product);
            await _dBContext.SaveChangesAsync();
        }

        public async Task<string> CreateNewOrder(int id, NewOrderDto newOrderDto)
        {
            User user = await _dBContext.Users.FirstOrDefaultAsync(x=>x.Id==id);
            Order order = _mapper.Map <Order>(newOrderDto);
            if (string.IsNullOrEmpty(newOrderDto.DeliveryAddress))
                order.DeliveryAddress = user.Address;
            order.OrderPrice = 250;
            order.OrderTime = DateTime.Now;
            order.UserId = id;
            foreach (Item item in order.Items)
            {
                Product product = await _dBContext.Products.FirstOrDefaultAsync(x => x.Id == item.Id);
                if (item.Amount < 1)
                    return "Nema proizvoda na stanju";
                if (item.Amount > product.Amount)
                {
                    return "Nedovoljno proizvoda na stanju";
                }

                product.Amount -= item.Amount;
                _dBContext.Products.Update(product);
                item.Name = product.Name;
                item.Price = product.Price;
                order.OrderPrice = item.Price * item.Amount + order.OrderPrice;
                
            }
            order.DeliveryTime = DateTime.Now.AddHours(1).AddMinutes(new Random().Next(180));
            await _dBContext.Orders.AddAsync(order);
            await _dBContext.SaveChangesAsync();
            return "Uspijesno dodata porudzbina";


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
            if(string.IsNullOrEmpty(profileDto.password))
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

        public async Task<List<ProductInfoDto>> GetAllProducts()
        {
            List<Product> products = await _dBContext.Products.ToListAsync();
            return _mapper.Map<List<ProductInfoDto>>(products);
        }

        public async Task<List<OrderDto>> GetBuyersOrders(int id)
        {
            User user=await _dBContext.Users.FirstOrDefaultAsync(x=>x.Id == id);
            List<Order> orders = await _dBContext.Orders.Where(x => x.UserId == id).ToListAsync();
            IEnumerable<int> ids = user.Products.Select(x => x.Id);
            if (orders != null)
                orders = orders.ToList().FindAll(x => x.Items.Any(x=>ids.Contains(x.Id)));

            foreach (Order order in orders)
                order.Items = order.Items.FindAll(x => ids.Contains(x.Id));
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<List<OrderDto>> GetNewSellersOrders(int id)
        {
            User user = await _dBContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            List<Order> orders = await _dBContext.Orders.Where(x=>x.DeliveryTime>DateTime.Now).ToListAsync();
            return _mapper.Map<List<OrderDto>>(orders);
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
            return _mapper.Map<List<SellerDto>>(await _dBContext.Users.Where(x => x.Type == UserType.Seller).ToListAsync());
        }

        public async Task<List<OrderDto>> GetSellersOrders(int id)
        {
            User user = await _dBContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            List<Order> orders = await _dBContext.Orders.ToListAsync();
            IEnumerable<int> ids = user.Products.Select(x => x.Id);
            if (orders != null)
                orders = orders.ToList().FindAll(x => x.Items.Any(x => ids.Contains(x.Id)));

            foreach (Order order in orders)
                order.Items = order.Items.FindAll(x => ids.Contains(x.Id));
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task VerifySeller(VerificationDto verificationDto)
        {
            User user = await _dBContext.Users.FirstOrDefaultAsync(x => x.Id == verificationDto.id);
            user.Status = verificationDto.status;
            _dBContext.Users.Update(user);
            await _dBContext.SaveChangesAsync();
            
        }
    }
}
