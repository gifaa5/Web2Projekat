using System.ComponentModel.DataAnnotations;

namespace WebShop.Models
{
    public class Order
    {
        public int Id { get; set; }
        public List<Item>? Items { get; set; }
        public string? DeliveryAddress { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string? Comment { get; set; }
    }
}
