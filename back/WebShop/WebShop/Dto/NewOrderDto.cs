using WebShop.Models;

namespace WebShop.Dto
{
    public class NewOrderDto
    {
        public string? DeliveryAddress { get; set; }
        public string? Comment { get; set; }
        public List<ItemDto>? Items { get; set; }
    }
}
