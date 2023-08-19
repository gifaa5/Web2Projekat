using WebShop.Models;

namespace WebShop.Dto
{
    public class AddProductDto
    {
        public string? Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public IFormFile? ImageFile { get;set; }
    }
}
