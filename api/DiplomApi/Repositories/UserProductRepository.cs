using Microsoft.EntityFrameworkCore;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class UserProductRepository(DbContext context, DbSet<UserProduct> dbSet) : BaseCompositeKeyRepository<UserProduct>(context, dbSet)
{
    public override void Insert(UserProduct entity)
    {
        var product = _context.Set<Product>().Find(entity.ProductId) ?? throw new ArgumentException("Mission does not exist.");
        var user = _context.Set<User>().Find(entity.UserId) ?? throw new ArgumentException("User does not exist.");
        base.Insert(entity);
    }
}
