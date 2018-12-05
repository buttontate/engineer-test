using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PizzaAPI.Data.Repositories
{

    public interface IRepository<TContext> where TContext : DbContext
    {
        void Insert<TEntity>(TEntity entity) where TEntity : class;
        IQueryable<TEntity> Get<TEntity>() where TEntity : class;
        TEntity GetById<TEntity>(object id) where TEntity : class;
        void Update<TEntity>(TEntity entity) where TEntity : class;
        void Delete<TEntity>(TEntity entity) where TEntity : class;
        bool Delete<TEntity>(object id) where TEntity : class;
        void SaveChanges();
        Task<int> SaveChangesAsync();
    }

    public class Repository<TContext> : IRepository<TContext>
        where TContext : DbContext
    {

        private readonly TContext _context;

        public Repository(TContext context)
        {
            _context = context;
        }

        public IQueryable<TEntity> Get<TEntity>() where TEntity : class
        {
            return _context.Set<TEntity>();
        }

        public TEntity GetById<TEntity>(object id) where TEntity : class
        {
            return _context.Set<TEntity>().Find(id);
        }

        public void Insert<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Set<TEntity>().Add(entity);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
        
        public bool Delete<TEntity>(object id) where TEntity : class
        {
            var entity = _context.Set<TEntity>().Find(id);

            if (entity == null)
                return false;

            Delete(entity);

            return true;
        }
        public void Delete<TEntity>(TEntity entity) where TEntity : class
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                _context.Set<TEntity>().Attach(entity);

            _context.Set<TEntity>().Remove(entity);
        }
        public void Update<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Set<TEntity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
