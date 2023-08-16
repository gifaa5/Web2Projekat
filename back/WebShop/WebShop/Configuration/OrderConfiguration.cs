using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShop.Models;

namespace WebShop.Configuration
{
    public class OrderConfiguration:IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DeliveryAddress).HasMaxLength(200).IsRequired();
            builder.Property(x => x.OrderTime).IsRequired().HasDefaultValue(DateTime.Now);
            builder.Property(x => x.DeliveryTime).IsRequired();
            builder.Property(x => x.Comment).HasMaxLength(200);
            builder.Property(x => x.IsCanceled).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.OrderPrice).IsRequired();
            builder.HasOne(x => x.User).WithMany(x => x.Orders).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);

            builder.HasData(new Order
            {
                Id = 1,
                DeliveryAddress = "Adresa 123",
                DeliveryTime = DateTime.Now.AddMinutes(new Random().Next(240)),
                IsCanceled = false,
                UserId = 3,
                OrderPrice = 300
            });
        }
    }
}
