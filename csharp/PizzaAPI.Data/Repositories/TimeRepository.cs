using System;

namespace PizzaAPI.Data.Repositories
{
    public interface ITimeRepository
    {
        DateTime GetTime();
    }
    
    public class TimeRepository : ITimeRepository
    {
        public DateTime GetTime()
        {
            return DateTime.Now;
        }
    }
}
