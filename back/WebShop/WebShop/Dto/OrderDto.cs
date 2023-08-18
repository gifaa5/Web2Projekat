using WebShop.Models;

namespace WebShop.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<Item>? Items { get; set; }
        public string? DeliveryAddress { get; set; }
        public DateTime DeliveryTime { get; set; }
        public DateTime OrderTime { get; set; }
        public double OrderPrice { get; set; }
        public string? Comment { get; set; }
        public bool? IsCanceled { get; set; }
    }
}
