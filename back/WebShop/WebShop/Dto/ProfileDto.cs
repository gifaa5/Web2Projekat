namespace WebShop.Dto
{
    public class ProfileDto
    {
        public string username { get; set; }
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public DateTime birthday { get; set; }
        public byte[]? image { get; set; }
        public IFormFile? imagefile { get; set; }
    }
}
