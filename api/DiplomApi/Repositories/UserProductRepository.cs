using Microsoft.EntityFrameworkCore;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class UserProductRepository(DbContext context, DbSet<UserProduct> dbSet) : BaseRepository<UserProduct>(context, dbSet)
{
    public override void Insert(UserProduct entity)
    {
        var product = _context.Set<Product>().Find(entity.ProductId) ?? throw new ArgumentException("Mission does not exist.");
        var user = _context.Set<User>().Find(entity.UserId) ?? throw new ArgumentException("User does not exist.");
        base.Insert(entity);
    }

    public override UserProduct GetById(int id) => throw new NotSupportedException();

    public UserProduct GetById(int userId, int productId)
    {
        return _dbSet.Find(userId, productId);
    }

    public override void Delete(int id) => throw new NotSupportedException();

    public virtual void Delete(int userId, int productId)
    {
        var entity = _dbSet.Find(userId, productId);
        if (entity == null)
            return;

        _dbSet.Remove(entity);
        _context.SaveChanges();
    }
}
