using WebShop.Models;

namespace WebShop.Dto
{
    public class SellerDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }

        public string Email { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public DateTime Birthday { get; set; }

        public string Address { get; set; }

        public Status Status { get; set; }

    }
}
