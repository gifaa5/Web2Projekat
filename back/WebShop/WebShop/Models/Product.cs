using System.ComponentModel.DataAnnotations;

namespace WebShop.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public int SellerId { get; set; }
        public User? Seller { get; set; }
    }
}
