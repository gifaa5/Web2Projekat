﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShop.Models;

namespace WebShop.Configuration
{
    public class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Order).WithMany(x => x.Items).HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.Amount).IsRequired();

            builder.HasData(new Item
            {
                Id = 1,
                OrderId = 1,
                Price = 100,
                Amount = 5,
                Name = "item"
            });
        }
    }
}
