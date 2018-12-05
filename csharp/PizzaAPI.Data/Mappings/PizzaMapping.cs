using Microsoft.EntityFrameworkCore;
using PizzaAPI.Data.Models;

namespace PizzaAPI.Data.Mappings
{
    public static class PizzaMapping
    {
        public static void MapPizza(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pizza>(entity =>
            {
                entity.ToTable("pizza");

                entity.Property(e => e.PizzaId).HasColumnName("pizza_id");

                entity.Property(e => e.Crust)
                    .IsRequired()
                    .HasColumnName("crust");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Sauce)
                    .IsRequired()
                    .HasColumnName("sauce");

                entity.Property(e => e.Toppings).HasColumnName("toppings");
            });
        }
    }
}
