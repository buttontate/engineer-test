using System.Collections.Generic;

namespace PizzaAPI.Data.Models
{
    public class Pizza
    {
        public Pizza()
        {
            PizzaOrders = new HashSet<PizzaOrder>();
        }

        public short PizzaId { get; set; }
        public string Name { get; set; }
        public string[] Toppings { get; set; }
        public string Crust { get; set; }
        public string Sauce { get; set; }

        public ICollection<PizzaOrder> PizzaOrders { get; set; }
    }
}
