﻿using System.ComponentModel.DataAnnotations;

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
    public Status Status { get; set; }
    public byte[]? Image { get; set; }
    public List<Order>? Orders { get; set; }
    public List<Product>? Products { get; set; }
        }
}
