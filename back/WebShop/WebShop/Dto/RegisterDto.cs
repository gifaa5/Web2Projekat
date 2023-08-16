using WebShop.Models;

namespace WebShop.Dto
{
    public class RegisterDto
    {
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string address { get; set; }
        public UserType type { get; set; }
        public DateTime birthday { get; set; }
        public IFormFile imageFile { get; set; }
    }
}
