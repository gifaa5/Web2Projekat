using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebShop.Models;

namespace WebShop.Configuration
{
    public class UserConfiguration:IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Username).HasMaxLength(20).IsRequired();
            builder.HasIndex(x => x.Username).IsUnique();
            builder.Property(x => x.Email).HasMaxLength(30).IsRequired();
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.Firstname).HasMaxLength(30).IsRequired();
            builder.Property(x => x.Lastname).HasMaxLength(30).IsRequired();
            builder.Property(x => x.Password).HasMaxLength(30).IsRequired();
            builder.Property(x => x.Address).HasMaxLength(40).IsRequired();
            builder.Property(x => x.Type).HasConversion(new EnumToStringConverter<UserType>()).IsRequired();
            builder.Property(x => x.Birthday).IsRequired();

            builder.HasData(new User
            {
                Id = 1,
                Username = "gifaa",
                Email = "gifaa99@gmal.com",
                Firstname = "Igor",
                Lastname = "Suka",
                Password = "123",
                Address = "Nest 123",
                Type = UserType.Administrator,
                Birthday = new DateTime(2000, 5, 25)
            });
        }
      }
}
