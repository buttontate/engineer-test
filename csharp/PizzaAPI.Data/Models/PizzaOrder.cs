namespace PizzaAPI.Data.Models
{
    public class PizzaOrder
    {
        public short OrderId { get; set; }
        public short PizzaId { get; set; }
        public string Size { get; set; }

        public Pizza Pizza { get; set; }
    }
}
