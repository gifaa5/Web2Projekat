﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShop.Models;

namespace WebShop.Configuration
{
    public class OrderConfiguration:IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DeliveryAddress).IsRequired();
            builder.Property(x => x.DeliveryTime).IsRequired();
            builder.Property(x => x.Comment).HasMaxLength(200);
        }
    }
}
