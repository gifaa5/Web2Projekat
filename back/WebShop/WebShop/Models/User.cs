using System.ComponentModel.DataAnnotations;

namespace WebShop.Models
{
    public class User { 
        
    public int Id { get; set; }
    public string? Username { get; set; }
    
    public string? Password { get; set; }
    
    public string Email { get; set; }
    
    public string Firstname { get; set; }
    
    public string Lastname { get; set; }
    
    public DateTime Birthday { get; set; }
    
    public string Address { get; set; }
    
    public UserType Type { get; set; }
    
    }
}
