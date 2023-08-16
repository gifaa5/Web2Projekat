using System.ComponentModel.DataAnnotations;

namespace WebShop.Models
{
    public class Item
    {

        public int Id { get; set; }
        public Product? Product { get; set; }
        public int Amount { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
