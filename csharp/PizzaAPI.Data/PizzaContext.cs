using Microsoft.EntityFrameworkCore;
using PizzaAPI.Data.Mappings;
using PizzaAPI.Data.Models;

namespace PizzaAPI.Data
{
    public class PizzaContext : DbContext
    {
        public PizzaContext()
        {
        }
        public PizzaContext(DbContextOptions<PizzaContext> options) : base(options)
        {
        }
        
        public virtual DbSet<Pizza> Pizza { get; set; }
        public virtual DbSet<PizzaOrder> PizzaOrder { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.MapPizza();
            modelBuilder.MapPizzaOrder();
        }
    }
}
