using Microsoft.EntityFrameworkCore;
using DiplomApi.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace DiplomApi.Repositories;

public class BaseCompositeKeyRepository<T> : ICompositeKeyRepository<T> where T : class
{
    protected readonly DbContext _context;
    protected readonly DbSet<T> _dbSet;

    public BaseCompositeKeyRepository(DbContext context, DbSet<T> dbSet)
    {
        (_context, _dbSet) = (context, dbSet);
    }

    public virtual IEnumerable<T> GetAll()
    {
        return _dbSet.ToList();
    }

    public virtual T GetById(int key1, int key2)
    {
        return _dbSet.Find(key1, key2);
    }

    public virtual void Insert(T entity)
    {
        _dbSet.Add(entity);
        _context.SaveChanges();
    }

    public virtual void Update(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public virtual void Delete(int key1, int key2)
    {
        var entity = _dbSet.Find(key1, key2);
        if (entity == null)
            return;

        _dbSet.Remove(entity);
        _context.SaveChanges();
    }
}