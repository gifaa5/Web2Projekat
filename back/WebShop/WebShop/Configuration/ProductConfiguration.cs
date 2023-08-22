using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebShop.Models;

namespace WebShop.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.HasIndex(x => x.Name).IsUnique();
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.Amount).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(200);
            builder.HasOne(x => x.Seller).WithMany(x => x.Products).HasForeignKey(x => x.SellerId).OnDelete(DeleteBehavior.Cascade);

        }
    }
}
