using Microsoft.EntityFrameworkCore;
using PizzaAPI.Data.Models;

namespace PizzaAPI.Data.Mappings
{
    public static class PizzaOrderMapping
    {
        public static void MapPizzaOrder(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzaOrder>(entity =>
            {
                entity.HasKey(e => e.OrderId);

                entity.ToTable("pizza_order");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.PizzaId).HasColumnName("pizza_id");

                entity.Property(e => e.Size)
                    .IsRequired()
                    .HasColumnName("size");

                entity.HasOne(d => d.Pizza)
                    .WithMany(p => p.PizzaOrders)
                    .HasForeignKey(d => d.PizzaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pizza_order_pizza_id_fkey");
            });
        }
    }
}
